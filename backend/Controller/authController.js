const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenModel = require("../models/token");

const signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res
              .status(400)
              .send({ success: false, error: "Passwords does not match" });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userName: user.username,
            },
            "secret",
            {
              expiresIn: "24h",
            }
          );
          tokenModel({ token: token }).save();
          res.status(200).send({
            success: true,
            message: "Login Successful",
            email: user.email,
            token: token,
          });
        })
        .catch((error) => {
          res
            .status(400)
            .send({ success: false, message: "Passwords does not match" });
        });
    })
    .catch((e) => {
      res.status(400).send({ success: false, message: "Email not found" });
    });
};

const signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  const { name, email, password, username } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send({
            success: true,
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          const { message } = error;
          res.status(500).send({ success: false, message: message });
        });
    })
    .catch((e) => {
      res.status(500).send({
        success: false,
        message: "Error !",
      });
    });
};
const logOut = async (req, res) => {
  const errors = validationResult(req);
  const { token } = req.body;
  const matchQuery = await tokenModel.findOne({ token: token });
  if (!errors.isEmpty()) {
    res.status(500).send({ success: false, message: "UnAuthorized Access" });
  } else if (matchQuery == null) {
    res.status(500).send({ success: false, message: "Session Time Out" });
  } else {
    try {
      const result = await tokenModel.deleteOne({ token: token });
      res.status(200).send({
        message: "Logged Out Successfully",
        result,
      });
    } catch {
      res.status(500).send({
        message: "Server Error !",
      });
    }
  }
};
module.exports = { signUp, signIn, logOut };
