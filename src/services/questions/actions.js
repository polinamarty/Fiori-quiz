import { FETCH_QUESTIONS, CHECK_ANSWERS, RESET_ANSWERS } from './actionTypes';
import axios from 'axios';

export const fetchQuestions = (path, callback) => dispatch => {
  return axios
    .get(`http://localhost:8001/api/${path}`)
    .then(res => {

      let { questions}  = res.data;

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_QUESTIONS,
        payload: questions
      });
    })
    .catch(err => {
      console.log('Could not fetch questions. Try again later.');
    });
}

export function checkAnswers() {
  return({ type: CHECK_ANSWERS });
}

export function resetAnswers() {
  return({ type: RESET_ANSWERS });
}
