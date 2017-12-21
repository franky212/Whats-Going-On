const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: String,
  name: String,
  date: String,
  address: {
    name: String,
    location: {
      lat: Number,
      lng: Number
    }
  },
  url: String,
  imgUrl: String
});

module.exports = mongoose.model("event", eventSchema);
