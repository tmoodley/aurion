'use client';
import { useState } from 'react';
import { Asset } from '@/lib/assets';

export default function AISignalPanel({ asset }: { asset: Asset }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{
      background: '#0F1318',
      borderBottom: '1px solid rgba(201,168,76,0.1)',
      flexShrink: 0,
    }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#4A4844', letterSpacing: '0.1em' }}>
          AI SIGNAL — {asset.name}
        </span>
        <span style={{ marginLeft: 'auto', color: '#4A4844', fontSize: 10, fontFamily: 'IBM Plex Mono, monospace' }}>
          {expanded ? '▲' : '▼'}
        </span>
      </button>

      {expanded && (
        <div style={{ padding: '0 16px 12px' }}>
          <p style={{ fontSize: 12, color: '#8A8880', lineHeight: 1.7, marginBottom: 10 }}>
            {asset.aiRead}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { label: 'PRODUCTION SIGNAL', val: 'Migodi-Auric: Active', color: '#2ECC8A' },
              { label: 'ORACLE NETWORK', val: 'NodeBoss: 200 nodes', color: '#2ECC8A' },
              { label: 'CHAIN', val: asset.chain, color: '#8A8880' },
            ].map((item, i) => (
              <div key={i} style={{
                flex: 1,
                padding: '8px 10px',
                background: '#131820',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em', marginBottom: 3 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 11, color: item.color, fontFamily: 'IBM Plex Mono, monospace' }}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
