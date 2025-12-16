import { HttpFunction } from '@google-cloud/functions-framework';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import OpenAI from 'openai';

const cachedOpenApiKey = (() => {
  let cachedOpenApiKey: string | null = null;

  return async () => {
    if (!cachedOpenApiKey) {
      const secretManagerClient = new SecretManagerServiceClient({
        projectId: process.env.GCP_PROJECT_ID,
      });
      const [version] = await secretManagerClient.accessSecretVersion({
        name: process.env.GCP_SECRET_VERSION_RESOURCE_NAME,
      });

      const payload = version.payload?.data?.toString();
      if (!payload) {
        throw new Error('Failed to retrieve the secret.');
      }

      cachedOpenApiKey = payload;
    }

    return cachedOpenApiKey;
  };
})();

const isFoods = (value: any): value is string[] =>
  Array.isArray(value) &&
  value.length >= 1 &&
  value.every((val) => typeof val === 'string');

export const fetchReasonsFor0Calories: HttpFunction = async (req, res) => {
  try {
    if (!process.env.ALLOWED_ORIGIN || !process.env.CHATGPT_ORGANIZATION_ID) {
      throw new Error('Environment variables are missing.');
    }

    res.set('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);

    const { foods } = req.query;
    if (!isFoods(foods)) {
      res.status(400).send({ error: '"foods"パラメータが不正です。' });
      return;
    }

    const openApiKey = await cachedOpenApiKey();

    const client = new OpenAI({
      apiKey: openApiKey,
      organization: process.env.CHATGPT_ORGANIZATION_ID,
    });

    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: [
            '以下の食べ物に対し、0カロリー理論の理由（冗談）を挙げてください。',
            '例：ドーナツの場合、「丸い形だから0カロリー」',
            '例2：唐揚げの場合、「カロリーは熱に弱いから0カロリー」',
            'また、`[食べ物の名前]：[0カロリーの理由]ため0カロリー`のフォーマットで回答してください。',
            ...foods,
          ].join('\n'),
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const reasons = response.choices[0]?.message.content
      ?.split('\n')
      .filter((reason) => reason);
    if (!reasons) {
      console.error('0カロリーの理由を取得するのに失敗しました。', response);
      throw new Error('0カロリーの理由を取得するのに失敗しました。');
    }

    res.send({
      reasons,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error:
        err instanceof Error
          ? err.message
          : 'サーバー内でエラーが発生しました。',
    });
  }
};
