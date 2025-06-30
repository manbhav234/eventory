import {Router} from 'express'
import eventsController from '../controllers/events.controller'
const router = Router();

router.post('/create', eventsController.createEvent)
router.get('/fetchEvents', eventsController.fetchEvents)
export default router;