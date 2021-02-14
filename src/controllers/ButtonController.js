const Employers = require('../models/Employers');
const Unemployers = require('../models/Unemployers.js');

module.exports = {
  async store(req, res) {
    const { unId, empId, type } = req.body;

    const emp = await Employers.findById(empId);
    const un = await Unemployers.findById(unId);
    const index = emp.received.indexOf(unId);

    emp.received.splice(index, 1);

    if (type === 'accept') {
      un.notifications.push(
        `Seu curriculo foi aceito na empresa ${emp.name}.\nVerifique seu email`
      );
    } else if (type === 'cancel') {
      un.notifications.push(
        `Seu curriculo não foi aceito na empresa ${emp.name}`
      );
    }

    await emp.save();
    await un.save();

    return res.json(emp);
  },
};
