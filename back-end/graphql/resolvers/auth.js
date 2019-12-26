const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ username: args.userInput.username })
            if (existingUser) {
                throw new Error("User exists already");
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                username: args.userInput.username,
                password: hashedPassword
            })
            const result = await user.save();
            return { ...result._doc, password: null, _id: result.id }
        }
        catch (err) {
            throw err;
        }
    }
} 