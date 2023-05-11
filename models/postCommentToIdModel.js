const connection = require("../db/connection");
exports.postCommentToId = (id, com) => {
  return connection
    .query(
      `INSERT INTO comments (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [id, com.author, com.body]
    )
    .then((result) => {
      const comments = result.rows;
      return comments;
    });
};
