import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3, 2)
  },
  container: {
    marginTop: 19,
  },
  img: {
    width: '100%'
  },
  commentTitle: {
    marginTop: 20,
  },
  commentUserName: {
    marginLeft: 10,
    height: 'auto'
  },
  commentContent: {
    marginTop: 10
  },
}));

export default function Comment(props) {
  const classes = useStyles();
  const { comment } = props;

  return (
    <Grid container xs={12} className={classes.container}>
      <Grid container direction="row" alignItems="center" className={classes.container}>
        <Grid item>
          <Avatar alt={comment.user} src={comment.avatar} />
        </Grid>
        <Grid item>
          <Typography className={classes.commentUserName} variant="body1"> {comment.user} </Typography>
        </Grid>
      </Grid>
      <Grid container xs={12} justify="flex-start">
        <Typography className={classes.commentContent} variant="body2"> {comment.comment} </Typography>
      </Grid>
    </Grid>
  );
}