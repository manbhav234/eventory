import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import productsController from "../controllers/products.controller";
import { upload } from "../middlewares/multer";

const router = Router();

router.post('/addProduct', authenticate, upload.single('image'), productsController.addProduct);
router.get('/fetchProducts', authenticate, productsController.fetchProducts);
router.put('/deleteProduct', authenticate, productsController.deleteProduct)
export default router;