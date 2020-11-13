import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import ICustomersRepository from "@modules/customers/repositories/ICustomersRepository";
import Order from "../infra/typeorm/entities/Order";
import IOrdersRepository from "../repositories/IOrdersRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    let customer = await this.customersRepository.findById(customer_id);
    if (!customer) throw new AppError("Provide a existing customer!");

    let productList = await this.productsRepository.findAllById(products);
    if (!productList.length) throw new AppError("No products found!");

    let NonexistingProducts = products.filter(
      (product) =>
        !productList.map((product) => product.id).includes(product.id)
    );

    if (NonexistingProducts.length)
      throw new AppError(`${NonexistingProducts[0].id} wasnt found!`);

    let ProductsWithNoQuantity = products.filter(
      (product) =>
        productList.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );

    if (ProductsWithNoQuantity.length)
      throw new AppError("Some products has less quantity than ordered!");

    let serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productList.filter((p) => p.id === product.id)[0].price,
    }));

    let order = await this.ordersRepository.create({
      customer,
      products: serializedProducts,
    });

    let { order_products } = order;

    let orderedProducts = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        productList.filter((pL) => pL.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderedProducts);

    return order;
  }
}

export default CreateOrderService;
