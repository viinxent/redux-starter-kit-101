import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import {
  Search as SearchIcon,
  KeyboardReturnRounded as KeyboardReturnRoundedIcon
} from '@material-ui/icons';

import InputIcon from 'components/InputIcon/InputIcon';
import { searchTaskAction } from 'store/reducers/task';

const Search = () => {
  const dispatch = useDispatch();

  /**
   * TODO: Add a debounce as this is expensive
   */
  const onSubmit = (value: string) => {
    dispatch(searchTaskAction(value));
  };

  const onChange = (value: string) => {
    dispatch(searchTaskAction(value));
  };

  return (
    <InputIcon
      FirstIcon={SearchIcon}
      LastIcon={KeyboardReturnRoundedIcon}
      onSubmit={onSubmit}
      onChange={onChange}
      placeholder="Search to-don'ts"
    />
  );
};

export default memo(Search);
