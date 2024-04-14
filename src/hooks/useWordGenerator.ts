import axios from 'axios';
import {useState} from 'react';
import {Alert} from 'react-native';
import {BASE_URL} from '~/services/Config';
import {fetchRandomWord} from '~/services/words.service';

export const useWordGenerator = () => {
  const [word, setWord] = useState(undefined as string | undefined);

  const generateNewWord = async (length?: number) => {
    try {
      const response = await fetchRandomWord(length);
      setWord(response);
    } catch (error) {
      Alert.alert('Error', 'Error generating new word');
    }
  };

  return {word, generateNewWord};
};
