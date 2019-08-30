import { FETCH_QUESTIONS, CHECK_ANSWERS, RESET_ANSWERS } from './actionTypes';

const initialState = {
  questions: [],
  isAnswersChecked: false
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
        isAnswersChecked: true
      };
    case RESET_ANSWERS:
      return {
        ...state,
        isAnswersChecked: false
      };
    default:
      return state;
  }
}
