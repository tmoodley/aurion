'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Settings, ChevronDown, User, LogOut } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { useAuth } from '@/lib/auth';

const TICKER_ITEMS = Object.values(ASSETS).map(a => ({
  name: a.name,
  price: a.price,
  delta: a.delta,
  color: a.color,
}));

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [time, setTime] = useState('');
  const [offset, setOffset] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () => setTime(new Date().toUTCString().slice(17, 25) + ' UTC');
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setOffset(o => o - 1), 30);
    return () => clearInterval(id);
  }, []);

  const formatPrice = (price: number) =>
    price > 1000 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;

  return (
    <header style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: '52px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" fill="none" stroke="#090B0E" strokeWidth="1.5" />
              <polygon points="10,6 14,8.5 14,11.5 10,14 6,11.5 6,8.5" fill="#090B0E" opacity="0.8" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.12em' }}>AURION</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>PRODUCTION-BACKED TRADING</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 4 }}>
          {['Terminal', 'Portfolio', 'Onramp', 'Markets'].map((item, i) => (
            <button key={item} onClick={() => router.push('/terminal')} style={{
              padding: '5px 14px',
              background: i === 0 ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: i === 0 ? '1px solid var(--border-bright)' : '1px solid transparent',
              borderRadius: 4,
              color: i === 0 ? 'var(--gold)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.04em',
            }}>{item}</button>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="animate-pulse-gold" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{time}</span>
          </div>

          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setMenuOpen(m => !m)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}
              >
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{user.firstName}</span>
                <ChevronDown size={11} color="var(--text-muted)" />
              </div>
              {menuOpen && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 6, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, width: 160, zIndex: 100, overflow: 'hidden' }}>
                  <button onClick={() => { router.push('/profile'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', borderBottom: '1px solid var(--border)', letterSpacing: '0.04em' }}>
                    <User size={13} /> PROFILE
                  </button>
                  <button onClick={() => { logout(); router.push('/'); setMenuOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 14px', background: 'transparent', border: 'none', color: 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.04em' }}>
                    <LogOut size={13} /> SIGN OUT
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => router.push('/')} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', letterSpacing: '0.04em' }}>
                SIGN IN
              </button>
              <button onClick={() => router.push('/register')} style={{ padding: '5px 12px', background: 'var(--gold)', border: 'none', borderRadius: 4, color: '#090B0E', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>
                REGISTER
              </button>
            </div>
          )}

          <Bell size={15} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
          <Settings size={15} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Ticker */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', height: 28, background: 'var(--bg-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', transform: `translateX(${offset % 600}px)`, whiteSpace: 'nowrap' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 32, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <span style={{ color: item.color }}>{item.name.toUpperCase()}</span>
              <span style={{ color: 'var(--text-primary)' }}>{formatPrice(item.price)}</span>
              <span style={{ color: item.delta >= 0 ? 'var(--green)' : 'var(--red)' }}>{item.delta >= 0 ? '+' : ''}{item.delta.toFixed(2)}%</span>
              <span style={{ color: 'var(--text-muted)', marginRight: 8 }}>|</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
