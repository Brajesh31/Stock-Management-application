const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  try {
    const existingUser = await this.constructor.findOne({
      username: this.username,
    });

    if (existingUser) {
      const error = new Error("Username already exists");
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model("user", userSchema);
User.createIndexes({ username: 1 }, { unique: true });

module.exports = User;
