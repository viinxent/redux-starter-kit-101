import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import {
  KeyboardReturnRounded as KeyboardReturnRoundedIcon,
  PostAddRounded as PostAddRoundedIcon,
} from '@material-ui/icons';

import { createTaskAction } from 'store/reducers/task';

import InputIcon from 'components/InputIcon/InputIcon';

const TaskAdd = () => {
  const dispatch = useDispatch();

  const onSubmit = (value: string) => {
    dispatch(createTaskAction(value));
  };

  return (
    <InputIcon
      id="create-task-input"
      FirstIcon={PostAddRoundedIcon}
      LastIcon={KeyboardReturnRoundedIcon}
      onSubmit={onSubmit}
      placeholder="Create additional to-don'ts"
      clearOnSubmit
      required
    />
  );
};

export default memo(TaskAdd);
