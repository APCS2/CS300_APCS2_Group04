import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';

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

  return (
    <Grid container xs={10} justify="center" className={classes.container}>
      <Grid container justify="space-between">
        <Grid item xs={6} container justify>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Chapter List</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleChange}
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
      </Grid>
    </Grid>
  );
}