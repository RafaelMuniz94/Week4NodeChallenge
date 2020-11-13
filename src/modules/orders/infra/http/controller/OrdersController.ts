import { Request, Response } from "express";

import { container } from "tsyringe";

import CreateOrderService from "@modules/orders/services/CreateOrderService";
import FindOrderService from "@modules/orders/services/FindOrderService";

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    // TODO
    let service = container.resolve(FindOrderService);

    let { id } = request.params;

    let orders = await service.execute({ id });
    return response.json(orders);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    let service = container.resolve(CreateOrderService);
    let { customer_id, products } = request.body;
    let order = await service.execute({ customer_id, products });

    return response.json(order);
  }
}
