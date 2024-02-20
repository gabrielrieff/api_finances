import { compare } from "bcryptjs";
import prismaClient from "../../db/prisma";
import { sign } from "jsonwebtoken";

export class authUserRepo {
  async authUser(email: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    const token = sign(
      {
        name: user.firstName,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      ...user,
      token,
    };
  }
}
