const mongoose = require("mongoose")

const Schema = mongoose.Schema

const chapterSchema = new Schema(
    {
        title: String,
        index: Number,
        images: [
            {
                path: String,
                src: String
            }
        ],
        lastUpdated: String,
        manga: {
            type: Schema.Types.ObjectId,
            ref: "Manga"
        },
        uploader: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Chapter', chapterSchema)