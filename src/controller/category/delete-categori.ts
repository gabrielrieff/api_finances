import { Request, Response } from "express";
import { deleteCategoriRepo } from "../../repositories/category/delete-categori-repo";

export class deleteCategoriController {
  async handle(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userID = req.userID;

      const DeleteCategori = new deleteCategoriRepo();
      const categori = await DeleteCategori.deleteCategoriRepo(id, userID);

      return res.json(categori);
    } catch (error: any) {
      if (error != "") {
        return res.status(400).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "Error when trying to change your categori" });
      }
    }
  }
}
