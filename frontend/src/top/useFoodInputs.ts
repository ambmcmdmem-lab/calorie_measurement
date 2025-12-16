import { useState } from 'react';

type Input = {
  id: number;
  name: string;
};

const inputsFrom = (numberOfInputs: number): Input[] => {
  const inputs: Input[] = [];
  for (let id = 1; id <= numberOfInputs; id++) {
    inputs.push({
      id,
      name: '',
    });
  }

  return inputs;
};

export default function useFoodInputs(numberOfInitialInput = 5) {
  const [inputs, setInputs] = useState<Input[]>(
    inputsFrom(numberOfInitialInput),
  );

  const setInput = (id: number, value: string) => {
    const target = inputs.find((input) => input.id === id);
    if (!target) {
      throw new Error(`不正なIDが指定されました。 id > ${id}`);
    }

    setInputs(
      inputs
        .filter((input) => input.id !== id)
        .concat({
          id: target.id,
          name: value,
        }),
    );
  };

  return { inputs, setInput } as const;
}
