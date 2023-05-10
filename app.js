const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const { getArticles } = require("./controllers/article.controllers");
const endPoints = require("./endpoints.json");

app.get("/api", (req, res) => {
  res.json(endPoints);
});
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticles);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});
module.exports = app;

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

//catch block
//500 status code err for anything not covered
