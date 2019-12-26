const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true  
    },
    password: {
        type: String,
        //required: true
    },
    DOB: {
        type: Date,
        //required: true
    },
    gender: {
        type: String,
        //required: true
    },
    favoriteMangas: [
        {
            type: Schema.Types.ObjectId,
            ref: "Manga"
        }
    ],
    role: {
        type: String,
        //required: true
    }
})

module.exports = mongoose.model('User', userSchema)