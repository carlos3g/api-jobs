const EmployersModel = require('../models/Employers');
const UnemployedsModel = require('../models/Unemployeds');

module.exports = {
  async store(req, res) {
    const { user, type } = req.headers;
    const { empId } = req.params;

    const unemployed = await UnemployedsModel.findById(user);
    const employer = await EmployersModel.findById(empId);

    if (!employer) {
      return res.status(400).json({ error: 'Employer não encontrado' });
    }

    if (employer.received.indexOf(user) != -1) {
      return res.status(400).json({ error: 'Curriculo já enviado' });
    }

    if (type === 'accept') {
      employer.received.push(unemployed._id);
    }

    unemployed.send.push(employer._id);
    await employer.save();
    await unemployed.save();

    return res.json(employer);
  },
};
