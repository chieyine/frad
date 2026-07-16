import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'FRAD Foundation programmes in Northeast Nigeria';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0a4d2e 0%, #063820 50%, #042617 100%)',
          padding: '56px 64px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header & Verification Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0a4d2e',
                fontSize: '24px',
                fontWeight: 900,
                marginRight: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              F
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff' }}>
                FRAD FOUNDATION
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#86efac', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Humanitarian & Development Response
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              padding: '10px 20px',
              borderRadius: '9999px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '9999px',
                background: '#4ade80',
                marginRight: '10px',
              }}
            />
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
              WORKING ACROSS THE BAY STATES
            </span>
          </div>
        </div>

        {/* Center Section: Title & Map/Telemetry Visual */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '20px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '640px' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#4ade80', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Geographic Operational Footprint
            </span>
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                margin: '0 0 20px 0',
              }}
            >
              Northeast Nigeria (BAY States Hub)
            </h1>
            <p style={{ fontSize: '22px', lineHeight: 1.5, color: '#d1fae5', margin: 0, fontWeight: 500 }}>
              Delivering lifesaving Outpatient Therapeutic Programs (OTP), safe water solar boreholes, protection monitoring, and emergency humanitarian relief across Borno, Adamawa, and Yobe.
            </p>
          </div>

          {/* Stylized BAY States Map/Telemetry Box */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '2px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '24px',
              padding: '28px',
              width: '380px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Live Telemetry Snapshot
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: 600 }}>Core States</span>
                <span style={{ fontSize: '18px', color: '#4ade80', fontWeight: 800 }}>Borno • Adamawa • Yobe</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: 600 }}>Nutrition and health</span>
                <span style={{ fontSize: '18px', color: '#ffffff', fontWeight: 800 }}>Screening • Referral • Treatment support</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '16px', color: '#e2e8f0', fontWeight: 600 }}>Water, sanitation and hygiene</span>
                <span style={{ fontSize: '18px', color: '#ffffff', fontWeight: 800 }}>Safe water • Sanitation • Hygiene</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.16)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#a7f3d0' }}>• Nutrition & Health</span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#a7f3d0' }}>• Safe Water & WASH</span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#a7f3d0' }}>• Protection & GBV</span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#a7f3d0' }}>• Emergency Relief</span>
          </div>

          <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
            fradfoundation.org/where-we-work/northeast
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
