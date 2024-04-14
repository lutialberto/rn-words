import {fetchWordsByFilter} from '~/services/words.service';

export const useWordValidator = () => {
  const isValidWord = async (word: string) => {
    const words = await fetchWordsByFilter({
      value: word,
    });
    return words?.length > 0;
  };

  return {
    isValidWord,
  };
};
