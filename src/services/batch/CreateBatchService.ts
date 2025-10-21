import prismaClient from "../../prisma"
import { BatchRequest } from "../../models/interfaces/batch/BatchRequest"

class CreateBatchService {
  async execute({
    product_id,
    brand,
    lot_number,
    expiration_date,
    notify_quantity,
    notify_expiration,
    quantity,
  }: BatchRequest) {

    const productExists = await prismaClient.product.findUnique({
      where: { id: product_id },
    })

    if (!productExists) {
      throw new Error("Produto não encontrado para associar ao lote.")
    }

    const batch = await prismaClient.batch.create({
      data: {
        product_id,
        brand,
        lot_number,
        expiration_date: new Date(expiration_date), // converte string para Date
        notify_quantity,
        notify_expiration,
        quantity,
      },
      select: {
        id: true,
        product_id: true,
        brand: true,
        lot_number: true,
        expiration_date: true,
        notify_quantity: true,
        notify_expiration: true,
        quantity: true,
        created_at: true,
      },
    })

    return batch
  }
}

export { CreateBatchService }
