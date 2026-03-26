'use client';
import { PORTFOLIO, ASSETS } from '@/lib/assets';

export default function PortfolioPanel() {
  const totalValue = PORTFOLIO.reduce((s, p) => s + p.value, 0);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>PORTFOLIO</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--gold)' }}>${totalValue.toLocaleString()}</span>
      </div>

      {/* Allocation bar */}
      <div style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', marginBottom: 14 }}>
        {PORTFOLIO.map(p => {
          const asset = ASSETS[p.asset as keyof typeof ASSETS];
          return (
            <div key={p.asset} style={{ flex: p.allocation, background: asset?.color || 'var(--text-muted)' }} />
          );
        })}
      </div>

      {PORTFOLIO.map(p => {
        const asset = ASSETS[p.asset as keyof typeof ASSETS];
        return (
          <div key={p.asset} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: asset?.color || 'var(--text-muted)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>{p.asset}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.amount} {asset?.unit}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>${p.value.toLocaleString()}</div>
              <div style={{ fontSize: 10, color: 'var(--green)' }}>+{p.pnl}%</div>
            </div>
          </div>
        );
      })}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
        <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 5, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>TOTAL P&L</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--green)' }}>+$342</div>
        </div>
        <div style={{ padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 5, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>RETURN</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--green)' }}>+13.8%</div>
        </div>
      </div>
    </div>
  );
}
