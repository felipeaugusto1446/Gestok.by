import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
  async handle(request: Request, response: Response) {
    try {
      const listProductService = new ListProductService();
      const products = await listProductService.execute();

      return response.status(200).json(products);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
export { ListProductController };
