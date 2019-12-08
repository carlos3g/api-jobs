const Unemployers = require('../models/Unemployers');

module.exports = {
  async store(req, res) {

    const { email, age, name, pass, skills, cur } = req.headers;

    const user = await Unemployers.findOne({email: email});

    user.email = email;
    user.age = age;
    user.name = name;
    user.pass = pass;
    user.skills = skills;
    user.cur = cur;

    user.save()

    return res.json(user)
  }
}
