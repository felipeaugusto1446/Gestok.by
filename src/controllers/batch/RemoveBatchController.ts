import { Request, Response } from "express";
import { RemoveBatchService } from "../../services/batch/RemoveBatchService";

class RemoveBatchController {
  async handle(request: Request, response: Response) {
    try {
      // pega o ID da query string (ex: /batch/remove?batch_id=123)
      const batch_id = request.query.batch_id as string;

      if (!batch_id) {
        return response.status(400).json({ error: "O ID do lote é obrigatório." });
      }

      // instancia o service e executa a exclusão
      const removeBatchService = new RemoveBatchService();
      const result = await removeBatchService.execute(batch_id);

      // retorna sucesso
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { RemoveBatchController };
