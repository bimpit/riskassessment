import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Risk Assessment Software for Australian Businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1d4ed8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              background: 'white',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
            }}
          >
            🛡
          </div>
          <span style={{ color: 'white', fontSize: '26px', fontWeight: 700 }}>
            Risk Assessment
          </span>
        </div>
        <div
          style={{
            color: 'white',
            fontSize: '54px',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '28px',
            maxWidth: '980px',
          }}
        >
          Risk Assessment Software for Australian Businesses
        </div>
        <div
          style={{
            color: '#bfdbfe',
            fontSize: '26px',
            maxWidth: '860px',
            lineHeight: 1.4,
          }}
        >
          WHS-aligned risk management · Risk register · AI-assisted documentation
        </div>
        <div
          style={{
            marginTop: '52px',
            background: 'white',
            color: '#1d4ed8',
            fontSize: '20px',
            fontWeight: 700,
            padding: '16px 32px',
            borderRadius: '12px',
          }}
        >
          risk-assessment.com.au
        </div>
      </div>
    ),
    { ...size }
  )
}
