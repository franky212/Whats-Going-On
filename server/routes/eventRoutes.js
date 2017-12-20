const express = require("express");
const favoriteRoutes = express.Router();
const Favorite = require("../models/event");

favoriteRoutes.route("/")
  .get((req, res) => {
    Favorite.find((err, events) => {
      if(err) return res.status(500).send(err);
      res.send(events);
    })
  })
  .post((req, res) => {
    const newFavorite = new Favorite(req.body);
    newFavorite.save(err => {
      if(err) return res.status(500).send(err);
      res.send(newFavorite);
    })
  })

favoriteRoutes.route("/:id")
  .delete((req, res) => {
    Favorite.findByIdAndRemove(req.params.id, (err, event) => {
      if(err) return res.status(500).send(err);
      res.send(event);
    })
  })

module.exports = favoriteRoutes;
