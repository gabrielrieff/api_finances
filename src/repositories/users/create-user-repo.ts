import { CreateUserParams } from "../../@types/user-types";
import prismaClient from "../../db/prisma";
import { User } from "../../model/userModel";

export class cresteUserRepo {
  async createUser(params: CreateUserParams): Promise<User> {
    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: params.email,
      },
    });

    if (userAlreadyExist) {
      throw new Error("User already exist!");
    }

    const user = await prismaClient.user.create({
      data: params,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        userType: true,
      },
    });

    return user;
  }
}
