const authResolver = require('./auth');
const mangaResolver = require('./manga');
const chapterResolver = require('./chapter');

const rootResolver = {
    ...authResolver,
    ...mangaResolver,
    ...chapterResolver
}

module.exports = rootResolver;