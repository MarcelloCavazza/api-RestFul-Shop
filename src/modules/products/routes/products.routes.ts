import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/listAll', productsController.index);
productsRouter.get('/showSpecific/:id', productsController.show);
productsRouter.post('/createProduct', productsController.create);
productsRouter.put('/updateProduct/:id', productsController.update);
productsRouter.delete('/deleteProduct/:id', productsController.delete);

export default productsRouter;
