const UnemployedsModel = require('../models/Unemployers');

module.exports = {
  async index(req, res) {
    const unemployeds = await UnemployedsModel.find();
    return res.json(unemployeds);
  },

  async show(req, res) {
    const { unId } = req.headers;
    const unemployed = await UnemployedsModel.findOne({ _id: unId });
    return res.json(unemployed);
  },

  async store(req, res) {
    const { email, age, name, pass, skills, cur } = req.headers;

    const unemployed = await UnemployedsModel.findOne({ email: email });

    if (unemployed) {
      return res.json(unemployed);
    }

    await UnemployedsModel.create({
      email: email,
      age: age,
      name: name,
      pass: pass,
      skills: skills,
      cur: cur,
      notifications: [],
      send: [],
    });

    const newUnemployed = await UnemployedsModel.findOne({ email: email });

    return res.json(newUnemployed);
  },
};
