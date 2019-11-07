import React from 'react';
import { List } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import uuid from 'uuid';

import Task from 'components/Task/Task';

const TASK_COUNT = 25;
const TASKS: { name: string; done: boolean; id: string }[] = [];

for (let t = 0; t < TASK_COUNT; t++) {
  TASKS.push({
    name: `Task ${t + 1} - ${uuid.v4()}`,
    done: false,
    id: uuid.v4()
  });
}

const Tasks = () => {
  return (
    <Scrollbars autoHide>
      <List disablePadding dense>
        {TASKS.map(task => (
          <Task key={task.id} {...task} />
        ))}
      </List>
    </Scrollbars>
  );
};

export default Tasks;
