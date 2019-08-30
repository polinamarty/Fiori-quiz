import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default initialState => {
  initialState =
    JSON.parse(window.localStorage.getItem('state')) || initialState;
  const middleware = [thunk];

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
    )
  );

  return store;
};
