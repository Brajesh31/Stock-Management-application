const { json } = require("express");
const Item = require("../models/Items");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const getAllStock = async (req, res) => {
  try {
    const { userId } = req;
    const allProducts = await Item.find({ User: userId }).populate("User");
    res.status(200).json({ allProducts, success: true });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
};
const getOneItem = async (req, res) => {
  const id = req.params["id"];
  try {
    const { userId } = req;
    const oneProduct = await Item.findOne({ _id: id, User: userId }).populate(
      "User"
    );
    if (oneProduct == null) {
      return res.status(400).json({
        success: false,
        message: "Bad request",
      });
    } else {
      res.status(200).json({ oneProduct, success: true });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
};
const modifyItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
  const id = req.params["id"];
  const matchQuery = await Item.findOne({ _id: id });
  const { itemName, quantity, price, description, date, manufacturingCompany } =
    req.body;
  if (matchQuery == null) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  } else {
    const newvalues = {
      $set: {
        itemName: itemName,
        quantity: quantity,
        price: price,
        description: description,
        date: date,
        manufacturingCompany: manufacturingCompany,
      },
    };
    try {
      await Item.updateOne({ _id: id }, newvalues);
      res
        .status(200)
        .json({ updatedData: await Item.findOne({ _id: id }), success: true });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({
          success: false,
          message: "Item Name should be unique",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Bad request",
        });
      }
    }
  }
};
const deleteItem = async (req, res) => {
  const id = req.params["id"];
  const matchQuery = await Item.findOne({ _id: id });
  if (matchQuery == null) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  } else {
    try {
      const result = await Item.deleteOne({ _id: id });
      res
        .status(200)
        .send({ success: true, id: id, message: "Item successfully deleted!" });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Bad request",
      });
    }
  }
};
const additem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
  const { itemName, quantity, price, description, date, manufacturingCompany } =
    req.body;
  const { userId } = req;
  const newItem = new Item({
    itemName: itemName,
    quantity: quantity,
    price: price,
    User: userId,
    description: description,
    date: date,
    manufacturingCompany: manufacturingCompany,
  });
  newItem
    .save()
    .then((item) => {
      res.status(200).json({ item, success: true });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(400).json({
          success: false,
          message: "Item Name should be unique",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Bad request",
        });
      }
    });
};

const getUserData = async (req, res) => {
  const { userName } = req;
  try {
    const userData = await User.findOne({ username: userName }).select(
      "-password -_id"
    );
    res.status(200).json({ userData, success: true });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Bad request",
    });
  }
};
module.exports = {
  getAllStock,
  deleteItem,
  additem,
  getOneItem,
  modifyItem,
  getUserData,
};
