import { Request, Response } from "express"
import { RemoveProductService } from "../../services/product/RemoveProductService"

class RemoveProductController {
  async handle(request: Request, response: Response) {
    try {
      const product_id = request.query.product_id as string

      if (!product_id) {
        return response.status(400).json({ error: "O ID do produto é obrigatório." })
      }

      const removeProductService = new RemoveProductService()
      const result = await removeProductService.execute(product_id)

      return response.status(200).json(result)
    } catch (error: any) {
      return response.status(400).json({ error: error.message })
    }
  }
}

export { RemoveProductController }
