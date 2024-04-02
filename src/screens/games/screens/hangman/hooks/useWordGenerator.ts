import {useState} from 'react';
import wordsFile from '~/assets/words.json';

export const useWordGenerator = () => {
  const [word, setWord] = useState(undefined as string | undefined);

  const generateNewWord = async (size?: number) => {
    const words = await wordsFile.words;
    const filtered = !!size ? words.filter(w => w.length === size) : words;

    const length = filtered.length === 0 ? words.length : filtered.length;
    const randomIndex = Math.floor(Math.random() * length);
    setWord(filtered[randomIndex].toUpperCase());
  };

  return {word, generateNewWord};
};
