import { UserBase } from "./user-base";

export class User extends UserBase {
  id!: string;
  createdAt!: Date;
}
