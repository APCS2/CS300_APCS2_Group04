const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  mail: String,
  firstName: String,
  lastName: String,
  password: String,
  DOB: {
    type: Date
    //required: true
  },
  gender: {
    type: String
    //required: true
  },
  favoriteMangas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manga"
    }
  ],
  role: {
    type: String
    //required: true
  }
});

module.exports = mongoose.model("User", userSchema);
