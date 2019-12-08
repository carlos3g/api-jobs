const Employers = require('../models/Employers');
const Unemployeds = require('../models/Unemployers.js');


module.exports = {
  async store(req, res) {
    const { unId, empId, type } = req.body;

    const emp = await Employers.findById(empId);
    const un = await Unemployeds.findById(unId);
    const index = emp.received.indexOf(unId);


    if (type === "accept") {
      emp.received.splice(index, 1)
      un.notifications.push(`Você foi aceito na empresa ${emp.name}`)
    }

    else if (type === "cancel") {
      emp.received.splice(index, 1)
      un.notifications.push(`Você não foi aceito na empresa ${emp.name}`)
    }


    await emp.save();
    await un.save()

    return res.json(emp)
  }
};
