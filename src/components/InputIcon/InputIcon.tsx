import React, { useState, ChangeEvent, FC, FormEvent } from 'react';
import { IconButton, InputBase, makeStyles } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

interface IProps {
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  FirstIcon?: SvgIconComponent;
  LastIcon?: SvgIconComponent;
  clearOnSubmit?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

const defaultProps: IProps = {
  defaultValue: '',
  placeholder: '',
  disabled: false,
  required: false,
  clearOnSubmit: false,
  name: '',
  id: '',
};

const useStyles = makeStyles({
  con: {
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
  },
  input: {
    flex: 1,
    fontSize: '18px',
  },
});

const InputIcon: FC<IProps> = props => {
  const {
    FirstIcon,
    LastIcon,
    clearOnSubmit,
    defaultValue,
    id,
    name,
    placeholder,
    onSubmit,
    onChange,
    disabled,
    required,
  } = props;

  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    if (onChange) onChange(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && value !== undefined) onSubmit(value);
    if (clearOnSubmit) setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={classes.con}>
      {FirstIcon && (
        <IconButton id={`${id}-first-button`} type="submit" disabled={disabled}>
          <FirstIcon />
        </IconButton>
      )}

      <InputBase
        id={id}
        name={name}
        className={classes.input}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
      />

      {LastIcon && (
        <IconButton id={`${id}-last-button`} type="submit" disabled={disabled}>
          <LastIcon />
        </IconButton>
      )}
    </form>
  );
};

InputIcon.defaultProps = defaultProps;

export default InputIcon;
