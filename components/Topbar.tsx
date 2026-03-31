'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Settings, ChevronDown, User, LogOut, X, Check, Monitor, Zap, Globe, Shield, Moon, Sun, Volume2, RefreshCw, Wifi, Database, ChevronRight } from 'lucide-react';
import { ASSETS } from '@/lib/assets';
import { useAuth } from '@/lib/auth';

const TICKER_ITEMS = Object.values(ASSETS).map(a => ({
  name: a.name, price: a.price, delta: a.delta, color: a.color,
}));

const NOTIFICATIONS = [
  { id: 1, type: 'signal', title: 'AURION AI — BTC signal', body: 'Moderate accumulate. Diaspora flows from Lagos corridor up 14%.', time: '2m ago', unread: true, color: 'var(--gold)' },
  { id: 2, type: 'onramp', title: 'M-Pesa transfer confirmed', body: 'KES 5,200 → 38.4 AGD settled on Polygon.', time: '18m ago', unread: true, color: 'var(--green)' },
  { id: 3, type: 'oracle', title: 'NodeBoss production event', body: 'Migodi-Auric batch #2847 certified. +3.2t gold reserves.', time: '1h ago', unread: true, color: 'var(--purple)' },
  { id: 4, type: 'price', title: 'NDX price alert', body: 'NdeipiCoin crossed $4.20 — your target level.', time: '3h ago', unread: false, color: 'var(--blue)' },
  { id: 5, type: 'signal', title: 'AURION AI — AGD signal', body: 'Strong accumulate. Physical reserves increased this week.', time: '5h ago', unread: false, color: 'var(--gold)' },
  { id: 6, type: 'system', title: 'Wallet connected', body: 'MetaMask (Polygon) successfully linked to your account.', time: 'Yesterday', unread: false, color: 'var(--text-muted)' },
];

const ICON_MAP: Record<string, string> = {
  signal: '◆', onramp: '↑', oracle: '●', price: '▲', system: '○',
};

export default function Topbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [time, setTime] = useState('');
  const [offset, setOffset] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [settingsTab, setSettingsTab] = useState<'display' | 'trading' | 'network' | 'security'>('display');

  // Settings state
  const [darkMode, setDarkMode] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [chartType, setChartType] = useState<'line' | 'candle'>('line');
  const [currency, setCurrency] = useState('USD');
  const [slippage, setSlippage] = useState('0.5');
  const [gasPreset, setGasPreset] = useState<'slow' | 'standard' | 'fast'>('standard');
  const [rpcNode, setRpcNode] = useState('Ndeipi (recommended)');

  const bellRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.unread).length;

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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) setSettingsOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const formatPrice = (price: number) =>
    price > 1000 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, unread: false })));
  const dismissNotif = (id: number) => setNotifications(ns => ns.filter(n => n.id !== id));

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} style={{ width: 36, height: 20, borderRadius: 10, background: on ? 'var(--green)' : 'var(--bg-tertiary)', border: on ? 'none' : '1px solid var(--border)', cursor: 'pointer', position: 'relative', flexShrink: 0, transition: 'background 0.2s' }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 19 : 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
    </div>
  );

  const settingsTabs = [
    { key: 'display' as const, label: 'Display', icon: Monitor },
    { key: 'trading' as const, label: 'Trading', icon: Zap },
    { key: 'network' as const, label: 'Network', icon: Globe },
    { key: 'security' as const, label: 'Security', icon: Shield },
  ];

  const dropdownBase = {
    position: 'absolute' as const,
    top: '100%',
    marginTop: 8,
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    zIndex: 200,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  };

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
              borderRadius: 4, color: i === 0 ? 'var(--gold)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.04em',
            }}>{item}</button>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div className="animate-pulse-gold" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{time}</span>
          </div>

          {/* User menu */}
          {user ? (
            <div style={{ position: 'relative' }} ref={menuRef}>
              <div onClick={() => setMenuOpen(m => !m)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{user.firstName}</span>
                <ChevronDown size={11} color="var(--text-muted)" />
              </div>
              {menuOpen && (
                <div style={{ ...dropdownBase, right: 0, width: 160, overflow: 'hidden' }}>
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
              <button onClick={() => router.push('/')} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', letterSpacing: '0.04em' }}>SIGN IN</button>
              <button onClick={() => router.push('/register')} style={{ padding: '5px 12px', background: 'var(--gold)', border: 'none', borderRadius: 4, color: '#090B0E', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>REGISTER</button>
            </div>
          )}

          {/* Bell */}
          <div style={{ position: 'relative' }} ref={bellRef}>
            <button
              onClick={() => { setBellOpen(b => !b); setSettingsOpen(false); }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, position: 'relative', display: 'flex', alignItems: 'center' }}
            >
              <Bell size={16} color={bellOpen ? 'var(--gold)' : 'var(--text-secondary)'} />
              {unreadCount > 0 && (
                <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, borderRadius: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                  {unreadCount}
                </div>
              )}
            </button>

            {bellOpen && (
              <div style={{ ...dropdownBase, right: 0, width: 340 }}>
                {/* Bell header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>NOTIFICATIONS</span>
                    {unreadCount > 0 && (
                      <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 10, background: 'rgba(224,82,82,0.15)', border: '1px solid rgba(224,82,82,0.3)', color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>{unreadCount} new</span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Check size={11} /> Mark all read
                    </button>
                  )}
                </div>

                {/* Notification list */}
                <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '32px 14px', textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>No notifications</div>
                  ) : notifications.map((n, i) => (
                    <div key={n.id} style={{
                      display: 'flex', gap: 10, padding: '11px 14px',
                      background: n.unread ? 'rgba(201,168,76,0.04)' : 'transparent',
                      borderBottom: i < notifications.length - 1 ? '1px solid var(--border)' : 'none',
                      position: 'relative',
                    }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${n.color}18`, border: `1px solid ${n.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, color: n.color, fontFamily: 'var(--font-mono)' }}>
                        {ICON_MAP[n.type]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                          <span style={{ fontSize: 12, fontWeight: 500, color: n.unread ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{n.title}</span>
                          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0, marginLeft: 8 }}>{n.time}</span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{n.body}</div>
                      </div>
                      <button onClick={() => dismissNotif(n.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, flexShrink: 0, alignSelf: 'flex-start' }}>
                        <X size={12} />
                      </button>
                      {n.unread && <div style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)' }} />}
                    </div>
                  ))}
                </div>

                {/* Bell footer */}
                <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                  <span onClick={() => { router.push('/profile'); setBellOpen(false); }} style={{ fontSize: 11, color: 'var(--gold)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
                    Manage alert preferences <ChevronRight size={11} style={{ display: 'inline' }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div style={{ position: 'relative' }} ref={settingsRef}>
            <button
              onClick={() => { setSettingsOpen(s => !s); setBellOpen(false); }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
            >
              <Settings size={16} color={settingsOpen ? 'var(--gold)' : 'var(--text-secondary)'} />
            </button>

            {settingsOpen && (
              <div style={{ ...dropdownBase, right: 0, width: 380 }}>
                {/* Settings header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>SETTINGS</span>
                  <button onClick={() => setSettingsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <X size={14} />
                  </button>
                </div>

                {/* Settings tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                  {settingsTabs.map(t => {
                    const Icon = t.icon;
                    return (
                      <button key={t.key} onClick={() => setSettingsTab(t.key)} style={{
                        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 4px',
                        background: 'transparent', border: 'none',
                        borderBottom: settingsTab === t.key ? '2px solid var(--gold)' : '2px solid transparent',
                        color: settingsTab === t.key ? 'var(--gold)' : 'var(--text-muted)',
                        cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.04em',
                      }}>
                        <Icon size={13} />
                        {t.label.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                {/* Settings content */}
                <div style={{ padding: '14px 16px', maxHeight: 320, overflowY: 'auto' }}>

                  {settingsTab === 'display' && (
                    <div>
                      {[
                        { label: 'Dark mode', desc: 'Bloomberg-style dark terminal', on: darkMode, toggle: () => setDarkMode(d => !d) },
                        { label: 'Sound alerts', desc: 'Audio on price signals', on: soundAlerts, toggle: () => setSoundAlerts(s => !s) },
                        { label: 'Auto-refresh prices', desc: 'Update prices every 10s', on: autoRefresh, toggle: () => setAutoRefresh(a => !a) },
                        { label: 'Show volume bars', desc: 'Display volume on charts', on: showVolume, toggle: () => setShowVolume(v => !v) },
                      ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                          <div>
                            <div style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 1 }}>{item.label}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                          </div>
                          <Toggle on={item.on} onToggle={item.toggle} />
                        </div>
                      ))}
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8, letterSpacing: '0.04em' }}>CHART TYPE</div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {(['line', 'candle'] as const).map(t => (
                            <button key={t} onClick={() => setChartType(t)} style={{ flex: 1, padding: '7px', background: chartType === t ? 'rgba(201,168,76,0.12)' : 'var(--bg-tertiary)', border: chartType === t ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 4, color: chartType === t ? 'var(--gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', letterSpacing: '0.04em' }}>
                              {t.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {settingsTab === 'trading' && (
                    <div>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8, letterSpacing: '0.04em' }}>DISPLAY CURRENCY</div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {['USD', 'ZMW', 'KES', 'NGN'].map(c => (
                            <button key={c} onClick={() => setCurrency(c)} style={{ flex: 1, padding: '7px', background: currency === c ? 'rgba(201,168,76,0.12)' : 'var(--bg-tertiary)', border: currency === c ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 4, color: currency === c ? 'var(--gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer' }}>
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8, letterSpacing: '0.04em' }}>DEFAULT SLIPPAGE</div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {['0.1', '0.5', '1.0', '2.0'].map(s => (
                            <button key={s} onClick={() => setSlippage(s)} style={{ flex: 1, padding: '7px', background: slippage === s ? 'rgba(201,168,76,0.12)' : 'var(--bg-tertiary)', border: slippage === s ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 4, color: slippage === s ? 'var(--gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer' }}>
                              {s}%
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8, letterSpacing: '0.04em' }}>GAS PRESET</div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          {(['slow', 'standard', 'fast'] as const).map(g => (
                            <button key={g} onClick={() => setGasPreset(g)} style={{ flex: 1, padding: '7px', background: gasPreset === g ? 'rgba(201,168,76,0.12)' : 'var(--bg-tertiary)', border: gasPreset === g ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 4, color: gasPreset === g ? 'var(--gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer', letterSpacing: '0.04em' }}>
                              {g.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {settingsTab === 'network' && (
                    <div>
                      <div style={{ padding: '10px 12px', background: 'rgba(46,204,138,0.06)', border: '1px solid rgba(46,204,138,0.2)', borderRadius: 6, marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} className="animate-pulse-gold" />
                          <span style={{ fontSize: 12, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>Ndeipi oracle network — online</span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>200 nodes active · Last sync 4s ago</div>
                      </div>
                      {[
                        { label: 'Polygon RPC', value: rpcNode, icon: Database },
                        { label: 'Oracle endpoint', value: 'oracle.ndeipi.com', icon: Wifi },
                        { label: 'ABSA custody API', value: 'Connected', icon: RefreshCw },
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Icon size={13} color="var(--text-muted)" />
                              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.label}</span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{item.value}</span>
                          </div>
                        );
                      })}
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8, letterSpacing: '0.04em' }}>RPC NODE</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {['Ndeipi (recommended)', 'Polygon public', 'Alchemy', 'Infura'].map(n => (
                            <button key={n} onClick={() => setRpcNode(n)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: rpcNode === n ? 'rgba(201,168,76,0.08)' : 'var(--bg-tertiary)', border: rpcNode === n ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 4, cursor: 'pointer' }}>
                              <span style={{ fontSize: 12, color: rpcNode === n ? 'var(--gold)' : 'var(--text-secondary)' }}>{n}</span>
                              {rpcNode === n && <Check size={12} color="var(--gold)" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {settingsTab === 'security' && (
                    <div>
                      {[
                        { label: 'Trade confirmation', desc: 'Require confirm before every trade', on: true },
                        { label: 'Session timeout', desc: 'Auto-logout after 30 min inactivity', on: true },
                        { label: 'IP allowlist', desc: 'Restrict logins to known IPs', on: false },
                        { label: 'API key access', desc: 'Allow third-party API connections', on: false },
                      ].map((item, i) => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                          <div>
                            <div style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 1 }}>{item.label}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.desc}</div>
                          </div>
                          <Toggle on={item.on} onToggle={() => {}} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Settings footer */}
                <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>AURION v1.0.0</span>
                  <button style={{ padding: '5px 12px', background: 'var(--gold)', border: 'none', borderRadius: 4, color: '#090B0E', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>
                    SAVE
                  </button>
                </div>
              </div>
            )}
          </div>
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
