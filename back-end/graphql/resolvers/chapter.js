const Chapter = require("../../models/chapter");
const Manga = require("../../models/manga");
const User = require('../../models/user')

const { transformManga, transformChapter } = require('./merge')

module.exports = {
  uploadChapter: async ({ mangaId, chapterInput }, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const uploader = await User.findById(req.userId);
      const existingManga = await Manga.findById(mangaId);
      if (!existingManga) {
        throw new Error("Manga does not exist");
      }
      const chapter = new Chapter({
        index: +chapterInput.index,
        title: chapterInput.title,
        images: [...chapterInput.images],
        lastUpdated: new Date().toLocaleString(),
        uploader: uploader._id,
        manga: existingManga._id
      });
      let result = await chapter.save();
      existingManga.chapters.push(result);
      await existingManga.save();
      return transformChapter(result);
    } catch (err) {
      throw err;
    }
  },
  readChapter: async ({ aliasManga, index }) => {
    try {
      const existingManga = await Manga.find({alias: aliasManga});
      if (!existingManga) {
        throw new Error("Manga does not exist");
      }
      const existingChapter = await existingManga.chapters.find({index: index});
      if (!existingChapter) {
        throw new Error("Chapter does not exist");
      }
      return transformChapter(existingChapter);
    } catch (err) {
      throw err;
    }
  }
};
