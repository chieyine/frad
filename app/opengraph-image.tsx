import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'FRAD Foundation | Nigerian-Led Humanitarian Action';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const [fraunces, inter] = await Promise.all([
    readFile(join(process.cwd(), 'assets/fonts/fraunces-600.ttf')),
    readFile(join(process.cwd(), 'assets/fonts/inter-500.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#002611',
          backgroundImage: 'linear-gradient(160deg, #003d1b 0%, #002611 55%, #08110d 100%)',
          padding: '72px 80px',
          fontFamily: 'Inter',
        }}
      >
        {/* Hairline inner frame */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1px solid rgba(255,255,255,0.22)',
            borderRadius: 8,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 44, height: 2, backgroundColor: '#a3e3bf', display: 'flex' }} />
          <div
            style={{
              color: '#a3e3bf',
              fontSize: 26,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            FRAD Foundation
          </div>
        </div>

        <div
          style={{
            fontFamily: 'Fraunces',
            color: '#ffffff',
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: 980,
          }}
        >
          Local leadership. Practical action. Stronger communities.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255,255,255,0.72)',
            fontSize: 24,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>Northeast Nigeria / Northwest Nigeria / Abuja</div>
          <div style={{ display: 'flex', color: '#a3e3bf' }}>fradfoundation.org</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, style: 'normal', weight: 600 },
        { name: 'Inter', data: inter, style: 'normal', weight: 500 },
      ],
    }
  );
}
