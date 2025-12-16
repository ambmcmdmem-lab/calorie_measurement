import { FormEvent, useMemo, useState } from 'react';
import useFoodInputs from './useFoodInputs';

export default function usePageLogic() {
  const { inputs: foodInputs, setInput: setFoodInput } = useFoodInputs();
  const [error, setError] = useState<string | null>(null);

  const foodInputsSortedById = useMemo(
    () => [...foodInputs].sort((a, b) => a.id - b.id),
    [foodInputs],
  );

  const foods = useMemo(
    () => foodInputs.filter(({ name }) => name),
    [foodInputs],
  );

  const onInputFood = (id: number) => (event: FormEvent<HTMLInputElement>) => {
    const input = (event.target as HTMLInputElement).value;

    setFoodInput(id, input);
  };

  const paramsForResult = useMemo(() => {
    const params = foods.map(({ name }) => `foods=${name}`).join('&');

    return `?${params}`;
  }, [foods]);

  const validateLinkToResult = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (foods.length === 0) {
      setError('1つ以上食べ物・飲み物を入力してください。');
      event.preventDefault();
    }
  };

  return {
    foodInputsSortedById,
    error,
    onInputFood,
    paramsForResult,
    validateLinkToResult,
  } as const;
}
