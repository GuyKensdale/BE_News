const connection = require("../db/connection");
exports.postCommentToId = (id, com) => {
  if (!id) {
    return Promise.reject({ status: 400, msg: `No such article !` });
  }
  return connection
    .query(
      `INSERT INTO comments (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [id, com.username, com.body]
    )
    .then((result) => {
      const comments = result.rows;
      console.log(comments);
      return comments;
    });
};
