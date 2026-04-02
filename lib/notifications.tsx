'use client';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: string;
  read: boolean;
}

interface NotifCtx {
  notifications: Notification[];
  addNotif: (msg: string, type?: Notification['type']) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  unreadCount: number;
}

const NotifContext = createContext<NotifCtx | null>(null);

export function NotifProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'Genie AI: 65/35 BTC/Gold allocation updated for Apr 2', type: 'info', time: '09:14 UTC', read: false },
    { id: '2', message: 'NodeBoss oracle: 200 nodes active — Zambia network healthy', type: 'success', time: '08:52 UTC', read: false },
    { id: '3', message: 'Bank of Zambia RWA integration: signed agreement confirmed', type: 'success', time: '07:30 UTC', read: true },
    { id: '4', message: 'ABSA Coop Coin reserves verified — 10g gold peg maintained', type: 'success', time: '06:15 UTC', read: true },
    { id: '5', message: 'NDX pre-launch: 1,000,000 tokens at $10 — accumulation phase', type: 'warning', time: 'Yesterday', read: true },
  ]);

  const addNotif = useCallback((message: string, type: Notification['type'] = 'info') => {
    const now = new Date();
    const time = now.toUTCString().slice(17, 22) + ' UTC';
    setNotifications(prev => [
      { id: Date.now().toString(), message, type, time, read: false },
      ...prev.slice(0, 9),
    ]);
  }, []);

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotifContext.Provider value={{ notifications, addNotif, markAllRead, dismiss, unreadCount }}>
      {children}
    </NotifContext.Provider>
  );
}

export const useNotif = () => {
  const ctx = useContext(NotifContext);
  if (!ctx) throw new Error('useNotif must be inside NotifProvider');
  return ctx;
};
