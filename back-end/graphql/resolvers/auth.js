const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({
        username: args.userInput.username
      });
      if (existingUser) {
        throw new Error("User exists already");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        username: args.userInput.username,
        password: hashedPassword
      });
      const result = await user.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
  login: async args => {
    try {
      const existingUsername = await User.findOne({ username: args.username });
      if (!existingUsername) {
        throw new Error("Username not exist");
      }
      const isPasswordRight = await bcrypt.compareSync(
        args.password,
        existingUsername.password
      );
      if (!isPasswordRight) {
        throw new Error("Wrong password");
      }
      const token = jwt.sign({ userId: user.id, email: user.email });
    } catch (err) {
      throw err;
    }
  }
};
