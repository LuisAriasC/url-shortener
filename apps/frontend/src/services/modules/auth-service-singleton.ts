import { AuthService } from "./auth-service";

const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3000/api';
export const singletonAuthService = new AuthService(apiUrl);