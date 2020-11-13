import { getRepository, Repository, In } from "typeorm";

import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import ICreateProductDTO from "@modules/products/dtos/ICreateProductDTO";
import IUpdateProductsQuantityDTO from "@modules/products/dtos/IUpdateProductsQuantityDTO";
import Product from "../entities/Product";

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    let product = await this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    let product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    let ids = products.map((product) => product.id);

    let founds = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });

    return founds;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[]
  ): Promise<Product[]> {
    // quantity: number;
    // id: string;
    let ids = products.map((product) => product.id);
    let founds = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });

    let updates = founds.map((pf) => ({
      ...pf,
      quantity: products.filter((p) => p.id === pf.id)[0].quantity,
    }));

    await this.ormRepository.save(updates);
    return updates;
  }
}

export default ProductsRepository;
