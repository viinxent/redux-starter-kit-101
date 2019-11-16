import { RootState } from 'store/reducers';
import { createSelector } from 'reselect';

export const selectTask = (state: RootState) => state.task;

export const selectTaskDone = createSelector(selectTask, task =>
    task.tasks.filter(task => task.done)
);

export const selectTaskPending = createSelector(selectTask, task =>
    task.tasks.filter(task => !task.done)
);
