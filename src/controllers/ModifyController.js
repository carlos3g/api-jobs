const UnemployedsModel = require('../models/Unemployers');

module.exports = {
  async store(req, res) {
    const { email, age, name, pass, skills, cur } = req.headers;

    const unemployed = await UnemployedsModel.findOne({ email: email });

    unemployed.email = email;
    unemployed.age = age;
    unemployed.name = name;
    unemployed.pass = pass;
    unemployed.skills = skills;
    unemployed.cur = cur;

    unemployed.save();

    return res.json(unemployed);
  },
};
