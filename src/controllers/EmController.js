const Employers = require('../models/Employers');

module.exports = {
  async index(req, res) {
    const emps = await Employers.find()
    return res.json(emps);
  },
  async store(req, res) {
    const { email, name, pass, search } = req.body;

    const userExists = await Employers.findOne({email: email});

    if (userExists) {
      return res.json(userExists)
    }


    await Employers.create({
      email: email,
      name: name,
      pass: pass,
      search: search,
      received: []
    });

    const user = await Employers.findOne({email: email});

    return res.json(user);
  }
}
