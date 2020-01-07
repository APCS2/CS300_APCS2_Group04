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
      loading: true
    };
  }

  componentDidMount() {
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
      const manga = _.get(res, 'data.summary', {})
      if (manga) {
        this.setState({
          manga: manga,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    });

    fetch({
      query: `query PostsForAuthor($alias: String!) {
        summary(alias: $alias) {
          thumbnail
        }
      }`,
      variables: { alias: alias },
    }).then(res => {
      const thumbnail = _.get(res, 'data.summary.thumbnail', '')
      if (thumbnail) {
        this.setState({
          thumbnail
        })
      }
    });
  }

  render() {
    const {alias, manga, thumbnail, loading} = this.state
    const chapterList = _.get(manga, 'chapters', [])
    return (
      <Grid container xs={12} justify="center" className={classes.pageContainer}>
        <Header/>
        {
          loading
          ? <CircularProgress size={90}></CircularProgress>
          : null
        }
        { !_.isEmpty(manga)
          ? <SummaryComponent manga={manga} thumbnail={thumbnail}/>
          : null
        }
        { !_.isEmpty(manga)
          ? <ChapterList alias={alias} chapterList={chapterList}/>
          : null
        }
      </Grid>
    );
  }
}
