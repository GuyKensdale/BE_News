const connection = require("../db/connection");

exports.postCommentToId = (id, com) => {
  return connection
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 400, msg: "Invalid article ID!" });
      }
      if (!com.username) {
        return Promise.reject({ status: 400, msg: "Invalid username" });
      }
      if (!com || !com.body) {
        return Promise.reject({
          status: 400,
          msg: "No comment body provided!",
        });
      }
      return connection.query("SELECT * FROM users WHERE username = $1", [
        com.username,
      ]);
    })
    .then((userResult) => {
      if (userResult.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Username does not exist!" });
      }
      return connection.query(
        `INSERT INTO comments (article_id, author, body)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [id, com.username, com.body]
      );
    })
    .then((result) => {
      const comments = result.rows;
      console.log(comments);
      return comments;
    });
};
