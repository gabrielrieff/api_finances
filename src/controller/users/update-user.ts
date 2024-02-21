import { Request, Response } from "express";
import { UpdateUserparams } from "../../@types/update-user-types";
import { updateUserRepo } from "../../repositories/users/update-user-repo";

export class updateUserController {
  async handle(req: Request, res: Response) {
    try {
      const id = req?.params?.id as string;
      const photo = req.file?.filename;
      const body = { ...req.body, photo };

      if (!id) {
        return res.status(401).json({ error: "Missing user id" });
      }

      const allowedFieldToUpdat: (keyof UpdateUserparams)[] = [
        "firstName",
        "lastName",
        "email",
        "photo",
        "password",
        "admin",
        "updated_at",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body!).some(
        (field) =>
          !allowedFieldToUpdat.includes(field as keyof UpdateUserparams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return res
          .status(400)
          .json({ error: "Some received field is not allowed" });
      }
      const UpdateUserRepo = new updateUserRepo();
      const user = await UpdateUserRepo.updateUser(id, body);

      return res.json(user);
    } catch (error: any) {
      if (error != "") {
        return res.status(400).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "Error when trying to change user data" });
      }
    }
  }
}
