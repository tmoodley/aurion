'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Asset } from '@/lib/assets';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

interface Props { asset: Asset; }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const formatted = val > 1000 ? `$${val.toLocaleString()}` : `$${val.toFixed(2)}`;
  return (
    <div style={{
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-bright)',
      borderRadius: 4,
      padding: '6px 10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
    }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 2 }}>{label}</div>
      <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatted}</div>
    </div>
  );
};

export default function PriceChart({ asset }: Props) {
  const data = asset.history.map((price, i) => ({ day: DAYS[i] || `D${i}`, price }));
  const minPrice = Math.min(...asset.history);
  const maxPrice = Math.max(...asset.history);
  const padding = (maxPrice - minPrice) * 0.1;

  const formatY = (val: number) =>
    val > 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val.toFixed(2)}`;

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: '16px',
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: asset.color }}>{asset.key}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 12, marginLeft: 8 }}>/ USD — 12 day</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['1D', '7D', '1M', '3M'].map((t, i) => (
            <button key={t} style={{
              padding: '2px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              background: i === 1 ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: i === 1 ? '1px solid var(--border-bright)' : '1px solid var(--border)',
              borderRadius: 3,
              color: i === 1 ? 'var(--gold)' : 'var(--text-muted)',
              cursor: 'pointer',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="day"
            tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[minPrice - padding, maxPrice + padding]}
            tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatY}
            width={56}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-bright)', strokeWidth: 1 }} />
          <ReferenceLine y={asset.history[0]} stroke="var(--border)" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="price"
            stroke={asset.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: asset.color, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
