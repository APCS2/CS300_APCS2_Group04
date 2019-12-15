import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../component/header/header'
import MangaArray from '../../component/MangaArray/index'

const dummyMangaList = [
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  },
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  },
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  },
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  },
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  },
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  },
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  },
  {
    id: '111',
    img: 'https://memestatic.fjcdn.com/pictures/Ernie+and+bert+memes+are+great_355787_7419519.jpg',
    title: 'Ernie And Bert Meme',
    newestChapter: {
      title: 'Dark Web',
      id: 69,
      number: 69
    }
  }
]

export default function DisabledTabs() {
  const [value, setValue] = React.useState(2);
  const [isLogin] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container xs={12} justify="center">
      <Header/>
      <Grid container xs={10}>
        <MangaArray arrayTitle="Treding" mangaArray={dummyMangaList} />
      </Grid>
      <Grid container xs={10}>
        <MangaArray arrayTitle="Latest" mangaArray={dummyMangaList} />
      </Grid>
    </Grid>
  );
}