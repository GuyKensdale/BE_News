const { selectTopics } = require("../models/models");

exports.getTopics = (req, res) => {
  const { sort_by } = req.query;
  selectTopics(sort_by).then((topics) => {
    res.status(200).send({ topics: topics });
  });
};
