import Router from 'express';
import multer from 'multer';
import SessionsController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';
import DeliverymanController from './app/controllers/DeliverymanController';

const routes = new Router();
const upload = multer(multerConfig);
routes.post('/sessions', SessionsController.store);

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

export default routes;
