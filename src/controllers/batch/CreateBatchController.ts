import { Request, Response } from "express"
import { CreateBatchService } from "../../services/batch/CreateBatchService"
import { BatchRequest } from "../../models/interfaces/batch/BatchRequest"

class CreateBatchController {
  async handle(request: Request, response: Response) {
    try {
      const {
        product_id,
        brand,
        lot_number,
        expiration_date,
        notify_quantity,
        notify_expiration,
        quantity,
      }: BatchRequest = request.body

      const createBatchService = new CreateBatchService()

      const batch = await createBatchService.execute({
        product_id,
        brand,
        lot_number,
        expiration_date,
        notify_quantity,
        notify_expiration,
        quantity,
      })

    
      return response.status(201).json(batch)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { CreateBatchController }
