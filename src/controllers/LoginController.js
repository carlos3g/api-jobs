const EmployersModel = require('../models/Employers');
const UnemployedsModel = require('../models/Unemployers');

module.exports = {
  async show(req, res) {
    const { email, type } = req.headers;

    if (type === 'em') {
      const employer = await EmployersModel.findOne({ email: email }).catch(() => {
        console.log(`Erro ao logar Empresa`);
      });
      console.log('Empresa logada');
      return res.json(employer);
    } else {
      // loga o un
      const unemployed = await UnemployedsModel.findOne({ email: email }).catch(() => {
        console.log(`Erro ao logar Desempregado`);
      });
      console.log('Desempregado logado');
      return res.json(unemployed);
    }
  },
};
