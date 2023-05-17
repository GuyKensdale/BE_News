const connection = require("../db/connection");

exports.postNewVotes = (articleId, newVote) => {
  if (typeof newVote !== "number") {
    return Promise.reject({ status: 400, msg: "Invalid inc_votes value" });
  }

  return connection
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
      [newVote, articleId]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      const updatedArticle = result.rows[0];
      return updatedArticle;
    });
};
