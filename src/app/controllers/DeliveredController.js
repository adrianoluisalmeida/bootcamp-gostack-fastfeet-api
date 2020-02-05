import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class DeliveredController {
  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
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
}

export default new DeliveredController();
