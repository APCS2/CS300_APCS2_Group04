import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { NavLink } from "react-router-dom";
import _ from 'lodash'

const tableRow = [
  {
    label: 'Author(s):',
    key: 'author'
  },
  {
    label: 'Categories:',
    key: 'categories'
  },
  {
    label: 'Status:',
    key: 'status'
  },
  {
    label: 'Summary:',
    key: 'description'
  }
]

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    margin: 20,
  },
  img: {
    width: '100%'
  },
  content: {
    height: 'auto'
  },
  contentLine: {
    height: 35
  }
}));
const isArrayValue = (varible) => {
  if (_.isArray(varible)) {
    return varible.join(', ')
  }
  return varible
}

export default function SummaryComponent(props) {
  const classes = useStyles();
  const { manga } = props
  let newestChapter = manga.chapters.slice(-1)[0]
  debugger
  return (
    <Grid container xs={10} justify="space-between" className={classes.container}>
      <Grid xs={12}>
        <Typography variant="h5" component="h3" className={classes.title}>
          {manga.title}
        </Typography>
      </Grid>
      <Grid xs={3}>
        <img src={manga.thumbnail} alt={manga.title} className={classes.img}/>
        <Grid xs={12} container justify="center">
          <IconButton fullWidth color="primary">
            <FavoriteIcon fontSize="large" style={{ color: 'red' }}/>
          </IconButton>
        </Grid>
      </Grid>
      <Grid container xs={8} direction="row" className={classes.content}>
        <Table className={classes.table} aria-label="simple table">
          <colgroup>
            <col width="20%" />
            <col width="80%" />
          </colgroup>
          <TableBody>
            {tableRow.map(item =>
              <TableRow key={item.key}>
                <TableCell align="right" >
                  {item.label}
                </TableCell>
                <TableCell align="left">
                  {isArrayValue(manga[item.key])}
                </TableCell>
            </TableRow>
            )}
            <TableRow key='latestChapter'>
              <TableCell align="right" >
                Latest Chapter:
              </TableCell>
              <TableCell align="left">
                <NavLink
                  className="tags"
                  style={{ color: 'lightBlue' }}
                  to={`/manga/${manga._id}/chapter/${newestChapter._id}`}
                >
                  {`Chapter ${newestChapter.index}: ${newestChapter.title}`}
                </NavLink>
              </TableCell>
            </TableRow>
            <TableRow key='rating'>
              <TableCell align="right" >
                Rating:
              </TableCell>
              <TableCell align="left">
                <Rating disabled name="half-rating" value={manga.rating} precision={0.5} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}