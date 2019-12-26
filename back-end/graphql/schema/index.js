const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    interface BaseUser {
        _id: ID!
        password: String!
        mail: String
        DOB: String
        gender: String
        favoriteMangas: [Manga!]
        role: String
    }

    type User implements BaseUser {
        _id: ID!
        password: String!
        mail: String
        DOB: String
        gender: String
        favoriteMangas: [Manga!]
        role: String
    }

    type Moderator implements BaseUser {
        _id: ID!
        password: String!
        mail: String
        DOB: String
        gender: String
        favoriteMangas: [Manga!]
        role: String
        uploadedManga: [Manga!]
    }

    type Comment {
        creator: User!
        comment: String!
    }

    type Manga {
        _id: ID!
        title: String!
        alias: String!
        image: String!
        categories: [String!]
        description: String!
        lastUpdated: String!
        chapters: [Chapter!]
        comments: [Comment!]
        status: Int!
    }

    type Chapter {
        _id: ID!
        index: Int!
        title: String!
        images: [String!]!
        lastUpdated: String!
    }

    input UserInput {
        username: String!
        password: String!
    }

    input MangaInput {
        title: String!
        categories: [String!]
        description: String!
        status: Int!
        image: String!
    }

    input ChapterInput {
        title: String!
        index: Int!
        images: [String!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        uploadManga(mangaInput: MangaInput): Manga
        uploadChapter(mangaId: ID, chapterInput: ChapterInput): Chapter
    }

    type RootQuery {
        login(username: String!, password: String!): User!
        summary(mangaId: ID!): Manga!
        mangas: [Manga!]!
        readChapter(mangaId: ID!, chapterId: ID!): Chapter!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)