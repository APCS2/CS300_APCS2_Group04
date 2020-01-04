const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type User {
        _id: ID!
        username: String!
        password: String!
        mail: String
        DOB: String
        gender: String
        favoriteMangas: [Manga!]
        role: String
        uploadedMangas: [Manga!]
    }

    type AuthData {
        userId: ID!
        token: String!
    }

    type Comment {
        creator: User!
        comment: String!
    }

    type Manga {
        _id: ID!
        title: String!
        author: String!
        alias: String!
        image: String!
        categories: [String!]
        description: String!
        lastUpdated: String!
        chapters: [Chapter!]
        comments: [Comment!]
        status: Int!
        uploader: User!
    }

    type Chapter {
        _id: ID!
        index: Int!
        title: String!
        images: [String!]!
        lastUpdated: String!
        uploader: User!
        manga: Manga!
    }

    input UserInput {
        username: String!
        password: String!
    }

    input MangaInput {
        title: String!
        author: String!
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
    
    input CommentInput {
        userId: ID!
        mangaId: ID!
        comment: String!
    }
    
    type CommentSchema {
        user: User
        comment: String!        
    }
    
    input RatingInput{
        userId: ID!
        mangaId: ID!
        rating: Int!
    }

    type RatingSchema{
        userId: ID!
        mangaId: ID!
        rating: Int!
    }

    type RootMutation {
        createUser(userInput: UserInput): User!
        uploadManga(mangaInput: MangaInput): Manga!
        uploadChapter(mangaId: ID, chapterInput: ChapterInput): Chapter!
        comment(CommentInput: CommentInput): CommentSchema!
        rating(RatingInput: RatingInput): RatingSchema!
    }

    type RootQuery {
        login(username: String!, password: String!): AuthData!
        summary(aliasManga: String!): Manga!
        mangas: [Manga!]!
        readChapter(aliasManga: String!, index: Int!): Chapter!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
