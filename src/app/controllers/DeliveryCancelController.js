import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import DeliveryCancelMail from '../jobs/DeliveryCancelMail';

class DeliveryCancelController {
  async delete(req, res) {
    const { id } = req.params;

    const { delivery_id } = await DeliveryProblem.findByPk(id);
    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
      ],
    });

    await delivery.update({
      canceled_at: new Date(),
    });

    await Queue.add(DeliveryCancelMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new DeliveryCancelController();
