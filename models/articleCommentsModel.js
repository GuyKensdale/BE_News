const connection = require("../db/connection");
exports.selectArticlesComments = (id) => {
  if (isNaN(id)) {
    return Promise.reject({ status: 400, msg: "Invalid article_id" });
  }
  return connection
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((result) => {
      // Check if article exists
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }

      return connection.query("SELECT * FROM comments WHERE article_id = $1", [
        id,
      ]);
    })
    .then((result) => {
      const comments = result.rows;
      return comments;
    });
};
