'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import AssetSidebar from '@/components/AssetSidebar';
import AssetStats from '@/components/AssetStats';
import PriceChart from '@/components/PriceChart';
import AISignalPanel from '@/components/AISignalPanel';
import GeniePanel from '@/components/GeniePanel';
import TradePanel from '@/components/TradePanel';
import PortfolioPanel from '@/components/PortfolioPanel';
import OnrampPanel from '@/components/OnrampPanel';
import WalletPanel from '@/components/WalletPanel';
import { ASSETS, AssetKey } from '@/lib/assets';

type RightTab = 'trade' | 'portfolio' | 'onramp' | 'wallet';

const RIGHT_TABS: { key: RightTab; label: string }[] = [
  { key: 'trade', label: 'TRADE' },
  { key: 'portfolio', label: 'PORTFOLIO' },
  { key: 'onramp', label: 'ONRAMP' },
  { key: 'wallet', label: 'WALLET' },
];

export default function Home() {
  const [selectedAsset, setSelectedAsset] = useState<AssetKey>('BTC');
  const [rightTab, setRightTab] = useState<RightTab>('trade');
  const asset = ASSETS[selectedAsset];

  const s: Record<string, React.CSSProperties> = {
    root: { display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#090B0E' },
    body: { display: 'flex', flex: 1, overflow: 'hidden' },
    center: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    chartArea: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    right: {
      width: 240,
      flexShrink: 0,
      background: '#0E1117',
      borderLeft: '1px solid rgba(201,168,76,0.15)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    tabBar: {
      display: 'flex',
      borderBottom: '1px solid rgba(201,168,76,0.12)',
      flexShrink: 0,
    },
    tab: (active: boolean): React.CSSProperties => ({
      flex: 1,
      padding: '9px 4px',
      background: 'transparent',
      border: 'none',
      borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent',
      color: active ? '#C9A84C' : '#4A4844',
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: 9,
      cursor: 'pointer',
      letterSpacing: '0.06em',
    }),
    tabContent: { flex: 1, overflowY: 'auto' },
  };

  return (
    <div style={s.root}>
      <Topbar />
      <div style={s.body}>
        <AssetSidebar selected={selectedAsset} onSelect={setSelectedAsset} />

        <div style={s.center}>
          <AssetStats asset={asset} />

          <div style={s.chartArea}>
            <AISignalPanel asset={asset} />
            <PriceChart asset={asset} />
          </div>

          {/* Genie AI Hedge Panel -- docked at bottom of center column */}
          <GeniePanel />
        </div>

        {/* Right sidebar */}
        <div style={s.right}>
          <div style={s.tabBar}>
            {RIGHT_TABS.map(t => (
              <button
                key={t.key}
                style={s.tab(rightTab === t.key)}
                onClick={() => setRightTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div style={s.tabContent}>
            {rightTab === 'trade' && <TradePanel asset={asset} />}
            {rightTab === 'portfolio' && <PortfolioPanel />}
            {rightTab === 'onramp' && <OnrampPanel />}
            {rightTab === 'wallet' && <WalletPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}
