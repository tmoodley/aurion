'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Topbar from '@/components/Topbar';
import { User, Shield, Wallet, Bell, LogOut, ChevronRight, TrendingUp, Edit2, Check } from 'lucide-react';

type Tab = 'overview' | 'security' | 'wallet' | 'notifications';

const BADGE = {
  verified: { label: 'KYC Verified', color: 'var(--green)', bg: 'rgba(46,204,138,0.1)', border: 'rgba(46,204,138,0.25)' },
  pending: { label: 'KYC Pending', color: 'var(--gold)', bg: 'rgba(201,168,76,0.1)', border: 'rgba(201,168,76,0.25)' },
  unverified: { label: 'Unverified', color: 'var(--red)', bg: 'rgba(224,82,82,0.1)', border: 'rgba(224,82,82,0.25)' },
};

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overview');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-secondary)' }}>Not signed in</div>
        <button onClick={() => router.push('/')} style={{ padding: '9px 20px', background: 'var(--gold)', border: 'none', borderRadius: 5, color: '#090B0E', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em' }}>
          SIGN IN
        </button>
      </div>
    );
  }

  const badge = BADGE[user.kycStatus];

  const startEdit = (field: string, value: string) => { setEditingField(field); setEditValue(value); };
  const saveEdit = (field: string) => {
    updateProfile({ [field]: editValue } as any);
    setEditingField(null);
  };

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'overview', label: 'Overview', icon: User },
    { key: 'security', label: 'Security', icon: Shield },
    { key: 'wallet', label: 'Wallet', icon: Wallet },
    { key: 'notifications', label: 'Alerts', icon: Bell },
  ];

  const profileRows = [
    { field: 'firstName', label: 'First name', value: user.firstName },
    { field: 'lastName', label: 'Last name', value: user.lastName },
    { field: 'email', label: 'Email', value: user.email },
    { field: 'phone', label: 'Phone', value: user.phone },
    { field: 'country', label: 'Country', value: user.country },
    { field: 'corridor', label: 'Corridor', value: user.corridor },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Topbar onNotifClick={() => {}} />

      <div style={{ maxWidth: 860, margin: '0 auto', width: '100%', padding: '24px 20px' }}>

        {/* Header card */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
          padding: '24px', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(201,168,76,0.15)',
              border: '2px solid var(--border-bright)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--gold)',
            }}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                {user.firstName} {user.lastName}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 5 }}>{user.email}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 3, background: badge.bg, border: `1px solid ${badge.border}`, color: badge.color, fontFamily: 'var(--font-mono)' }}>
                  {badge.label}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ID: {user.id}
                </span>
              </div>
            </div>
          </div>

          {/* Portfolio snapshot */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>PORTFOLIO</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600, color: 'var(--gold)' }}>
                ${user.portfolioValue.toLocaleString()}
              </div>
            </div>
            {user.totalPnl > 0 && (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>P&L</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <TrendingUp size={14} color="var(--green)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--green)' }}>
                    +${user.totalPnl} ({user.totalPnlPct}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab row */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-secondary)', padding: 4, borderRadius: 8, border: '1px solid var(--border)' }}>
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '8px',
                  background: tab === t.key ? 'var(--bg-card)' : 'transparent',
                  border: tab === t.key ? '1px solid var(--border)' : '1px solid transparent',
                  borderRadius: 6, cursor: 'pointer',
                  color: tab === t.key ? 'var(--gold)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={13} />
                {t.label.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="animate-slide-up">

          {/* Overview */}
          {tab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Profile fields */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 14 }}>ACCOUNT DETAILS</div>
                {profileRows.map(row => (
                  <div key={row.field} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 80 }}>{row.label.toUpperCase()}</span>
                    {editingField === row.field ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, marginLeft: 12 }}>
                        <input
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          style={{ flex: 1, padding: '4px 8px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-bright)', borderRadius: 4, color: 'var(--text-primary)', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none' }}
                          autoFocus
                        />
                        <button onClick={() => saveEdit(row.field)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--green)' }}><Check size={14} /></button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{(user as any)[row.field] || row.value}</span>
                        <button onClick={() => startEdit(row.field, (user as any)[row.field] || row.value)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0 }}>
                          <Edit2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div style={{ padding: '8px 0' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>MEMBER SINCE</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', float: 'right' }}>{user.joinedAt}</span>
                </div>
              </div>

              {/* KYC + Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* KYC card */}
                <div style={{ background: 'var(--bg-card)', border: `1px solid ${badge.border}`, borderRadius: 8, padding: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 10 }}>KYC STATUS</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: badge.color }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: badge.color }}>{badge.label}</span>
                  </div>
                  {user.kycStatus === 'verified' ? (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Full trading limits unlocked. Identity verified. Compliant with Zambian ZICTA and BOZ requirements.
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
                        Complete identity verification to unlock full trading limits and diaspora onramp access.
                      </div>
                      <button style={{ width: '100%', padding: '9px', background: 'rgba(201,168,76,0.12)', border: '1px solid var(--border-bright)', borderRadius: 5, color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em' }}>
                        START VERIFICATION
                      </button>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>TRADING STATS</div>
                  {[
                    { label: 'Total trades', value: '14' },
                    { label: 'Onramp volume', value: '$2,400' },
                    { label: 'Preferred corridor', value: user.corridor },
                    { label: 'Active since', value: user.joinedAt },
                  ].map(s => (
                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {tab === 'security' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 16 }}>SECURITY SETTINGS</div>
              {[
                { label: 'Change password', desc: 'Update your login password', action: 'Update' },
                { label: 'Two-factor authentication', desc: '2FA via authenticator app', action: 'Enable' },
                { label: 'Login activity', desc: 'View recent sign-in history', action: 'View' },
                { label: 'Active sessions', desc: '1 active session', action: 'Manage' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer' }}>
                    {item.action} <ChevronRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Wallet */}
          {tab === 'wallet' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 14 }}>CONNECTED WALLET</div>
                {user.walletAddress ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(46,204,138,0.06)', border: '1px solid rgba(46,204,138,0.2)', borderRadius: 6 }}>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--green)', marginBottom: 2 }}>MetaMask (Polygon)</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{user.walletAddress}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                      <span style={{ fontSize: 11, color: 'var(--green)' }}>Connected</span>
                    </div>
                  </div>
                ) : (
                  <button style={{ width: '100%', padding: '11px', background: 'rgba(201,168,76,0.1)', border: '1px solid var(--border-bright)', borderRadius: 5, color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em' }}>
                    CONNECT WALLET
                  </button>
                )}
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 14 }}>PREFERRED ONRAMP</div>
                {[
                  { id: 'mpesa', name: 'M-Pesa', desc: 'Kenya / Tanzania', icon: '📱' },
                  { id: 'absa', name: 'ABSA Bank', desc: 'Zambia / South Africa', icon: '🏦' },
                  { id: 'mtn', name: 'MTN Mobile', desc: 'Ghana / Uganda', icon: '📡' },
                ].map(r => (
                  <div
                    key={r.id}
                    onClick={() => updateProfile({ preferredOnramp: r.id })}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px', marginBottom: 6,
                      background: user.preferredOnramp === r.id ? 'rgba(201,168,76,0.08)' : 'var(--bg-tertiary)',
                      border: user.preferredOnramp === r.id ? '1px solid var(--border-bright)' : '1px solid var(--border)',
                      borderRadius: 5, cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{r.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, color: user.preferredOnramp === r.id ? 'var(--gold)' : 'var(--text-primary)' }}>{r.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.desc}</div>
                      </div>
                    </div>
                    {user.preferredOnramp === r.id && <Check size={14} color="var(--gold)" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 16 }}>PRICE ALERTS & NOTIFICATIONS</div>
              {[
                { label: 'Price alerts', desc: 'Get notified on asset price movements', on: true },
                { label: 'Onramp status', desc: 'Transfer confirmations and receipts', on: true },
                { label: 'AI signal updates', desc: 'AURION AI market read notifications', on: false },
                { label: 'Portfolio digest', desc: 'Daily portfolio summary', on: false },
                { label: 'Ndeipi oracle events', desc: 'NodeBoss and production milestones', on: true },
              ].map((n, i) => (
                <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>{n.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.desc}</div>
                  </div>
                  <div style={{
                    width: 36, height: 20, borderRadius: 10, cursor: 'pointer',
                    background: n.on ? 'var(--green)' : 'var(--bg-tertiary)',
                    border: n.on ? 'none' : '1px solid var(--border)',
                    position: 'relative', transition: 'background 0.2s',
                  }}>
                    <div style={{
                      position: 'absolute', top: 3,
                      left: n.on ? 19 : 3,
                      width: 14, height: 14, borderRadius: '50%',
                      background: '#fff', transition: 'left 0.2s',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sign out */}
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => { logout(); router.push('/'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 16px',
              background: 'transparent',
              border: '1px solid rgba(224,82,82,0.3)',
              borderRadius: 5,
              color: 'var(--red)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11, cursor: 'pointer', letterSpacing: '0.06em',
            }}
          >
            <LogOut size={13} />
            SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
}
