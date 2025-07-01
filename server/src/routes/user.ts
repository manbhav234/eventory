import Router from 'express'
import authenticate from '../middlewares/authenticate';
import userController from '../controllers/user.controller';
const router = Router();

router.post('/addCategory', authenticate, userController.addCategory)
router.get('/fetchCategories', authenticate, userController.fetchCategories)

export default router