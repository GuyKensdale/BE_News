const { selectAllArticles } = require("../models/AllArticlesmodel");
const { selectArticleById } = require("../models/articleByIdModel");
const { selectArticlesComments } = require("../models/articleCommentsModel");
exports.getArticlesById = (req, res, next) => {
  const objId = req.params;
  const id = objId.article_id;
  selectArticleById(id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
exports.getAllArticles = (req, res, next) => {
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
exports.getComments = (req, res, next) => {
  const objId = req.params;
  const id = objId.article_id;

  selectArticlesComments(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComments = (req, res, next) => {};
