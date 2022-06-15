import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const producstRepository = getCustomRepository(ProductsRepository);

    const products = await producstRepository.find();

    return products;
  }
}

export default ListProductService;
