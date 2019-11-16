import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import createSagaMiddleware from '@redux-saga/core';

import { rootReducer } from './reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);
