import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        name: 'Alex Rivera',
        role: 'Senior Frontend Engineer',
        company: 'CloudScale Inc.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop',
        text: "I was wasting 4 hours every single day on LinkedIn. With Big Career Dream's fresh daily links, I had three interviews lined up within a week. This is the smartest thing any job seeker can subscribe to.",
        rating: 5
    },
    {
        name: 'Sarah Chen',
        role: 'Full Stack Developer',
        company: 'Fintech Solutions',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
        text: "The ATS-optimized resume they built me got callbacks from companies I applied to for years with no response. The combination of daily job links + a professional resume is unbeatable. My callback rate tripled.",
        rating: 5
    },
    {
        name: 'Michael Smyth',
        role: 'DevOps Specialist',
        company: 'DataOps Lab',
        image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=200&h=200&auto=format&fit=crop',
        text: "Direct apply links are everything. No more copy-pasting into 10 different portals. Click, apply, done. I applied to more roles in 2 days than I had in the previous 2 months. My job search time dropped by 70%.",
        rating: 5
    },
    {
        name: 'Rishitha Sharma',
        role: 'Software Consultant',
        company: 'Global Systems',
        image: '/rishitha_sharma.png',
        text: "Navigating W2, C2C, and Sponsored roles as an international candidate was a nightmare until I found Big Career Dream. Everything is pre-filtered and ready for me every morning. It genuinely changed my job search.",
        rating: 4
    },
    {
        name: 'David Park',
        role: 'Cloud Solutions Architect',
        company: 'NovaTech Partners',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop',
        text: "Every listing is verified — no scams, no ghost jobs, no expired postings. I finally trust the board I'm using. Landed a $160K role in the cloud space within 3 weeks of subscribing. Worth every dollar.",
        rating: 5
    },
    {
        name: 'Elena Rodriguez',
        role: 'Data Scientist',
        company: 'Insights Corp',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop',
        text: "Their GitHub and portfolio optimization service is what really set me apart. Recruiters were reaching out to me. Combined with daily fresh listings, I went from zero callbacks to multiple offers in under a month.",
        rating: 5
    },
    {
        name: 'Nithin Chary',
        role: 'Backend Lead',
        company: 'Scalable Tech',
        image: '/nithin_chary.png',
        text: "Big Career Dream is exactly what the US tech job market needed. Every morning I wake up to a curated list of high-quality roles — W2, C2C, Sponsored. It's like having a personal recruiter who never sleeps.",
        rating: 4
    }
];

const Testimonials = () => {
    const [active, setActive] = useState(0);

    const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
    const next = () => setActive(i => (i + 1) % testimonials.length);

    const featured = testimonials[active];
    const sideItems = testimonials.filter((_, i) => i !== active).slice(0, 3);

    return (
        <section id="testimonials" style={{
            padding: 'var(--section-pad)',
            background: 'var(--cream-100)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <style>{`
                .t-nav-btn {
                    width: 44px; height: 44px;
                    border-radius: 50%;
                    background: #fff;
                    border: 1px solid var(--border-light);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                    color: var(--ink-900);
                }
                .t-nav-btn:hover {
                    background: var(--accent-primary);
                    border-color: var(--accent-primary);
                    color: #fff;
                    box-shadow: 0 4px 16px rgba(232,69,26,0.3);
                    transform: scale(1.08);
                }
                .t-side-card {
                    background: #fff;
                    border: 1px solid var(--border-light);
                    border-radius: 16px;
                    padding: 20px 22px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                }
                .t-side-card:hover {
                    border-color: var(--accent-primary);
                    box-shadow: 0 4px 20px rgba(232,69,26,0.12);
                    transform: translateX(4px);
                }
                .t-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: var(--border-light);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: none;
                    padding: 0;
                }
                .t-dot.active {
                    background: var(--accent-primary);
                    transform: scale(1.3);
                }
                @media (max-width: 900px) {
                    .t-layout { flex-direction: column !important; }
                    .t-main-card { min-height: unset !important; }
                    .t-side-col { flex-direction: row !important; overflow-x: auto; }
                }
            `}</style>

            {/* Soft background accent */}
            <div style={{
                position: 'absolute', top: '-20%', right: '-10%',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, var(--coral-100) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none', opacity: 0.6,
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '52px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <div className="section-badge" style={{ marginBottom: '12px' }}>Testimonials</div>
                            <h2 style={{
                                fontWeight: 900,
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                color: 'var(--text-heading)',
                                margin: 0,
                                letterSpacing: '-1px',
                                lineHeight: 1.1,
                            }}>
                                Trusted by{' '}
                                <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>
                                    Top Engineers
                                </span>
                            </h2>
                        </div>
                        {/* Nav controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button className="t-nav-btn" onClick={prev} aria-label="Previous">
                                <ChevronLeft size={18} color="black" />
                            </button>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`t-dot ${i === active ? 'active' : ''}`}
                                        onClick={() => setActive(i)}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                    />
                                ))}
                            </div>
                            <button className="t-nav-btn" onClick={next} aria-label="Next">
                                <ChevronRight size={18} color="black" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Layout: Featured + Side cards */}
                <div className="t-layout" style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>

                    {/* Featured (main) card */}
                    <div style={{ flex: '1 1 0', minWidth: 0 }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                className="t-main-card"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    background: '#ffffff',
                                    borderRadius: '28px',
                                    padding: 'clamp(36px, 5vw, 56px)',
                                    minHeight: '420px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    height: '100%',
                                    border: '1px solid var(--border-light)',
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.07)',
                                }}
                            >
                                {/* Giant decorative quote mark */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-10px', right: '30px',
                                    fontSize: '18rem',
                                    fontFamily: "'Georgia', serif",
                                    color: 'rgba(0,0,0,0.05)',
                                    lineHeight: 1,
                                    userSelect: 'none',
                                    pointerEvents: 'none',
                                    fontWeight: 900,
                                }}>
                                    "
                                </div>

                                {/* Accent glow */}
                                <div style={{
                                    position: 'absolute', bottom: '-30%', left: '10%',
                                    width: '300px', height: '300px',
                                    background: 'radial-gradient(circle, rgba(232,69,26,0.08) 0%, transparent 70%)',
                                    pointerEvents: 'none',
                                }} />

                                <div>
                                    {/* Stars */}
                                    <div style={{ display: 'flex', gap: '3px', marginBottom: '28px' }}>
                                        {[...Array(featured.rating)].map((_, j) => (
                                            <Star key={j} size={16} fill="#e8451a" color="#e8451a" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p style={{
                                        color: '#1a1208',
                                        fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                                        lineHeight: 1.65,
                                        fontStyle: 'italic',
                                        margin: 0,
                                        position: 'relative',
                                        zIndex: 2,
                                    }}>
                                        &ldquo;{featured.text}&rdquo;
                                    </p>
                                </div>

                                {/* Author row */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '16px',
                                    marginTop: '36px', paddingTop: '28px',
                                    borderTop: '1px solid rgba(0,0,0,0.08)',
                                    position: 'relative', zIndex: 2,
                                }}>
                                    <img
                                        src={featured.image}
                                        alt={featured.name}
                                        style={{
                                            width: '56px', height: '56px', borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid rgba(232,69,26,0.6)',
                                        }}
                                    />
                                    <div>
                                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0a1628' }}>{featured.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '3px' }}>
                                            {featured.role} <span style={{ color: '#e8451a', fontWeight: 600 }}>@ {featured.company}</span>
                                        </div>
                                    </div>
                                    {/* Index counter */}
                                    <div style={{
                                        marginLeft: 'auto',
                                        fontSize: '0.75rem', fontWeight: 800,
                                        color: 'rgba(0,0,0,0.2)',
                                        letterSpacing: '1px',
                                    }}>
                                        {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Side cards column */}
                    <div className="t-side-col" style={{
                        width: '320px', flexShrink: 0,
                        display: 'flex', flexDirection: 'column', gap: '14px',
                    }}>
                        {sideItems.map((t, i) => {
                            const idx = testimonials.indexOf(t);
                            return (
                                <motion.div
                                    key={idx}
                                    className="t-side-card"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.35 }}
                                    onClick={() => setActive(idx)}
                                >
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        style={{
                                            width: '42px', height: '42px', borderRadius: '50%',
                                            objectFit: 'cover', flexShrink: 0,
                                            border: '2px solid var(--cream-200)',
                                        }}
                                    />
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                                            {[...Array(t.rating)].map((_, j) => (
                                                <Star key={j} size={11} fill="var(--accent-primary)" color="var(--accent-primary)" />
                                            ))}
                                        </div>
                                        <p style={{
                                            color: '#1a1208',
                                            fontSize: '0.8rem',
                                            lineHeight: 1.5,
                                            margin: '0 0 8px',
                                            fontStyle: 'italic',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}>
                                            &ldquo;{t.text}&rdquo;
                                        </p>
                                        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0a1628' }}>{t.name}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>
                                            {t.role} <span style={{ color: 'var(--accent-primary)' }}>@ {t.company}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Stats box */}
                        <div style={{
                            marginTop: 'auto',
                            background: 'linear-gradient(135deg, var(--accent-primary) 0%, #ff6b38 100%)',
                            borderRadius: '16px',
                            padding: '22px 24px',
                            color: '#fff',
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>2,400+</div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.85, marginTop: '4px' }}>
                                Engineers fast-tracked their tech careers
                            </div>
                            <div style={{ display: 'flex', gap: '2px', marginTop: '10px' }}>
                                {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="rgba(255,255,255,0.8)" color="transparent" />)}
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, marginLeft: '4px', opacity: 0.85 }}>5.0 avg rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
