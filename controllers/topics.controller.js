const { selectTopics } = require("../models/selectTopicsModel");

exports.getTopics = (req, res) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
