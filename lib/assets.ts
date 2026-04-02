export type AssetKey = 'BTC' | 'AGD' | 'COOP' | 'NDX' | 'COPPER';

export interface Asset {
  key: AssetKey;
  name: string;
  fullName: string;
  price: number;
  change24h: number;
  changePct: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  signal: 'BUY' | 'SELL' | 'HOLD' | 'ACCUMULATE';
  chain: string;
  aiRead: string;
  color: string;
  priceHistory: number[];
}

export const ONRAMPS = [
  { id: 'mpesa',   label: 'M-Pesa',       name: 'M-Pesa',       region: 'Kenya / TZ',  color: '#2ECC8A', icon: '📱', desc: 'Mobile money — Kenya, Tanzania' },
  { id: 'mtn',     label: 'MTN MoMo',     name: 'MTN MoMo',     region: 'Ghana / UG',  color: '#F7931A', icon: '📶', desc: 'Mobile money — Ghana, Uganda' },
  { id: 'absa',    label: 'ABSA Bank',    name: 'ABSA Bank',    region: 'Zambia / SA', color: '#E05252', icon: '🏦', desc: 'Bank transfer — Zambia, South Africa' },
  { id: 'cowries', label: 'Cowries',      name: 'Cowries',      region: 'Nigeria',     color: '#C9A84C', icon: '🐚', desc: 'Digital wallet — Nigeria' },
  { id: 'airtel',  label: 'Airtel Money', name: 'Airtel Money', region: 'ZM / MW',     color: '#E05252', icon: '📡', desc: 'Mobile money — Zambia, Malawi' },
  { id: 'swift',   label: 'SWIFT / Wire', name: 'SWIFT / Wire', region: 'Global',      color: '#4A9ECC', icon: '🌐', desc: 'Bank wire — global diaspora corridors' },
];

export const PORTFOLIO = [
  {
    key: 'BTC' as AssetKey,
    amount: 0.412,
    avgBuy: 65000,
    alloc: 65,
  },
  {
    key: 'AGD' as AssetKey,
    amount: 145.5,
    avgBuy: 60.20,
    alloc: 21,
  },
  {
    key: 'NDX' as AssetKey,
    amount: 500,
    avgBuy: 10.00,
    alloc: 14,
  },
];

export const ASSETS: Record<AssetKey, Asset> = {
  BTC: {
    key: 'BTC',
    name: 'BTC',
    fullName: 'Bitcoin',
    price: 71200,
    change24h: 840,
    changePct: 1.19,
    high24h: 72100,
    low24h: 69800,
    volume24h: '$38.2B',
    signal: 'BUY',
    chain: 'Bitcoin L1',
    color: '#F7931A',
    aiRead: 'BTC maintaining upward bias post-March rally. Strong momentum from $67K base. Genie AI 30-day model: 65% allocation. Watch $74,858 resistance — breakout targets $78K. Risk-on flows dominant.',
    priceHistory: [67000,69500,70200,72100,74858,72500,70800,69200,68500,67100,66800,68200,69800,71200],
  },
  AGD: {
    key: 'AGD',
    name: 'AGD',
    fullName: 'Afro Gold Dollar',
    price: 62.40,
    change24h: 0.18,
    changePct: 0.29,
    high24h: 62.90,
    low24h: 61.80,
    volume24h: '$1.2M',
    signal: 'ACCUMULATE',
    chain: 'Polygon PoS',
    color: '#C9A84C',
    aiRead: 'AGD tracking Coop Coin (10g gold) 1:1 peg. ABSA-backed. Gold in 30-day downtrend from $5,157 peak — current AGD discount relative to XAU provides accumulation window. Migodi-Auric reserves verified.',
    priceHistory: [61.2,61.8,62.0,62.5,63.1,62.8,62.4,62.0,61.6,61.4,61.5,61.9,62.2,62.4],
  },
  COOP: {
    key: 'COOP',
    name: 'COOP',
    fullName: 'Coop Coin',
    price: 62.40,
    change24h: 0.20,
    changePct: 0.32,
    high24h: 62.95,
    low24h: 61.70,
    volume24h: '$480K',
    signal: 'HOLD',
    chain: 'Polygon PoS',
    color: '#2ECC8A',
    aiRead: 'Coop Coin (10g gold bar, ABSA-custodied). Physical delivery via Coop Pay Ltd trade floor network across Zambia cooperatives. Cletus directive: full ZAMACE commodity coverage before derivative issuance.',
    priceHistory: [61.0,61.5,61.9,62.3,62.8,62.5,62.1,61.8,61.5,61.3,61.4,61.7,62.0,62.4],
  },
  NDX: {
    key: 'NDX',
    name: 'NDX',
    fullName: 'NdeipiCoin',
    price: 10.00,
    change24h: 0,
    changePct: 0,
    high24h: 10.00,
    low24h: 10.00,
    volume24h: 'Pre-launch',
    signal: 'ACCUMULATE',
    chain: 'Prospera ZEDE / Roatan',
    color: '#8B7ECC',
    aiRead: 'NdeipiCoin: 21M hard cap security token. THE SHARES of Ndeipi Foundation (Prospera ZEDE, Honduras). NSE prospectus: 1,000,000 NDX at $10/token. ROFR exercisable in NDX. Pre-launch accumulation phase.',
    priceHistory: [10,10,10,10,10,10,10,10,10,10,10,10,10,10],
  },
  COPPER: {
    key: 'COPPER',
    name: 'COPPER',
    fullName: 'Coop Bar (Copper)',
    price: 9.20,
    change24h: -0.12,
    changePct: -1.29,
    high24h: 9.45,
    low24h: 9.10,
    volume24h: '$210K',
    signal: 'HOLD',
    chain: 'Polygon PoS',
    color: '#B87333',
    aiRead: 'Coop Bar: 1kg copper bar, ABSA-custodied. Joint venture: Aurion Trading Ltd + Ndeipi Inc. Coop Derivatives pending ZAMACE coverage completion. Zambian copper belt production oracle via NodeBoss network.',
    priceHistory: [9.5,9.4,9.35,9.42,9.48,9.41,9.30,9.22,9.15,9.10,9.12,9.18,9.22,9.20],
  },
};
