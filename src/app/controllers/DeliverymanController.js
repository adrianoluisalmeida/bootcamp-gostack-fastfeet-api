import * as Yup from 'yup';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const couriers = await Deliveryman.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;
    const user = await Deliveryman.findByPk(id);

    if (email && email !== user.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });
      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists' });
      }
    }

    const { name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman Id does not exist' });
    }

    deliveryman.delete();

    return res.json(true);
  }
}

export default new DeliverymanController();
