const { deleteCommentModel } = require("../models/deleteCommentsModel");

exports.deleteCommentsController = (req, res, next) => {
  const objId = req.params;
  const id = objId.comment_id;
  deleteCommentModel(id)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
