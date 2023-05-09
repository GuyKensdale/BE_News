const connection = require("../db/connection");

// const greenList = {costauction etc}

exports.selectTopics = () => {
  return connection.query(`SELECT * FROM topics`).then((result) => {
    const outputs = result.rows;
    return outputs;
  });
};
