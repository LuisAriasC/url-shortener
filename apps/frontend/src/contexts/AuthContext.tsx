import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TokenService } from '../services/modules/token.service';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { singletonAuthService } from '../services/modules';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean; // 🆕
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const tokenService = new TokenService();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // 🆕
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = tokenService.getToken();
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false); // 🆕
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { accessToken } = await firstValueFrom(singletonAuthService.loginOrRegister({ email, password }));
      tokenService.storeToken(accessToken);
      setToken(accessToken);
      navigate('/home');
    } catch (err: any) {
      throw new Error(err.message || 'Login failed');
    }
  };

  const logout = () => {
    tokenService.clearToken();
    setToken(null);
    navigate('/auth/login');
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};