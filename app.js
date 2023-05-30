const express = require("express");
const app = express();
const cors = require("cors");
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticlesById,
  getComments,
  getAllArticles,
} = require("./controllers/get.article.controllers");
const {
  postComments,
  updateArticleVotes,
} = require("./controllers/post.article.controllers");

const endPoints = require("./endpoints.json");

app.get("/api", (req, res) => {
  res.json(endPoints);
});
app.get("/api/topics", getTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles/:article_id/comments", getComments);
app.post("/api/articles/:article_id/comments", postComments);
app.use(express.json());
app.patch("/api/articles/:article_id", updateArticleVotes);
app.use(cors());
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not Found" });
});
module.exports = app;

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: err.message || "Bad Request" });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});
