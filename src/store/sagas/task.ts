import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';

import {
  createTaskService,
  fetchTasksService,
  removeTaskService,
  updateTaskService,
  searchTaskService
} from 'services/task';

import {
  ITask,
  IUpdateTaskActionPayload,
  CREATE_TASK,
  FETCH_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  SEARCH_TASK,
  createErrorTaskAction,
  creatingTaskAction,
  createdTaskAction,
  fetchErrorTaskAction,
  fetchingTaskAction,
  fetchedTaskAction,
  removeErrorTaskAction,
  removingTaskAction,
  removedTaskAction,
  updateErrorTaskAction,
  updatingTaskAction,
  updatedTaskAction,
  searchTaskErrorAction,
  searchingTaskAction,
  searchedTaskAction
} from 'store/reducers/task';

export const taskSagas = [
  fork(fetchTasksSaga),
  fork(createTaskSaga),
  fork(removeTaskSaga),
  fork(updateTaskSaga),
  fork(searchTaskSaga)
];

function* fetchTasksSaga() {
  yield takeLatest(FETCH_TASK, callFetchTasksSaga);
}

function* callFetchTasksSaga() {
  try {
    yield put(fetchingTaskAction());
    const docs: ITask[] = yield call(fetchTasksService);
    yield put(fetchedTaskAction(docs));
  } catch (err) {
    yield put(fetchErrorTaskAction(err.message));
  }
}

function* createTaskSaga() {
  yield takeLatest(CREATE_TASK, callCreateTaskSaga);
}

function* callCreateTaskSaga({
  payload
}: PayloadAction<string, typeof CREATE_TASK>) {
  try {
    yield put(creatingTaskAction());
    const task: ITask = yield call(createTaskService, payload);
    yield put(createdTaskAction(task));
  } catch (err) {
    yield put(createErrorTaskAction(err.message));
  }
}

function* removeTaskSaga() {
  yield takeLatest(REMOVE_TASK, callRemoveTaskSaga);
}

function* callRemoveTaskSaga({
  payload
}: PayloadAction<string, typeof REMOVE_TASK>) {
  try {
    yield put(removingTaskAction());
    const deleted: ITask = yield call(removeTaskService, payload);
    yield put(removedTaskAction(deleted));
  } catch (err) {
    yield put(removeErrorTaskAction(err.message));
  }
}

function* updateTaskSaga() {
  yield takeLatest(UPDATE_TASK, callUpdateTaskSaga);
}

function* callUpdateTaskSaga({
  payload
}: PayloadAction<IUpdateTaskActionPayload, typeof UPDATE_TASK>) {
  try {
    yield put(updatingTaskAction());
    const updated: ITask = yield call(updateTaskService, payload);
    yield put(updatedTaskAction(updated));
  } catch (err) {
    yield put(updateErrorTaskAction(err.message));
  }
}

function* searchTaskSaga() {
  yield takeLatest(SEARCH_TASK, callSearchTaskSaga);
}

function* callSearchTaskSaga({
  payload
}: PayloadAction<string, typeof SEARCH_TASK>) {
  try {
    yield put(searchingTaskAction());
    const docs: ITask[] = yield call(searchTaskService, payload);
    yield put(searchedTaskAction(docs));
  } catch (err) {
    yield put(searchTaskErrorAction(err.message));
  }
}
