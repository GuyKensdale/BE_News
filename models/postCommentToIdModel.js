const connection = require("../db/connection");
exports.postCommentToId = (id, com) => {
  console.log(com.username);
  return connection
    .query(
      `INSERT INTO comments (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [id, com.username, com.body]
    )
    .then((result) => {
      const comments = result.rows;
      return comments;
    });
};
