import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const producstRepository = getCustomRepository(ProductsRepository);
    const productsExists = await producstRepository.findByName(name);

    if (productsExists) {
      throw new AppError('There is already one products with this name');
    }

    const product = producstRepository.create({
      name,
      price,
      quantity,
    });

    await producstRepository.save(product);
    return product;
  }
}

export default CreateProductService;
