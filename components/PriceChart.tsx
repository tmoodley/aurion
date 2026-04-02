'use client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Asset } from '@/lib/assets';

const LABELS = ['Mar 9','Mar 11','Mar 13','Mar 15','Mar 17','Mar 19','Mar 21','Mar 23','Mar 25','Mar 27','Mar 29','Mar 31','Apr 1','Apr 2'];

export default function PriceChart({ asset }: { asset: Asset }) {
  const [tf, setTf] = useState('30D');
  const data = asset.priceHistory.map((price, i) => ({ date: LABELS[i] || `Day ${i+1}`, price }));
  const isUp = asset.changePct >= 0;
  const tfs = ['1D', '7D', '30D', '90D', 'ALL'];
  const fmt = (p: number) => p > 100 ? '$' + p.toLocaleString() : '$' + p.toFixed(2);

  return (
    <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 10, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em' }}>
          PRICE CHART — {asset.name} — 30-DAY
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {tfs.map(t => (
            <button
              key={t}
              onClick={() => setTf(t)}
              style={{
                background: tf === t ? 'rgba(201,168,76,0.12)' : 'transparent',
                border: `1px solid ${tf === t ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.07)'}`,
                color: tf === t ? '#C9A84C' : '#4A4844',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 10,
                padding: '3px 8px',
                borderRadius: 2,
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="date"
              tick={{ fill: '#4A4844', fontSize: 9, fontFamily: 'IBM Plex Mono, monospace' }}
              tickLine={false}
              axisLine={false}
              interval={2}
            />
            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: '#4A4844', fontSize: 9, fontFamily: 'IBM Plex Mono, monospace' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={fmt}
              width={70}
            />
            <Tooltip
              contentStyle={{
                background: '#0F1318',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 3,
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 11,
                color: '#E8E4D9',
              }}
              formatter={(val: number) => [fmt(val), asset.name]}
              labelStyle={{ color: '#4A4844', fontSize: 10 }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isUp ? '#2ECC8A' : '#E05252'}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: asset.color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
