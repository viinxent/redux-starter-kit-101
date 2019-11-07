import React from 'react';
import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  Tabs,
  Tab
} from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles';

import Tasks from 'containers/Tasks/Tasks';
import TaskAdd from 'containers/TaskAdd/TaskAdd';
import Search from 'containers/Search/Search';

const theme = (type?: 'dark' | 'light') => {
  return createMuiTheme({
    palette: {
      type,
      background: {
        default: type === 'light' ? '#EDF1F4' : '#121212',
        paper: type === 'light' ? '#FFFFFF' : '#1D1D1D'
      }
    }
  });
};

const useStyles = makeStyles({
  paper: {
    borderRadius: '8px',
    overflow: 'hidden'
  },
  container: {
    paddingTop: '16px',
    height: '100vh'
  },
  gridContainer: {
    flexDirection: 'column',
    height: '100%'
  },
  gridItem: {
    margin: '5px 0px'
  },
  gridTask: {
    flex: 1,
    overflow: 'hidden'
  },
  paperTask: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  }
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme('light')}>
        <CssBaseline />
        <Container className={classes.container}>
          <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item>
              <Paper className={classes.paper} elevation={0}>
                <Search />
              </Paper>
            </Grid>

            <Grid item className={`${classes.gridTask}`}>
              <Paper
                className={`${classes.paper} ${classes.paperTask}`}
                elevation={0}
              >
                <Tabs
                  value={0}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                >
                  <Tab label="PROGRESS" />
                  <Tab label="DONE" />
                </Tabs>
                <Tasks />
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
