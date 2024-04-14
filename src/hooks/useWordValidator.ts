import wordsFile from '~/assets/words.json';

export const useWordValidator = () => {
  const isValidWord = async (word: string) => {
    const words = await wordsFile.words;
    return words.find(w => w.simpleValue === word.toLowerCase());
  };

  return {
    isValidWord,
  };
};
