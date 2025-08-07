import { UrlService } from "./url-service";

const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3000/api';
export const singletonUrlService = new UrlService(apiUrl);