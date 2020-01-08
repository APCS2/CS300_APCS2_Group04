const fs = require('fs')
const btoa = require('btoa');

const User = require("../../models/user");
const Manga = require("../../models/manga");

const { transformManga, transformChapter, mangaUrl, directory } = require('./merge')

const convertToSlug = async title => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

module.exports = {
  searchManga: async({ text }) =>{
    try {
      const mangas = await Manga.find({
        title: { $regex: new RegExp(text, 'i') }
      })
      return mangas.map(manga => {
        return transformManga(manga);
      })
    }
    catch (err) {
      throw err;
    }
  },
  lastest: async() => {
    try {
      const lastestMangas = await Manga.find({}).sort({ lastUpdated: -1 }).skip(0).limit(5)
      return lastestMangas.map(manga => {
        return transformManga(manga);
      })
    }
    catch (err) {
      throw err;
    }
  },
  trending: async() => {
    try {
      const trendingMangas = await Manga.find({}).sort({ view: -1, lastUpdated: -1 }).skip(0).limit(5)
      return trendingMangas.map(manga => {
        return transformManga(manga);
      })
    }
    catch (err) {
      throw err;
    }
  },  
  summary: async ({ alias }) => {
    try {
      const manga = await Manga.findOne({ alias: alias });
      if (!manga) {
        throw new Error("Manga does not exist");
      }
      manga.thumbnail = mangaUrl + alias + "/" + alias + ".jpg";
      await manga.save()
      return transformManga(manga);
    } catch (err) {
      throw err;
    }
  },
  uploadManga: async ({ mangaInput }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    let alias = await convertToSlug(mangaInput.title);
    const existingManga = await Manga.findOne({ alias: alias });
    if (existingManga) {
      throw new Error("Manga exists already");
    }
    const uploader = await User.findById(req.userId);
    const manga = new Manga({
      title: mangaInput.title,
      categories: [...mangaInput.categories],
      description: mangaInput.description,
      status: mangaInput.status,
      image: mangaInput.image,
      lastUpdated: new Date().toLocaleString(),
      alias: await convertToSlug(alias),
      uploader: uploader._id
    });
    try {
      uploader.uploadedMangas.push(manga);
      await uploader.save();
      let result = await manga.save();
      return transformManga(result);
    } catch (err) {
      throw err;
    }
  },
  comment: async ({ CommentInput }) => {
    try {
      let ExistUser = await User.findById(CommentInput.userId);
      if (!ExistUser) {
        throw new Error("User not exist");
      }
      let ExistManga = await Manga.findById(CommentInput.mangaId);
      if (!ExistManga) {
        throw new Error("Manga not exist");
      }
      let comment = {
        user: ExistUser,
        comment: CommentInput.comment
      };
      ExistManga.comments.push(comment);
      await ExistManga.save();
      return comment;
    } catch (err) {
      throw err;
    }
  },
  rating: async ({ RatingInput }) => {
    try {
      let ExistUser = await User.findById(RatingInput.userId);
      if (!ExistUser) {
        throw new Error("User not exist");
      }
      let ExistManga = await Manga.findById(RatingInput.mangaId);
      if (!ExistManga) {
        throw new Error("Manga not exist");
      }
      let UserRating = {
        user: ExistUser,
        rating: +RatingInput.rating
      };
      let rated = -1;
      for (let i = 0; i < ExistManga.rating.length; i++) {
        if (ExistManga.rating[i].user._id == RatingInput.userId.toString()) {
          rated = i;
          break;
        }
      }
      if (rated != -1) {
        ExistManga.rating[rated].rating = +RatingInput.rating;
      } else {
        ExistManga.rating.push(UserRating);
      }
      await ExistManga.save();
      return {
        userId: ExistUser._id,
        mangaId: ExistManga._id,
        rating: +RatingInput.rating
      };
    } catch (err) {
      throw err;
    }
  }
};
