import { CreateUserParams } from "../../@types/user-types";
import prismaClient from "../../db/prisma";
import { User } from "../../model/userModel";

interface createUser extends CreateUserParams {
  userID: string;
}

export class cresteUserRepo {
  async createUser(params: createUser): Promise<User> {
    const userCreator = await prismaClient.user.findFirst({
      where: {
        id: params.userID,
        userType: 2,
      },
    });

    if (!userCreator) {
      throw new Error("User not able to create new users");
    }

    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: params.email,
      },
    });

    if (userAlreadyExist) {
      throw new Error("User already exist!");
    }

    const data = {
      userType: params.userType,
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      password: params.password,
    };
    const user = await prismaClient.user.create({
      data: data,
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
