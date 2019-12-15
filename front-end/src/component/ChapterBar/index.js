import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(3, 2)
  },
  container: {
    marginTop: 19,
  },
  formControl: {
    width: '100%',
  }
}));

export default function ChapterBar(props) {
  const classes = useStyles();
  let history = useHistory();
  const { id, chapterId, chapterList } = props;
  const handleChange = event => {
    history.push(`/manga/${id}/chapter/${event.target.value.id}`)
  };
  const currentChapter = chapterList.findIndex(function(element) {
    return element.id === chapterId;
  });
  const nextHandler = () => {
    if (currentChapter < chapterList.length-1) {
      history.push(`/manga/${id}/chapter/${chapterList[currentChapter+1].id}`)
    }
  }
  const previousHandler = () => {
    if (currentChapter > 0) {
      history.push(`/manga/${id}/chapter/${chapterList[currentChapter-1].id}`)
    }
  }
  return (
    <Grid container xs={8} justify="center" className={classes.container}>
      <Grid container justify="space-between">
        <Grid item xs={2} container justify="center">
          <Button fullWidth variant="contained" color="primary" onClick={previousHandler}>
            Previous
          </Button>
        </Grid>
        <Grid item xs={7} container justify>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleChange}
              value={chapterList[currentChapter]}
            >
              <MenuItem value="" disabled>
                Chapter List
              </MenuItem>
              {
                chapterList.map(chapter =>
                  <MenuItem value={chapter}>{`Chapter ${chapter.number}: ${chapter.title}`}</MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} container justify="center">
          <Button fullWidth variant="contained" color="primary" onClick={nextHandler}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}