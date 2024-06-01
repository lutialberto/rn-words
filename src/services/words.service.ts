import axios from 'axios';
import {BASE_URL, WORDS_CONTROLLER} from './Config';
import {WordRequest} from './models/words/wordRequest';
import {PermutationRequest} from './models/words/PermutationRequest';
import {PermutationResponse} from './models/words/PermutationResponse';
import {SavePermutationsWrongGuessesRequest} from './models/words/SavePermutationWrongGuessesRequest';
import {TabooCard} from '~/screens/games/screens/taboo/models/TabooCard';

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

export const fetchPermutationsByFilter = async (
  params?: PermutationRequest,
): Promise<PermutationResponse> => {
  try {
    return await axios
      .get<PermutationResponse>(`${BASE_URL}${WORDS_CONTROLLER}/permutations`, {
        params,
      })
      .then(response => response.data);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching permutations');
  }
};

export const savePermutationsWrongGuesses = async (
  body: SavePermutationsWrongGuessesRequest,
): Promise<void> => {
  try {
    return await axios
      .post(`${BASE_URL}${WORDS_CONTROLLER}/permutations/wrong-guesses`, body)
      .then(response => response.data)
      .catch(error => console.log({error}));
  } catch (error) {
    console.log({error});
    throw new Error('Error saving wrongs permutations');
  }
};

export const saveWordleWrongGuess = async (word: string): Promise<void> => {
  try {
    return await axios
      .post(`${BASE_URL}${WORDS_CONTROLLER}/wordle/wrong-guess`, {
        word,
      })
      .then(response => response.data)
      .catch(error => console.log({error}));
  } catch (error) {
    console.log({error});
    throw new Error('Error saving wrong wordle guess');
  }
};

export const fetchTabooCard = async (wordIdsToExclude: number[]): Promise<TabooCard> => {
  try {
    return await axios
      .get(`${BASE_URL}${WORDS_CONTROLLER}/taboo`, {
        params: {
          wordIdsToExclude,
        },
      })
      .then(response => response.data)
      .catch(error => console.log({error}));
  } catch (error) {
    console.log({error});
    throw new Error('Error fetching taboo cards');
  }
};
