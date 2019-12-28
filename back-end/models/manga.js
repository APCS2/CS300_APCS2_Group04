const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mangaSchema = new Schema({
  title: String,
<<<<<<< HEAD
  author: String,
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
=======
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
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
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      rating: Number
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      comment: String
    }
  ]
});

module.exports = mongoose.model("Manga", mangaSchema);
