export type AssetKey = 'BTC' | 'AGD' | 'COOP' | 'NDX' | 'COPPER';

export interface Asset {
  key: AssetKey;
  name: string;
  fullName: string;
  price: number;
  delta: number;
  volume: string;
  market: string;
  color: string;
  signal: 'ACCUMULATE' | 'STRONG ACCUMULATE' | 'MODERATE ACCUMULATE' | 'HOLD' | 'STRATEGIC';
  signalColor: string;
  aiRead: string;
  unit: string;
  chain: string;
  history: number[];
}

export const ASSETS: Record<AssetKey, Asset> = {
  BTC: {
    key: 'BTC',
    name: 'Bitcoin',
    fullName: 'Bitcoin',
    price: 94210,
    delta: 2.4,
    volume: '$1.24B',
    market: 'Global / All chains',
    color: '#E8C97A',
    signal: 'MODERATE ACCUMULATE',
    signalColor: '#2ECC8A',
    aiRead: 'Bitcoin consolidating above the $90K support band. Diaspora remittance flows into West Africa rose 14% this week. On-chain accumulation from African mobile wallets is accelerating. AURION oracle network detects elevated buying pressure from Lagos, Nairobi, and Lusaka corridors. Pair BTC exposure with Afro Gold Dollar for inflation-hedged settlement.',
    unit: 'BTC',
    chain: 'Bitcoin / Polygon bridge',
    history: [88200, 89500, 91000, 90100, 92400, 93800, 94210, 93600, 94800, 95100, 94500, 94210],
  },
  AGD: {
    key: 'AGD',
    name: 'Afro Gold Dollar',
    fullName: 'Afro Gold Dollar',
    price: 61.40,
    delta: 0.8,
    volume: '$4.2M',
    market: '1:1 Coop Coin peg',
    color: '#C9A84C',
    signal: 'STRONG ACCUMULATE',
    signalColor: '#2ECC8A',
    aiRead: 'Afro Gold Dollar holds its 1:1 peg to the Coop Coin (10g ABSA-vaulted gold). Physical gold reserves in Ndola increased 3.2 tonnes this week from Migodi-Auric ASGM operations. NodeBoss telemetry confirms production certification. Ideal for diaspora savers seeking inflation protection and zero-friction remittance settlement into African corridors.',
    unit: 'AGD',
    chain: 'Polygon (NdeipiCoin rails)',
    history: [60.8, 61.0, 61.1, 61.2, 61.1, 61.3, 61.4, 61.35, 61.4, 61.45, 61.4, 61.40],
  },
  COOP: {
    key: 'COOP',
    name: 'Coop Coin',
    fullName: 'Coop Coin (10g Gold)',
    price: 61.40,
    delta: 0.8,
    volume: '$820K',
    market: '10g ABSA Zambia vault',
    color: '#2ECC8A',
    signal: 'ACCUMULATE',
    signalColor: '#2ECC8A',
    aiRead: 'Coop Coin represents 10g of ABSA-vaulted Zambian gold, certified via Migodi-Auric Eastern Province operations and NodeBoss telemetry. Each coin carries a Proof of Production certificate on-chain. Fractional gold ownership without custody complexity -- ideal entry point for diaspora users moving from mobile money to real asset ownership.',
    unit: 'coins',
    chain: 'Polygon / ABSA custody',
    history: [60.5, 60.7, 61.0, 60.9, 61.1, 61.2, 61.4, 61.3, 61.4, 61.45, 61.4, 61.40],
  },
  NDX: {
    key: 'NDX',
    name: 'NdeipiCoin',
    fullName: 'NdeipiCoin (NDX)',
    price: 4.28,
    delta: 5.1,
    volume: '$310K',
    market: '21M hard cap',
    color: '#8B7ECC',
    signal: 'STRATEGIC',
    signalColor: '#8B7ECC',
    aiRead: 'NdeipiCoin is the 21M hard-cap security token powering the Ndeipi ecosystem -- yield-bearing, production-backed, and owned by Ndeipi Foundation (Prospera ZEDE, Honduras). NDX sits at the convergence of energy, intelligence, and carbon demand across African infrastructure. Strategic position for diaspora investors seeking upside beyond spot gold. IPO conversion pathway active.',
    unit: 'NDX',
    chain: 'Polygon (Ndeipi Foundation)',
    history: [3.80, 3.95, 4.10, 3.98, 4.05, 4.18, 4.28, 4.22, 4.30, 4.35, 4.28, 4.28],
  },
  COPPER: {
    key: 'COPPER',
    name: 'Coop Bar',
    fullName: 'Coop Bar (1kg Copper)',
    price: 9420,
    delta: 1.1,
    volume: '$1.8M',
    market: '1kg ABSA copper bar',
    color: '#E05252',
    signal: 'MODERATE ACCUMULATE',
    signalColor: '#E8C97A',
    aiRead: 'Coop Bar is a 1kg copper bar certified through ABSA Zambia and Migodi-Auric Eastern Province operations. Copper demand from EV manufacturing and African grid infrastructure is accelerating globally. LME copper futures signal supply tightening. AURION detects institutional accumulation across the Zambia Copper Belt corridor. Moderate accumulate for base metal exposure tied to real production.',
    unit: 'bars',
    chain: 'Polygon / ABSA custody',
    history: [9100, 9200, 9310, 9280, 9350, 9390, 9420, 9400, 9430, 9450, 9420, 9420],
  },
};

export const PORTFOLIO = [
  { asset: 'BTC', amount: 0.01318, value: 1242, allocation: 38, pnl: 12.4 },
  { asset: 'AGD', amount: 14.0, value: 860, allocation: 26, pnl: 3.2 },
  { asset: 'NDX', amount: 271.0, value: 1160, allocation: 36, pnl: 24.1 },
];

export const ONRAMPS = [
  { id: 'mpesa', name: 'M-Pesa', desc: 'Kenya / Tanzania', icon: '📱', color: '#2ECC8A' },
  { id: 'mtn', name: 'MTN Mobile', desc: 'Ghana / Uganda / SA', icon: '📡', color: '#E8C97A' },
  { id: 'absa', name: 'ABSA Bank', desc: 'Zambia / South Africa', icon: '🏦', color: '#4A9ECC' },
  { id: 'airtel', name: 'Airtel Money', desc: 'Zambia / Malawi', icon: '📶', color: '#E05252' },
  { id: 'cowries', name: 'Cowries', desc: 'Nigeria corridor', icon: '🐚', color: '#C9A84C' },
  { id: 'wire', name: 'SWIFT / Wire', desc: 'Diaspora global', icon: '🌍', color: '#8B7ECC' },
];
