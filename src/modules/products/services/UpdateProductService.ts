import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const producstRepository = getCustomRepository(ProductsRepository);

    const product = await producstRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }
    const productsExists = await producstRepository.findByName(name);

    if (productsExists && name !== product.name) {
      throw new AppError('There is already one products with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await producstRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
