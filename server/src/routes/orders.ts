import {Router} from 'express'
import ordersController from '../controllers/orders.controller'
import authenticate from '../middlewares/authenticate';

const router = Router();

router.post('/createOrder', authenticate, ordersController.createOrder);
router.get('/fetchOrders', authenticate, ordersController.fetchOrders);

export default router;