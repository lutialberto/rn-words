import axios from 'axios';
import {BASE_URL, WORDS_CONTROLLER} from './Config';
import {WordRequest} from './models/words/wordRequest';

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
    throw new Error('Error fetching new word');
  }
};

export const fetchWordsByFilter = async (params?: WordRequest) => {
  try {
    return await axios
      .get(`${BASE_URL}${WORDS_CONTROLLER}`, {
        params,
      })
      .then(response => response.data)
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching words');
  }
};
