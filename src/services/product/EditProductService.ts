import prismaClient from "../../prisma";

interface EditProductRequest {
  id: string;
  name?: string;
  price?: string;
  description?: string;
  banner?: string;
  category_id?: string;
  amount?: number;
}

class EditProductService {
  async execute({ id, name, price, description, banner, category_id, amount }: EditProductRequest) {
    //verifica se o produto existe
    const productExists = await prismaClient.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new Error("Produto não encontrado.");
    }

    //se a categoria for alterada, verifica se ela existe
    if (category_id) {
      const categoryExists = await prismaClient.category.findUnique({
        where: { id: category_id },
      });

      if (!categoryExists) {
        throw new Error("Categoria informada não existe.");
      }
    }

    //Atualiza o produto
    const updatedProduct = await prismaClient.product.update({
      where: { id },
      data: {
        name: name ?? productExists.name,
        price: price ?? productExists.price,
        description: description ?? productExists.description,
        banner: banner ?? productExists.banner,
        category_id: category_id ?? productExists.category_id,
        amount: amount ?? productExists.amount,
        updated_at: new Date(),
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        amount: true,
        category_id: true,
        updated_at: true,
      },
    });

    return updatedProduct;
  }
}

export { EditProductService };
