const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  mail: String,
  firstName: String,
  lastName: String,
  password: String,
<<<<<<< HEAD
  DOB: Date,
  gender: String,
=======
  DOB: {
    type: Date
    //required: true
  },
  gender: {
    type: String
    //required: true
  },
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
  favoriteMangas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manga"
    }
  ],
<<<<<<< HEAD
  uploadedMangas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manga"
    }
  ],
  role: String
=======
  role: {
    type: String
    //required: true
  }
>>>>>>> 335ea704ad7f0aafbb9d221be180771deb926053
});

module.exports = mongoose.model("User", userSchema);
