'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '@/components/Topbar';
import { ASSETS, AssetKey } from '@/lib/assets';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MARKET_NEWS = [
  { headline: 'Migodi-Auric certifies 3.2t gold production via NodeBoss batch #2847', time: '2h ago', tag: 'ORACLE', color: '#C9A84C' },
  { headline: 'Zambia copper output up 8.4% YoY — LME copper futures rally', time: '4h ago', tag: 'COPPER', color: '#E05252' },
  { headline: 'African diaspora remittances hit $100B milestone — World Bank', time: '6h ago', tag: 'MACRO', color: '#4A9ECC' },
  { headline: 'Bank of Zambia signals CBDC pilot — Ndeipi oracle integration roadmap', time: '1d ago', tag: 'REGULATORY', color: '#8B7ECC' },
  { headline: 'NdeipiCoin NDX Foundation completes Prospera ZEDE registration', time: '2d ago', tag: 'NDX', color: '#8B7ECC' },
  { headline: 'Bitcoin ETF inflows reach $1.2B weekly — diaspora wallets accumulating', time: '2d ago', tag: 'BTC', color: '#E8C97A' },
];

const ORACLE_EVENTS = [
  { event: 'NodeBoss batch #2847 certified', location: 'Ndola, Zambia', production: '+3.2t Au', time: '2h ago' },
  { event: 'NodeBoss batch #2846 certified', location: 'Eastern Province', production: '+1.8t Au', time: '14h ago' },
  { event: 'UTMD sensor array sync', location: 'Kafue Flats', production: '200 nodes', time: '1d ago' },
  { event: 'Coop Bar batch verified', location: 'Copper Belt', production: '+42t Cu', time: '2d ago' },
];

const MACRO = [
  { label: 'Gold spot (XAU)', value: '$3,042/oz', delta: '+0.4%', up: true },
  { label: 'Copper (LME)', value: '$9,420/t', delta: '+1.1%', up: true },
  { label: 'USD/ZMW', value: '26.82', delta: '-0.3%', up: false },
  { label: 'USD/KES', value: '129.4', delta: '+0.2%', up: true },
  { label: 'BTC dominance', value: '54.2%', delta: '+0.8%', up: true },
  { label: 'DXY', value: '104.2', delta: '-0.1%', up: false },
];

export default function MarketsPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume'>('name');
  const [filter, setFilter] = useState<'all' | 'gold' | 'btc' | 'tokens'>('all');

  const assets = Object.values(ASSETS);

  const filtered = assets.filter(a => {
    if (filter === 'gold') return ['AGD', 'COOP'].includes(a.key);
    if (filter === 'btc') return a.key === 'BTC';
    if (filter === 'tokens') return ['NDX', 'COPPER'].includes(a.key);
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price') return b.price - a.price;
    if (sortBy === 'change') return b.delta - a.delta;
    if (sortBy === 'name') return a.key.localeCompare(b.key);
    return 0;
  });

  const formatPrice = (price: number) =>
    price > 1000 ? `$${price.toLocaleString()}` : `$${price.toFixed(2)}`;

  const MiniChart = ({ history, color }: { history: number[]; color: string }) => {
    const data = history.map((v, i) => ({ v, i }));
    return (
      <ResponsiveContainer width={80} height={32}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '24px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: 4 }}>Markets</h1>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Production-backed assets · Ndeipi oracle network · Real-time signals</div>
        </div>

        {/* Macro strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 20 }}>
          {MACRO.map(m => (
            <div key={m.label} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)', marginBottom: 2 }}>{m.value}</div>
              <div style={{ fontSize: 10, color: m.up ? 'var(--green)' : 'var(--red)', display: 'flex', alignItems: 'center', gap: 3 }}>
                {m.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {m.delta}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 20 }}>

          {/* Left: asset table */}
          <div>
            {/* Filters */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {(['all', 'gold', 'btc', 'tokens'] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 12px', background: filter === f ? 'rgba(201,168,76,0.12)' : 'transparent', border: filter === f ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 4, color: filter === f ? 'var(--gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer', letterSpacing: '0.04em' }}>
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', alignSelf: 'center', fontFamily: 'var(--font-mono)' }}>SORT:</span>
                {(['name', 'price', 'change', 'volume'] as const).map(s => (
                  <button key={s} onClick={() => setSortBy(s)} style={{ padding: '4px 8px', background: sortBy === s ? 'rgba(201,168,76,0.08)' : 'transparent', border: sortBy === s ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 3, color: sortBy === s ? 'var(--gold)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 9, cursor: 'pointer', letterSpacing: '0.04em' }}>
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset rows */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr 1fr 0.7fr', padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                {['Asset', 'Price', '24H', 'Volume', 'Signal', ''].map(h => (
                  <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{h}</div>
                ))}
              </div>

              {sorted.map((asset, i) => (
                <div key={asset.key} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 0.8fr 1fr 1fr 0.7fr', padding: '12px 16px', borderBottom: i < sorted.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center', cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  onClick={() => router.push('/terminal')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: asset.color, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: asset.color }}>{asset.key}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{asset.name}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)' }}>
                    {formatPrice(asset.price)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: asset.delta >= 0 ? 'var(--green)' : 'var(--red)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                    {asset.delta >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {asset.delta >= 0 ? '+' : ''}{asset.delta.toFixed(1)}%
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>{asset.volume}</div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, padding: '2px 6px', borderRadius: 3, background: `${asset.signalColor}18`, border: `1px solid ${asset.signalColor}33`, color: asset.signalColor, letterSpacing: '0.04em' }}>
                      {asset.signal}
                    </span>
                  </div>
                  <div>
                    <MiniChart history={asset.history} color={asset.color} />
                  </div>
                </div>
              ))}
            </div>

            {/* AI reads */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 14 }}>AURION AI — MARKET OVERVIEW</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Production oracle data from <span style={{ color: 'var(--gold)' }}>Migodi-Auric</span> confirms strong physical backing for COOP and AGD. NodeBoss telemetry shows 200 active nodes. Diaspora remittance corridors from Toronto, London, and Lagos are accelerating inflows into African-backed assets.
                <br /><br />
                <span style={{ color: 'var(--gold)' }}>BTC</span> consolidating above $90K support. <span style={{ color: '#8B7ECC' }}>NDX</span> approaching key $4.35 resistance. <span style={{ color: '#2ECC8A' }}>COOP/AGD</span> tracking physical gold with strong accumulate signal driven by Zambian production events.
              </div>
            </div>
          </div>

          {/* Right: news + oracle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Oracle events */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div className="animate-pulse-gold" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>NDEIPI ORACLE EVENTS</span>
              </div>
              {ORACLE_EVENTS.map((ev, i) => (
                <div key={i} style={{ padding: '9px 0', borderBottom: i < ORACLE_EVENTS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-primary)', marginBottom: 2 }}>{ev.event}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ev.location} · <span style={{ color: 'var(--green)' }}>{ev.production}</span></span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Market news */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>MARKET NEWS</div>
              {MARKET_NEWS.map((n, i) => (
                <div key={i} style={{ padding: '9px 0', borderBottom: i < MARKET_NEWS.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 2, background: `${n.color}18`, border: `1px solid ${n.color}33`, color: n.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>{n.tag}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{n.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.headline}</div>
                </div>
              ))}
            </div>

            {/* Quick trade CTA */}
            <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border-bright)', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', marginBottom: 6, letterSpacing: '0.06em' }}>READY TO TRADE?</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>Access the full trading terminal with AI signals and live order execution.</div>
              <button onClick={() => router.push('/terminal')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--gold)', border: 'none', borderRadius: 5, color: '#090B0E', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.06em' }}>
                OPEN TERMINAL <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
