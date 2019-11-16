import { all } from 'redux-saga/effects';

import { taskSagas } from './task';

export function* rootSaga() {
  try {
    yield all([...taskSagas]);
  } catch (err) {
    console.log('@rootSaga:', err);
    throw err;
  }
}
