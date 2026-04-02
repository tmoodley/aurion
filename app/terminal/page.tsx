'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import AssetSidebar from '@/components/AssetSidebar';
import AssetStats from '@/components/AssetStats';
import PriceChart from '@/components/PriceChart';
import AISignalPanel from '@/components/AISignalPanel';
import TradePanel from '@/components/TradePanel';
import PortfolioPanel from '@/components/PortfolioPanel';
import OnrampPanel from '@/components/OnrampPanel';
import WalletPanel from '@/components/WalletPanel';
import { ASSETS, AssetKey } from '@/lib/assets';

type RightTab = 'trade' | 'portfolio' | 'onramp' | 'wallet';

export default function Home() {
  const [selectedAsset, setSelectedAsset] = useState<AssetKey>('BTC');
  const [rightTab, setRightTab] = useState<RightTab>('trade');
  const asset = ASSETS[selectedAsset];

  const rightTabs: { key: RightTab; label: string }[] = [
    { key: 'trade', label: 'Trade' },
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'onramp', label: 'Onramp' },
    { key: 'wallet', label: 'Wallet' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Topbar onNotifClick={() => {}} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <AssetSidebar selected={selectedAsset} onSelect={setSelectedAsset} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <AssetStats asset={asset} />
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <PriceChart asset={asset} />
              <AISignalPanel asset={asset} />
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>RECENT ACTIVITY</div>
                {[
                  { type: 'BUY', asset: 'BTC', amount: '$500', receive: '0.00531 BTC', time: '14:32:18', color: 'var(--green)' },
                  { type: 'ONRAMP', asset: 'M-Pesa -> AGD', amount: 'KES 5,200', receive: '38.4 AGD', time: '11:15:42', color: 'var(--gold)' },
                  { type: 'BUY', asset: 'NDX', amount: '$200', receive: '46.7 NDX', time: '09:04:11', color: 'var(--green)' },
                  { type: 'SELL', asset: 'COOP', amount: '2 coins', receive: '$122.80', time: 'Yesterday', color: 'var(--red)' },
                ].map((tx, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 6px', background: tx.color + '22', border: '1px solid ' + tx.color + '44', borderRadius: 3, color: tx.color }}>{tx.type}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{tx.asset}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>{tx.amount}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{tx.receive} · {tx.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: 280, borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                {rightTabs.map(t => (
                  <button key={t.key} onClick={() => setRightTab(t.key)} style={{ flex: 1, padding: '9px 4px', background: 'transparent', border: 'none', borderBottom: rightTab === t.key ? '2px solid var(--gold)' : '2px solid transparent', color: rightTab === t.key ? 'var(--gold)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer', letterSpacing: '0.05em' }}>
                    {t.label.toUpperCase()}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
                {rightTab === 'trade' && <TradePanel asset={asset} />}
                {rightTab === 'portfolio' && <PortfolioPanel />}
                {rightTab === 'onramp' && <OnrampPanel />}
                {rightTab === 'wallet' && <WalletPanel />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
