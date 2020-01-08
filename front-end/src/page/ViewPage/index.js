import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChapterBar from '../../component/ChapterBar/index'
import Header from '../../component/header/header'
import ReadingComponent from '../../component/ReadingComponent/index'
import { makeStyles } from '@material-ui/core/styles';
import CommentComponent from '../../component/CommentComponent/index'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash'
import Typography from '@material-ui/core/Typography';
const { createApolloFetch } = require('apollo-fetch');

const classes = {
  pageContainer: {
    marginBottom: 100
  }
};

const fetch = createApolloFetch({
  uri: 'http://localhost:8000/graphql',
});

const dummyChapterList = [
  {
    title: 'Dark Web',
    id: '1',
    number: 1
  },
  {
    title: 'Dark Web 2',
    id: '2',
    number: 2
  }
]

const dummyImg = [
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  },
  {
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  }
]

const dummyComment = [
  {
    user: 'ElonMusk',
    avatar: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    comment: 'Naruto is the best'
  },
  {
    user: 'MemeReviewer',
    avatar: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    comment: 'Bleach is better'
  },
  {
    user: 'ThinhAPCS',
    avatar: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    comment: 'No you are wrong'
  },
  {
    user: 'CultureMan',
    avatar: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    comment: 'I see you are also a man of culture'
  }
]

export default class ViewPage extends React.Component {

  constructor(props) {
    super(props);
    const {params} = props.match
    this.state = {
      alias: params.alias,
      index: params.index,
      pageList: [],
      chapterList: [],
      loading: true,
      success: false,
      error: '',
    };
  }

  componentWillReceiveProps(props) {
    const {params} = props.match
    this.setState({
      alias: params.alias,
      index: params.index,
      pageList: [],
      chapterList: [],
      loading: true,
      success: false,
    }, () => this.fetchData())
  }

  componentDidMount() {
    this.fetchData()
  }

  getError = (error) => {
    if (error == "Manga does not exist") {
      return 'Manga Not Found'
    }
    if (error == "Chapter does not exist") {
      return 'Chapters Not Found'
    }
    return 'Server Unavailable'
  }

  fetchData = () => {
    const {alias, index} = this.state
    fetch({
      query: `query ReadChapter($alias: String!, $index: Int!) {
        readChapter(aliasManga: $alias, index: $index) {
          index
          title
          images
          manga{
            chapters{
              index
              title
              lastUpdated
            }
          }
        }
      }`,
      variables: { alias: alias, index: Number(index) },
    }).then(res => {
      const data = _.get(res, 'data', {})
      const chapter = _.get(res, 'data.readChapter', {})
      const pageList = _.get(chapter, 'images', [])
      const chapterList = _.get(chapter, 'manga.chapters', [])
      const error = _.get(res, 'errors[0].message', '')
      if (data) {
        this.setState({
          pageList,
          chapterList,
          loading: false,
          success: true
        })
      } else {
        this.setState({
          loading: false,
          error
        })
      }
    });
  }

  render() {
    const {chapterList, pageList, index, alias, loading, success, error} = this.state;
    debugger
    return (
      <Grid container xs={12} justify="center" className={classes.pageContainer}>
        <Header/>
        {
          loading
          ? <CircularProgress size={90}></CircularProgress>
          : null
        }
        { success
          ? <Grid container xs={12} justify="center" className={classes.pageContainer}>
            <ChapterBar alias={alias} index={index} chapterList={chapterList}/>
            <ReadingComponent pageList={pageList}/>
            <ChapterBar alias={alias} index={index} chapterList={chapterList}/>
            <CommentComponent commentList={dummyComment}/>
          </Grid>
          : null
        }
        { (!success && !loading)
          ? <Grid container xs={12} justify="center" className={classes.pageContainer}>
            <Typography variant="h5" component="h3">
              {this.getError(error)}
            </Typography>
          </Grid>
          : null
        }
      </Grid>
    )
  }
}