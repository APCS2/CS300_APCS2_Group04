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
  },
  backToSummary: {
    marginBottom: 19
  }
}));

export default function ChapterBar(props) {
  const classes = useStyles();
  let history = useHistory();
  const { alias, index, chapterList } = props;
  const handleChange = event => {
    history.push(`/manga/${alias}/chapter/${event.target.value.index}`)
  };
  const currentChapter = chapterList.findIndex(function(element) {
    return element.index === Number(index);
  });
  const nextHandler = () => {
    if (currentChapter < chapterList.length-1) {
      history.push(`/manga/${alias}/chapter/${chapterList[currentChapter+1].index}`)
    }
  }
  const previousHandler = () => {
    if (currentChapter > 0) {
      history.push(`/manga/${alias}/chapter/${chapterList[currentChapter-1].index}`)
    }
  }

  const backToSummaryHandler = () => {
    history.push(`/manga/${alias}`)
  }

  return (
    <Grid container xs={8} justify="center" className={classes.container}>
      <Grid container xs={5} justify="center" className={classes.backToSummary}>
        <Button fullWidth variant="contained" color="primary" onClick={backToSummaryHandler}>
          Back to summary
        </Button>
      </Grid>
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
                  <MenuItem value={chapter}>{`Chapter ${chapter.index}: ${chapter.title}`}</MenuItem>
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