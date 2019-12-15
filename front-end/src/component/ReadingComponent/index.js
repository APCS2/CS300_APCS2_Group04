import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3, 2)
  },
  container: {
    marginTop: 19,
  },
  img: {
    width: '100%'
  }
}));

export default function ChapterBar(props) {
  const classes = useStyles();
  const { pageList } = props;

  return (
    <Grid container xs={8} justify="center" className={classes.container}>
      {pageList.map(page => (
        <Grid key={page.img} xs={10}>
          <img src={page.img} alt={page.img} className={classes.img}/>
        </Grid>
      ))}
    </Grid>
  );
}