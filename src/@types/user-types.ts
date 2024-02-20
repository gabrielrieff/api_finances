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
