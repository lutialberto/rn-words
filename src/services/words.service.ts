import axios from 'axios';
import {BASE_URL, WORDS_CONTROLLER} from './Config';

export const fetchRandomWord = async (length?: number) => {
  try {
    const params = {
      length,
    };
    return await axios
      .get(`${BASE_URL}${WORDS_CONTROLLER}/random`, {
        params,
      })
      .then(response => response.data.simpleValue)
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
    throw new Error('Error generating new word');
  }
};
