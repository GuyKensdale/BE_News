const connection = require("../db/connection");

exports.selectTopics = () => {
  return connection
    .query(`SELECT * FROM topics`)
    .then((result) => {
      const outputs = result.rows;
      return outputs;
    })
    .catch((err) => {
      console.log(err);
    });
};
