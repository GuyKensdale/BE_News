const { selectArticles } = require("../models/models");

exports.getArticles = (req, res, next) => {
  const objId = req.params;
  const id = objId.article_id;
  selectArticles(id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
