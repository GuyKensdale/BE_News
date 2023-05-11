const connection = require("../db/connection");

exports.selectTopics = () => {
  console.log("hello!!!!!<<");

  return connection
    .query(`SELECT * FROM topics`)
    .then((result) => {
      console.log("inside topics control");
      const outputs = result.rows;
      return outputs;
    })
    .catch((err) => {
      console.log(err);
    });
};
