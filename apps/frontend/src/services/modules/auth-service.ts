// apps/frontend/src/services/modules/auth-service.ts
import { CreateUserBase } from "@url-shortener/types";
import { catchError, Observable } from "rxjs";
import { axiosInstance, fromAxios } from "../api";

export class AuthService {
    private readonly apiUrl: string;
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
    }

    loginOrRegister(user: CreateUserBase): Observable<{ accessToken: string }> {
        return fromAxios(axiosInstance.post<{ accessToken: string }>(`${this.apiUrl}/auth/login-or-register`, user).then(res => res.data)).pipe(
            catchError(err => {
                console.error('Error during login or registration:', err);
                throw new Error(err.response?.data?.error || 'Failed to login or register');
            })
        );
    }
}

