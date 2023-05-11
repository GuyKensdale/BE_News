const connection = require("../db/connection");
exports.selectArticlesComments = (id, endpoint = null) => {
  if (endpoint === "/comments") {
    return connection
      .query(`SELECT * FROM comments WHERE article_id = $1`, [id])
      .then((result) => {
        const comments = result.rows;
        return comments;
      });
  }
  return outputs;
};
