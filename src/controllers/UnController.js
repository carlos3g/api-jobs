const Unemployers = require('../models/Unemployers');

module.exports = {
  async index(req, res) {
    const uns = await Unemployers.find();
    return res.json(uns);
  },

  async show(req, res) {
    const { unId } = req.headers;
    const un = await Unemployers.findById(unId);
    return res.json(un)
  },

  async store(req, res) {
    const { email, age, name, pass, skills, cur } = req.headers;

    const userExists = await Unemployers.findOne({email: email});

    if (userExists) {
      return res.json(userExists)
    };

    await Unemployers.create({
      email: email,
      age: age,
      name: name,
      pass: pass,
      skills: skills,
      cur: cur,
      notifications: [],
      send: []
    });

    const user = await Unemployers.findOne({email: email});

    return res.json(user);
  }
}
