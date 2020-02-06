import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class DeliveryCancelMail {
  get key() {
    return 'DeliveryCancelMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda cancelada',
      template: 'delivery_cancel',
      context: {
        provider: delivery.deliveryman.name,
        product: delivery.product,
        user: delivery.deliveryman.name,
        date: format(
          parseISO(delivery.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'  ",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new DeliveryCancelMail();
