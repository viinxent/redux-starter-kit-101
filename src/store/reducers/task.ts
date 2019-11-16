import { createAction, createSlice, PayloadAction } from 'redux-starter-kit';

/**
 * TASK INTERFACES
 */

export interface ITask {
  _id: string;
  _rev?: string;
  name: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
}

interface ICreateTaskState {
  creating: boolean;
  created: boolean;
  data: ITask | null;
  error: string;
}

interface IUpdateTaskState {
  updating: boolean;
  updated: boolean;
  data: ITask | null;
  error: string;
}

interface IRemoveTaskState {
  removing: boolean;
  removed: boolean;
  data: ITask | null;
  error: string;
}

interface IFetchTaskState {
  fetching: boolean;
  fetched: boolean;
  initialized: boolean;
  error: string;
}

interface ISearchTaskState {
  searching: boolean;
  searched: boolean;
  error: string;
}

interface ITaskState {
  tasks: ITask[];
  create: ICreateTaskState;
  update: IUpdateTaskState;
  remove: IRemoveTaskState;
  fetch: IFetchTaskState;
  search: ISearchTaskState;
}

export interface IUpdateTaskActionPayload {
  _id: string;
  name?: string;
  done?: boolean;
}

interface IUpdateTaskAction {
  payload: IUpdateTaskActionPayload;
}

/**
 * TASK ACTION TYPES
 */

type UpdateTaskActionType = (
  payload: IUpdateTaskActionPayload
) => IUpdateTaskAction;

/**
 * TASK CONSTANT ACTION TYPES
 */

export const CREATE_TASK = 'task/createTaskAction';
export const REMOVE_TASK = 'task/removeTaskAction';
export const UPDATE_TASK = 'task/updateTaskAction';
export const FETCH_TASK = 'task/fetchTaskAction';
export const SEARCH_TASK = 'task/searchTaskAction';

/**
 * TASK CONSTANT STATES
 */

const INIT_CREATE_TASK: ICreateTaskState = {
  creating: false,
  created: false,
  data: null,
  error: ''
};

const INIT_UPDATE_TASK: IUpdateTaskState = {
  updating: false,
  updated: false,
  data: null,
  error: ''
};

const INIT_REMOVE_TASK: IRemoveTaskState = {
  removing: false,
  removed: false,
  data: null,
  error: ''
};

const INIT_FETCH_TASK: IFetchTaskState = {
  fetching: false,
  fetched: false,
  initialized: false,
  error: ''
};

const INIT_SEARCH_TASK: ISearchTaskState = {
  searched: false,
  searching: false,
  error: ''
};

const INIT_TASK: ITaskState = {
  tasks: [],
  create: INIT_CREATE_TASK,
  update: INIT_UPDATE_TASK,
  remove: INIT_REMOVE_TASK,
  fetch: INIT_FETCH_TASK,
  search: INIT_SEARCH_TASK
};

/**
 * TASK REDUCER
 */

const task = createSlice({
  name: 'task',
  initialState: INIT_TASK,
  reducers: {
    creatingTaskAction: state => {
      state.create = { ...INIT_CREATE_TASK, creating: true };
    },

    createdTaskAction: (state, { payload }: PayloadAction<ITask>) => {
      state.create = { ...INIT_CREATE_TASK, created: true, data: payload };
      state.tasks.unshift(payload);
    },

    createErrorTaskAction: (state, { payload }: PayloadAction<string>) => {
      state.create = { ...INIT_CREATE_TASK, error: payload };
    },

    updatingTaskAction: state => {
      state.update = { ...INIT_UPDATE_TASK, updating: true };
    },

    updatedTaskAction: (state, { payload }: PayloadAction<ITask>) => {
      const taskIndex = state.tasks.findIndex(task => task._id === payload._id);
      state.tasks[taskIndex] = payload;
      state.update = { ...INIT_UPDATE_TASK, data: payload };
    },

    updateErrorTaskAction: (state, { payload }: PayloadAction<string>) => {
      state.update = { ...INIT_UPDATE_TASK, error: payload };
    },

    removingTaskAction: state => {
      state.remove = { ...INIT_REMOVE_TASK, removing: true };
    },

    removedTaskAction: (state, { payload }: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter(task => task._id !== payload._id);
      state.remove = { ...INIT_REMOVE_TASK, removed: true, data: payload };
    },

    removeErrorTaskAction: (state, { payload }: PayloadAction<string>) => {
      state.remove = { ...INIT_REMOVE_TASK, error: payload };
    },

    fetchingTaskAction: state => {
      state.fetch = {
        ...INIT_FETCH_TASK,
        initialized: state.fetch.initialized,
        fetching: true
      };
    },

    fetchedTaskAction: (state, { payload }: PayloadAction<ITask[]>) => {
      state.fetch = { ...INIT_FETCH_TASK, initialized: true };
      state.tasks = payload.sort(
        (taskA, taskB) => taskB.createdAt - taskA.createdAt
      );
    },

    fetchErrorTaskAction: (state, { payload }: PayloadAction<string>) => {
      state.fetch = {
        ...INIT_FETCH_TASK,
        initialized: state.fetch.initialized,
        error: payload
      };
    },

    searchingTaskAction: state => {
      state.search = {
        ...INIT_SEARCH_TASK,
        searching: true
      };
    },

    searchedTaskAction: (state, { payload }: PayloadAction<ITask[]>) => {
      state.tasks = state.tasks = payload.sort(
        (taskA, taskB) => taskB.createdAt - taskA.createdAt
      );

      state.search = {
        ...INIT_SEARCH_TASK,
        searched: true
      };
    },

    searchTaskErrorAction: (state, { payload }: PayloadAction<string>) => {
      state.search = {
        ...INIT_SEARCH_TASK,
        error: payload
      };
    }
  }
});

/**
 * TASK ACTION CREATORS
 */

export const createTaskAction = createAction<string, typeof CREATE_TASK>(
  CREATE_TASK
);

export const removeTaskAction = createAction<string, typeof REMOVE_TASK>(
  REMOVE_TASK
);

export const updateTaskAction = createAction<
  UpdateTaskActionType,
  typeof UPDATE_TASK
>(UPDATE_TASK, task => ({ payload: task }));

export const fetchTaskAction = createAction<void, typeof FETCH_TASK>(
  FETCH_TASK
);

export const searchTaskAction = createAction<string, typeof SEARCH_TASK>(
  SEARCH_TASK
);

export const {
  creatingTaskAction,
  createdTaskAction,
  createErrorTaskAction,
  updatingTaskAction,
  updatedTaskAction,
  updateErrorTaskAction,
  removingTaskAction,
  removedTaskAction,
  removeErrorTaskAction,
  fetchingTaskAction,
  fetchedTaskAction,
  fetchErrorTaskAction,
  searchingTaskAction,
  searchedTaskAction,
  searchTaskErrorAction
} = task.actions;

export const { reducer: taskReducer } = task;
