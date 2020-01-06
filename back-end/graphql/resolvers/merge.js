const dataLoader = require("dataloader")
const btoa = require('btoa')

const Manga = require('../../models/manga');
const User = require('../../models/user');
const Chapter = require('../../models/chapter');

const mangaLoader = new dataLoader((mangaIds) => {
    return mangas(mangaIds);
})

const path = "./Manga/"

const chapterLoader = new dataLoader((chapterIds) => {
    return chapters(chapterIds)
})

const userLoader = new dataLoader((userIds) => {
    return User.find({_id: {$in: userIds}})
})

const chapters = async chapterIds => {
    try {
        const chapters = await Chapter.find({
            _id: {
                $in: chapterIds
            }
        })
        console.log(chapters)
        chapters.sort((a, b) => {
            return chapters.indexOf(+a.index) - chapters.indexOf(+b.index);
        });
        return chapters.map(chapter => {
            return transformChapter(chapter)
        })
    }
    catch (err) {
        throw err;
    }
}

const mangas = async mangaIds => {
    try {
        const mangas = await Manga.find({
            _id: {
                $in: mangaIds
            }
        })

        mangas.sort((a, b) => {
            return mangaIds.indexOf(a._id.toString()) - mangaIds.indexOf(b._id.toString())
        })

        return mangas.map(manga => {
            return transformManga(manga)
        })
    }
    catch (err) {
        throw err;
    }
}

const singleManga = async mangaId => {
    try {
        const manga = await Manga.findById(mangaId);
        return {
            ...manga._doc,
            id: manga.id,
            title: manga._doc.title,
            chapters: () => chapterLoader.loadMany.bind(manga._doc.chapters)
        }
    }
    catch (err) {
        throw err
    }
}

const singleChapter = async chapterId => {
    try {
        const chapter = await chapterLoader.load(chapterId);
        return chapter;
    }
    catch (err) {
        throw err
    }
}

const user = async userId => {
    
    try {
        const user = await userLoader.load(userId.toString())
        return {
            ...user._doc,
            _id: user.id,
            username: user._doc.username,
            mail: user._doc.mail,
            firstName: user._doc.firstName,
            lastName: user._doc.lastName,
            password: user._doc.password,
            DOB: user._doc.DOB,
            gender: user._doc.gender,
            favoriteMangas: mangas.bind(this, ...user._doc.favoriteMangas),
            uploadedMangas: mangas.bind(this, ...user._doc.uploadedMangas),
            role: user._doc.role
        }
    }
    catch (err){
        throw err
    }
}

const transformChapter = chapter => {
    return {
        ...chapter._doc,
        _id: chapter.id,
        title: chapter._doc.title,
        index: chapter._doc.index,
        images: chapter._doc.images,
        uploader: user.bind(this, chapter.uploader),
        manga: singleManga.bind(this, chapter.manga),
        lastUpdated: chapter._doc.lastUpdated
    }
}

const transformManga = manga => {
    return {
        ...manga._doc,
        _id: manga.id,
        uploader: user.bind(this, manga.uploader),
        title: manga._doc.title,
        author: manga._doc.author,
        alias: manga._doc.alias,
        categories: manga._doc.categories,
        description: manga._doc.description,
        image: manga._doc.image,
        lastUpdated: manga._doc.lastUpdated,
        img: manga._doc.img,
        chapters: chapters.bind(this, ...manga.chapters)
    }
}

arrayBufferToBase64 = async (buffer) => {
    var binary = '';
    var bytes = await [].slice.call(new Uint8Array(buffer));
  
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary)
}

exports.transformChapter = transformChapter;
exports.transformManga = transformManga;
exports.arrayBufferToBase64 = arrayBufferToBase64;
exports.path = path