import React, { useState, ChangeEvent, FC, FormEvent } from 'react';
import { IconButton, InputBase, makeStyles } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

interface IProps {
  defaultValue?: string;
  placeholder?: string;
  FirstIcon?: SvgIconComponent;
  LastIcon?: SvgIconComponent;
  onChange?: (value: string) => void;
  onSubmit: (value: string) => void;
}

const useStyles = makeStyles({
  con: {
    display: 'flex',
    alignItems: 'center',
    padding: '2px'
  },
  input: {
    flex: 1,
    fontSize: '18px'
  }
});

const InputIcon: FC<IProps> = props => {
  const {
    FirstIcon,
    LastIcon,
    defaultValue,
    placeholder,
    onSubmit,
    onChange
  } = props;

  const classes = useStyles();
  const [value, setValue] = useState(defaultValue || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    if (onChange) onChange(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value !== undefined) onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.con}>
      {FirstIcon && (
        <IconButton type="submit">
          <FirstIcon />
        </IconButton>
      )}

      <InputBase
        className={classes.input}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />

      {LastIcon && (
        <IconButton type="submit">
          <LastIcon />
        </IconButton>
      )}
    </form>
  );
};

export default InputIcon;
