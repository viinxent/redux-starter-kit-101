import React, {
  FormEvent,
  useState,
  ChangeEvent,
  MouseEvent,
  useRef,
  FC,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  Grid,
  IconButton,
  Typography,
  InputBase,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { ITask, IUpdateTaskActionPayload } from 'store/reducers/task';

const useStyles = makeStyles({
  form: {
    width: '100%',
  },
  taskName: {
    padding: '6px 0px',
    margin: 0,
    display: 'block',
    fontSize: '16px',
  },
  taskNameGrid: {
    flex: 1,
    minWidth: 0,
  },
});

interface IProps {
  data: ITask;
  onDelete: (id: string) => void;
  onUpdate: (data: IUpdateTaskActionPayload) => void;
}

const Task: FC<IProps> = props => {
  const { data, onDelete, onUpdate } = props;

  const classes = useStyles();
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(data.name);
  const [checked, setChecked] = useState(data.done);
  const [prevName, setPrevName] = useState(data.name);
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({ _id: data._id, name, done: checked });
    setEdit(false);
    setPrevName(name);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    setEdit(true);
  };

  const handleDelete = () => {
    onDelete(data._id);
  };

  const handleDone = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onUpdate({ _id: data._id, name: prevName, done: checked });
    setChecked(checked);
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Checkbox
              inputProps={{ 'aria-label': 'primary checkbox' }}
              onChange={handleDone}
              checked={checked}
              className="task-toggle-status"
            />
          </Grid>
          <Grid item className={classes.taskNameGrid}>
            {edit ? (
              <InputBase
                id="name"
                name="name"
                placeholder="Enter to-don't name"
                className={`${classes.taskName} task-name input`}
                onChange={handleChange}
                value={name}
                ref={nameRef}
                autoFocus
                fullWidth
                required
              />
            ) : (
              <Typography
                className={`${classes.taskName} task-name`}
                onClick={handleClick}
                noWrap
              >
                {name}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <IconButton
              aria-label="delete"
              onClick={handleDelete}
              className="task-delete"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Task;
