'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _pass: string) => {
    await new Promise(r => setTimeout(r, 900));
    setUser({
      name: 'Dr. T. Moodley',
      email,
      role: 'Founder & CEO — Ndeipi Inc.',
      avatar: 'TM',
    });
    return true;
  };

  const register = async (name: string, email: string, _pass: string) => {
    await new Promise(r => setTimeout(r, 1000));
    setUser({ name, email, role: 'AURION Trader', avatar: name.slice(0, 2).toUpperCase() });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
