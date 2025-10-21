import { Request, Response } from "express";
import { CheckBatchNotificationsService } from "../../services/batch/CheckBatchNotificationsService";

class CheckBatchNotificationsController {
  async handle(request: Request, response: Response) {
    const service = new CheckBatchNotificationsService();
    const notifications = await service.execute();

    return response.json(notifications);
  }
}

export { CheckBatchNotificationsController };
