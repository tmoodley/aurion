'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useNotif } from '@/lib/notifications';

const TICKER = [
  { label: 'BTC', price: '$71,200', chg: '+1.19%', up: true },
  { label: 'AGD', price: '$62.40', chg: '+0.29%', up: true },
  { label: 'COOP', price: '$62.40', chg: '+0.32%', up: true },
  { label: 'NDX', price: '$10.00', chg: '—', up: true },
  { label: 'COPPER', price: '$9.20', chg: '-1.29%', up: false },
  { label: 'XAU', price: '$4,560', chg: '+1.3%', up: true },
  { label: 'BTC/AGD', price: '1141.0', chg: '+0.89%', up: true },
];

interface Props {
  onNotifClick: () => void;
}

export default function Topbar({ onNotifClick }: Props) {
  const { user } = useAuth();
  const { unreadCount } = useNotif();
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toUTCString().slice(17, 25) + ' UTC');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
      <div style={{
        height: 36,
        background: '#0E1117',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600, fontSize: 15, letterSpacing: '0.12em', color: '#C9A84C' }}>
            AURION
          </span>
          <span style={{ fontSize: 9, color: 'rgba(201,168,76,0.55)', border: '1px solid rgba(201,168,76,0.2)', padding: '2px 7px', borderRadius: 2, letterSpacing: '0.08em', fontFamily: 'IBM Plex Mono, monospace' }}>
            NDEIPI TRADING TERMINAL
          </span>
          <span style={{ fontSize: 9, color: 'rgba(201,168,76,0.55)', border: '1px solid rgba(201,168,76,0.2)', padding: '2px 7px', borderRadius: 2, letterSpacing: '0.08em', fontFamily: 'IBM Plex Mono, monospace' }}>
            GENIE AI ACTIVE
          </span>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', margin: '0 20px' }}>
          <div style={{ display: 'flex', gap: 24, animation: 'ticker 30s linear infinite' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', whiteSpace: 'nowrap', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11 }}>
                <span style={{ color: '#8A8880' }}>{t.label}</span>
                <span style={{ color: '#E8E4D9', fontWeight: 500 }}>{t.price}</span>
                <span style={{ color: t.up ? '#2ECC8A' : '#E05252' }}>{t.chg}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#4A4844' }}>{time}</span>

          <button onClick={onNotifClick} style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', display: 'flex', alignItems: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4A4844" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -2,
                width: 14, height: 14, borderRadius: '50%',
                background: '#4A9ECC', color: '#090B0E',
                fontSize: 8, fontFamily: 'IBM Plex Mono, monospace', fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, fontWeight: 600, color: '#C9A84C',
              }}>
                {user.avatar}
              </div>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#4A4844' }}>{user.name}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ECC8A' }} />
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#2ECC8A', letterSpacing: '0.06em' }}>LIVE</span>
          </div>
        </div>
      </div>
    </>
  );
}
