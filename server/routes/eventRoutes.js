const express = require("express");
const eventRoutes = express.Router();
const Event = require("../models/event");

eventRoutes.route("/")
  .get((req, res) => {
    Event.find((err, events) => {
      if(err) return res.status(500).send(err);
      res.send(events);
    })
  })
  .post((req, res) => {
    const newEvent = new Event(req.body);
    newEvent.save(err => {
      if(err) return res.status(500).send(err);
      res.send(newEvent);
    })
  })

eventRoutes.route("/:id")
  .delete((req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, event) => {
      if(err) return res.status(500).send(err);
      res.send(event);
    })
  })

module.exports = eventRoutes;
