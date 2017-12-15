const express = require("express");
const eventRoutes = express.Router();
const event = require("../models/event");

eventRoutes.route("/")
  .get((req, res) => {
    event.find((err, events) => {
      if(err) return res.status(500).send(err);
      res.send(events);
    })
  })

module.exports = eventRoutes;
