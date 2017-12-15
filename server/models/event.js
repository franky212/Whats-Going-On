const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: String,
  address: String,
  url: String,
  description: String
});

module.exports = mongoose.model("event", eventSchema);
