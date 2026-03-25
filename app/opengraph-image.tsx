import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nagarjun Avala — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    padding: '64px',
                    fontFamily: 'system-ui, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Grid pattern overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Glow accent */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-80px',
                        right: '-80px',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Badge */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(244,63,94,0.12)',
                        border: '1px solid rgba(244,63,94,0.3)',
                        borderRadius: '100px',
                        padding: '8px 20px',
                        marginBottom: '24px',
                        color: '#fb7185',
                        fontSize: '18px',
                        fontWeight: 500,
                    }}
                >
                    Open to Work &amp; Collaborations
                </div>

                {/* Name */}
                <div
                    style={{
                        fontSize: '80px',
                        fontWeight: 800,
                        color: '#f8fafc',
                        lineHeight: 1.05,
                        marginBottom: '16px',
                        letterSpacing: '-2px',
                    }}
                >
                    Nagarjun Avala
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: 400,
                        color: '#94a3b8',
                        marginBottom: '40px',
                    }}
                >
                    Full Stack Developer &amp; Technical Entrepreneur
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    {['React', 'Next.js', 'Node.js', 'AWS', 'Docker'].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                padding: '8px 18px',
                                color: '#cbd5e1',
                                fontSize: '18px',
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                {/* URL watermark */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '48px',
                        right: '64px',
                        color: '#475569',
                        fontSize: '20px',
                    }}
                >
                    nagarjun-avala.vercel.app
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
