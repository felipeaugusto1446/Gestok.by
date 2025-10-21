import { Request, Response } from "express";
import { EditBatchService } from "../../services/batch/EditBatchService";

class EditBatchController {
  async handle(request: Request, response: Response) {
    try {
      const {
        id,
        product_id,
        brand,
        lot_number,
        expiration_date,
        notify_quantity,
        notify_expiration,
        quantity
      } = request.body;

      const editBatchService = new EditBatchService();

      const updatedBatch = await editBatchService.execute({
        id,
        product_id,
        brand,
        lot_number,
        expiration_date,
        notify_quantity: notify_quantity ? Number(notify_quantity) : undefined,
        notify_expiration: notify_expiration ? Number(notify_expiration) : undefined,
        quantity: quantity ? Number(quantity) : undefined
      });

      return response.status(200).json(updatedBatch);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { EditBatchController };
