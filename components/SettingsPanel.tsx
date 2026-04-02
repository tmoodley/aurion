'use client';
import { useState } from 'react';

interface Toggle {
  key: string;
  label: string;
  sub: string;
  default: boolean;
}

const TOGGLES: Toggle[] = [
  { key: 'genieAi', label: 'Genie AI auto-rebalance alerts', sub: 'Daily hedge recommendations from AiHedger', default: true },
  { key: 'nodeAlerts', label: 'NodeBoss oracle alerts', sub: 'Network health and node status changes', default: true },
  { key: 'priceAlerts', label: 'Price movement alerts', sub: 'Threshold alerts on BTC, AGD, NDX', default: true },
  { key: 'txNotifs', label: 'Transaction notifications', sub: 'Confirmations on trades and onramp', default: true },
  { key: 'darkMode', label: 'Dark mode', sub: 'Bloomberg terminal theme (always on)', default: true },
  { key: 'sound', label: 'Sound effects', sub: 'Audio feedback on order events', default: false },
];

export default function SettingsPanel() {
  const [vals, setVals] = useState<Record<string, boolean>>(
    Object.fromEntries(TOGGLES.map(t => [t.key, t.default]))
  );
  const [currency, setCurrency] = useState('USD');
  const [saved, setSaved] = useState(false);

  const toggle = (key: string) => setVals(v => ({ ...v, [key]: !v[key] }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const s: Record<string, React.CSSProperties> = {
    section: { marginBottom: 18 },
    sectionLabel: {
      fontSize: 9,
      color: '#4A4844',
      fontFamily: 'IBM Plex Mono, monospace',
      letterSpacing: '0.1em',
      marginBottom: 10,
      paddingBottom: 6,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '9px 0',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
    },
  };

  return (
  <div style={{ padding: 16 }}>
    <div style={s.section}>
      <div style={s.sectionLabel}>NOTIFICATIONS</div>
      {TOGGLES.slice(0, 4).map(t => (
        <div key={t.key} style={s.row}>
          <div style={{ flex: 1, marginRight: 12 }}>
            <div style={{ fontSize: 11, color: '#8A8880' }}>{t.label}</div>
            <div style={{ fontSize: 9, color: '#4A4844', marginTop: 2 }}>{t.sub}</div>
          </div>
          <div
            onClick={() => toggle(t.key)}
            style={{
              width: 34, height: 18, borderRadius: 9, position: 'relative',
              cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
              background: vals[t.key] ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${vals[t.key] ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            <div style={{
              position: 'absolute', top: 2, width: 12, height: 12, borderRadius: '50%',
              transition: 'all 0.2s',
              left: vals[t.key] ? 16 : 2,
              background: vals[t.key] ? '#C9A84C' : '#4A4844',
            }} />
          </div>
        </div>
      ))}
    </div>

    <div style={s.section}>
      <div style={s.sectionLabel}>PREFERENCES</div>
      {TOGGLES.slice(4).map(t => (
        <div key={t.key} style={s.row}>
          <div style={{ flex: 1, marginRight: 12 }}>
            <div style={{ fontSize: 11, color: '#8A8880' }}>{t.label}</div>
            <div style={{ fontSize: 9, color: '#4A4844', marginTop: 2 }}>{t.sub}</div>
          </div>
          <div
            onClick={() => toggle(t.key)}
            style={{
              width: 34, height: 18, borderRadius: 9, position: 'relative',
              cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s',
              background: vals[t.key] ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.07)',
              border: `1px solid ${vals[t.key] ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            <div style={{
              position: 'absolute', top: 2, width: 12, height: 12, borderRadius: '50%',
              transition: 'all 0.2s',
              left: vals[t.key] ? 16 : 2,
              background: vals[t.key] ? '#C9A84C' : '#4A4844',
            }} />
          </div>
        </div>
      ))}

      <div style={{ ...s.row, borderBottom: 'none', marginTop: 4 }}>
        <div>
          <div style={{ fontSize: 11, color: '#8A8880' }}>Display currency</div>
          <div style={{ fontSize: 9, color: '#4A4844', marginTop: 2 }}>Base currency for portfolio values</div>
        </div>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          style={{
            background: '#131820', border: '1px solid rgba(201,168,76,0.2)',
            color: '#C9A84C', fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 10, padding: '4px 8px', borderRadius: 2, outline: 'none', cursor: 'pointer',
          }}
        >
          {['USD', 'ZMW', 'KES', 'NGN', 'ZAR', 'CAD'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>

    <div style={s.section}>
      <div style={s.sectionLabel}>SYSTEM</div>
      {[
        { label: 'Terminal version', val: 'AURION v1.0.0' },
        { label: 'Oracle network', val: 'NodeBoss v2.1' },
        { label: 'Data provider', val: 'CoinGecko + ABSA' },
        { label: 'Chain', val: 'Polygon PoS + BTC L1' },
      ].map(row => (
        <div key={row.label} style={{ ...s.row, borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
          <span style={{ fontSize: 10, color: '#4A4844' }}>{row.label}</span>
          <span style={{ fontSize: 10, color: '#8A8880', fontFamily: 'IBM Plex Mono, monospace' }}>{row.val}</span>
        </div>
      ))}
    </div>

    <button
      onClick={save}
      style={{
        width: '100%',
        background: saved ? 'rgba(46,204,138,0.1)' : 'rgba(201,168,76,0.08)',
        border: `1px solid ${saved ? 'rgba(46,204,138,0.4)' : 'rgba(201,168,76,0.3)'}`,
        color: saved ? '#2ECC8A' : '#C9A84C',
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, padding: '10px',
        borderRadius: 2, cursor: 'pointer', letterSpacing: '0.08em', transition: 'all 0.2s',
      }}
    >
      {saved ? 'SAVED' : 'SAVE SETTINGS'}
    </button>
  </div>
);
}
