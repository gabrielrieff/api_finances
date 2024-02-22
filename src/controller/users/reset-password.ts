import { Request, Response } from "express";
import { resetPasswordRepo } from "../../repositories/users/reset-password-repo";
import { hashPassword } from "../../helpers/hashPassword";

export class resetPasswordController {
  async handle(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const userID = req.userID;

      const passwordHash = await hashPassword(password);

      const ResetPassword = new resetPasswordRepo();
      const user = await ResetPassword.reset(userID, passwordHash);

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
