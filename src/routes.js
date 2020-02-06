import Router from 'express';
import multer from 'multer';
import SessionsController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import WithdrawController from './app/controllers/WithdrawController';
import DeliverymanDeliveryController from './app/controllers/DeliverymanDeliveryController';
import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveredController from './app/controllers/DeliveredController';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/sessions', SessionsController.store);

routes.get('/deliveryman/:id', DeliverymanDeliveryController.index);
routes.get('/deliveryman/:id/delivered', DeliveredController.index);
routes.put('/delivery/:id/withdraw', WithdrawController.update);
routes.put('/delivery/:id/delivered', DeliveredController.update);

routes.use(authMiddleware);
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// deliveries
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
