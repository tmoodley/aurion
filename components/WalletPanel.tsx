'use client';
import { useState } from 'react';

const WALLETS = [
  { id: 'metamask', label: 'MetaMask', chain: 'Polygon PoS', color: '#F7931A' },
  { id: 'phantom', label: 'Phantom', chain: 'Solana', color: '#8B7ECC' },
  { id: 'walletconnect', label: 'WalletConnect', chain: 'Multi-chain', color: '#4A9ECC' },
  { id: 'coinbase', label: 'Coinbase Wallet', chain: 'Polygon PoS', color: '#2ECC8A' },
];

export default function WalletPanel() {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState<string | null>(null);

  const connect = (id: string) => {
    setConnecting(id);
    setTimeout(() => {
      setConnecting(null);
      setConnected(id);
    }, 1400);
  };

  const w = connected ? WALLETS.find(w => w.id === connected) : null;

  return (
    <div style={{ padding: 16 }}>
      {connected && w ? (
        <div>
          <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 10 }}>
            CONNECTED
          </div>
          <div style={{ padding: '12px', background: '#131820', borderRadius: 3, border: `1px solid ${w.color}44`, marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: w.color, fontFamily: 'IBM Plex Mono, monospace', marginBottom: 4 }}>{w.label}</div>
            <div style={{ fontSize: 10, color: '#4A4844', marginBottom: 8 }}>{w.chain}</div>
            <div style={{ fontSize: 11, color: '#8A8880', fontFamily: 'IBM Plex Mono, monospace', wordBreak: 'break-all' }}>
              0x3f8a...7c2d
            </div>
          </div>
          <div style={{ background: '#131820', borderRadius: 3, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: '#4A4844' }}>MATIC balance</span>
              <span style={{ fontSize: 10, color: '#8A8880', fontFamily: 'IBM Plex Mono, monospace' }}>42.18 MATIC</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, color: '#4A4844' }}>AGD balance</span>
              <span style={{ fontSize: 10, color: '#C9A84C', fontFamily: 'IBM Plex Mono, monospace' }}>145.50 AGD</span>
            </div>
          </div>
          <button onClick={() => setConnected(null)} style={{
            width: '100%',
            marginTop: 10,
            background: 'transparent',
            border: '1px solid rgba(224,82,82,0.3)',
            color: '#E05252',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 10,
            padding: '7px',
            borderRadius: 2,
            cursor: 'pointer',
            letterSpacing: '0.06em',
          }}>DISCONNECT</button>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: 10 }}>
            CONNECT WALLET
          </div>
          {WALLETS.map(wallet => (
            <button
              key={wallet.id}
              onClick={() => connect(wallet.id)}
              disabled={!!connecting}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: connecting === wallet.id ? `${wallet.color}14` : 'transparent',
                border: `1px solid ${connecting === wallet.id ? wallet.color + '44' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 3,
                padding: '10px 12px',
                cursor: 'pointer',
                marginBottom: 6,
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 12, color: '#E8E4D9', fontFamily: 'IBM Plex Mono, monospace' }}>{wallet.label}</div>
                <div style={{ fontSize: 10, color: '#4A4844', marginTop: 1 }}>{wallet.chain}</div>
              </div>
              <span style={{ fontSize: 10, color: connecting === wallet.id ? wallet.color : '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>
                {connecting === wallet.id ? 'Connecting...' : 'Connect'}
              </span>
            </button>
          ))}
        </>
      )}
    </div>
  );
}
