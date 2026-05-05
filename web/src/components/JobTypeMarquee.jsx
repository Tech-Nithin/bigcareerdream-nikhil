import React from 'react';
import FlowField from './FlowField';

const jobTypes = [
    { label: 'W2 Roles', emoji: '🏢', highlight: true },
    { label: 'C2C Opportunities', emoji: '🤝', highlight: true },
    { label: 'Visa Sponsorship', emoji: '🇺🇸', highlight: true },
    { label: 'Remote First', emoji: '🌍', highlight: false },
    { label: 'Hybrid Tech', emoji: '💻', highlight: false },
    { label: 'Senior Levels', emoji: '⭐', highlight: false },
    { label: 'Direct Hire', emoji: '📝', highlight: false },
    { label: 'Contract Basis', emoji: '⏳', highlight: false },
    { label: 'Full Benefits', emoji: '🛡️', highlight: false },
    { label: 'High Comp', emoji: '💰', highlight: false },
];

const JobTypeMarquee = () => {
    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            background: 'transparent',
            padding: '28px 0',
            position: 'relative',
            zIndex: 15,
        }}>
            <FlowField
                theme="cyber"
                density="medium"
                style={{ opacity: 0.8 }}
            />

            {/* Edge Fades */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(90deg, #0A1628 0%, transparent 15%, transparent 85%, #0A1628 100%)'
            }} />

            <div style={{
                display: 'flex',
                width: 'max-content',
                animation: 'marqueeLeft 60s linear infinite',
            }}>
                {[...jobTypes, ...jobTypes, ...jobTypes].map((item, i) => (
                    <div
                        key={i}
                        style={{
                            padding: '12px 28px',
                            margin: '0 12px',
                            borderRadius: '50px',
                            background: item.highlight ? 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' : 'rgba(255,255,255,0.04)',
                            border: 'none',
                            display: 'flex', alignItems: 'center', gap: '10px',
                            boxShadow: item.highlight ? '0 10px 25px rgba(37,99,235,0.25)' : 'none',
                            color: '#FFFFFF',
                            whiteSpace: 'nowrap',
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            letterSpacing: '0.3px',
                        }}
                    >
                        <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobTypeMarquee;
