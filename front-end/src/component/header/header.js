import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3, 2)
  },
}));

export default function Header() {
  const [isLogin] = React.useState(false)
  const classes = useStyles();
  let history = useHistory();
  const headerHandler = (url) => {
    history.push(url)
  }
  return (
    <Grid container xs={12} justify="center">
      <Grid item xs={12}>
        <Paper className={classes.title} color="primary">
          <Typography align="center" variant="h4" component="h4">
            Big Titty Hentai Girl
          </Typography>
        </Paper>
      </Grid>
      <Grid xs={10}>
        <ButtonGroup color="primary" variant="contained" fullWidth aria-label="full width contained outlined button group">
          <Button onClick={() => headerHandler('/Home')}>Home Page</Button>
          <Button>Trending</Button>
          <Button>Latest</Button>
          <Button>Manga List</Button>
          <Button>Favorite</Button>
          {
            !isLogin
            ? <Button>Login</Button>
            : <Button>Logout</Button>
          }
        </ButtonGroup>
      </Grid>
      <Grid xs={10} container alignItems="flex-start" justify="flex-end" direction="row">
        <Grid item xs={3}>
          <Input
            id="input-with-icon-adornment"
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
}