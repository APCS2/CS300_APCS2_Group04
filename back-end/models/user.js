const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  mail: String,
  firstName: String,
  lastName: String,
  password: String,
  DOB: Date,
  gender: String,
  favoriteMangas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manga"
    }
  ],
  uploadedMangas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manga"
    }
  ],
  role: String
});

module.exports = mongoose.model("User", userSchema);
