const EmployersModel = require('../models/Employers');
const UnemployedsModel = require('../models/Unemployeds');

module.exports = {
  async show(req, res) {
    const { email, type } = req.headers;

    if (type === 'em') {
      const employer = await EmployersModel.findOne({ email: email }).catch(() => {
        return res.status(404).json({ error: 'Employer não encontrado' });
      });
      return res.json(employer);
    } else {
      // loga o un
      const unemployed = await UnemployedsModel.findOne({ email: email }).catch(() => {
        return res.status(404).json({ error: 'Unemployed não encontrado' });
      });
      return res.json(unemployed);
    }
  },
};
