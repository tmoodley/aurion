'use client';
import { useState } from 'react';
import { Cpu, ChevronRight } from 'lucide-react';
import { Asset } from '@/lib/assets';

interface Props { asset: Asset; }

export default function AISignalPanel({ asset }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      marginBottom: 12,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderBottom: expanded ? '1px solid var(--border)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={14} color={asset.color} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>AURION AI — MARKET READ</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 3,
            background: `${asset.signalColor}22`,
            border: `1px solid ${asset.signalColor}55`,
            color: asset.signalColor,
            letterSpacing: '0.06em',
          }}>{asset.signal}</span>
          <ChevronRight size={12} color="var(--text-muted)" style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
        </div>
      </button>

      {expanded && (
        <div style={{ padding: '12px 14px' }} className="animate-slide-up">
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {asset.aiRead}
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <div style={{ flex: 1, padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 4, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>PRODUCTION SIGNAL</div>
              <div style={{ fontSize: 12, color: 'var(--green)' }}>Migodi-Auric: Active</div>
            </div>
            <div style={{ flex: 1, padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 4, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>ORACLE NETWORK</div>
              <div style={{ fontSize: 12, color: 'var(--green)' }}>NodeBoss: 200 nodes</div>
            </div>
            <div style={{ flex: 1, padding: '8px 10px', background: 'var(--bg-tertiary)', borderRadius: 4, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>CHAIN</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{asset.chain}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
