import { Request, Response } from "express";
import { EditProductService } from "../../services/product/EditProductService";

class EditProductController {
  async handle(request: Request, response: Response) {
    try {
      const { id, name, price, description, category_id, amount } = request.body;

      const editProductService = new EditProductService();

      //se for enviado arquivo (nova imagem), captura o nome
      const banner = request.file ? request.file.filename : undefined;

      const updatedProduct = await editProductService.execute({
        id,
        name,
        price,
        description,
        banner,
        category_id,
        amount: amount ? Number(amount) : undefined,
      });

      return response.status(200).json(updatedProduct);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { EditProductController };
