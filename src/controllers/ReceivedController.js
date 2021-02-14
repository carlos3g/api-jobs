const UnemployedsModel = require('../models/Unemployers');
const EmployersModel = require('../models/Employers');

// TODO: colocar condição para caso o usuário não for encontrado

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = {
  async index(req, res) {
    const { id, type } = req.headers;

    if (type === 'em') {
      const employer = await EmployersModel.findById(id).catch(() => {
        console.log(`Erro: Empresa não encontrada`);
      });

      const unemployeds = await UnemployedsModel.find({
        $and: [
          { _id: { $in: employer.received } }, // pega todos os unemployers que estão em received
        ],
      });

      shuffle(unemployeds);

      return res.json(unemployeds);
    } else {
      // se for un
      const unemployer = await UnemployedsModel.findById(id).catch(() => {
        console.log(`Erro: Desempregado não encontrado`);
      });

      const employers = await EmployersModel.find({
        $and: [
          { _id: { $nin: unemployer.send } }, // pega todos os employers que não estão em send
        ],
      });

      shuffle(employers);

      return res.json(employers);
    }
  },
};
