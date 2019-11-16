import React, { ChangeEvent, useState } from 'react';
import {
  IconButton,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Tab,
  Tabs,
} from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Brightness4Rounded as NightIcon,
  Brightness7Rounded as DayIcon,
} from '@material-ui/icons';

import Tasks from 'containers/Tasks/Tasks';
import TaskAdd from 'containers/TaskAdd/TaskAdd';
import Search from 'containers/Search/Search';

const theme = (mode: number) => {
  return createMuiTheme({
    palette: {
      type: mode ? 'light' : 'dark',
      background: {
        default: mode ? '#EDF1F4' : '#121212',
        paper: mode ? '#FFFFFF' : '#1D1D1D',
      },
    },
  });
};

const useStyles = makeStyles({
  paper: {
    borderRadius: '8px',
    overflow: 'hidden',
  },
  container: {
    paddingTop: '16px',
    height: '100vh',
  },
  gridContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  gridItem: {
    margin: '5px 0px',
  },
  gridTask: {
    flex: 1,
    overflow: 'hidden',
  },
  paperTask: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  searchCon: {
    display: 'flex',
    alignItems: 'center',
  },
  searchPaper: {
    flexGrow: 1,
  },
  modeButton: {
    marginLeft: '.2em',
  },
});

const PersonalTabs = withStyles(theme => ({
  indicator: {
    height: '100%',
    backgroundColor: theme.palette.background.default,
    opacity: 0.7,
  },
}))(Tabs);

const INIT_VIEW_STATE = {
  value: 0,
  type: 'pending',
};

const App: React.FC = () => {
  const classes = useStyles();
  const [view, setView] = useState(INIT_VIEW_STATE);
  const [mode, setMode] = useState(1);

  const handleMode = () => {
    setMode(mode ? 0 : 1);
  };

  const handleTabChange = (_: ChangeEvent<{}>, value: number) => {
    switch (value) {
      case 1:
        setView({ value, type: 'done' });
        break;

      default:
        setView(INIT_VIEW_STATE);
        break;
    }
  };

  const themeMode = theme(mode);

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <Container className={classes.container}>
          <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item>
              <div className={classes.searchCon}>
                <Paper
                  className={`${classes.paper} ${classes.searchPaper}`}
                  elevation={0}
                >
                  <Search />
                </Paper>
                <IconButton
                  className={`${classes.modeButton}`}
                  onClick={handleMode}
                >
                  {mode ? <NightIcon /> : <DayIcon />}
                </IconButton>
              </div>
            </Grid>

            <Grid item>
              <Paper className={classes.paper} elevation={0}>
                <PersonalTabs
                  onChange={handleTabChange}
                  value={view.value}
                  variant="fullWidth"
                  className="task-status-switcher"
                >
                  <Tab label="Pending" />
                  <Tab label="Done" />
                </PersonalTabs>
              </Paper>
            </Grid>

            <Grid item className={`${classes.gridTask}`}>
              <Paper
                className={`${classes.paper} ${classes.paperTask}`}
                elevation={0}
              >
                <Tasks type={view.type} />
              </Paper>
            </Grid>

            <Grid item>
              <Paper className={classes.paper} elevation={0}>
                <TaskAdd />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
