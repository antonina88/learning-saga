import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import callApi from './utils/callApi';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';

import { saga } from './features/Movies/moviesActions';

// Redux dev tools
let devTools = f => f;

const sagaMiddleware = createSagaMiddleware();

if (process.browser &&
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION__) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

const configureStore = (initialState = {}) => (
  createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        thunk.withExtraArgument(callApi),
      ),
      devTools,
    ),
  )
);

sagaMiddleware.run(saga);

export default configureStore;
