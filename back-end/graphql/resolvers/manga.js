const Manga = require('../../models/manga');

const convertToSlug = async(title) => {
    return title.toLowerCase()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
}

module.exports = {
    summary: async({ mangaId }) => {
        try {
            const manga = await Manga.findById(mangaId);
            if (!manga) {
                throw new Error("Manga does not exist");
            }
            return manga;
        }
        catch (err) {
            throw err;
        }
    },
    uploadManga:  async({ mangaInput }) => {
        try {
            let alias = await convertToSlug(mangaInput.title);
            const existingManga = await Manga.findOne({ alias: alias });
            if (existingManga) {
                throw new Error("Manga exists already")
            }
            const manga = new Manga({
                title: mangaInput.title,
                categories: [...mangaInput.categories],
                description: mangaInput.description,
                status: mangaInput.status,
                image: mangaInput.image,
                lastUpdated: new Date().toLocaleString(),
                alias: await convertToSlug(alias)
            })
            let result = manga.save();
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    // Todo: comment, rating
}
