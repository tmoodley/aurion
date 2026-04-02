'use client';
import { useNotif } from '@/lib/notifications';

const TYPE_COLOR: Record<string, string> = {
  info: '#4A9ECC',
  success: '#2ECC8A',
  warning: '#C9A84C',
  error: '#E05252',
};

const TYPE_LABEL: Record<string, string> = {
  info: 'INFO',
  success: 'OK',
  warning: 'WARN',
  error: 'ERR',
};

export default function NotificationsPanel() {
  const { notifications, markAllRead, dismiss, unreadCount } = useNotif();

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em' }}>
          NOTIFICATIONS {unreadCount > 0 && (
            <span style={{
              marginLeft: 6,
              background: 'rgba(74,158,204,0.15)',
              color: '#4A9ECC',
              fontSize: 9,
              padding: '1px 5px',
              borderRadius: 10,
              fontFamily: 'IBM Plex Mono, monospace',
            }}>
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              background: 'none',
              border: 'none',
              color: '#C9A84C',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: 9,
              cursor: 'pointer',
              letterSpacing: '0.06em',
            }}
          >
            MARK ALL READ
          </button>
        )}
      </div>

      {notifications.length === 0 && (
        <div style={{ textAlign: 'center', padding: '24px 0', fontSize: 11, color: '#4A4844' }}>
          No notifications
        </div>
      )}

      {notifications.map((n) => {
        const col = TYPE_COLOR[n.type];
        return (
          <div
            key={n.id}
            style={{
              padding: '10px 10px 10px 12px',
              marginBottom: 6,
              background: n.read ? '#0F1318' : `${col}08`,
              border: `1px solid ${n.read ? 'rgba(255,255,255,0.04)' : col + '30'}`,
              borderLeft: `3px solid ${n.read ? 'rgba(255,255,255,0.08)' : col}`,
              borderRadius: 3,
              display: 'flex',
              gap: 8,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{
                  fontSize: 8,
                  padding: '1px 5px',
                  borderRadius: 2,
                  background: col + '18',
                  color: col,
                  fontFamily: 'IBM Plex Mono, monospace',
                  letterSpacing: '0.06em',
                }}>
                  {TYPE_LABEL[n.type]}
                </span>
                <span style={{ fontSize: 9, color: '#4A4844', fontFamily: 'IBM Plex Mono, monospace' }}>{n.time}</span>
                {!n.read && (
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: col, flexShrink: 0, marginLeft: 'auto' }} />
                )}
              </div>
              <div style={{ fontSize: 11, color: n.read ? '#4A4844' : '#8A8880', lineHeight: 1.5 }}>
                {n.message}
              </div>
            </div>
            <button
              onClick={() => dismiss(n.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#2A2824',
                cursor: 'pointer',
                fontSize: 14,
                lineHeight: 1,
                flexShrink: 0,
                padding: 0,
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
