'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  corridor: string;
  phone: string;
  kycStatus: 'pending' | 'verified' | 'unverified';
  joinedAt: string;
  walletAddress?: string;
  preferredOnramp?: string;
  portfolioValue: number;
  totalPnl: number;
  totalPnlPct: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  corridor: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  id: 'usr_ndeipi_001',
  firstName: 'Tyrone',
  lastName: 'Moodley',
  email: 'ty@ndeipi.com',
  country: 'Canada',
  corridor: 'Toronto → Lusaka',
  phone: '+1 416 555 0192',
  kycStatus: 'verified',
  joinedAt: 'March 2026',
  walletAddress: '0x3f4a...8c2d',
  preferredOnramp: 'absa',
  portfolioValue: 3262,
  totalPnl: 342,
  totalPnlPct: 13.8,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 900));
    if (email && _password) {
      setUser({ ...DEMO_USER, email });
      return true;
    }
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1200));
    setUser({
      ...DEMO_USER,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.country,
      phone: data.phone,
      corridor: data.corridor,
      kycStatus: 'pending',
      portfolioValue: 0,
      totalPnl: 0,
      totalPnlPct: 0,
    });
    return true;
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<User>) => {
    setUser(u => u ? { ...u, ...data } : u);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
