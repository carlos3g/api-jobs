const UnemployedsModel = require('../models/Unemployeds');

module.exports = {
  async show(req, res) {
    const { id } = req.headers;

    const unemployed = await UnemployedsModel.findById(id).catch(() => {
      return res.status(404).json({ error: 'Unemployed não encontrado' });
    });

    const notifications = unemployed.notifications;

    return res.json(notifications);
  },
};
