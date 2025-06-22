const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expire_at: { type: Date, default: Date.now, expires: 86400 },
});
tokenSchema.index({ token: 1 }, { unique: true });
const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
