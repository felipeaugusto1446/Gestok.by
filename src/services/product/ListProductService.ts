import prismaClient from "../../prisma"

class ListProductService {
  async execute() {
    const products = await prismaClient.product.findMany({
      orderBy: {
        created_at: 'desc' // Mais recentes primeiro
      },
      include: {
        category: {
          select: {
            name: true
          }
        },
        batches: { // Inclui os lotes do produto (caso queira mostrar no front)
          select: {
            id: true,
            brand: true,
            lot_number: true,
            expiration_date: true,
            quantity: true
          }
        }
      }
    });

    return products;
  }
}

export { ListProductService };
