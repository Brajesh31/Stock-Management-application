const mongoose = require("mongoose");
const connectToMongo = async () =>
  mongoose
    .connect("mongodb://127.0.0.1:27017/Stock_App")
    .then(() => console.log("DB CONNECTED!"))
    .catch((err) => console.log(err));
module.exports = connectToMongo;
