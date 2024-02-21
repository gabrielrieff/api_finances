import { Request, Response } from "express";
import { converterDates } from "../../helpers/converterDate";
import { detailUserRepo } from "../../repositories/users/detail-user-repo";

export class detailUserController {
  async handle(req: Request, res: Response) {
    try {
      const { year, month } = req.query;
      const id = req.userID;

      const { startDate, endDate } = converterDates(
        year as string,
        month as string
      );

      const DetailUserRepo = new detailUserRepo();
      const detail = await DetailUserRepo.detailUser(id, startDate, endDate);

      return res.status(200).json(detail);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
