import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: id,
      },
    });

    return res.json(problems);
  }

  async update(req, res) {
    const { id } = req.params;

    return res.json(id);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    const delivery_problem = await DeliveryProblem.create({
      description,
      delivery_id: id,
    });

    return res.json(delivery_problem);
  }
}

export default new DeliveryProblemController();
