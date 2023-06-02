const connection = require("../db/connection");
exports.deleteCommentModel = (id, endpoint = null) => {
  return connection
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [id])
    .then((result) => {
      const outputs = result.rows;

      if (outputs.length === 0) {
        return Promise.reject({ status: 404, msg: `Comment not found` });
      }

      return outputs;
    });
};
