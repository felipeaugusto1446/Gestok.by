import prismaClient from "../../prisma"

class RemoveProductService {
  async execute(product_id: string) {
    // verifica se o produto existe
    const productExists = await prismaClient.product.findUnique({
      where: { id: product_id },
    })

    if (!productExists) {
      throw new Error("Produto não encontrado.")
    }

    // verifica se há lotes vinculados a este produto
    const batches = await prismaClient.batch.findMany({
      where: { product_id },
    })

    if (batches.length > 0) {
      throw new Error("Não é possível excluir um produto que possui lotes cadastrados.")
    }

    // exclui o produto
    await prismaClient.product.delete({
      where: { id: product_id },
    })

    // Retorna mensagem de sucesso
    return { message: "Produto removido com sucesso." }
  }
}

export { RemoveProductService }
