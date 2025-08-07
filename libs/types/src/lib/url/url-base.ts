import { UserBase } from "../user";

export class UrlBase {
    originalUrl!: string;
    shortId!: string;
    visitCount!: number;
    createdBy?: UserBase;
}