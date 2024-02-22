import { Request, Response } from "express";

import { cresteUserRepo } from "../../repositories/users/create-user-repo";
import { isValidEmail } from "../../helpers/isValidEmail";
import { hashPassword } from "../../helpers/hashPassword";

export class createdUserController {
  async handle(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, userType } = req.body;
      isValidEmail(email);

      const passwordHash = await hashPassword(password);

      req.body.password = passwordHash;

      const CreateUserRepo = new cresteUserRepo();

      const user = await CreateUserRepo.createUser({
        firstName,
        lastName,
        email,
        password: req.body.password,
        userType,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      if (error != "") {
        return res.status(400).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "Error when trying to create a new user" });
      }
    }
  }
}
