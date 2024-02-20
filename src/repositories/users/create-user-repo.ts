import prismaClient from "../../db/prisma";

export enum enumUser {
  Padrao = 0,
  Admin = 1,
  Master = 2,
}

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: enumUser;
}

export class cresteUserRepo {
  async createUser(params: CreateUserParams) {
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
