import React, { Fragment, FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, Divider } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  fetchTaskAction,
  removeTaskAction,
  updateTaskAction,
  IUpdateTaskActionPayload,
} from 'store/reducers/task';

import { selectTaskDone, selectTaskPending } from 'store/selectors/task';

import Task from 'components/Task/Task';

interface IProps {
  type?: string;
}

const defaultProps: IProps = {
  type: 'pending',
};

const Tasks: FC<IProps> = props => {
  const { type } = props;
  const dispatch = useDispatch();

  const selectTask = type === 'done' ? selectTaskDone : selectTaskPending;
  const tasks = useSelector(selectTask);
  const tasksCount = tasks.length;

  useEffect(() => {
    dispatch(fetchTaskAction());
  }, [dispatch]);

  const onDelete = (id: string) => {
    dispatch(removeTaskAction(id));
  };

  const onUpdate = (data: IUpdateTaskActionPayload) => {
    dispatch(updateTaskAction(data));
  };

  return (
    <Scrollbars autoHide>
      <List disablePadding className={`tasks ${type}`}>
        {tasks.map((task, i) => (
          <Fragment key={task._id}>
            <ListItem>
              <Task data={task} onDelete={onDelete} onUpdate={onUpdate} />
            </ListItem>
            {i + 1 !== tasksCount ? <Divider /> : null}
          </Fragment>
        ))}
      </List>
    </Scrollbars>
  );
};

Tasks.defaultProps = defaultProps;

export default Tasks;
