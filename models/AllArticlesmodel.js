const connection = require("../db/connection");

exports.selectAllArticles = () => {
  const query = `
    SELECT
      articles.*,
      COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC
  `;
  return connection.query(query).then((result) => {
    const outputs = result.rows;
    return outputs;
  });
};
