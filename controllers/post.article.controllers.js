exports.postComments = (req, res, next) => {
  const objId = req.params;
  const id = objId.article_id;
  postCommentToId(id, com).then((comment) => {
    res.status(200).send({ comment });
  });
  .catch(next);
};

// POST /api/articles/:article_id/comments
