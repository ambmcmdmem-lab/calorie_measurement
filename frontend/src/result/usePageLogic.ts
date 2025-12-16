import { useEffect, useState } from 'react';
import reasonsFor0CaloriesOf from './reasonsFor0Calories';

export default function usePageLogic(
  startLoading: () => void,
  stopLoading: () => void,
) {
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    startLoading();
    const foods = new URLSearchParams(window.location.search).getAll('foods');
    if (foods.length === 0) {
      stopLoading();
      throw new Error();
    }

    reasonsFor0CaloriesOf(foods)
      .then((reasons) => {
        setReasons(reasons);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        stopLoading();
      });
  }, [startLoading, stopLoading]);

  return {
    reasons,
  } as const;
}
