import prismaClient from "../../db/prisma";

export class getUsersRepo {
  async getUsers() {
    const user = await prismaClient.user.findMany();

    return user;
  }
}
