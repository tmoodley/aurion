'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  corridor: string;
  role: string;
  avatar: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
}

interface AuthCtx {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };
  const login = async (email: string, _pass: string) => {
    await new Promise(r => setTimeout(r, 900));
    setUser({
      name: 'Dr. T. Moodley',
      firstName: 'Tyrone',
      lastName: 'Moodley',
      email,
      phone: '+1 647 000 0000',
      country: 'Canada',
      corridor: 'CA → ZM',
      role: 'Founder & CEO — Ndeipi Inc.',
      avatar: 'TM',
      kycStatus: 'verified',
    });
    return true;
  };

  const register = async (name: string, email: string, _pass: string) => {
    await new Promise(r => setTimeout(r, 1000));
    setUser({
      name,
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' '),
      email,
      phone: '',
      country: '',
      corridor: '',
      role: 'AURION Trader',
      avatar: name.slice(0, 2).toUpperCase(),
      kycStatus: 'pending',
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
