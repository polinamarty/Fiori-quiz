import { FETCH_QUESTIONS, CHECK_ANSWERS } from './actionTypes';

const initialState = {
  questions: [],
  checkAnswers: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case CHECK_ANSWERS:
      return {
        ...state,
        checkAnswers: true
      };
    default:
      return state;
  }
}
