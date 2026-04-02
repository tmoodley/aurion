'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import LoginScreen from '@/components/LoginScreen';
import RegisterScreen from '@/components/RegisterScreen';
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
import ProfilePanel from '@/components/ProfilePanel';
import NotificationsPanel from '@/components/NotificationsPanel';
import SettingsPanel from '@/components/SettingsPanel';
import { ASSETS, AssetKey } from '@/lib/assets';

type RightTab = 'trade' | 'portfolio' | 'onramp' | 'wallet' | 'profile' | 'notifications' | 'settings';

const RIGHT_TABS: { key: RightTab; label: string; icon: string }[] = [
  { key: 'trade',         label: 'TRADE',   icon: '⇄' },
  { key: 'portfolio',     label: 'PORT',    icon: '◈' },
  { key: 'onramp',        label: 'ONRAMP',  icon: '↓' },
  { key: 'wallet',        label: 'WALLET',  icon: '◻' },
  { key: 'profile',       label: 'PROFILE', icon: '○' },
  { key: 'notifications', label: 'ALERTS',  icon: '◉' },
  { key: 'settings',      label: 'SETUP',   icon: '⚙' },
];

function Terminal() {
  const [selectedAsset, setSelectedAsset] = useState<AssetKey>('BTC');
  const [rightTab, setRightTab] = useState<RightTab>('trade');
  const asset = ASSETS[selectedAsset];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#090B0E' }}>
      <Topbar onNotifClick={() => setRightTab('notifications')} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <AssetSidebar selected={selectedAsset} onSelect={setSelectedAsset} />

        {/* Center column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <AssetStats asset={asset} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <AISignalPanel asset={asset} />
            <PriceChart asset={asset} />
          </div>
          <GeniePanel />
        </div>

        {/* Right sidebar */}
        <div style={{
          width: 248,
          flexShrink: 0,
          background: '#0E1117',
          borderLeft: '1px solid rgba(201,168,76,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Tab bar -- two rows of tabs */}
          <div style={{ flexShrink: 0, borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
            <div style={{ display: 'flex' }}>
              {RIGHT_TABS.slice(0, 4).map(t => (
                <button
                  key={t.key}
                  onClick={() => setRightTab(t.key)}
                  style={{
                    flex: 1,
                    padding: '8px 2px 6px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: rightTab === t.key ? '2px solid #C9A84C' : '2px solid transparent',
                    color: rightTab === t.key ? '#C9A84C' : '#4A4844',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 8,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {RIGHT_TABS.slice(4).map(t => (
                <button
                  key={t.key}
                  onClick={() => setRightTab(t.key)}
                  style={{
                    flex: 1,
                    padding: '7px 2px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: rightTab === t.key ? '2px solid #C9A84C' : '2px solid transparent',
                    color: rightTab === t.key ? '#C9A84C' : '#4A4844',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 8,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {rightTab === 'trade'         && <TradePanel asset={asset} />}
            {rightTab === 'portfolio'     && <PortfolioPanel />}
            {rightTab === 'onramp'        && <OnrampPanel />}
            {rightTab === 'wallet'        && <WalletPanel />}
            {rightTab === 'profile'       && <ProfilePanel />}
            {rightTab === 'notifications' && <NotificationsPanel />}
            {rightTab === 'settings'      && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [screen, setScreen] = useState<'login' | 'register'>('login');

  if (!user) {
    return screen === 'login'
      ? <LoginScreen onSwitchToRegister={() => setScreen('register')} />
      : <RegisterScreen onSwitchToLogin={() => setScreen('login')} />;
  }

  return <Terminal />;
}
