'use client';

const HOLDINGS = [
  { name: 'Bitcoin', ticker: 'BTC', amount: 0.412, price: 71200, color: '#F7931A', alloc: 65 },
  { name: 'Afro Gold Dollar', ticker: 'AGD', amount: 145.5, price: 62.40, color: '#C9A84C', alloc: 21 },
  { name: 'NdeipiCoin', ticker: 'NDX', amount: 500, price: 10.00, color: '#8B7ECC', alloc: 14 },
];

export default function PortfolioPanel() {
  const total = HOLDINGS.reduce((acc, h) => acc + h.amount * h.price, 0);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 4 }}>TOTAL VALUE</div>
      <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 22, color: '#E8E4D9', marginBottom: 14 }}>
        ${total.toLocaleString('en', { maximumFractionDigits: 0 })}
      </div>

      {/* Allocation bar */}
      <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 12, gap: 1 }}>
        {HOLDINGS.map(h => (
          <div key={h.ticker} style={{ width: `${h.alloc}%`, background: h.color }} />
        ))}
      </div>

      {HOLDINGS.map((h) => {
        const val = h.amount * h.price;
        const pnl = val * 0.092;
        return (
          <div key={h.ticker} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '9px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: h.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 12, color: '#E8E4D9' }}>{h.ticker}</div>
                <div style={{ fontSize: 10, color: '#4A4844' }}>{h.amount} units</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#E8E4D9' }}>
                ${val.toLocaleString('en', { maximumFractionDigits: 0 })}
              </div>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#2ECC8A' }}>
                +${pnl.toLocaleString('en', { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: 14, padding: '8px 10px', background: '#131820', borderRadius: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 10, color: '#4A4844' }}>Total return</span>
          <span style={{ fontSize: 11, color: '#2ECC8A', fontFamily: 'IBM Plex Mono, monospace' }}>+9.2%</span>
        </div>
      </div>
    </div>
  );
}
