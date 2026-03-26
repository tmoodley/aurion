'use client';
import { useState } from 'react';
import { Wallet, ExternalLink } from 'lucide-react';

const WALLETS = [
  { id: 'metamask', name: 'MetaMask', chain: 'Polygon', icon: '🦊', status: 'available' },
  { id: 'phantom', name: 'Phantom', chain: 'Solana', icon: '👻', status: 'available' },
  { id: 'walletconnect', name: 'WalletConnect', chain: 'Multi-chain', icon: '🔗', status: 'available' },
  { id: 'coinbase', name: 'Coinbase Wallet', chain: 'Polygon', icon: '🔵', status: 'available' },
];

export default function WalletPanel() {
  const [connected, setConnected] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<string | null>(null);

  const connect = (id: string) => {
    setConnecting(id);
    setTimeout(() => {
      setConnected(id);
      setConnecting(null);
    }, 1200);
  };

  const activeWallet = WALLETS.find(w => w.id === connected);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Wallet size={14} color="var(--text-muted)" />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>WALLET</span>
      </div>

      {connected ? (
        <div className="animate-slide-up">
          <div style={{
            padding: '10px 12px',
            background: 'rgba(46,204,138,0.08)',
            border: '1px solid rgba(46,204,138,0.25)',
            borderRadius: 5,
            marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{activeWallet?.icon}</span>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 500 }}>{activeWallet?.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{activeWallet?.chain}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                <span style={{ fontSize: 10, color: 'var(--green)' }}>Connected</span>
              </div>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', wordBreak: 'break-all', marginBottom: 8 }}>
            0x3f4a...8c2d
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{
              flex: 1, padding: '6px', background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)', borderRadius: 4,
              color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
            }}>
              Copy address
            </button>
            <button
              onClick={() => setConnected(null)}
              style={{
                flex: 1, padding: '6px', background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)', borderRadius: 4,
                color: 'var(--red)', fontSize: 11, cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {WALLETS.map(w => (
            <button
              key={w.id}
              onClick={() => connect(w.id)}
              disabled={!!connecting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                background: connecting === w.id ? 'rgba(201,168,76,0.08)' : 'var(--bg-tertiary)',
                border: connecting === w.id ? '1px solid var(--border-bright)' : '1px solid var(--border)',
                borderRadius: 5,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>{w.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)' }}>{w.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{w.chain}</div>
                </div>
              </div>
              <span style={{ fontSize: 11, color: connecting === w.id ? 'var(--gold)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {connecting === w.id ? 'Connecting...' : 'Connect →'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
