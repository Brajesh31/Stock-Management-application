const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User is required."],
  },
  itemName: {
    type: String,
    unique: true,
    required: [true, "Item name is required."],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  manufacturingCompany: {
    type: String,
    required: [true, "Manufacturing company is required."],
  },
});
itemSchema.index({ itemName: 1, User: 1 }, { unique: true });

module.exports = mongoose.model("items", itemSchema);
