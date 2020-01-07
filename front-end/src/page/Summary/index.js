import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChapterBar from '../../component/ChapterBar/index'
import Header from '../../component/header/header'
import { useParams } from "react-router-dom";
import ReadingComponent from '../../component/ReadingComponent/index'
import { makeStyles } from '@material-ui/core/styles';
import CommentComponent from '../../component/CommentComponent/index'
import ChapterList from '../../component/ChapterList/index'
import SummaryComponent from '../../component/SummaryComponent/index'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash'
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:8000/graphql',
});

const classes = {
  pageContainer: {
    marginBottom: 50
  }
};

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
    user: 'hentaiIsTheBest',
    avatar: 'https://i.pinimg.com/236x/18/5a/4b/185a4be839f16d386e9aede4f508b0c5.jpg',
    comment: 'Komi san is the best'
  },
  {
    user: 'pornIsTheBest',
    avatar: 'https://i.pinimg.com/236x/18/5a/4b/185a4be839f16d386e9aede4f508b0c5.jpg',
    comment: 'Sauce pls'
  },
  {
    user: 'Thinh_Lon',
    avatar: 'https://i.pinimg.com/236x/18/5a/4b/185a4be839f16d386e9aede4f508b0c5.jpg',
    comment: 'Fuck the guy above me'
  },
  {
    user: 'CultureMan',
    avatar: 'https://i.pinimg.com/236x/18/5a/4b/185a4be839f16d386e9aede4f508b0c5.jpg',
    comment: 'I see you are also a man of culture'
  }
]

const dummyManga = {
  id: '111',
  title: 'Komi san is the best',
  author: 'Meme',
  rating: 3,
  thumbnail: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
  newestChapter: {
    title: 'Dark Web 2',
    id: 2,
    number: 2
  }
}

export default class SummaryPage extends React.Component {

  constructor(props) {
    super(props);
    const {params} = props.match
    this.state = {
      id: params.id,
      alias: params.alias,
      manga: {},
      thumbnail: '',
      loading: true,
      success: false,
      error: ''
    };
  }

  componentWillReceiveProps(props) {
    const {params} = props.match
    this.setState({
      id: params.id,
      alias: params.alias,
      manga: {},
      thumbnail: '',
      loading: true,
      success: false,
      error: ''
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
    const {alias} = this.state
    fetch({
      query: `query PostsForAuthor($alias: String!) {
        summary(alias: $alias) {
          categories
          chapters {
            index
            title
            lastUpdated
          }
          title
          alias
          description
          lastUpdated
          thumbnail
          author
          uploader {
            mail
            DOB
            gender
            role
          }
          comments {
            creator {
              username
            }
            comment
          }
        }
      }`,
      variables: { alias: alias },
    }).then(res => {
      const data = _.get(res, 'data', {})
      const manga = _.get(data, 'summary', {})
      const thumbnail = _.get(manga, 'thumbnail', '')
      const error = _.get(res, 'errors[0].message', '')
      if (data) {
        this.setState({
          manga,
          thumbnail,
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
    const {alias, manga, thumbnail, loading, success, error} = this.state
    const chapterList = _.get(manga, 'chapters', [])
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
            <SummaryComponent manga={manga} thumbnail={thumbnail}/>
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
    );
  }
}
