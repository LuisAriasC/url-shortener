import { UrlBase } from "../url";

export class UserBase {
    email!: string;
    password!: string;
    urls?: UrlBase[]
}

export class CreateUserBase {
    email!: string;
    password!: string;
}