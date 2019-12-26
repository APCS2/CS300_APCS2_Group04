const User = require("../../models/user");

const Manga = require("../../models/manga");

const convertToSlug = async title => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

module.exports = {
  summary: async ({ mangaId }) => {
    try {
      const manga = await Manga.findById(mangaId);
      if (!manga) {
        throw new Error("Manga does not exist");
      }
      return manga;
    } catch (err) {
      throw err;
    }
  },
  uploadManga: async ({ mangaInput }) => {
    try {
      let alias = await convertToSlug(mangaInput.title);
      const existingManga = await Manga.findOne({ alias: alias });
      if (existingManga) {
        throw new Error("Manga exists already");
      }
      const manga = new Manga({
        title: mangaInput.title,
        categories: [...mangaInput.categories],
        description: mangaInput.description,
        status: mangaInput.status,
        image: mangaInput.image,
        lastUpdated: new Date().toLocaleString(),
        alias: await convertToSlug(alias)
      });
      let result = manga.save();
      return result;
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
      console.log(rated);
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
