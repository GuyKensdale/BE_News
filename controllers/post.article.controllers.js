const { postCommentToId } = require("../models/postCommentToIdModel");
exports.postComments = (req, res, next) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const objId = req.params;
    const id = objId.article_id;
    const com = JSON.parse(body);
    console.log(com);
    postCommentToId(id, com)
      .then((comment) => {
        res.status(201).send({ comment });
      })
      .catch(next);
  });
};
