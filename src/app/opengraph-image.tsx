import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Центр слуху Почути Все — слухові апарати у Вінниці та Хмельницькому';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1F3D2B 0%, #2d5a3f 60%, #1a3325 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '60px 80px',
          position: 'relative',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top label */}
        <div style={{ color: '#86efac', fontSize: 18, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
          Центр слуху
        </div>

        {/* Main brand */}
        <div style={{ color: 'white', fontSize: 72, fontWeight: 800, textAlign: 'center', lineHeight: 1.05, marginBottom: 20 }}>
          Почути Все
        </div>

        {/* Tagline */}
        <div style={{ color: '#d1fae5', fontSize: 30, fontWeight: 500, textAlign: 'center', marginBottom: 52 }}>
          Слухові апарати у Вінниці та Хмельницькому
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 48, color: '#a7f3d0', fontSize: 17 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: 'white', lineHeight: 1 }}>30+</div>
            <div style={{ marginTop: 6 }}>років досвіду</div>
          </div>
          <div style={{ width: 1, height: 52, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: 'white', lineHeight: 1 }}>5000+</div>
            <div style={{ marginTop: 6 }}>задоволених клієнтів</div>
          </div>
          <div style={{ width: 1, height: 52, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: 'white', lineHeight: 1 }}>4.9 ★</div>
            <div style={{ marginTop: 6 }}>рейтинг Google</div>
          </div>
        </div>

        {/* Footer URL */}
        <div style={{ position: 'absolute', bottom: 32, color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>
          sluh-apparat.vn.ua
        </div>
      </div>
    ),
    { ...size },
  );
}
