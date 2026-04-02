'use client';
import { useAuth } from '@/lib/auth';

export default function ProfilePanel() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const s: Record<string, React.CSSProperties> = {
    wrap: { padding: 16 },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: 'rgba(201,168,76,0.12)',
      border: '1px solid rgba(201,168,76,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 16,
      fontWeight: 600,
      color: '#C9A84C',
      margin: '0 auto 14px',
    },
    name: {
      textAlign: 'center',
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 13,
      color: '#E8E4D9',
      fontWeight: 500,
      marginBottom: 4,
    },
    role: {
      textAlign: 'center',
      fontSize: 10,
      color: '#4A4844',
      marginBottom: 4,
    },
    email: {
      textAlign: 'center',
      fontSize: 10,
      color: '#C9A84C',
      fontFamily: 'IBM Plex Mono, monospace',
      marginBottom: 18,
    },
    divider: { height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 14 },
    statGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 },
    statCard: {
      background: '#131820',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 3,
      padding: '8px 10px',
    },
    statLabel: { fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em', marginBottom: 3 },
    statVal: { fontSize: 13, color: '#E8E4D9', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500 },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '9px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      fontSize: 11,
    },
    badge: {
      fontSize: 9,
      padding: '2px 7px',
      borderRadius: 2,
      fontFamily: 'IBM Plex Mono, monospace',
      background: 'rgba(46,204,138,0.1)',
      color: '#2ECC8A',
      letterSpacing: '0.04em',
    },
    logoutBtn: {
      width: '100%',
      marginTop: 14,
      background: 'transparent',
      border: '1px solid rgba(224,82,82,0.25)',
      color: '#E05252',
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 10,
      padding: '9px',
      borderRadius: 2,
      cursor: 'pointer',
      letterSpacing: '0.08em',
    },
  };

  return (
    <div style={s.wrap}>
      <div style={s.avatar}>{user.avatar}</div>
      <div style={s.name}>{user.name}</div>
      <div style={s.role}>{user.role}</div>
      <div style={s.email}>{user.email}</div>
      <div style={s.divider} />

      <div style={s.statGrid}>
        {[
          { label: 'PORTFOLIO', val: '$39,440' },
          { label: 'TOTAL RETURN', val: '+9.2%' },
          { label: 'OPEN ORDERS', val: '0' },
          { label: 'NDX HELD', val: '500' },
        ].map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statLabel}>{st.label}</div>
            <div style={{ ...s.statVal, color: st.val.startsWith('+') ? '#2ECC8A' : '#E8E4D9' }}>{st.val}</div>
          </div>
        ))}
      </div>

      <div style={s.divider} />

      {[
        { label: 'KYC Status', badge: 'VERIFIED', color: '#2ECC8A' },
        { label: 'Account tier', badge: 'INSTITUTIONAL', color: '#C9A84C' },
        { label: 'NodeBoss role', badge: 'OPERATOR', color: '#4A9ECC' },
        { label: 'Network', badge: 'POLYGON + BTC', color: '#8B7ECC' },
      ].map(row => (
        <div key={row.label} style={s.row}>
          <span style={{ color: '#8A8880' }}>{row.label}</span>
          <span style={{
            fontSize: 9,
            padding: '2px 7px',
            borderRadius: 2,
            fontFamily: 'IBM Plex Mono, monospace',
            background: row.color + '18',
            color: row.color,
            letterSpacing: '0.04em',
          }}>
            {row.badge}
          </span>
        </div>
      ))}

      <button style={s.logoutBtn} onClick={logout}>SIGN OUT</button>
    </div>
  );
}
