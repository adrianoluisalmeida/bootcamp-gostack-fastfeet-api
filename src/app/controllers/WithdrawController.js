import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Delivery from '../models/Delivery';

class WithdrawController {
  async update(req, res) {
    const { id } = req.params;

    const dayStart = Date.now();

    const delivery = await Delivery.findByPk(id);
    const deliveries = await Delivery.count({
      where: {
        deliveryman_id: delivery.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(dayStart), endOfDay(dayStart)],
        },
      },
    });

    if (deliveries >= 5) {
      return res
        .status(400)
        .json({ error: 'maximum number of withdrawals reached' });
    }

    await delivery.update({ start_date: Date.now() });

    return res.json(delivery);
  }
}

export default new WithdrawController();
