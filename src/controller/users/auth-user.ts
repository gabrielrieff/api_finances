import { Request, Response } from "express";
import { authUserRepo } from "../../repositories/users/auth-user-repo";

export class authUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const AuthUserRepo = new authUserRepo();

      const user = await AuthUserRepo.authUser(email, password);

      return res.json(user);
    } catch (error: any) {
      if (error != "") {
        return res.status(400).json({ error: error.message });
      } else {
        return res
          .status(500)
          .json({ error: "Error when trying to authenticate the user" });
      }
    }
  }
}
