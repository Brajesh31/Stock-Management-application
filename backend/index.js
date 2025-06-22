const connectToMongo = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/stock", require("./routes/stockRoutes"));
app.use("/auth", require("./routes/authRoutes"));
module.exports = app.listen(5000, () => {
  console.log("server started at port 5000");
});
