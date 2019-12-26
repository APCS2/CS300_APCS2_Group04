const mongoose = require("mongoose")

const Schema = mongoose.Schema

const mangaSchema = new Schema({
    title: String,
    alias: String,
    categories: [String],
    description: String,
    image: String,
    lastUpdated: String,
    chapters: [
        {
            type: Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ],
    rating: Number,
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            cmt: String
        }
    ]
})

module.exports = mongoose.model('Manga', mangaSchema)