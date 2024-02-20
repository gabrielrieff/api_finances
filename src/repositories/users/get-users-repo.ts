import prismaClient from "../../db/prisma";

export class getUsersRepo {
  async getUsers(userID: string) {
    const user = await prismaClient.user.findMany({
      where: {
        id: userID,
      },
    });

    return user;
  }
}
