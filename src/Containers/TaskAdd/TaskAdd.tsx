import React from 'react';

import {
  KeyboardReturnRounded as KeyboardReturnRoundedIcon,
  PostAddRounded as PostAddRoundedIcon
} from '@material-ui/icons';

import InputIcon from '../../Components/InputIcon/InputIcon';

const TaskAdd = () => {
  const onSubmit = (value: string) => {
    console.log(value);
  };

  return (
    <InputIcon
      FirstIcon={PostAddRoundedIcon}
      LastIcon={KeyboardReturnRoundedIcon}
      onSubmit={onSubmit}
      placeholder="Create additional to-don'ts"
    />
  );
};

export default TaskAdd;
