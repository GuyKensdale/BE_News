const connection = require("../db/connection");
exports.selectArticleById = (id, endpoint = null) => {
  return connection
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then((result) => {
      const outputs = result.rows;
      if (outputs.length === 0) {
        return Promise.reject({ status: 404, msg: `No such article !` });
      }

      return outputs;
    });
};
