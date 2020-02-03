import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipient = await Recipient.findAll();
    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string()
        .required()
        .max(6),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      name,
      street,
      complement,
      number,
      state,
      cep,
      city,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      street,
      complement,
      number,
      state,
      cep,
      city,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string()
        .required()
        .max(6),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    const {
      name,
      street,
      complement,
      number,
      state,
      cep,
      city,
    } = await recipient.update(req.body);

    return res.json({
      name,
      street,
      complement,
      number,
      state,
      cep,
      city,
    });
  }

  async delete(req, res) {
    await Recipient.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json(true);
  }
}

export default new RecipientController();
