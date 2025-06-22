const express = require("express");
const { verifyToken } = require("../authenticationMiddleware");
const { body } = require("express-validator");
const router = express.Router();
const stockController = require("../Controller/stockController");
router.get("/allItem", verifyToken, stockController.getAllStock);
router.get("/getOneItem/:id", verifyToken, stockController.getOneItem);
router.delete("/deleteItem/:id", verifyToken, stockController.deleteItem);
router.get("/getUserData/", verifyToken, stockController.getUserData);
router.put(
  "/modifyItem/:id",
  [
    body("itemName", "Enter the valid name")
      .isLength({ min: 3 })
      .escape()
      .trim(),
    body("quantity", "Enter the valid quantity")
      .isInt({ min: 0 })
      .escape()
      .trim(),
    body("price", "Enter the valid price").isInt({ min: 1 }).escape().trim(),
    body("date", "Date is invalid").custom((value) => {
      let enteredDate = new Date(value);
      let todaysDate = new Date();
      if (enteredDate < todaysDate) {
        return true;
      }
      throw new Error("Date is required and cannot be invalid");
    }),
  ],
  verifyToken,
  stockController.modifyItem
);
router.post(
  "/addItem",
  [
    body("itemName", "Enter the valid name")
      .isLength({ min: 3 })
      .escape()
      .trim(),
    body("quantity", "Enter the valid quantity")
      .isInt({ min: 0 })
      .escape()
      .trim(),
    body("price", "Enter the valid price").isInt({ min: 1 }).escape().trim(),
    body("date", "Date is invalid").custom((value) => {
      let enteredDate = new Date(value);
      let todaysDate = new Date();
      if (enteredDate > todaysDate) {
        throw new Error("Invalid Date");
      }
      return true;
    }),
  ],
  verifyToken,
  stockController.additem
);

module.exports = router;
