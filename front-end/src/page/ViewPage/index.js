import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChapterBar from '../../component/ChapterBar/index'
import Header from '../../component/header/header'
import ReadingComponent from '../../component/ReadingComponent/index'
import { makeStyles } from '@material-ui/core/styles';
import CommentComponent from '../../component/CommentComponent/index'
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash'
const { createApolloFetch } = require('apollo-fetch');

const classes = {
  pageContainer: {
    marginBottom: 50
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
    };
  }

  componentDidMount() {
    const {alias, index} = this.state
    fetch({
      query: `query PostsForAuthor($alias: String!) {
        summary(alias: $alias) {
          chapters {
            index
            title
            lastUpdated
          }
        }
      }`,
      variables: { alias: alias },
    }).then(res => {
      const chapterList = _.get(res, 'data.summary.chapters', [])
      this.setState({
        chapterList
      })
    })

    fetch({
      query: `query ReadChapter($alias: String!, $index: Int!) {
        readChapter(aliasManga: $alias, index: $index) {
          index
          title
          images {
            src
          }
        }
      }`,
      variables: { alias: alias, index: Number(index) },
    }).then(res => {
      const chapter = _.get(res, 'data.readChapter', {})
      const pageList = _.get(chapter, 'images', [])
      if (chapter) {
        this.setState({
          pageList,
          loading: false,
          success: true
        })
      } else {
        this.setState({
          loading: false
        })
      }
    });
  }

  render() {
    const {chapterList, pageList, index, alias, loading, success} = this.state;
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
      </Grid>
    )
  }
}