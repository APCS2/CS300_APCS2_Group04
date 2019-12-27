import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../component/header/header'
import MangaArray from '../../component/MangaArray/index'

const dummyMangaList = [
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
    }
  },
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
    }
  },
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
    }
  },
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
    }
  },
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
    }
  },
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
    }
  },
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
    }
  },
  {
    id: '111',
    img: 'https://res.cloudinary.com/teepublic/image/private/s--2cQ6ELQC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1560566736/production/designs/5070067_3.jpg',
    title: 'Komi san is the best',
    newestChapter: {
      title: 'Dark Web 2',
      id: 2,
      number: 2
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