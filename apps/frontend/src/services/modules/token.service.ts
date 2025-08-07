export class TokenService {
    storeToken(token: string): void {
        localStorage.setItem('token', token);
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    clearToken(): void {
        localStorage.removeItem('token');
    }
}