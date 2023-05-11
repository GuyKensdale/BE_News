const connection = require("../db/connection");
exports.selectAllArticles = () => {
  return connection.query(`SELECT * FROM articles`).then((result) => {
    const outputs = result.rows;
    return outputs;
  });
};
