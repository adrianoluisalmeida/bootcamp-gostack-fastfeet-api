import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    console.log(data);

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda registrada',
      template: 'delivery',
      context: {
        provider: delivery.deliveryman.name,
        user: delivery.deliveryman.name,
        date: format(
          parseISO(delivery.created_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'  ",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new DeliveryMail();
