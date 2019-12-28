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
<<<<<<< HEAD
        uploadedMangas: [Manga!]
    }

    type AuthData {
        userId: ID!
        token: String!
=======
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
    }

    type Comment {
        creator: User!
        comment: String!
    }

    type Manga {
        _id: ID!
        title: String!
<<<<<<< HEAD
        author: String!
=======
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
        alias: String!
        image: String!
        categories: [String!]
        description: String!
        lastUpdated: String!
        chapters: [Chapter!]
        comments: [Comment!]
        status: Int!
<<<<<<< HEAD
        uploader: User!
=======
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
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
<<<<<<< HEAD
        author: String!
=======
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
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
<<<<<<< HEAD
        createUser(userInput: UserInput): User!
        uploadManga(mangaInput: MangaInput): Manga!
        uploadChapter(mangaId: ID, chapterInput: ChapterInput): Chapter!
        comment(CommentInput: CommentInput): CommentSchema!
        rating(RatingInput: RatingInput): RatingSchema!
    }

    type RootQuery {
        login(username: String!, password: String!): AuthData!
=======
        createUser(userInput: UserInput): User
        uploadManga(mangaInput: MangaInput): Manga
        uploadChapter(mangaId: ID, chapterInput: ChapterInput): Chapter
        comment(CommentInput: CommentInput): CommentSchema
        rating(RatingInput: RatingInput): RatingSchema
    }

    type RootQuery {
        login(username: String!, password: String!): User!
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
        summary(mangaId: ID!): Manga!
        mangas: [Manga!]!
        readChapter(mangaId: ID!, chapterId: ID!): Chapter!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
