'use client';
import { useEffect, useState } from 'react';

const TICKER = [
  { label: 'BTC', price: '$71,200', chg: '+1.19%', up: true },
  { label: 'AGD', price: '$62.40', chg: '+0.29%', up: true },
  { label: 'COOP', price: '$62.40', chg: '+0.32%', up: true },
  { label: 'NDX', price: '$10.00', chg: '—', up: true },
  { label: 'COPPER', price: '$9.20', chg: '-1.29%', up: false },
  { label: 'XAU', price: '$4,560', chg: '+1.3%', up: true },
  { label: 'BTC/AGD', price: '1141.0', chg: '+0.89%', up: true },
];

export default function Topbar() {
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

  const s: Record<string, React.CSSProperties> = {
    bar: {
      height: 36,
      background: '#0E1117',
      borderBottom: '1px solid rgba(201,168,76,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 14px',
      flexShrink: 0,
    },
    left: { display: 'flex', alignItems: 'center', gap: 16 },
    logo: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontWeight: 600,
      fontSize: 15,
      letterSpacing: '0.12em',
      color: '#C9A84C',
    },
    tag: {
      fontSize: 9,
      color: 'rgba(201,168,76,0.6)',
      border: '1px solid rgba(201,168,76,0.2)',
      padding: '2px 7px',
      borderRadius: 2,
      letterSpacing: '0.08em',
      fontFamily: 'IBM Plex Mono, monospace',
    },
    tickerWrap: {
      flex: 1,
      overflow: 'hidden',
      margin: '0 20px',
    },
    ticker: {
      display: 'flex',
      gap: 24,
      animation: 'ticker 30s linear infinite',
    },
    tickItem: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      whiteSpace: 'nowrap' as const,
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 11,
    },
    right: { display: 'flex', alignItems: 'center', gap: 14 },
    clock: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 11,
      color: '#4A4844',
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: '#2ECC8A',
      flexShrink: 0,
    },
    live: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 10,
      color: '#2ECC8A',
      letterSpacing: '0.06em',
    },
    ndeipi: {
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 10,
      color: '#4A4844',
    },
  };

  return (
    <>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={s.bar}>
        <div style={s.left}>
          <span style={s.logo}>AURION</span>
          <span style={s.tag}>NDEIPI TRADING TERMINAL</span>
          <span style={s.tag}>GENIE AI ACTIVE</span>
        </div>

        <div style={s.tickerWrap}>
          <div style={s.ticker}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} style={s.tickItem}>
                <span style={{ color: '#8A8880' }}>{t.label}</span>
                <span style={{ color: '#E8E4D9', fontWeight: 500 }}>{t.price}</span>
                <span style={{ color: t.up ? '#2ECC8A' : '#E05252' }}>{t.chg}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={s.right}>
          <span style={s.clock}>{time}</span>
          <span style={s.ndeipi}>Dr. T. Moodley</span>
          <div style={s.dot} />
          <span style={s.live}>LIVE</span>
        </div>
      </div>
    </>
  );
}
