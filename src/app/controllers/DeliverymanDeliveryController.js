import Delivery from '../models/Delivery';

class DeliverymanDeliveryController {
  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
    });

    res.json(deliveries);
  }
}

export default new DeliverymanDeliveryController();
