const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: String,
  address: {
    name: String,
    location: {
      lat: Number,
      lng: Number
    }
  },
  url: String
});

module.exports = mongoose.model("event", eventSchema);
