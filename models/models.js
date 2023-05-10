const connection = require("../db/connection");

// const greenList = {costauction etc}

exports.selectTopics = () => {
  return connection.query(`SELECT * FROM topics`).then((result) => {
    const outputs = result.rows;
    return outputs;
  });
};

exports.selectArticles = (id) => {
  if (!id) {
    return connection.query(`SELECT * FROM articles`).then((result) => {
      const outputs = result.rows;
      return outputs;
    });
  } else {
    return connection
      .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
      .then((result) => {
        const outputs = result.rows;
        if (outputs.length === 0) {
          return Promise.reject({ status: 404, msg: `No such article !` });
        }
        return outputs;
      });
  }
};
