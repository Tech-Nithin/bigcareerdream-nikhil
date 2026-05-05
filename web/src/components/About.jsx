import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, Link2, MapPin, Clock, TrendingUp } from 'lucide-react';
const benefits = [
    { icon: <Clock size={20} />, title: 'Updated Every Day', desc: 'New links within 24 hours.', from: 'var(--coral-600)', to: 'var(--coral-500)' },
    { icon: <CheckCircle size={20} />, title: 'Verified Links', desc: 'Every job validated — zero scams.', from: 'var(--ink-800)', to: 'var(--ink-700)' },
    { icon: <Link2 size={20} />, title: 'Direct Apply', desc: 'One click to company ATS page.', from: 'var(--sand-500)', to: 'var(--sand-300)' },
    { icon: <MapPin size={20} />, title: 'USA-Focused', desc: 'W2, C2C & Sponsored across all states.', from: 'var(--coral-600)', to: 'var(--sand-500)' },
    { icon: <BarChart3 size={20} />, title: 'Faster Discovery', desc: '3 hours of searching in 3 minutes.', from: 'var(--ink-900)', to: 'var(--muted)' },
    { icon: <TrendingUp size={20} />, title: 'Career Growth', desc: 'Resume, portfolio, GitHub included.', from: 'var(--coral-600)', to: 'var(--ink-800)' },
];

const pillItems = [
    { emoji: '🔥', label: 'No stale listings' },
    { emoji: '⚡', label: 'Apply in one click' },
    { emoji: '💼', label: 'W2 & C2C roles' },
    { emoji: '🎯', label: 'Land faster' },
];

const About = () => {
    return (
        <section
            id="about-marketing"
            style={{ padding: 'var(--section-pad)', background: 'var(--bg-white)', position: 'relative', overflow: 'hidden' }}
        >
            {/* Background subtle gradient */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(180deg, var(--cream-100) 0%, transparent 100%)',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '70px' }}
                >
                    {pillItems.map((p, i) => (
                        <div key={i} className="pill-btn">
                            <span style={{ fontSize: '1rem' }}>{p.emoji}</span>
                            {p.label}
                        </div>
                    ))}
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
                    {/* Left — narrative */}
                    <div>
                        <div className="section-badge" style={{ marginBottom: '24px' }}>Why Big Career Dream</div>
                        <h2 style={{
                            fontWeight: 900, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
                            color: 'var(--text-heading)', marginBottom: '32px', letterSpacing: '-1px', lineHeight: 1.15,
                            fontFamily: "'Outfit', sans-serif",
                        }}>
                            We Don't Just List Jobs.<br />
                            We <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Accelerate Careers.</span>
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            {[
                                {
                                    q: '😩 The Problem',
                                    a: "Thousands of opportunities appear daily — but 80% are expired, unverified, or irrelevant. The typical job seeker wastes 3+ hours per day on useless listings.",
                                    accentLeft: 'var(--ink-700)',
                                },
                                {
                                    q: '💡 Our Solution',
                                    a: "Big Career Dream delivers fresh, verified job links every morning — curated specifically for US tech professionals navigating W2, C2C, and Sponsored structures.",
                                    accentLeft: 'var(--coral-600)',
                                },
                                {
                                    q: '🚀 The Result',
                                    a: "Our members apply 5× faster, receive 3× more callbacks, and negotiate better offers — powered by our resumes, portfolios, and GitHub optimization.",
                                    accentLeft: 'var(--sand-500)',
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        padding: '18px 20px 18px 22px',
                                        background: 'var(--bg-section)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: '12px',
                                        borderLeft: `4px solid ${item.accentLeft}`,
                                        boxShadow: 'var(--shadow-xs)',
                                    }}
                                >
                                    <p style={{
                                        color: item.accentLeft, fontSize: '0.72rem', fontWeight: 800,
                                        letterSpacing: '1.5px', textTransform: 'uppercase',
                                        fontFamily: "'Outfit', sans-serif", marginBottom: '6px',
                                    }}>{item.q}</p>
                                    <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.72 }}>{item.a}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right — benefit grid */}
                    <div id="services">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {benefits.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    style={{
                                        padding: '22px 18px',
                                        background: 'var(--bg-white)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: '14px',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'default', position: 'relative', overflow: 'hidden',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border-light)'; }}
                                >
                                    {/* Top gradient accent */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
                                        background: `linear-gradient(90deg, ${b.from}, ${b.to})`,
                                    }} />
                                    <div style={{
                                        width: '38px', height: '38px',
                                        background: `linear-gradient(135deg, ${b.from}, ${b.to})`,
                                        borderRadius: '10px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#FFFFFF', marginBottom: '12px',
                                        boxShadow: `0 4px 14px rgba(0,0,0,0.1)`,
                                    }}>{b.icon}</div>
                                    <h4 style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-heading)', marginBottom: '5px', letterSpacing: '-0.2px' }}>{b.title}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.55 }}>{b.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
