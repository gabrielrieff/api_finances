import { Request, Response } from "express";
import { getUsersRepo } from "../../repositories/users/get-users-repo";

export class getUsersController {
  async handle(req: Request, res: Response) {
    try {
      const GetUsersRepo = new getUsersRepo();
      const users = await GetUsersRepo.getUsers(req.userID);

      return res.json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
