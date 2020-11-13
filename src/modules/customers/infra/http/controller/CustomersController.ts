import { Request, Response } from "express";

import CreateCustomerService from "@modules/customers/services/CreateCustomerService";

import { container } from "tsyringe";

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    let service = container.resolve(CreateCustomerService);
    let { name, email } = request.body;

    let customer = await service.execute({ name, email });

    return response.json(customer)
  }
}
