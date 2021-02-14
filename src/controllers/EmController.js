const EmployersModel = require('../models/Employers');

module.exports = {
  async index(req, res) {
    const employers = await EmployersModel.find();
    return res.json(employers);
  },
  async store(req, res) {
    const { email, name, pass, search } = req.body;

    const employer = await EmployersModel.findOne({ email: email });

    if (employer) {
      return res.json(employer);
    }

    await EmployersModel.create({
      email: email,
      name: name,
      pass: pass,
      search: search,
      received: [],
    });

    const newEmployer = await EmployersModel.findOne({ email: email });

    return res.json(newEmployer);
  },
};
