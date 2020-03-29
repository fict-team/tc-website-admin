export interface IUser {
  id: number;
  username: string;
  permissions: string[];
  iat: number;
  exp: number;
};
