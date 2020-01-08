import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import './style.css'

const useStyles = makeStyles(theme => ({
  mangaArrayContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: 19,
    width: '100%'
  },
  gridList: {
    width: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  image: {
    width: '100%',
    maxHeight: 170,
    objectFit: 'fill'
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarGridList(props) {
  const classes = useStyles();
  const { mangaArray, arrayTitle } = props;
  return (
    <div className={classes.mangaArrayContainer}>
      <GridList cellHeight={'auto'} className={classes.gridList} cols={6}>
        <GridListTile key="Subheader" cols={8} style={{ height: 'auto' }}>
         <ListSubheader component="div">{arrayTitle}</ListSubheader>
        </GridListTile>
        {mangaArray.map(tile => {
          let newestChapter = tile.chapters.slice(-1)[0]
          return (
            <GridListTile key={tile.img} cols={1}>
              <Grid container xs={12} justify='center'>
                <Grid xs={10}>
                  <img className={classes.image} src={`http://${tile.thumbnail}`} alt={tile.title} />
                </Grid>
                <Grid xs={10}>
                  <NavLink
                    className="tags"
                    style={{ color: 'lightBlue', paddingBottom: 5, paddingTop: 5 }}
                    to={`/manga/${tile.alias}`}
                  >
                    {tile.title}
                  </NavLink>
                </Grid>
                <Grid xs={10}>
                  <NavLink
                    className="tags"
                    style={{ color: 'lightBlue', paddingBottom: 5, paddingTop: 5 }}
                    to={`/manga/${tile.alias}/chapter/${newestChapter.index}`}
                  >
                    {`Chapter ${newestChapter.index}: ${newestChapter.title}`}
                  </NavLink>
                </Grid>
              </Grid>
            </GridListTile>
          )
        })}
      </GridList>
    </div>
  );
}
