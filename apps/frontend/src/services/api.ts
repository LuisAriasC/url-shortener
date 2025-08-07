// apps/frontend/src/services/api.ts
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { TokenService } from './modules/token.service';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agrega el interceptor aquí ⬇️
axiosInstance.interceptors.request.use(
  (config) => {
    const tokenService = new TokenService(); // Instancia local cada vez
    const token = tokenService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RxJS wrapper
export function fromAxios<T>(request: Promise<T>): Observable<T> {
  return from(request.then(res => res));
}