const { postCommentToId } = require("../models/postCommentToIdModel");
const { postNewVotes } = require("../models/postNewVotesModel");
exports.postComments = (req, res, next) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const objId = req.params;
    const id = objId.article_id;
    const com = JSON.parse(body);
    postCommentToId(id, com)
      .then((comment) => {
        res.status(201).send({ comment });
      })
      .catch(next);
  });
};

exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  postNewVotes(article_id, inc_votes)
    .then((article) => {
      res.status(200).json({ article });
    })
    .catch(next);
};
