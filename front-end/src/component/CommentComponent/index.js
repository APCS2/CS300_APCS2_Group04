import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Comment from '../Comment/index'
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
  }
}));

export default function ChapterBar(props) {
  const classes = useStyles();
  const { commentList } = props;

  return (
    <Grid container xs={8} justify="center" className={classes.container}>
      <Grid xs={12} container justify="center">
        <IconButton fullWidth color="primary">
          <FavoriteIcon fontSize="large" style={{ color: 'red' }}/>
        </IconButton>
      </Grid>
      <Grid xs={11} container justify="center">
        <TextField fullWidth multiline id="outlined-basic" label="Comment" variant="outlined" />
      </Grid>

      <Grid xs={1} alignItem='flex-end' alignContent='flex-end'>
        <IconButton fullWidth color="secondary">
          <SendIcon fontSize="large"/>
        </IconButton>
      </Grid>

      <Grid xs={12} container justify='flex-start' className={classes.commentTitle}>
        <Typography variant="h4" component="h3">
          Comment
        </Typography>
        {
          commentList.map(comment =>
            <Comment comment={comment}/>
          )
        }
      </Grid>
    </Grid>
  );
}