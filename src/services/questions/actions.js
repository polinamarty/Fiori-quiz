import { FETCH_QUESTIONS, CHECK_ANSWERS } from './actionTypes';
import axios from 'axios';

export const fetchQuestions = (callback) => dispatch => {
  return axios
    .get("http://localhost:8001/api/questions")
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
