import prismaClient from "../../prisma";
import { ProductRequest } from "../../models/interfaces/product/ProductRequest"

class CreateProductService {
  async execute({ name, price, description, banner, category_id, amount }: ProductRequest) {
    
    // verifica se a categoria existe
    const categoryExists = await prismaClient.category.findUnique({
      where: { id: category_id },
    });

    if (!categoryExists) {
      throw new Error("Categoria não encontrada para associar ao produto.");
    }

    //cria o produto
    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id,
        amount: +amount
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        amount: true,
        category_id: true,
        created_at: true,
      },
    });

    return product;
  }
}

export { CreateProductService };
