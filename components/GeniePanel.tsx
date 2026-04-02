'use client';
import { useState } from 'react';

interface MacroSignal {
  label: string;
  value: string;
  type: 'bull' | 'bear' | 'neutral';
}

const MACRO_SIGNALS: MacroSignal[] = [
  { label: 'Central banks', value: 'STEADY', type: 'neutral' },
  { label: 'Inflation regime', value: 'CONTAINED', type: 'bull' },
  { label: 'Risk appetite', value: 'STRONG', type: 'bull' },
  { label: 'Gold demand', value: 'WANING', type: 'bear' },
  { label: 'BTC momentum', value: 'BULLISH', type: 'bull' },
  { label: 'Real yields', value: 'RISING', type: 'bear' },
];

const TRIGGERS = [
  'Rebalance if BTC approaches new highs parabolic',
  'Increase gold if stabilizes above $4,800',
  'Monitor CB comms for rate cut signals',
  'Alt mandate: 55/45 BTC/Gold split available',
];

const BTC_HISTORY = [67000,69500,70200,72100,74858,72500,70800,69200,68500,67100,66800,68200,69800,71200];
const GOLD_HISTORY = [5100,5157,5050,4950,4900,4800,4750,4650,4520,4401,4420,4450,4500,4560];
const DATES = ['Mar 9','Mar 11','Mar 13','Mar 15','Mar 17','Mar 19','Mar 21','Mar 23','Mar 25','Mar 27','Mar 29','Mar 31','Apr 1','Apr 2'];

const SIGNAL_COLOR: Record<string, string> = {
  bull: '#2ECC8A',
  bear: '#E05252',
  neutral: '#C9A84C',
};

export default function GeniePanel() {
  const [expanded, setExpanded] = useState(true);
  const [allocation, setAllocation] = useState({ btc: 65, gold: 35 });

  const btcBase = BTC_HISTORY[0];
  const goldBase = GOLD_HISTORY[0];
  const btcIdx = BTC_HISTORY.map(v => +((v / btcBase) * 100).toFixed(1));
  const goldIdx = GOLD_HISTORY.map(v => +((v / goldBase) * 100).toFixed(1));

  const chartW = 260;
  const chartH = 90;
  const minV = 86;
  const maxV = 114;
  const range = maxV - minV;

  const toX = (i: number) => (i / (btcIdx.length - 1)) * chartW;
  const toY = (v: number) => chartH - ((v - minV) / range) * chartH;

  const makePath = (vals: number[]) =>
    vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');

  return (
    <div style={{
      background: '#0F1318',
      borderTop: '1px solid rgba(201,168,76,0.15)',
      flexShrink: 0,
    }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: expanded ? '1px solid rgba(201,168,76,0.1)' : 'none',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{
          width: 6, height: 6, borderRadius: '50%', background: '#2ECC8A', flexShrink: 0,
        }} />
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#C9A84C', letterSpacing: '0.1em' }}>
          GENIE AI HEDGE INTELLIGENCE
        </span>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#4A4844', marginLeft: 8 }}>
          2026-04-02 | 30D WINDOW | RISK-ON
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#4A4844' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {expanded && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 280px 220px',
          gap: 0,
        }}>
          {/* Left: allocation + chart */}
          <div style={{ padding: '12px 16px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 8 }}>
              RECOMMENDED ALLOCATION
            </div>

            {/* Allocation bar */}
            <div style={{
              height: 24,
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              marginBottom: 6,
              border: '1px solid rgba(201,168,76,0.12)',
            }}>
              <div style={{
                width: `${allocation.btc}%`,
                background: '#F7931A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontFamily: 'IBM Plex Mono, monospace',
                fontWeight: 500,
                color: '#090B0E',
                transition: 'width 0.5s ease',
              }}>
                BTC {allocation.btc}%
              </div>
              <div style={{
                flex: 1,
                background: '#C9A84C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontFamily: 'IBM Plex Mono, monospace',
                fontWeight: 500,
                color: '#090B0E',
              }}>
                XAU {allocation.gold}%
              </div>
            </div>

            {/* Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>BTCUSD</span>
              <input
                type="range"
                min={30}
                max={80}
                step={5}
                value={allocation.btc}
                onChange={e => setAllocation({ btc: +e.target.value, gold: 100 - +e.target.value })}
                style={{ flex: 1, accentColor: '#F7931A', height: 3, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>XAU</span>
            </div>

            {/* Chart */}
            <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em', marginBottom: 6 }}>
              30D TREND — INDEXED TO 100
            </div>
            <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', height: 90, display: 'block' }}>
              <path d={makePath(btcIdx)} fill="none" stroke="#F7931A" strokeWidth="1.5" />
              <path d={makePath(goldIdx)} fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4,2" />
              <line x1="0" y1={toY(100)} x2={chartW} y2={toY(100)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 16, height: 2, background: '#F7931A' }} />
                <span style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>BTC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 16, height: 2, background: '#C9A84C', borderTop: '2px dashed #C9A84C' }} />
                <span style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>XAU</span>
              </div>
            </div>

            <div style={{
              marginTop: 10,
              padding: '8px 10px',
              background: 'rgba(74,158,204,0.06)',
              border: '1px solid rgba(74,158,204,0.15)',
              borderRadius: 2,
              fontSize: 10,
              color: '#8A8880',
              fontFamily: 'IBM Plex Mono, monospace',
              lineHeight: 1.6,
            }}>
              Pro-Bitcoin tilt justified by sustained momentum and risk-on macro.
              Maintain 35% gold as structural hedge against regime reversal or policy error.
            </div>
          </div>

          {/* Middle: macro signals */}
          <div style={{ padding: '12px 14px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 8 }}>
              MACRO SIGNALS
            </div>
            {MACRO_SIGNALS.map((sig, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '7px 0',
                borderBottom: i < MACRO_SIGNALS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{ fontSize: 10, color: '#8A8880' }}>{sig.label}</span>
                <span style={{
                  fontSize: 9,
                  fontFamily: 'IBM Plex Mono, monospace',
                  letterSpacing: '0.05em',
                  padding: '2px 7px',
                  borderRadius: 2,
                  background: `${SIGNAL_COLOR[sig.type]}18`,
                  color: SIGNAL_COLOR[sig.type],
                }}>
                  {sig.value}
                </span>
              </div>
            ))}

            {/* Price ranges */}
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 8 }}>
                30D RANGES
              </div>
              {[
                { label: 'BTC', low: '$65,963', high: '$74,858', color: '#F7931A', pct: 100 },
                { label: 'XAU', low: '$4,401', high: '$5,157', color: '#C9A84C', pct: 75 },
              ].map((r) => (
                <div key={r.label} style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>{r.label} {r.low}</span>
                    <span style={{ fontSize: 9, color: r.color, fontFamily: 'IBM Plex Mono, monospace' }}>{r.high}</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2 }}>
                    <div style={{ height: 3, width: `${r.pct}%`, background: r.color, borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: tactical triggers */}
          <div style={{ padding: '12px 14px' }}>
            <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 8 }}>
              TACTICAL TRIGGERS
            </div>
            {TRIGGERS.map((t, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                padding: '7px 0',
                borderBottom: i < TRIGGERS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{ color: '#4A9ECC', flexShrink: 0, fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}>&#9656;</span>
                <span style={{ fontSize: 10, color: '#8A8880', lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}

            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 8 }}>
                REGIME CONTEXT
              </div>
              {[
                { label: 'Volatility', val: 'BTC: HIGH | XAU: MOD' },
                { label: 'Correlation', val: 'DIVERGED (improved diversification)' },
                { label: 'Hedging demand', val: 'Lower gold / Higher BTC' },
              ].map((row, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>{row.label}</div>
                  <div style={{ fontSize: 10, color: '#8A8880', fontFamily: 'IBM Plex Mono, monospace', marginTop: 1 }}>{row.val}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 10,
              padding: '7px 9px',
              background: '#131820',
              border: '1px solid rgba(201,168,76,0.12)',
              borderRadius: 2,
            }}>
              <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', marginBottom: 2 }}>POWERED BY</div>
              <div style={{ fontSize: 10, color: '#C9A84C', fontFamily: 'IBM Plex Mono, monospace' }}>Genie AI + AiHedger Azure Fn</div>
              <div style={{ fontSize: 9, color: '#4A4844', marginTop: 1 }}>CoinGecko 30D | Not financial advice</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
