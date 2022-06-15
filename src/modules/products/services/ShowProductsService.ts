import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowProductsService {
  public async execute({ id }: IRequest): Promise<Product> {
    const producstRepository = getCustomRepository(ProductsRepository);

    const product = await producstRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductsService;
