import { Request, Response } from "express";
import { createCategoriRepo } from "../../repositories/category/create-categori-repo";
import { CategoriModel } from "../../model/categoriModel";

export class createCategoriController {
  async handle(req: Request, res: Response) {
    try {
      const { title } = req.body;
      const banner = req.file!.filename;
      const userID = req.userID;

      const data = {
        title,
        banner,
        userID,
      } as CategoriModel;

      const CreateCategori = new createCategoriRepo();
      const categori = await CreateCategori.createCategori(data);

      return res.json(categori);
    } catch (error) {
      if (error != "") {
        return res.status(400).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "Error when trying to create a new category" });
      }
    }
  }
}
