import { Request, Response } from "express"
import { CreateProductService } from "../../services/product/CreateProductService"
import { ProductRequest } from "../../models/interfaces/product/ProductRequest"

class CreateProductController {
  async handle(request: Request, response: Response) {
    try {
      const { name, price, description, category_id, amount }: ProductRequest = request.body
      const createProductService = new CreateProductService()

      //verifica se a imagem foi enviada
      if (!request.file) {
        return response.status(400).json({ error: "A imagem do produto é obrigatória para o cadastro." })
      }

      // extrai o nome do arquivo
      const { originalname, filename: banner } = request.file

      //  Cria o produto
      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
        amount
      })

      // retorna o produto com status 201 (significa que deu certo)
      return response.status(201).json(product)
    } catch (error: any) {
      return response.status(400).json({ error: error.message }) // (aqui significa que deu errado)
    }
  }
}

export { CreateProductController }
