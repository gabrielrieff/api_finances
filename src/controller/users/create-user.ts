import { Request, Response } from "express";
import { hash } from "bcryptjs";

import { isValidEmail } from "../../helpers/isValidEmail";
import { cresteUserRepo } from "../../repositories/users/create-user-repo";

export class createdUserController {
  async handle(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, userType } = req.body;
      const userID = req.userID;
      isValidEmail(email);

      const passwordHash = await hash(password, 8);

      req.body.password = passwordHash;

      const CreateUserRepo = new cresteUserRepo();

      const user = await CreateUserRepo.createUser({
        firstName,
        lastName,
        email,
        password: req.body.password,
        userType,
        userID,
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
