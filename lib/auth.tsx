'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
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
  joinedAt: string;
  walletAddress: string;
  preferredOnramp: string;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  corridor: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };
  const login = async (email: string, _pass: string) => {
    await new Promise(r => setTimeout(r, 900));
    setUser({
      id: 'NDX-TM-001',
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
      joinedAt: 'Jan 2025',
      walletAddress: '0x3f8a...7c2d',
      preferredOnramp: 'absa',
    });
    return true;
  };

  const register = async (data: RegisterData) => {
    await new Promise(r => setTimeout(r, 1000));
    const name = `${data.firstName} ${data.lastName}`.trim();
    setUser({
      id: 'NDX-' + Date.now(),
      name,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      corridor: data.corridor,
      role: 'AURION Trader',
      avatar: (data.firstName[0] + (data.lastName[0] || '')).toUpperCase(),
      kycStatus: 'pending',
      joinedAt: new Date().toLocaleDateString('en', { month: 'short', year: 'numeric' }),
      walletAddress: '',
      preferredOnramp: '',
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
