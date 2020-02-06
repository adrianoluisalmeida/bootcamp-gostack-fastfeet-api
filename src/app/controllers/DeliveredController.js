import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveredController {
  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: {
          [Op.lt]: new Date(),
        },
      },
    });

    res.json(deliveries);
  }

  async update(req, res) {
    const { id } = req.params;
    const { signature_id } = req.body;
    const delivery = await Delivery.findByPk(id);
    await delivery.update({ end_date: Date.now(), signature_id });

    res.json(delivery);
  }
}

export default new DeliveredController();
