import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../component/header/header'
import MangaArray from '../../component/MangaArray/index'
import _ from 'lodash'
import Typography from '@material-ui/core/Typography';

export default class NotFound extends React.Component {
  render() {
    return (
      <Grid container xs={12} justify="center">
        <Typography variant="h5" component="h3">
          404 Page Not Found
        </Typography>
      </Grid>
    );
  }
}