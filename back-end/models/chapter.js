const mongoose = require("mongoose")

const Schema = mongoose.Schema

const chapterSchema = new Schema({
    title: String,
    index: Number,
    images: [String],
    lastUpdated: String
})

module.exports = mongoose.model('Chapter', chapterSchema)