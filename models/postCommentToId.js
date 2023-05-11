const connection = require("../db/connection");
exports.postCommentToId = (id, com) => {
  return connection
    .query(`INSERT INTO comments WHERE VALUES $2`, [com])
    .then((result) => {
      const comments = result.rows;
      return comments;
    });
};
