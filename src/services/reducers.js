import { combineReducers } from 'redux';
import questionReducer from './questions/reducer';

export default combineReducers({
  questions: questionReducer,
});
