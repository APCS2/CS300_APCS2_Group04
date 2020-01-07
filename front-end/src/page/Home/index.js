import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../component/header/header'
import MangaArray from '../../component/MangaArray/index'
import _ from 'lodash'
import Typography from '@material-ui/core/Typography';
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: 'http://localhost:8000/graphql',
});

const dummyMangaList = [
  {
    title: "Naruto",
    alias: "naruto",
    thumbnail: "localhost:8000/manga/naruto/naruto.jpg",
    chapters: [
      {
        index: 1,
        title: "Uzimaki Naruto"
      },
      {
        index: 2,
        title: "Ko No Ha Maru!!"
      }
    ]
  },{
    title: "Naruto",
    alias: "naruto",
    thumbnail: "localhost:8000/manga/naruto/naruto.jpg",
    chapters: [
      {
        index: 1,
        title: "Uzimaki Naruto"
      },
      {
        index: 2,
        title: "Ko No Ha Maru!!"
      }
    ]
  },{
    title: "Naruto",
    alias: "naruto",
    thumbnail: "localhost:8000/manga/naruto/naruto.jpg",
    chapters: [
      {
        index: 1,
        title: "Uzimaki Naruto"
      },
      {
        index: 2,
        title: "Ko No Ha Maru!!"
      }
    ]
  },{
    title: "Naruto",
    alias: "naruto",
    thumbnail: "localhost:8000/manga/naruto/naruto.jpg",
    chapters: [
      {
        index: 1,
        title: "Uzimaki Naruto"
      },
      {
        index: 2,
        title: "Ko No Ha Maru!!"
      }
    ]
  },{
    title: "Naruto",
    alias: "naruto",
    thumbnail: "localhost:8000/manga/naruto/naruto.jpg",
    chapters: [
      {
        index: 1,
        title: "Uzimaki Naruto"
      },
      {
        index: 2,
        title: "Ko No Ha Maru!!"
      }
    ]
  },{
    title: "Naruto",
    alias: "naruto",
    thumbnail: "localhost:8000/manga/naruto/naruto.jpg",
    chapters: [
      {
        index: 1,
        title: "Uzimaki Naruto"
      },
      {
        index: 2,
        title: "Ko No Ha Maru!!"
      }
    ]
  },{
    title: "Naruto",
    alias: "naruto",
    thumbnail: "localhost:8000/manga/naruto/naruto.jpg",
    chapters: [
      {
        index: 1,
        title: "Uzimaki Naruto"
      },
      {
        index: 2,
        title: "Ko No Ha Maru!!"
      }
    ]
  }
]

export default class DisabledTabs extends React.Component {

  constructor() {
    super();
    this.state = {
      latest: [],
      trending: [],
      success: true,
    };
  }

  componentDidMount(){
    this.fetchData()
  }

  fetchData = () => {
    fetch({
      query: `query Latest {
        lastest {
          title
          thumbnail
          alias
          chapters {
            index
            title
          }
        }
      }`,
    }).then(res => {
      const data =_.get(res, 'data', {})
      const latest = _.get(data, 'lastest', [])
      debugger
      if (data) {
        this.setState({
          latest,
        })
      } else {
        this.setState({
          success: false
        })
      }
    });

    fetch({
      query: `query Trending {
        trending {
          title
          thumbnail
          alias
          chapters {
            index
            title
          }
        }
      }`,
    }).then(res => {
      const data =_.get(res, 'data', {})
      const trending = _.get(data, 'trending', [])
      if (data) {
        this.setState({
          trending,
        })
      } else {
        this.setState({
          success: false
        })
      }
    });
  }

  render() {
    const { latest, success, trending } = this.state
    return (
      <Grid container xs={12} justify="center">
        <Header/>
        {
          success
          ? <Grid container xs={12} justify="center">
            <Grid container xs={10}>
              <MangaArray arrayTitle="Treding" mangaArray={latest} />
            </Grid>
            <Grid container xs={10}>
              <MangaArray arrayTitle="Latest" mangaArray={trending} />
            </Grid>
          </Grid>
          : <Grid container xs={10}>
            <Typography variant="h5" component="h3">
              Server Unavailable
            </Typography>
          </Grid>
        }
      </Grid>
    );
  }
}