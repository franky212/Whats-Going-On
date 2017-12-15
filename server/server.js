const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/events", {useMongoClient: true});

app.use("/events", require("./routes/eventRoutes"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
