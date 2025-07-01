import {Router} from 'express'
import eventsController from '../controllers/events.controller'
import authenticate from '../middlewares/authenticate';
const router = Router();

router.post('/create', authenticate, eventsController.createEvent)
router.get('/fetchEvents', authenticate, eventsController.fetchEvents)
export default router;