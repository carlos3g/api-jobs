const EmployersModel = require('../models/Employers');
const UnemployedsModel = require('../models/Unemployers');

module.exports = {
  async store(req, res) {
    const { unId, empId, type } = req.body;

    const employer = await EmployersModel.findById(empId);
    const unemployed = await UnemployedsModel.findById(unId);
    const index = employer.received.indexOf(unId);

    employer.received.splice(index, 1);

    if (type === 'accept') {
      unemployed.notifications.push(
        `Seu curriculo foi aceito na empresa ${employer.name}.\nVerifique seu email`
      );
    } else if (type === 'cancel') {
      unemployed.notifications.push(
        `Seu curriculo não foi aceito na empresa ${employer.name}`
      );
    }

    await employer.save();
    await unemployed.save();

    return res.json(employer);
  },
};
