'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/Topbar';
import { ASSETS, PORTFOLIO } from '@/lib/assets';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const HISTORY = [
  { day: 'Mar 1', value: 2650 },
  { day: 'Mar 5', value: 2820 },
  { day: 'Mar 10', value: 2740 },
  { day: 'Mar 15', value: 2990 },
  { day: 'Mar 20', value: 3110 },
  { day: 'Mar 25', value: 3050 },
  { day: 'Mar 31', value: 3262 },
];

const TRANSACTIONS = [
  { type: 'BUY', asset: 'BTC', amount: '$500.00', qty: '0.00531 BTC', date: 'Mar 31, 14:32', status: 'confirmed', color: '#2ECC8A' },
  { type: 'ONRAMP', asset: 'M-Pesa → AGD', amount: 'KES 5,200', qty: '38.4 AGD', date: 'Mar 31, 11:15', status: 'confirmed', color: '#C9A84C' },
  { type: 'BUY', asset: 'NDX', amount: '$200.00', qty: '46.73 NDX', date: 'Mar 31, 09:04', status: 'confirmed', color: '#2ECC8A' },
  { type: 'SELL', asset: 'COOP', amount: '$122.80', qty: '2 coins', date: 'Mar 30, 16:21', status: 'confirmed', color: '#E05252' },
  { type: 'BUY', asset: 'AGD', amount: '$300.00', qty: '4.88 AGD', date: 'Mar 28, 10:44', status: 'confirmed', color: '#2ECC8A' },
  { type: 'ONRAMP', asset: 'ABSA → AGD', amount: 'ZMW 1,800', qty: '62.1 AGD', date: 'Mar 25, 09:11', status: 'confirmed', color: '#4A9ECC' },
  { type: 'BUY', asset: 'NDX', amount: '$450.00', qty: '108.2 NDX', date: 'Mar 22, 14:05', status: 'confirmed', color: '#2ECC8A' },
  { type: 'BUY', asset: 'BTC', amount: '$1,000.00', qty: '0.01076 BTC', date: 'Mar 18, 08:30', status: 'confirmed', color: '#2ECC8A' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-bright)', borderRadius: 4, padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 2 }}>{label}</div>
      <div style={{ color: 'var(--gold)', fontWeight: 600 }}>${payload[0].value.toLocaleString()}</div>
    </div>
  );
};

export default function PortfolioPage() {
  const router = useRouter();
  const [period, setPeriod] = useState('1M');
  const totalValue = PORTFOLIO.reduce((s, p) => s + p.amount * ASSETS[p.key].price, 0);
  const totalPnl = 342;
  const totalPnlPct = 11.7;

  const card = (children: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, ...style }}>
      {children}
    </div>
  );

  const label = (text: string) => (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>{text}</div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Topbar onNotifClick={() => {}} />
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '24px 20px' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: 4 }}>Portfolio</h1>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Production-backed holdings · Polygon network</div>
          </div>
          <button onClick={() => router.push('/terminal')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--gold)', border: 'none', borderRadius: 5, color: '#090B0E', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.06em' }}>
            <ArrowUpRight size={13} /> TRADE
          </button>
        </div>

        {/* Summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'TOTAL VALUE', value: `$${totalValue.toLocaleString()}`, sub: 'All holdings', color: 'var(--gold)' },
            { label: 'TOTAL P&L', value: `+$${totalPnl}`, sub: `+${totalPnlPct}% all time`, color: 'var(--green)' },
            { label: 'ASSETS', value: '3', sub: 'BTC · AGD · NDX', color: 'var(--text-primary)' },
            { label: 'TRADES', value: '14', sub: 'This month', color: 'var(--text-primary)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600, color: s.color, marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Portfolio value chart */}
          {card(<>
            {label('PORTFOLIO VALUE')}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 600, color: 'var(--gold)' }}>${totalValue.toLocaleString()}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--green)', fontSize: 13 }}>
                <TrendingUp size={14} /> +$342 (+11.7%)
              </span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                {['7D', '1M', '3M', 'ALL'].map(p => (
                  <button key={p} onClick={() => setPeriod(p)} style={{ padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 10, background: period === p ? 'rgba(201,168,76,0.12)' : 'transparent', border: period === p ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 3, color: period === p ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer' }}>{p}</button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={HISTORY}>
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} />
                <YAxis domain={[2400, 3400]} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(1)}k`} width={48} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-bright)', strokeWidth: 1 }} />
                <Line type="monotone" dataKey="value" stroke="var(--gold)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: 'var(--gold)', stroke: 'var(--bg-primary)', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </>)}

          {/* Allocation */}
          {card(<>
            {label('ALLOCATION')}
            {/* Visual allocation bar */}
            <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 16 }}>
              {PORTFOLIO.map(p => {
                const asset = ASSETS[p.key];
                return <div key={p.key} style={{ flex: p.alloc, background: asset?.color }} />;
              })}
            </div>
            {PORTFOLIO.map(p => {
              const asset = ASSETS[p.asset as keyof typeof ASSETS];
              const isUp = p.pnl >= 0;
              return (
                <div key={p.asset} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: asset?.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)', marginBottom: 1 }}>{p.asset}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.amount} {asset?.unit}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)', marginBottom: 1 }}>${p.value.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: isUp ? 'var(--green)' : 'var(--red)' }}>{isUp ? '+' : ''}{p.pnl}%</div>
                  </div>
                </div>
              );
            })}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
              <div style={{ padding: '8px', background: 'var(--bg-tertiary)', borderRadius: 5, border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>REALISED</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--green)' }}>+$84</div>
              </div>
              <div style={{ padding: '8px', background: 'var(--bg-tertiary)', borderRadius: 5, border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 3 }}>UNREALISED</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--green)' }}>+$258</div>
              </div>
            </div>
          </>)}
        </div>

        {/* Holdings detail */}
        {card(<>
          {label('HOLDINGS')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
            {PORTFOLIO.map(p => {
              const asset = ASSETS[p.asset as keyof typeof ASSETS];
              const price = asset?.price || 0;
              const isUp = p.pnl >= 0;
              return (
                <div key={p.asset} onClick={() => router.push('/terminal')} style={{ padding: '14px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 7, cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = asset?.color || 'var(--border)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: asset?.color, marginBottom: 2 }}>{p.asset}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{asset?.fullName}</div>
                    </div>
                    <div style={{ fontSize: 11, padding: '2px 7px', borderRadius: 3, background: `${asset?.signalColor}18`, border: `1px solid ${asset?.signalColor}44`, color: asset?.signalColor, fontFamily: 'var(--font-mono)' }}>{asset?.signal}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--text-primary)', marginBottom: 4 }}>${p.value.toLocaleString()}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{p.amount} {asset?.unit}</span>
                    <span style={{ color: isUp ? 'var(--green)' : 'var(--red)' }}>{isUp ? '+' : ''}{p.pnl}% P&L</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
                    @ ${price > 1000 ? price.toLocaleString() : price.toFixed(2)} / {asset?.unit}
                  </div>
                </div>
              );
            })}
          </div>
        </>, {})}

        {/* Transaction history */}
        {card(<>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            {label('TRANSACTION HISTORY')}
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'transparent', border: '1px solid var(--border)', borderRadius: 4, padding: '4px 10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer', letterSpacing: '0.04em' }}>
              <RefreshCw size={10} /> EXPORT
            </button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Type', 'Asset', 'Amount', 'Quantity', 'Date', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em', paddingBottom: 10, borderBottom: '1px solid var(--border)', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 7px', borderRadius: 3, background: `${tx.color}18`, border: `1px solid ${tx.color}33`, color: tx.color }}>{tx.type}</span>
                    </td>
                    <td style={{ padding: '10px 12px 10px 0', fontSize: 13, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{tx.asset}</td>
                    <td style={{ padding: '10px 12px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{tx.amount}</td>
                    <td style={{ padding: '10px 12px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>{tx.qty}</td>
                    <td style={{ padding: '10px 12px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>{tx.date}</td>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>confirmed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>, { marginTop: 0 })}
      </div>
    </div>
  );
}
