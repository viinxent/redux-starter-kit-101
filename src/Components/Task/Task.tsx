import React, {
  FormEvent,
  useState,
  ChangeEvent,
  MouseEvent,
  useRef,
  FC
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  ListItem,
  Typography,
  InputBase
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  form: {
    width: '100%'
  },
  taskName: {
    padding: '6px 0px',
    margin: 0,
    display: 'block',
    fontSize: '16px'
  },
  taskNameGrid: {
    flex: 1,
    minWidth: 0
  }
});

interface IProps {
  id: string;
  name: string;
  done: boolean;
}

const Task: FC<IProps> = props => {
  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(props.name);
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEdit(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    setEdit(true);
  };

  return (
    <>
      <ListItem>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} />
            </Grid>
            <Grid item className={classes.taskNameGrid}>
              {edit ? (
                <InputBase
                  id="name"
                  name="name"
                  placeholder="Enter to-don't name"
                  className={classes.taskName}
                  onChange={handleChange}
                  value={name}
                  ref={nameRef}
                  autoFocus
                  fullWidth
                  required
                />
              ) : (
                <Typography
                  className={classes.taskName}
                  onClick={handleClick}
                  noWrap
                >
                  {name}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </ListItem>
      <Divider />
    </>
  );
};

export default Task;
