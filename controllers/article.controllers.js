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
exports.getComments = (req, res, next) => {
  const objId = req.params;
  const id = objId.article_id;
  const endpoint = "/comments";

  selectArticles(id, endpoint)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

// exports.getComments = (req, res, next) => {
//   const objId = req.params;
//   const id = objId.article_id;
//   const endpoint = "/comments"; // set endpoint to "/comments"

//   selectArticles(id, endpoint) // pass endpoint as second argument
//     .then((comments) => {
//       res.status(200).send({ comments });
//     })
//     .catch(next);
// };
