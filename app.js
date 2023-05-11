const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticlesById,
  getComments,
  getAllArticles,
} = require("./controllers/get.article.controllers");

const endPoints = require("./endpoints.json");

app.get("/api", (req, res) => {
  res.json(endPoints);
});
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticlesById);

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
