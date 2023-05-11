const { postCommentToId } = require("../models/postCommentToIdModel");
exports.postComments = (req, res, next) => {
  const objId = req.params;
  const id = objId.article_id;
  const com = req;
  console.log(com);
  postCommentToId(id, com)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
