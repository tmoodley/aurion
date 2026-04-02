'use client';
import { useState } from 'react';
import Topbar from '@/components/Topbar';
import { ONRAMPS } from '@/lib/assets';
import { ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TRANSFER_HISTORY = [
  { from: 'M-Pesa', to: 'AGD', sent: 'KES 5,200', received: '38.4 AGD', fee: '$1.14', date: 'Mar 31, 11:15', status: 'confirmed' },
  { from: 'ABSA Bank', to: 'AGD', sent: 'ZMW 1,800', received: '62.1 AGD', fee: '$0.92', date: 'Mar 25, 09:11', status: 'confirmed' },
  { from: 'MTN Mobile', to: 'BTC', sent: 'GHS 1,200', received: '0.00142 BTC', fee: '$1.08', date: 'Mar 20, 14:32', status: 'confirmed' },
  { from: 'SWIFT', to: 'NDX', sent: 'CAD 500', received: '88.2 NDX', fee: '$4.20', date: 'Mar 15, 08:44', status: 'confirmed' },
  { from: 'Airtel Money', to: 'AGD', sent: 'MWK 45,000', received: '19.8 AGD', fee: '$0.78', date: 'Mar 10, 16:05', status: 'confirmed' },
  { from: 'Cowries', to: 'BTC', sent: 'NGN 85,000', received: '0.00062 BTC', fee: '$1.52', date: 'Mar 5, 10:30', status: 'confirmed' },
];

const RATES: Record<string, { currency: string; symbol: string; rate: number; flag: string }> = {
  mpesa:   { currency: 'KES', symbol: 'KES', rate: 0.0074, flag: '🇰🇪' },
  mtn:     { currency: 'GHS', symbol: 'GHS', rate: 0.063, flag: '🇬🇭' },
  absa:    { currency: 'ZMW', symbol: 'ZMW', rate: 0.034, flag: '🇿🇲' },
  airtel:  { currency: 'MWK', symbol: 'MWK', rate: 0.00044, flag: '🇲🇼' },
  cowries: { currency: 'NGN', symbol: '₦', rate: 0.00062, flag: '🇳🇬' },
  wire:    { currency: 'CAD', symbol: 'CAD', rate: 0.74, flag: '🇨🇦' },
};

const RECEIVE_ASSETS = ['AGD', 'BTC', 'NDX', 'COOP'];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'confirmed') return <CheckCircle size={13} color="var(--green)" />;
  if (status === 'pending') return <Clock size={13} color="var(--gold)" />;
  return <AlertCircle size={13} color="var(--red)" />;
};

export default function OnrampPage() {
  const [selected, setSelected] = useState('mpesa');
  const [amount, setAmount] = useState('5000');
  const [receiveAsset, setReceiveAsset] = useState('AGD');
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form');

  const onramp = ONRAMPS.find(r => r.id === selected)!;
  const rate = RATES[selected];
  const usdValue = parseFloat(amount || '0') * (rate?.rate || 0);
  const agdValue = usdValue * 0.97;
  const fee = usdValue * 0.03;

  const handleConfirm = () => {
    setStep('confirm');
    setTimeout(() => setStep('success'), 1800);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Topbar onNotifClick={() => {}} />
      <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%', padding: '24px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: 4 }}>Diaspora Onramp</h1>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Convert local currency to production-backed assets · Powered by Ndeipi rails</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>

          {/* Left: corridor selector + form */}
          <div>
            {/* Corridor grid */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 12 }}>SELECT CORRIDOR</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
                {ONRAMPS.map(r => (
                  <button key={r.id} onClick={() => { setSelected(r.id); setStep('form'); }} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 10px',
                    background: selected === r.id ? 'var(--bg-hover)' : 'var(--bg-tertiary)',
                    border: selected === r.id ? `1px solid ${r.color}66` : '1px solid var(--border)',
                    borderRadius: 6, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  }}>
                    <span style={{ fontSize: 18 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: selected === r.id ? r.color : 'var(--text-primary)' }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fee info */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 14 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 10 }}>CORRIDOR DETAILS</div>
              {[
                { label: 'Network fee', value: '3.0%' },
                { label: 'Settle time', value: selected === 'wire' ? '1-2 business days' : '< 5 minutes' },
                { label: 'Min transfer', value: selected === 'wire' ? '$50' : '$5' },
                { label: 'Max transfer', value: selected === 'wire' ? '$50,000' : '$5,000' },
                { label: 'Settlement', value: 'Polygon network' },
                { label: 'Custody', value: 'ABSA Zambia' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: transfer form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20 }}>
            {step === 'success' ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }} className="animate-slide-up">
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(46,204,138,0.15)', border: '2px solid rgba(46,204,138,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle size={28} color="var(--green)" />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--green)', marginBottom: 8 }}>Transfer initiated</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  {rate?.symbol}{parseFloat(amount).toLocaleString()} → ~{agdValue.toFixed(2)} {receiveAsset}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 24 }}>Settling on Polygon · Ref: TXN-{Math.random().toString(36).slice(2,8).toUpperCase()}</div>
                <button onClick={() => setStep('form')} style={{ padding: '9px 20px', background: 'rgba(201,168,76,0.12)', border: '1px solid var(--border-bright)', borderRadius: 5, color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', letterSpacing: '0.06em' }}>
                  NEW TRANSFER
                </button>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 16 }}>
                  TRANSFER — {onramp?.name?.toUpperCase()}
                </div>

                {/* Send amount */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                    SEND ({rate?.symbol}) {rate?.flag}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      style={{ width: '100%', padding: '11px 12px', background: 'var(--bg-tertiary)', border: `1px solid ${onramp?.color}44`, borderRadius: 5, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: 16, outline: 'none' }}
                    />
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{rate?.symbol}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5 }}>
                    ≈ ${usdValue.toFixed(2)} USD at current rate
                  </div>
                </div>

                {/* Quick amounts */}
                <div style={{ display: 'flex', gap: 5, marginBottom: 16 }}>
                  {[1000, 5000, 10000, 50000].map(a => (
                    <button key={a} onClick={() => setAmount(String(a))} style={{ flex: 1, padding: '5px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer' }}>
                      {a >= 1000 ? `${a/1000}k` : a}
                    </button>
                  ))}
                </div>

                {/* Arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <ArrowRight size={16} color="var(--gold)" />
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                {/* Receive asset */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>RECEIVE</div>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                    {RECEIVE_ASSETS.map(a => (
                      <button key={a} onClick={() => setReceiveAsset(a)} style={{ flex: 1, padding: '7px', background: receiveAsset === a ? 'rgba(201,168,76,0.12)' : 'var(--bg-tertiary)', border: receiveAsset === a ? '1px solid var(--border-bright)' : '1px solid var(--border)', borderRadius: 4, color: receiveAsset === a ? 'var(--gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer' }}>
                        {a}
                      </button>
                    ))}
                  </div>
                  <div style={{ padding: '11px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 5, fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--gold)' }}>
                    ~{agdValue.toFixed(4)} <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{receiveAsset}</span>
                  </div>
                </div>

                {/* Order summary */}
                <div style={{ padding: '10px 12px', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 5, marginBottom: 16 }}>
                  {[
                    { label: 'Exchange rate', value: `1 ${rate?.symbol} = $${rate?.rate.toFixed(4)}` },
                    { label: 'Network fee (3%)', value: `$${fee.toFixed(2)}` },
                    { label: 'You receive', value: `~${agdValue.toFixed(4)} ${receiveAsset}` },
                    { label: 'Settlement chain', value: 'Polygon' },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={step === 'confirm'}
                  style={{ width: '100%', padding: '12px', background: step === 'confirm' ? 'var(--bg-tertiary)' : onramp?.color, border: 'none', borderRadius: 5, color: step === 'confirm' ? 'var(--text-muted)' : '#090B0E', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, cursor: step === 'confirm' ? 'not-allowed' : 'pointer', letterSpacing: '0.06em' }}>
                  {step === 'confirm' ? 'PROCESSING...' : `SEND via ${onramp?.name?.toUpperCase()}`}
                </button>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
                  Powered by Ndeipi rails · ABSA custody · Polygon settlement
                </div>
              </>
            )}
          </div>
        </div>

        {/* Transfer history */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, marginTop: 20 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 14 }}>TRANSFER HISTORY</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['From', 'To', 'Sent', 'Received', 'Fee', 'Date', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em', paddingBottom: 10, borderBottom: '1px solid var(--border)', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRANSFER_HISTORY.map((tx, i) => (
                  <tr key={i}>
                    <td style={{ padding: '10px 14px 10px 0', fontSize: 12, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}>{tx.from}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gold)', borderBottom: '1px solid var(--border)' }}>{tx.to}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>{tx.sent}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', borderBottom: '1px solid var(--border)' }}>{tx.received}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>{tx.fee}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>{tx.date}</td>
                    <td style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <StatusIcon status={tx.status} />
                        <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>{tx.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
