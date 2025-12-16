import axios from 'axios';

type Response = {
  reasons: string[];
};

const hasReasons = (value: any): value is Response =>
  typeof value === 'object' &&
  value &&
  Array.isArray(value.reasons) &&
  (value.reasons as any[]).every((reason) => typeof reason === 'string');

export default async function reasonsFor0CaloriesOf(
  foods: string[],
): Promise<string[]> {
  try {
    const response = await axios.get('http://localhost:8080/', {
      params: {
        foods,
      },
    });

    switch (response.status) {
      case 400:
        throw new Error('不正なリクエストが指定されました。');
      case 500:
        throw new Error('サーバー内でエラーが発生しました。');
    }
    if (!hasReasons(response.data)) {
      throw new Error('0カロリーの理由取得に失敗しました。');
    }

    return response.data.reasons;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
