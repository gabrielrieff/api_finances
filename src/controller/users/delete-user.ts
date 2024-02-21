import { Request, Response } from "express";
import { deleteUserRepo } from "../../repositories/users/delete-user-repo";

export class deleteUserController {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const DeleteUserRepo = new deleteUserRepo();

      const user = await DeleteUserRepo.deleteUser(id);

      return res.json(user);
    } catch (error) {
      if (error != "") {
        return res.status(400).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "Error when trying to delete a user" });
      }
    }
  }
}
