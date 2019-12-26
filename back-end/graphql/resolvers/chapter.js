const Chapter = require('../../models/chapter');
const Manga = require('../../models/manga');

module.exports = {
    uploadChapter: async({ mangaId, chapterInput }) => {
        try {
            const existingManga = await Manga.findById(mangaId);
            if (!existingManga) {
                throw new Error("Manga does not exist");
            }
            const chapter = new Chapter({
                index: +chapterInput.index,
                title: chapterInput.title,
                images: [...chapterInput.images],
                lastUpdated: new Date().toLocaleString()
            })
            let result = await chapter.save();
            existingManga.chapters.push(result);
            await existingManga.save()
            return result;
        }
        catch (err){
            throw err;
        }
    },
    readChapter: async({ mangaId, chapterId }) => {
        try {
            const existingManga = await Manga.findById(mangaId);
            if (!existingManga) {
                throw new Error("Manga does not exist");
            }
            const existingChapter = await existingManga.chapters.findById(chapterId);
            if (!existingChapter) {
                throw new Error("Chapter does not exist");
            }
            return existingChapter;
        }
        catch (err) {
            throw err;
        }
    }
}