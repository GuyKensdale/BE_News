const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const endPoints = require("./endpoints.json");
app.get("/api/topics", getTopics);
app.get("/api", (req, res) => {
  res.json(endPoints);
});

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});
module.exports = app;
