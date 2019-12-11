const Employers = require('../models/Employers');
const Unemployers = require('../models/Unemployers.js');

module.exports = {
  async store(req, res) {
    const { user, type } = req.headers;
    const { empId } = req.params;

    const userId = await Unemployers.findById(user);
    const emId = await Employers.findById(empId);


    if (!emId) {
      return res.status(400).json({error: 'Employer não encontrado'})
    }


    if (emId.received.indexOf(user) != -1) {
      return res.status(400).json({error: 'Curriculo já enviado'})
    }


    if (type === 'accept') {
    emId.received.push(userId._id);
    }


    userId.send.push(emId._id)
    await emId.save();
    await userId.save();

    return res.json(emId)
  }
};
