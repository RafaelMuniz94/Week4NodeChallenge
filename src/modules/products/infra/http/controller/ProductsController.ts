import { Request, Response } from "express";

import { container } from "tsyringe";
import CreateProductService from "@modules/products/services/CreateProductService";

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    let service = container.resolve(CreateProductService);
    let { name, price, quantity } = request.body;
    let product = await service.execute({ name, price, quantity });

    return response.json(product);
  }
}
