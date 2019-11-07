import React from 'react';

import {
  Search as SearchIcon,
  KeyboardReturnRounded as KeyboardReturnRoundedIcon
} from '@material-ui/icons';

import InputIcon from 'components/InputIcon/InputIcon';

const Search = () => {
  const onSubmit = (value: string) => {
    console.log(value);
  };

  const onChange = (value: string) => {
    console.log(value);
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

export default Search;
