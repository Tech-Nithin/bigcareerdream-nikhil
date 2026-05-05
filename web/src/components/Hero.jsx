// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Lottie from 'lottie-react';
// import chatGroupAnimation from '../assets/chat-group.json';
// const useCounter = (end, duration = 2000, start = false, isLive = false) => {
//     const [count, setCount] = useState(0);
//     const [hasFinishedInitial, setHasFinishedInitial] = useState(false);

//     useEffect(() => {
//         if (!start) return;
//         let startTime = null;
//         const step = (ts) => {
//             if (!startTime) startTime = ts;
//             const p = Math.min((ts - startTime) / duration, 1);
//             const ease = 1 - Math.pow(1 - p, 3);
//             setCount(Math.floor(ease * end));
//             if (p < 1) {
//                 requestAnimationFrame(step);
//             } else {
//                 setHasFinishedInitial(true);
//             }
//         };
//         requestAnimationFrame(step);
//     }, [end, duration, start]);

//     useEffect(() => {
//         if (!isLive || !hasFinishedInitial) return;

//         // Increment by exactly 1 every second as requested
//         // "FOR 15 SECONDS THE NUMBER SHOULD BE ADDED"
//         const interval = setInterval(() => {
//             setCount(prev => prev + 1);
//         }, 1000);

//         // Optional: stop or change behavior after 15 seconds if needed, 
//         // but typically "Live" stays active.
//         return () => clearInterval(interval);
//     }, [isLive, hasFinishedInitial]);

//     return count;
// };

// const stats = [
//     { value: 50, suffix: 'K+', label: 'Jobs Posted', sub: 'Active listings' },
//     { value: 1254, suffix: '', label: 'Live Users', sub: 'Active right now', isLive: true },
//     { value: 12, suffix: 'K+', label: 'Companies', sub: 'Actively hiring' },
//     { value: 500, suffix: '+', label: 'New Daily', sub: 'Fresh every morning' },
// ];

// const tags = ['Software Engineer', 'DevOps', 'Data Analyst', 'Full Stack', 'ML Engineer', 'Cloud Architect'];

// const Hero = () => {
//     const [query, setQuery] = useState('');
//     const [location, setLocation] = useState('');
//     const [started, setStarted] = useState(false);
//     const [activeTag, setActiveTag] = useState(null);

//     useEffect(() => {
//         const t = setTimeout(() => setStarted(true), 600);
//         return () => clearTimeout(t);
//     }, []);

//     const s0 = useCounter(stats[0].value, 1800, started);
//     const s1 = useCounter(stats[1].value, 1400, started, true);
//     const s2 = useCounter(stats[2].value, 2000, started);
//     const s3 = useCounter(stats[3].value, 1200, started);
//     const counts = [s0, s1, s2, s3];

//     return (
//         <section style={{
//             position: 'relative',
//             minHeight: '100vh',
//             background: 'var(--cream-100)',
//             overflow: 'hidden',
//             display: 'flex',
//             flexDirection: 'column',
//             fontFamily: 'var(--font-sans)',
//         }}>
//             {/* ── Background Photo Layer ── */}
//             <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 zIndex: 0,
//                 backgroundImage: 'url("/statue_of_liberty_hero_1772045792790.png")',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center center',
//                 opacity: 0.5,
//             }} />

//             {/* ── AI/Cinema Background Overlays ── */}
//             {/* Soft Warm wash - further lightened for maximum image clarity */}
//             <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 zIndex: 1,
//                 background: 'linear-gradient(180deg, rgba(251,246,238,0.025) 0%, rgba(251,246,238,0.1) 50%, var(--cream-100) 100%)',
//             }} />

//             {/* Vignette for depth - ultra softened */}
//             <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 zIndex: 2,
//                 background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(26,18,8,0.01) 100%)',
//             }} />

//             {/* Subtle paper structure lines - ultra light */}
//             <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 zIndex: 3,
//                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 71px, var(--border-light) 72px)',
//                 opacity: 0.1
//             }} />

//             {/* Luxury Glow Orbs */}
//             <div className="glow-orb" style={{
//                 top: '-10%', left: '-10%', width: '50vw', height: '50vw',
//                 background: 'radial-gradient(circle, var(--coral-100) 0%, transparent 70%)',
//                 zIndex: 4, animation: 'pulse-glow 8s infinite alternate'
//             }} />
//             <div className="glow-orb" style={{
//                 bottom: '-10%', right: '-10%', width: '60vw', height: '60vw',
//                 background: 'radial-gradient(circle, var(--sand-300) 0%, transparent 70%)',
//                 zIndex: 4, animation: 'pulse-glow 10s infinite alternate-reverse'
//             }} />

//             {/* Corner Markers */}
//             <div className="h-corner-markers" style={{ position: 'absolute', top: '100px', left: '40px', width: '40px', height: '40px', borderTop: '2px solid var(--sand-500)', borderLeft: '2px solid var(--sand-500)', zIndex: 10, opacity: 0.6 }} />
//             <div className="h-corner-markers" style={{ position: 'absolute', top: '100px', right: '40px', width: '40px', height: '40px', borderTop: '2px solid var(--sand-500)', borderRight: '2px solid var(--sand-500)', zIndex: 10, opacity: 0.6 }} />

//             {/* ── Main Content ── */}
//             <div className="hero-content-container">

//                 {/* Eyebrow */}
//                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
//                     <div style={{ width: '40px', height: '1px', background: 'var(--sand-500)' }} />
//                     <span className="h-eyebrow-text" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
//                         #1 USA Tech Job Board · W2 · C2C · Sponsored
//                     </span>
//                     <div style={{ width: '40px', height: '1px', background: 'var(--sand-500)' }} />
//                 </div>

//                 {/* Main Heading */}
//                 <h1 style={{ marginBottom: '10px' }}>
//                     <span style={{ display: 'block', fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', color: 'var(--ink-900)', letterSpacing: '-3px', fontWeight: 400, fontFamily: '"DM Serif Display", serif' }}>
//                         Find Your Next
//                     </span>
//                     <span style={{
//                         display: 'block',
//                         fontSize: 'clamp(2.5rem, 6vw, 5.2rem)',
//                         color: 'var(--accent-primary)',
//                         letterSpacing: '-1.5px',
//                         fontWeight: 700,
//                         fontFamily: 'var(--font-display)',
//                         fontStyle: 'italic',
//                         marginTop: '-10px'
//                     }}>
//                         Tech Career
//                     </span>
//                     <span style={{ display: 'block', fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', color: 'var(--ink-900)', letterSpacing: '-3px', fontWeight: 400, fontFamily: '"DM Serif Display", serif', marginTop: '-10px' }}>
//                         in the USA
//                     </span>
//                 </h1>

//                 {/* Feature Chips */}
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', color: 'var(--text-body)' }}>
//                     <span style={{
//                         display: 'inline-flex', alignItems: 'center', gap: '6px',
//                         background: 'var(--bg-white)', padding: '6px 16px', borderRadius: '50px',
//                         border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
//                         fontWeight: 600, fontSize: '0.9rem'
//                     }}>
//                         🔍 <span>Search</span>
//                     </span>
//                     <span style={{ color: 'var(--text-muted)' }}>and</span>
//                     <span style={{
//                         display: 'inline-flex', alignItems: 'center', gap: '6px',
//                         background: 'var(--bg-white)', padding: '6px 16px', borderRadius: '50px',
//                         border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)',
//                         fontWeight: 600, fontSize: '0.9rem'
//                     }}>
//                         📤 <span>Apply</span>
//                     </span>
//                     <span style={{ opacity: 0.8 }}>to verified tech jobs in your stack</span>
//                 </div>
//                 <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '40px' }}>— 1000's of fresh job links every singel day </p>

//                 {/* Primary CTA Area */}
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
//                     <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
//                         ✦ 50% off for founding members
//                     </span>
//                     <button className="btn-primary" style={{ padding: '20px 50px', fontSize: '1.1rem', borderRadius: '14px', background: 'var(--ink-900)', color: 'var(--cream-100)', boxShadow: 'var(--shadow-lg)' }}>
//                         Find Jobs Now
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//                     </button>

//                     {/* Social Proof */}
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
//                         <div style={{ display: 'flex' }}>
//                             {[1, 2, 3].map(i => (
//                                 <div key={i} style={{
//                                     width: '32px', height: '32px', borderRadius: '50%',
//                                     border: '2px solid var(--cream-100)', marginLeft: i === 1 ? '0' : '-10px',
//                                     background: i === 1 ? 'var(--coral-500)' : i === 2 ? 'var(--sand-500)' : 'var(--ink-700)',
//                                     color: '#fff', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
//                                 }}>
//                                     {String.fromCharCode(64 + i)}
//                                 </div>
//                             ))}
//                         </div>
//                         <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>
//                             <strong>Join 350+</strong> professionals applying daily
//                         </span>
//                     </div>
//                 </div>

//                 {/* ── Search Bar Section ── */}
//                 <div className="h-search-bar-container">
//                     {/* Title Search */}
//                     <div className="h-search-input-group">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
//                         <input
//                             type="text"
//                             placeholder="Job title, skills, keywords..."
//                             value={query}
//                             onChange={e => setQuery(e.target.value)}
//                             style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', background: 'transparent', color: '#111111' }}
//                         />
//                     </div>

//                     <div className="h-search-divider" />

//                     {/* Location Select */}
//                     <div className="h-search-select-group">
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
//                         <select
//                             value={location}
//                             onChange={e => setLocation(e.target.value)}
//                             style={{ border: 'none', outline: 'none', fontSize: '0.95rem', background: 'transparent', cursor: 'pointer', width: '100%', color: '#111111' }}
//                         >
//                             <option value="">All Locations</option>
//                             <option value="remote">Remote 🌐</option>
//                             <option value="ny">New York, NY</option>
//                             <option value="sf">San Francisco, CA</option>
//                             <option value="tx">Austin, TX</option>
//                             <option value="wa">Seattle, WA</option>
//                         </select>
//                     </div>

//                     <button className="h-search-submit">
//                         Search
//                     </button>
//                 </div>

//                 {/* Trending Tags */}
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
//                     <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Trending:</span>
//                     {tags.map(t => (
//                         <button
//                             key={t}
//                             onClick={() => { setActiveTag(t); setQuery(t); }}
//                             style={{
//                                 padding: '6px 16px', background: activeTag === t ? 'var(--coral-100)' : 'rgba(10, 1, 1, 1)',
//                                 borderRadius: '50px', border: activeTag === t ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
//                                 fontSize: '0.8rem', fontWeight: 600, color: activeTag === t ? 'var(--accent-primary)' : 'var(--text-body)',
//                                 cursor: 'pointer', transition: 'all 0.2s'
//                             }}
//                         >
//                             {t}
//                         </button>
//                     ))}
//                 </div>

//                 {/* ── Stats Sections ── */}
//                 <div style={{
//                     display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
//                     gap: '20px', maxWidth: '900px', margin: '80px auto 100px', width: '100%'
//                 }}>
//                     {stats.map((s, i) => (
//                         <div key={i} className="h-stat-card" style={{
//                             background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)',
//                             padding: '30px 20px', borderRadius: '24px', border: '1px solid var(--border-light)',
//                             textAlign: 'center', transition: 'all 0.3s',
//                             position: 'relative',
//                             overflow: 'hidden'
//                         }} onMouseEnter={e => {
//                             e.currentTarget.style.transform = 'translateY(-5px)';
//                             e.currentTarget.style.borderColor = 'var(--accent-primary)';
//                             e.currentTarget.style.background = 'var(--bg-white)';
//                         }} onMouseLeave={e => {
//                             e.currentTarget.style.transform = 'translateY(0)';
//                             e.currentTarget.style.borderColor = 'var(--border-light)';
//                             e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
//                         }}>
//                             {s.isLive && (
//                                 <div style={{
//                                     width: '100px',
//                                     height: '70px',
//                                     margin: '-15px auto 10px',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center'
//                                 }}>
//                                     <Lottie
//                                         animationData={chatGroupAnimation}
//                                         loop={true}
//                                         style={{ width: '100%', height: '100%' }}
//                                     />
//                                 </div>
//                             )}
//                             <div className="h-stat-value" style={{
//                                 fontSize: '2.4rem',
//                                 fontWeight: 400,
//                                 fontFamily: '"DM Serif Display", serif',
//                                 color: 'var(--ink-900)',
//                                 marginBottom: '5px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 gap: '8px',
//                                 height: '1.2em',
//                                 overflow: 'hidden'
//                             }}>
//                                 <AnimatePresence mode="popLayout" initial={false}>
//                                     <motion.div
//                                         key={counts[i]}
//                                         initial={{ y: 20, opacity: 0 }}
//                                         animate={{ y: 0, opacity: 1 }}
//                                         exit={{ y: -20, opacity: 0 }}
//                                         transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                                         style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
//                                     >
//                                         {counts[i].toLocaleString()}<span style={{ color: 'var(--accent-primary)' }}>{s.suffix}</span>
//                                     </motion.div>
//                                 </AnimatePresence>
//                                 {s.isLive && (
//                                     <span style={{
//                                         display: 'inline-block',
//                                         width: '8px',
//                                         height: '8px',
//                                         borderRadius: '50%',
//                                         background: '#22c55e',
//                                         boxShadow: '0 0 10px #22c55e',
//                                         animation: 'pulse 1.5s infinite',
//                                         flexShrink: 0
//                                     }} />
//                                 )}
//                             </div>
//                             <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-heading)', marginBottom: '4px' }}>{s.label}</div>
//                             <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.sub}</div>
//                         </div>
//                     ))}
//                 </div>

//             </div>

//             {/* Bottom Wave decoration */}
//             <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 10 }}>
//                 <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
//                     <path d="M0 120 L0 50 Q360 10 720 60 Q1080 110 1440 60 L1440 120 Z" fill="var(--bg-white)" />
//                 </svg>
//             </div>

//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

//                 .hero-content-container {
//                     position: relative;
//                     z-index: 20;
//                     padding: clamp(100px, 15vh, 160px) 5% 60px;
//                     text-align: center;
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                 }

//                 .h-search-bar-container {
//                     display: flex;
//                     align-items: center;
//                     background: #FFFFFF;
//                     padding: 8px;
//                     border-radius: 18px;
//                     border: 1px solid rgba(0, 0, 0, 0.1);
//                     box-shadow: var(--shadow-md);
//                     width: 100%;
//                     max-width: 720px;
//                     margin-top: clamp(40px, 8vh, 60px);
//                 }

//                 .h-search-input-group {
//                     flex: 1;
//                     min-width: 200px;
//                     padding: 10px 16px;
//                     display: flex;
//                     align-items: center;
//                     gap: 12px;
//                 }

//                 .h-search-divider {
//                     width: 1px;
//                     height: 30px;
//                     background: rgba(0, 0, 0, 0.1);
//                     margin: 0 10px;
//                 }

//                 .h-search-select-group {
//                     min-width: 160px;
//                     padding: 10px 16px;
//                     display: flex;
//                     align-items: center;
//                     gap: 12px;
//                 }

//                 .h-search-submit {
//                     background: var(--accent-primary);
//                     color: #fff;
//                     padding: 14px 28px;
//                     border-radius: 12px;
//                     fontWeight: 700;
//                     display: flex;
//                     align-items: center;
//                     gap: 8px;
//                     transition: all 0.2s ease;
//                 }

//                 .h-search-submit:hover {
//                     transform: translateY(-2px);
//                     box-shadow: var(--shadow-sm);
//                     filter: brightness(1.1);
//                 }

//                 @media (max-width: 768px) {
//                     .h-search-bar-container {
//                         flex-direction: column;
//                         border-radius: 20px;
//                         padding: 12px;
//                         gap: 8px;
//                     }
//                     .h-search-input-group, .h-search-select-group {
//                         width: 100%;
//                         min-width: 0;
//                         padding: 12px;
//                         border-bottom: 1px solid var(--border-light);
//                     }
//                     .h-search-select-group {
//                         border-bottom: none;
//                     }
//                     .h-search-divider {
//                         display: none;
//                     }
//                     .h-search-submit {
//                         width: 100%;
//                         justify-content: center;
//                         padding: 16px;
//                         margin-top: 4px;
//                     }
//                     .h-corner-markers {
//                         display: none;
//                     }
//                 }

//                     @keyframes pulse {
//                         0% { transform: scale(0.95); opacity: 0.8; }
//                         50% { transform: scale(1.2); opacity: 1; }
//                         100% { transform: scale(0.95); opacity: 0.8; }
//                     }

//                     @media (max-width: 480px) {
//                         .hero-content-container {
//                             padding-top: 80px;
//                         }
//                         .h-eyebrow-text {
//                             letter-spacing: 1px !important;
//                             font-size: 0.65rem !important;
//                         }
//                         .h-stat-card {
//                             padding: 24px 16px !important;
//                         }
//                         .h-stat-value {
//                             font-size: 2rem !important;
//                         }
//                     }
//             `}</style>
//         </section>
//     );
// };

// export default Hero;























// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Lottie from 'lottie-react';
// import chatGroupAnimation from '../assets/chat-group.json';

// const useCounter = (end, duration = 2000, start = false, isLive = false) => {
//     const [count, setCount] = useState(0);
//     const [hasFinishedInitial, setHasFinishedInitial] = useState(false);

//     useEffect(() => {
//         if (!start) return;
//         let startTime = null;
//         const step = (ts) => {
//             if (!startTime) startTime = ts;
//             const p = Math.min((ts - startTime) / duration, 1);
//             const ease = 1 - Math.pow(1 - p, 3);
//             setCount(Math.floor(ease * end));
//             if (p < 1) {
//                 requestAnimationFrame(step);
//             } else {
//                 setHasFinishedInitial(true);
//             }
//         };
//         requestAnimationFrame(step);
//     }, [end, duration, start]);

//     useEffect(() => {
//         if (!isLive || !hasFinishedInitial) return;
//         const interval = setInterval(() => {
//             setCount(prev => prev + 1);
//         }, 1000);
//         return () => clearInterval(interval);
//     }, [isLive, hasFinishedInitial]);

//     return count;
// };

// const stats = [
//     { value: 50, suffix: 'K+', label: 'Jobs Posted', sub: 'Active listings' },
//     { value: 1254, suffix: '', label: 'Live Users', sub: 'Active right now', isLive: true },
//     { value: 12, suffix: 'K+', label: 'Companies', sub: 'Actively hiring' },
//     { value: 500, suffix: '+', label: 'New Daily', sub: 'Fresh every morning' },
// ];

// const tags = ['Software Engineer', 'DevOps', 'Data Analyst', 'Full Stack', 'ML Engineer', 'Cloud Architect'];

// const Hero = () => {
//     const [query, setQuery] = useState('');
//     const [location, setLocation] = useState('');
//     const [started, setStarted] = useState(false);
//     const [activeTag, setActiveTag] = useState(null);

//     useEffect(() => {
//         const t = setTimeout(() => setStarted(true), 600);
//         return () => clearTimeout(t);
//     }, []);

//     const s0 = useCounter(stats[0].value, 1800, started);
//     const s1 = useCounter(stats[1].value, 1400, started, true);
//     const s2 = useCounter(stats[2].value, 2000, started);
//     const s3 = useCounter(stats[3].value, 1200, started);
//     const counts = [s0, s1, s2, s3];

//     return (
//         <section style={{
//             position: 'relative',
//             minHeight: '100vh',
//             background: 'var(--cream-100)',
//             overflow: 'hidden',
//             display: 'flex',
//             flexDirection: 'column',
//             fontFamily: 'var(--font-sans)',
//         }}>
//             {/* ── Background Photo Layer ── */}
//             <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 zIndex: 0,
//                 backgroundImage: 'url("/statue_of_liberty_hero_1772045792790.png")',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center center',
//                 opacity: 0.45,
//             }} />

//             {/* Gradient overlays */}
//             <div style={{
//                 position: 'absolute', inset: 0, zIndex: 1,
//                 background: 'linear-gradient(180deg, rgba(251,246,238,0.08) 0%, rgba(251,246,238,0.12) 50%, var(--cream-100) 100%)',
//             }} />
//             <div style={{
//                 position: 'absolute', inset: 0, zIndex: 2,
//                 background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(26,18,8,0.04) 100%)',
//             }} />
//             <div style={{
//                 position: 'absolute', inset: 0, zIndex: 3,
//                 backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 71px, var(--border-light) 72px)',
//                 opacity: 0.08,
//             }} />
//             <div style={{
//                 position: 'absolute', inset: 0, zIndex: 6,
//                 background: 'rgba(0,0,0,0.32)',
//                 pointerEvents: 'none',
//             }} />

//             {/* Glow orbs */}
//             <div className="glow-orb" style={{
//                 top: '-10%', left: '-10%', width: '50vw', height: '50vw',
//                 background: 'radial-gradient(circle, var(--coral-100) 0%, transparent 70%)',
//                 zIndex: 4, animation: 'pulse-glow 8s infinite alternate',
//             }} />
//             <div className="glow-orb" style={{
//                 bottom: '-10%', right: '-10%', width: '60vw', height: '60vw',
//                 background: 'radial-gradient(circle, var(--sand-300) 0%, transparent 70%)',
//                 zIndex: 4, animation: 'pulse-glow 10s infinite alternate-reverse',
//             }} />

//             {/* Corner markers */}
//             <div style={{ position: 'absolute', top: '100px', left: '40px', width: '36px', height: '36px', borderTop: '1.5px solid rgba(212,175,55,0.5)', borderLeft: '1.5px solid rgba(212,175,55,0.5)', zIndex: 10 }} />
//             <div style={{ position: 'absolute', top: '100px', right: '40px', width: '36px', height: '36px', borderTop: '1.5px solid rgba(212,175,55,0.5)', borderRight: '1.5px solid rgba(212,175,55,0.5)', zIndex: 10 }} />
//             <div style={{ position: 'absolute', bottom: '130px', left: '40px', width: '36px', height: '36px', borderBottom: '1.5px solid rgba(212,175,55,0.5)', borderLeft: '1.5px solid rgba(212,175,55,0.5)', zIndex: 10 }} />
//             <div style={{ position: 'absolute', bottom: '130px', right: '40px', width: '36px', height: '36px', borderBottom: '1.5px solid rgba(212,175,55,0.5)', borderRight: '1.5px solid rgba(212,175,55,0.5)', zIndex: 10 }} />

//             {/* ── Main Content ── */}
//             <div className="hero-content-container">

//                 {/* ── Eyebrow ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.1 }}
//                     style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}
//                 >
//                     <div style={{ width: '32px', height: '1px', background: 'rgba(212,175,55,0.7)' }} />
//                     <span style={{
//                         fontSize: '0.7rem', fontWeight: 700, letterSpacing: '3px',
//                         textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
//                         fontFamily: 'var(--font-sans)',
//                     }}>
//                         #1 USA Tech Job Board &nbsp;·&nbsp; W2 &nbsp;·&nbsp; C2C &nbsp;·&nbsp; Sponsored
//                     </span>
//                     <div style={{ width: '32px', height: '1px', background: 'rgba(212,175,55,0.7)' }} />
//                 </motion.div>

//                 {/* ── Main Heading ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 24 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.2 }}
//                     style={{ marginBottom: '20px' }}
//                 >
//                     <h1 style={{ margin: 0, lineHeight: 1.0 }}>
//                         <span style={{
//                             display: 'block',
//                             fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)',
//                             color: 'rgba(255,255,255,0.92)',
//                             letterSpacing: '-2.5px',
//                             fontWeight: 300,
//                             fontFamily: '"DM Serif Display", serif',
//                             lineHeight: 1.05,
//                         }}>
//                             Find Your Next
//                         </span>
//                         <span style={{
//                             display: 'block',
//                             fontSize: 'clamp(3rem, 8vw, 6.4rem)',
//                             color: 'var(--accent-primary)',
//                             letterSpacing: '-3px',
//                             fontWeight: 700,
//                             fontFamily: 'var(--font-display)',
//                             fontStyle: 'italic',
//                             lineHeight: 0.95,
//                             textShadow: '0 0 60px rgba(232,69,26,0.3)',
//                         }}>
//                             Tech Career
//                         </span>
//                         <span style={{
//                             display: 'block',
//                             fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)',
//                             color: 'rgba(255,255,255,0.92)',
//                             letterSpacing: '-2.5px',
//                             fontWeight: 300,
//                             fontFamily: '"DM Serif Display", serif',
//                             lineHeight: 1.05,
//                         }}>
//                             in the USA
//                         </span>
//                     </h1>
//                 </motion.div>

//                 {/* ── Subtitle ── */}
//                 <motion.p
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.35 }}
//                     style={{
//                         color: 'rgba(255,255,255,0.55)',
//                         fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
//                         marginBottom: '32px',
//                         letterSpacing: '0.2px',
//                         lineHeight: 1.6,
//                         maxWidth: '480px',
//                     }}
//                 >
//                     1,000s of fresh verified job links, every single day —&nbsp;
//                     <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>search, filter, and apply</span> to tech jobs built for your stack.
//                 </motion.p>

//                 {/* ── Feature Pills ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 12 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: 0.45 }}
//                     style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '36px', justifyContent: 'center' }}
//                 >
//                     {[
//                         { icon: '🔍', label: 'Smart Search' },
//                         { icon: '📤', label: 'Direct Apply' },
//                         { icon: '🛡️', label: 'Verified Listings' },
//                         { icon: '💼', label: 'W2 & C2C' },
//                     ].map((pill, i) => (
//                         <span key={i} style={{
//                             display: 'inline-flex', alignItems: 'center', gap: '7px',
//                             background: 'rgba(255,255,255,0.1)',
//                             backdropFilter: 'blur(12px)',
//                             padding: '8px 18px', borderRadius: '100px',
//                             border: '1px solid rgba(255,255,255,0.15)',
//                             fontWeight: 600, fontSize: '0.85rem',
//                             color: 'rgba(255,255,255,0.85)',
//                             letterSpacing: '0.2px',
//                         }}>
//                             <span>{pill.icon}</span> {pill.label}
//                         </span>
//                     ))}
//                 </motion.div>

//                 {/* ── CTA Block ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.55 }}
//                     style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '44px' }}
//                 >
//                     {/* Founding member label */}
//                     <div style={{
//                         display: 'inline-flex', alignItems: 'center', gap: '8px',
//                         background: 'rgba(212,175,55,0.12)',
//                         border: '1px solid rgba(212,175,55,0.3)',
//                         borderRadius: '100px', padding: '6px 16px',
//                     }}>
//                         <span style={{ color: '#d4af37', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
//                             ✦ 50% off for founding members
//                         </span>
//                     </div>

//                     {/* CTA button + social proof row */}
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
//                         <button className="btn-primary" style={{
//                             padding: '18px 48px', fontSize: '1rem', fontWeight: 800,
//                             borderRadius: '14px', background: 'var(--ink-900)', color: 'var(--cream-100)',
//                             boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
//                             display: 'flex', alignItems: 'center', gap: '10px',
//                             letterSpacing: '0.2px', border: 'none', cursor: 'pointer',
//                             transition: 'all 0.25s ease',
//                         }}>
//                             Find Jobs Now
//                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
//                         </button>

//                         {/* Social proof */}
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                             <div style={{ display: 'flex' }}>
//                                 {[1, 2, 3].map(i => (
//                                     <div key={i} style={{
//                                         width: '30px', height: '30px', borderRadius: '50%',
//                                         border: '2px solid rgba(255,255,255,0.25)',
//                                         marginLeft: i === 1 ? '0' : '-9px',
//                                         background: i === 1 ? 'var(--coral-500)' : i === 2 ? 'var(--sand-500)' : 'var(--ink-700)',
//                                         color: '#fff', fontSize: '0.6rem',
//                                         display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800,
//                                     }}>
//                                         {String.fromCharCode(64 + i)}
//                                     </div>
//                                 ))}
//                             </div>
//                             <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
//                                 <strong style={{ color: 'rgba(255,255,255,0.9)' }}>350+</strong> professionals<br />applying daily
//                             </span>
//                         </div>
//                     </div>
//                 </motion.div>

//                 {/* ── Search Bar ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.65 }}
//                     className="h-search-bar-container"
//                 >
//                     <div className="h-search-input-group">
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
//                         <input
//                             type="text"
//                             placeholder="Job title, skills, keywords..."
//                             value={query}
//                             onChange={e => setQuery(e.target.value)}
//                             style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', background: 'transparent', color: '#111' }}
//                         />
//                     </div>
//                     <div className="h-search-divider" />
//                     <div className="h-search-select-group">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
//                         <select
//                             value={location}
//                             onChange={e => setLocation(e.target.value)}
//                             style={{ border: 'none', outline: 'none', fontSize: '0.9rem', background: 'transparent', cursor: 'pointer', width: '100%', color: '#111' }}
//                         >
//                             <option value="">All Locations</option>
//                             <option value="remote">Remote 🌐</option>
//                             <option value="ny">New York, NY</option>
//                             <option value="sf">San Francisco, CA</option>
//                             <option value="tx">Austin, TX</option>
//                             <option value="wa">Seattle, WA</option>
//                         </select>
//                     </div>
//                     <button className="h-search-submit">Search</button>
//                 </motion.div>

//                 {/* ── Trending Tags ── */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.6, delay: 0.75 }}
//                     style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}
//                 >
//                     <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
//                         Trending:
//                     </span>
//                     {tags.map(t => (
//                         <button
//                             key={t}
//                             onClick={() => { setActiveTag(t); setQuery(t); }}
//                             style={{
//                                 padding: '5px 14px',
//                                 background: activeTag === t ? 'rgba(232,69,26,0.15)' : 'rgba(255,255,255,0.07)',
//                                 backdropFilter: 'blur(8px)',
//                                 borderRadius: '100px',
//                                 border: activeTag === t ? '1px solid rgba(232,69,26,0.5)' : '1px solid rgba(255,255,255,0.12)',
//                                 fontSize: '0.78rem', fontWeight: 600,
//                                 color: activeTag === t ? 'var(--accent-primary)' : 'rgba(255,255,255,0.6)',
//                                 cursor: 'pointer', transition: 'all 0.2s',
//                             }}
//                         >
//                             {t}
//                         </button>
//                     ))}
//                 </motion.div>

//                 {/* ── Stats Grid ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 24 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.85 }}
//                     style={{
//                         display: 'grid',
//                         gridTemplateColumns: 'repeat(4, 1fr)',
//                         gap: '16px',
//                         maxWidth: '860px',
//                         margin: '64px auto 80px',
//                         width: '100%',
//                     }}
//                 >
//                     {stats.map((s, i) => (
//                         <div
//                             key={i}
//                             style={{
//                                 background: 'rgba(255,255,255,0.07)',
//                                 backdropFilter: 'blur(16px)',
//                                 padding: '24px 16px 20px',
//                                 borderRadius: '18px',
//                                 border: '1px solid rgba(255,255,255,0.1)',
//                                 textAlign: 'center',
//                                 transition: 'all 0.3s ease',
//                                 cursor: 'default',
//                             }}
//                             onMouseEnter={e => {
//                                 e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
//                                 e.currentTarget.style.borderColor = 'rgba(232,69,26,0.4)';
//                                 e.currentTarget.style.transform = 'translateY(-4px)';
//                             }}
//                             onMouseLeave={e => {
//                                 e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
//                                 e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
//                                 e.currentTarget.style.transform = 'translateY(0)';
//                             }}
//                         >
//                             {s.isLive && (
//                                 <div style={{ width: '72px', height: '52px', margin: '-8px auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                     <Lottie animationData={chatGroupAnimation} loop={true} style={{ width: '100%', height: '100%' }} />
//                                 </div>
//                             )}

//                             <div style={{
//                                 fontSize: '2.2rem', fontWeight: 400,
//                                 fontFamily: '"DM Serif Display", serif',
//                                 color: '#fff', marginBottom: '4px',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
//                                 height: '1.15em', overflow: 'hidden',
//                             }}>
//                                 <AnimatePresence mode="popLayout" initial={false}>
//                                     <motion.div
//                                         key={counts[i]}
//                                         initial={{ y: 18, opacity: 0 }}
//                                         animate={{ y: 0, opacity: 1 }}
//                                         exit={{ y: -18, opacity: 0 }}
//                                         transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
//                                         style={{ display: 'flex', alignItems: 'center', gap: '2px' }}
//                                     >
//                                         {counts[i].toLocaleString()}
//                                         <span style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>{s.suffix}</span>
//                                     </motion.div>
//                                 </AnimatePresence>
//                                 {s.isLive && (
//                                     <span style={{
//                                         width: '7px', height: '7px', borderRadius: '50%',
//                                         background: '#22c55e', boxShadow: '0 0 8px #22c55e',
//                                         display: 'inline-block', flexShrink: 0,
//                                         animation: 'livePulse 1.5s infinite',
//                                     }} />
//                                 )}
//                             </div>

//                             <div style={{
//                                 fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase',
//                                 letterSpacing: '1.2px', color: 'rgba(255,255,255,0.7)', marginBottom: '3px',
//                             }}>
//                                 {s.label}
//                             </div>
//                             <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3px' }}>
//                                 {s.sub}
//                             </div>
//                         </div>
//                     ))}
//                 </motion.div>

//             </div>

//             {/* ── Bottom Wave ── */}
//             <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 10 }}>
//                 <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
//                     <path d="M0 120 L0 50 Q360 10 720 60 Q1080 110 1440 60 L1440 120 Z" fill="var(--bg-white)" />
//                 </svg>
//             </div>

//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

//                 .hero-content-container {
//                     position: relative;
//                     z-index: 20;
//                     padding: clamp(110px, 16vh, 170px) 5% 60px;
//                     text-align: center;
//                     display: flex;
//                     flex-direction: column;
//                     align-items: center;
//                 }

//                 .btn-primary:hover {
//                     transform: translateY(-3px) !important;
//                     box-shadow: 0 16px 50px rgba(0,0,0,0.55) !important;
//                     background: var(--ink-800) !important;
//                 }

//                 .h-search-bar-container {
//                     display: flex;
//                     align-items: center;
//                     background: rgba(255,255,255,0.97);
//                     padding: 6px 6px 6px 0;
//                     border-radius: 16px;
//                     border: 1px solid rgba(255,255,255,0.2);
//                     box-shadow: 0 12px 60px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2);
//                     width: 100%;
//                     max-width: 680px;
//                 }

//                 .h-search-input-group {
//                     flex: 1;
//                     min-width: 180px;
//                     padding: 11px 18px;
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                 }

//                 .h-search-divider {
//                     width: 1px;
//                     height: 26px;
//                     background: rgba(0,0,0,0.08);
//                     flex-shrink: 0;
//                 }

//                 .h-search-select-group {
//                     min-width: 150px;
//                     padding: 11px 16px;
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                 }

//                 .h-search-submit {
//                     background: var(--accent-primary);
//                     color: #fff;
//                     padding: 13px 28px;
//                     border-radius: 12px;
//                     font-weight: 800;
//                     font-size: 0.9rem;
//                     border: none;
//                     cursor: pointer;
//                     transition: all 0.2s ease;
//                     white-space: nowrap;
//                     letter-spacing: 0.3px;
//                     margin-left: 6px;
//                 }

//                 .h-search-submit:hover {
//                     transform: translateY(-2px);
//                     filter: brightness(1.1);
//                     box-shadow: 0 6px 20px rgba(232,69,26,0.35);
//                 }

//                 @keyframes livePulse {
//                     0% { transform: scale(0.95); opacity: 0.8; }
//                     50% { transform: scale(1.25); opacity: 1; }
//                     100% { transform: scale(0.95); opacity: 0.8; }
//                 }

//                 @keyframes pulse-glow {
//                     0% { opacity: 0.4; transform: scale(1); }
//                     100% { opacity: 0.7; transform: scale(1.05); }
//                 }

//                 .glow-orb {
//                     position: absolute;
//                     border-radius: 50%;
//                     pointer-events: none;
//                 }

//                 @media (max-width: 768px) {
//                     .h-search-bar-container {
//                         flex-direction: column;
//                         border-radius: 18px;
//                         padding: 10px;
//                         gap: 6px;
//                     }
//                     .h-search-input-group, .h-search-select-group {
//                         width: 100%;
//                         min-width: 0;
//                         padding: 12px 14px;
//                         border-bottom: 1px solid rgba(0,0,0,0.06);
//                         box-sizing: border-box;
//                     }
//                     .h-search-select-group { border-bottom: none; }
//                     .h-search-divider { display: none; }
//                     .h-search-submit {
//                         width: 100%;
//                         justify-content: center;
//                         padding: 15px;
//                         margin-left: 0;
//                         border-radius: 12px;
//                         margin-top: 2px;
//                     }
//                     .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
//                 }

//                 @media (max-width: 480px) {
//                     .hero-content-container { padding-top: 90px; }
//                     .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
//                 }
//             `}</style>
//         </section>
//     );
// };

// export default Hero;












































// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Lottie from 'lottie-react';
// import chatGroupAnimation from '../assets/chat-group.json';

// /* ─────────────────────────────────────────
//    Animated counter hook
// ───────────────────────────────────────── */
// const useCounter = (end, duration = 2000, start = false, isLive = false) => {
//     const [count, setCount] = useState(0);
//     const [done, setDone] = useState(false);
//     useEffect(() => {
//         if (!start) return;
//         let t0 = null;
//         const tick = (ts) => {
//             if (!t0) t0 = ts;
//             const p = Math.min((ts - t0) / duration, 1);
//             setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
//             if (p < 1) requestAnimationFrame(tick);
//             else setDone(true);
//         };
//         requestAnimationFrame(tick);
//     }, [end, duration, start]);
//     useEffect(() => {
//         if (!isLive || !done) return;
//         const id = setInterval(() => setCount(c => c + 1), 1000);
//         return () => clearInterval(id);
//     }, [isLive, done]);
//     return count;
// };

// /* ─────────────────────────────────────────
//    Data
// ───────────────────────────────────────── */
// const stats = [
//     { value: 50, suffix: 'K+', label: 'Jobs Posted', sub: 'Active listings' },
//     { value: 1254, suffix: '', label: 'Live Now', sub: 'Online right now', isLive: true },
//     { value: 12, suffix: 'K+', label: 'Companies', sub: 'Actively hiring' },
//     { value: 500, suffix: '+', label: 'Added Daily', sub: 'Fresh every morning' },
// ];

// const tags = ['Software Engineer', 'DevOps', 'Data Analyst', 'Full Stack', 'ML Engineer', 'Cloud Architect'];

// /* ─────────────────────────────────────────
//    Hero Component
// ───────────────────────────────────────── */
// const Hero = () => {
//     const [query, setQuery] = useState('');
//     const [location, setLocation] = useState('');
//     const [started, setStarted] = useState(false);
//     const [activeTag, setActiveTag] = useState(null);
//     const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//     const sectionRef = useRef(null);

//     useEffect(() => {
//         const t = setTimeout(() => setStarted(true), 400);
//         return () => clearTimeout(t);
//     }, []);

//     /* Parallax mouse tracking */
//     useEffect(() => {
//         const handler = (e) => {
//             if (!sectionRef.current) return;
//             const rect = sectionRef.current.getBoundingClientRect();
//             setMousePos({
//                 x: (e.clientX - rect.left) / rect.width - 0.5,
//                 y: (e.clientY - rect.top) / rect.height - 0.5,
//             });
//         };
//         window.addEventListener('mousemove', handler);
//         return () => window.removeEventListener('mousemove', handler);
//     }, []);

//     const s0 = useCounter(stats[0].value, 1800, started);
//     const s1 = useCounter(stats[1].value, 1400, started, true);
//     const s2 = useCounter(stats[2].value, 2000, started);
//     const s3 = useCounter(stats[3].value, 1200, started);
//     const counts = [s0, s1, s2, s3];

//     /* Animation variants */
//     const fadeUp = (delay = 0) => ({
//         initial: { opacity: 0, y: 32 },
//         animate: { opacity: 1, y: 0 },
//         transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
//     });

//     return (
//         <>
//             {/* ── Global styles injected once ── */}
//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Sora:wght@300;400;600;700;800&display=swap');

//                 :root {
//                     --hero-font-display: 'Playfair Display', Georgia, serif;
//                     --hero-font-body: 'Sora', sans-serif;
//                     --hero-gold: #c9a84c;
//                     --hero-gold-light: #e8c97a;
//                     --hero-coral: #e8451a;
//                     --hero-white: rgba(255,255,255,0.92);
//                     --hero-muted: rgba(255,255,255,0.5);
//                     --hero-faint: rgba(255,255,255,0.22);
//                 }

//                 .hero-root {
//                     position: relative;
//                     min-height: 100vh;
//                     overflow: hidden;
//                     font-family: var(--hero-font-body);
//                     display: flex;
//                     flex-direction: column;
//                 }

//                 /* ── Grain texture overlay ── */
//                 .hero-root::before {
//                     content: '';
//                     position: absolute;
//                     inset: 0;
//                     z-index: 5;
//                     pointer-events: none;
//                     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
//                     background-size: 200px 200px;
//                     opacity: 0.55;
//                     mix-blend-mode: overlay;
//                 }

//                 /* ── Horizontal rule decorators ── */
//                 .hero-rule {
//                     display: block;
//                     width: 100%;
//                     height: 1px;
//                     background: linear-gradient(90deg, transparent, var(--hero-gold) 30%, rgba(201,168,76,0.4) 70%, transparent);
//                     opacity: 0.35;
//                 }

//                 /* ── Search bar ── */
//                 .h-search-wrap {
//                     display: flex;
//                     align-items: stretch;
//                     background: rgba(255,255,255,0.96);
//                     border-radius: 18px;
//                     border: 1px solid rgba(255,255,255,0.15);
//                     box-shadow:
//                         0 2px 0 rgba(255,255,255,0.08) inset,
//                         0 24px 80px rgba(0,0,0,0.55),
//                         0 4px 16px rgba(0,0,0,0.3);
//                     overflow: hidden;
//                     width: 100%;
//                     max-width: 640px;
//                 }
//                 .h-search-field {
//                     flex: 1;
//                     min-width: 0;
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                     padding: 0 20px;
//                     border-right: 1px solid rgba(0,0,0,0.07);
//                 }
//                 .h-search-field input {
//                     border: none;
//                     outline: none;
//                     width: 100%;
//                     font-size: 0.92rem;
//                     font-family: var(--hero-font-body);
//                     background: transparent;
//                     color: #111;
//                     padding: 18px 0;
//                 }
//                 .h-search-field input::placeholder { color: #aaa; }
//                 .h-search-location {
//                     display: flex;
//                     align-items: center;
//                     gap: 10px;
//                     padding: 0 16px;
//                     min-width: 140px;
//                     border-right: 1px solid rgba(0,0,0,0.07);
//                 }
//                 .h-search-location select {
//                     border: none; outline: none;
//                     font-size: 0.88rem;
//                     font-family: var(--hero-font-body);
//                     background: transparent;
//                     color: #333;
//                     cursor: pointer;
//                     width: 100%;
//                     padding: 18px 0;
//                 }
//                 .h-search-btn {
//                     display: flex;
//                     align-items: center;
//                     gap: 8px;
//                     padding: 0 28px;
//                     background: var(--hero-coral);
//                     color: #fff;
//                     font-weight: 800;
//                     font-size: 0.9rem;
//                     font-family: var(--hero-font-body);
//                     border: none;
//                     cursor: pointer;
//                     letter-spacing: 0.5px;
//                     transition: filter 0.2s, transform 0.2s;
//                     white-space: nowrap;
//                 }
//                 .h-search-btn:hover {
//                     filter: brightness(1.12);
//                 }

//                 /* ── Stat card ── */
//                 .h-stat {
//                     background: rgba(10,8,5,0.55);
//                     backdrop-filter: blur(20px) saturate(1.4);
//                     -webkit-backdrop-filter: blur(20px) saturate(1.4);
//                     border: 1px solid rgba(255,255,255,0.09);
//                     border-top: 1px solid rgba(255,255,255,0.18);
//                     border-radius: 20px;
//                     padding: 24px 20px 20px;
//                     text-align: center;
//                     transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
//                     cursor: default;
//                     box-shadow: 0 8px 32px rgba(0,0,0,0.3);
//                 }
//                 .h-stat:hover {
//                     transform: translateY(-5px);
//                     border-color: rgba(201,168,76,0.4);
//                     box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.15);
//                 }

//                 /* ── Tag chips ── */
//                 .h-tag {
//                     padding: 7px 16px;
//                     border-radius: 100px;
//                     font-size: 0.75rem;
//                     font-weight: 600;
//                     font-family: var(--hero-font-body);
//                     border: 1px solid rgba(255,255,255,0.12);
//                     background: rgba(255,255,255,0.06);
//                     color: rgba(255,255,255,0.55);
//                     cursor: pointer;
//                     transition: all 0.2s ease;
//                     letter-spacing: 0.2px;
//                     backdrop-filter: blur(8px);
//                 }
//                 .h-tag:hover, .h-tag.active {
//                     background: rgba(232,69,26,0.15);
//                     border-color: rgba(232,69,26,0.45);
//                     color: #f0855a;
//                 }

//                 /* ── Feature badge ── */
//                 .h-badge {
//                     display: inline-flex;
//                     align-items: center;
//                     gap: 7px;
//                     padding: 8px 16px;
//                     border-radius: 100px;
//                     background: rgba(255,255,255,0.07);
//                     border: 1px solid rgba(255,255,255,0.12);
//                     font-size: 0.8rem;
//                     font-weight: 600;
//                     color: rgba(255,255,255,0.75);
//                     backdrop-filter: blur(10px);
//                     letter-spacing: 0.2px;
//                 }
//                 .h-badge-icon {
//                     width: 22px; height: 22px;
//                     border-radius: 6px;
//                     display: flex; align-items: center; justify-content: center;
//                     font-size: 0.75rem;
//                     background: rgba(255,255,255,0.1);
//                 }

//                 /* ── Social proof avatars ── */
//                 .h-avatar {
//                     width: 32px; height: 32px;
//                     border-radius: 50%;
//                     border: 2px solid rgba(0,0,0,0.5);
//                     display: flex; align-items: center; justify-content: center;
//                     font-size: 0.6rem; font-weight: 800; color: #fff;
//                     margin-left: -10px;
//                     flex-shrink: 0;
//                 }

//                 /* ── Live pulse dot ── */
//                 @keyframes livePulse {
//                     0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
//                     70%  { box-shadow: 0 0 0 8px rgba(34,197,94,0);  }
//                     100% { box-shadow: 0 0 0 0 rgba(34,197,94,0);    }
//                 }
//                 .live-dot {
//                     width: 8px; height: 8px;
//                     border-radius: 50%;
//                     background: #22c55e;
//                     display: inline-block;
//                     animation: livePulse 1.8s infinite;
//                     flex-shrink: 0;
//                 }

//                 /* ── Scroll cue ── */
//                 @keyframes scrollBounce {
//                     0%, 100% { transform: translateY(0);   opacity: 0.6; }
//                     50%       { transform: translateY(6px); opacity: 1;   }
//                 }
//                 .scroll-cue { animation: scrollBounce 2s ease-in-out infinite; }

//                 /* ── Floating geometric shapes (background decoration) ── */
//                 @keyframes floatA {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50%       { transform: translateY(-18px) rotate(4deg); }
//                 }
//                 @keyframes floatB {
//                     0%, 100% { transform: translateY(0px) rotate(0deg); }
//                     50%       { transform: translateY(14px) rotate(-3deg); }
//                 }

//                 @media (max-width: 900px) {
//                     .hero-left  { padding: clamp(100px,14vh,140px) 24px 60px !important; }
//                     .hero-right { display: none !important; }
//                     .hero-grid  { grid-template-columns: 1fr !important; }
//                     .h-search-location { display: none !important; }
//                     .h-search-wrap { max-width: 100% !important; }
//                 }
//                 @media (max-width: 600px) {
//                     .stats-row { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; }
//                     .h-search-field input { font-size: 0.85rem; }
//                     .h-search-btn { padding: 0 20px; }
//                 }
//             `}</style>

//             <section ref={sectionRef} className="hero-root">

//                 {/* ══════════════════════════════════════
//                     BACKGROUND LAYERS
//                 ══════════════════════════════════════ */}

//                 {/* Photo */}
//                 <div style={{
//                     position: 'absolute', inset: 0, zIndex: 0,
//                     backgroundImage: 'url("/statue_of_liberty_hero_1772045792790.png")',
//                     backgroundSize: 'cover',
//                     backgroundPosition: `calc(50% + ${mousePos.x * 18}px) calc(50% + ${mousePos.y * 12}px)`,
//                     transition: 'background-position 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
//                     opacity: 0.55,
//                     transform: `scale(1.04)`,
//                 }} />

//                 {/* Left-heavy cinematic gradient */}
//                 <div style={{
//                     position: 'absolute', inset: 0, zIndex: 1,
//                     background: `
//                         linear-gradient(105deg,
//                             rgba(6,4,2,0.92) 0%,
//                             rgba(6,4,2,0.82) 35%,
//                             rgba(6,4,2,0.45) 60%,
//                             rgba(6,4,2,0.15) 100%
//                         )
//                     `,
//                 }} />

//                 {/* Bottom fog */}
//                 <div style={{
//                     position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 2,
//                     background: 'linear-gradient(0deg, rgba(6,4,2,0.95) 0%, transparent 100%)',
//                 }} />

//                 {/* Vignette */}
//                 <div style={{
//                     position: 'absolute', inset: 0, zIndex: 2,
//                     background: 'radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
//                 }} />

//                 {/* Subtle horizontal scanlines */}
//                 <div style={{
//                     position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
//                     backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 4px)',
//                     opacity: 0.8,
//                 }} />

//                 {/* Floating geometry — top right */}
//                 <div style={{
//                     position: 'absolute', top: '12%', right: '6%', zIndex: 4, pointerEvents: 'none',
//                     width: '160px', height: '160px',
//                     border: '1px solid rgba(201,168,76,0.12)',
//                     borderRadius: '50%',
//                     animation: 'floatA 9s ease-in-out infinite',
//                 }} />
//                 <div style={{
//                     position: 'absolute', top: '18%', right: '10%', zIndex: 4, pointerEvents: 'none',
//                     width: '80px', height: '80px',
//                     border: '1px solid rgba(201,168,76,0.08)',
//                     borderRadius: '50%',
//                     animation: 'floatB 7s ease-in-out infinite',
//                 }} />
//                 <div style={{
//                     position: 'absolute', top: '8%', right: '20%', zIndex: 4, pointerEvents: 'none',
//                     width: '6px', height: '6px',
//                     borderRadius: '50%',
//                     background: 'rgba(201,168,76,0.4)',
//                     boxShadow: '0 0 12px rgba(201,168,76,0.3)',
//                     animation: 'floatA 5s ease-in-out infinite',
//                 }} />
//                 <div style={{
//                     position: 'absolute', top: '55%', right: '4%', zIndex: 4, pointerEvents: 'none',
//                     width: '4px', height: '4px', borderRadius: '50%',
//                     background: 'rgba(232,69,26,0.5)',
//                     boxShadow: '0 0 10px rgba(232,69,26,0.4)',
//                     animation: 'floatB 6s ease-in-out infinite',
//                 }} />

//                 {/* Gold accent line — left edge */}
//                 <div style={{
//                     position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '2px', zIndex: 8,
//                     background: 'linear-gradient(180deg, transparent, var(--hero-gold) 30%, var(--hero-gold) 70%, transparent)',
//                     opacity: 0.25,
//                 }} />

//                 {/* ══════════════════════════════════════
//                     MAIN LAYOUT — two-column asymmetric
//                 ══════════════════════════════════════ */}
//                 <div className="hero-grid" style={{
//                     position: 'relative', zIndex: 10,
//                     display: 'grid',
//                     gridTemplateColumns: '1fr 420px',
//                     flex: 1,
//                     minHeight: '100vh',
//                 }}>

//                     {/* ── LEFT COLUMN (primary content) ── */}
//                     <div className="hero-left" style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         padding: 'clamp(110px,16vh,180px) clamp(32px,5vw,80px) 80px clamp(32px,6vw,100px)',
//                     }}>

//                         {/* Eyebrow label */}
//                         <motion.div {...fadeUp(0.1)}
//                             style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}
//                         >
//                             <div style={{ width: '28px', height: '1px', background: 'var(--hero-gold)', opacity: 0.7 }} />
//                             <span style={{
//                                 fontSize: '0.65rem', fontWeight: 700, letterSpacing: '3.5px',
//                                 textTransform: 'uppercase', color: 'rgba(201,168,76,0.85)',
//                                 fontFamily: 'var(--hero-font-body)',
//                             }}>
//                                 #1 USA Tech Job Board &nbsp;·&nbsp; W2 &nbsp;·&nbsp; C2C &nbsp;·&nbsp; Sponsored
//                             </span>
//                         </motion.div>

//                         {/* ── HEADLINE — the hero's centrepiece ── */}
//                         <motion.div {...fadeUp(0.2)} style={{ marginBottom: '28px' }}>
//                             <h1 style={{ margin: 0 }}>
//                                 {/* Line 1 */}
//                                 <span style={{
//                                     display: 'block',
//                                     fontFamily: 'var(--hero-font-display)',
//                                     fontSize: 'clamp(3rem, 5.5vw, 5.4rem)',
//                                     fontWeight: 400,
//                                     fontStyle: 'normal',
//                                     color: 'rgba(255,255,255,0.88)',
//                                     lineHeight: 1.0,
//                                     letterSpacing: '-2px',
//                                 }}>
//                                     Find Your Next
//                                 </span>

//                                 {/* Line 2 — hero word, largest, accented */}
//                                 <span style={{
//                                     display: 'block',
//                                     fontFamily: 'var(--hero-font-display)',
//                                     fontSize: 'clamp(4rem, 8vw, 8.5rem)',
//                                     fontWeight: 900,
//                                     fontStyle: 'italic',
//                                     background: 'linear-gradient(135deg, #ff6b35 0%, #e8451a 40%, #c93a12 100%)',
//                                     WebkitBackgroundClip: 'text',
//                                     WebkitTextFillColor: 'transparent',
//                                     backgroundClip: 'text',
//                                     lineHeight: 0.9,
//                                     letterSpacing: '-4px',
//                                     marginTop: '-4px',
//                                     filter: 'drop-shadow(0 0 40px rgba(232,69,26,0.25))',
//                                 }}>
//                                     Tech Career
//                                 </span>

//                                 {/* Line 3 */}
//                                 <span style={{
//                                     display: 'block',
//                                     fontFamily: 'var(--hero-font-display)',
//                                     fontSize: 'clamp(3rem, 5.5vw, 5.4rem)',
//                                     fontWeight: 400,
//                                     fontStyle: 'normal',
//                                     color: 'rgba(255,255,255,0.88)',
//                                     lineHeight: 1.05,
//                                     letterSpacing: '-2px',
//                                     marginTop: '-4px',
//                                 }}>
//                                     in the USA
//                                 </span>
//                             </h1>
//                         </motion.div>

//                         {/* Thin divider */}
//                         <motion.span {...fadeUp(0.3)} className="hero-rule" style={{ marginBottom: '28px', maxWidth: '480px' }} />

//                         {/* Subheadline */}
//                         <motion.p {...fadeUp(0.35)} style={{
//                             fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
//                             color: '#4B5563',
//                             lineHeight: 1.75,
//                             maxWidth: '440px',
//                             margin: '0 0 36px',
//                             fontFamily: 'var(--hero-font-body)',
//                             fontWeight: 300,
//                         }}>
//                             Thousands of verified tech job links delivered fresh every single morning.{' '}
//                              <span style={{ color: '#111827', fontWeight: 600 }}>Search. Filter. Apply directly</span>
//                             {' '}— no recruiters, no fluff.
//                         </motion.p>

//                         {/* Feature badges row */}
//                         <motion.div {...fadeUp(0.4)}
//                             style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}
//                         >
//                             {[
//                                 { icon: '🔍', label: 'Smart Search' },
//                                 { icon: '📤', label: 'Direct Apply' },
//                                 { icon: '✅', label: 'Verified Listings' },
//                                 { icon: '🛂', label: 'H1B Sponsored' },
//                             ].map((b, i) => (
//                                 <div key={i} className="h-badge">
//                                     <span className="h-badge-icon">{b.icon}</span>
//                                     {b.label}
//                                 </div>
//                             ))}
//                         </motion.div>

//                         {/* ── Founding offer strip ── */}
//                         <motion.div {...fadeUp(0.45)} style={{ marginBottom: '24px' }}>
//                             <div style={{
//                                 display: 'inline-flex', alignItems: 'center', gap: '10px',
//                                 padding: '10px 20px',
//                                 borderRadius: '12px',
//                                 background: 'rgba(201,168,76,0.08)',
//                                 border: '1px solid rgba(201,168,76,0.2)',
//                             }}>
//                                 <span style={{ fontSize: '1rem' }}>✦</span>
//                                 <span style={{
//                                     fontSize: '0.82rem', fontWeight: 700,
//                                     color: 'rgba(201,168,76,0.9)',
//                                     letterSpacing: '0.3px',
//                                 }}>
//                                     50% off for founding members — limited spots
//                                 </span>
//                                 <span style={{
//                                     background: 'rgba(201,168,76,0.15)',
//                                     border: '1px solid rgba(201,168,76,0.3)',
//                                     borderRadius: '6px',
//                                     padding: '2px 10px',
//                                     fontSize: '0.7rem',
//                                     fontWeight: 800,
//                                     color: '#c9a84c',
//                                     letterSpacing: '1px',
//                                     textTransform: 'uppercase',
//                                 }}>Ends Soon</span>
//                             </div>
//                         </motion.div>

//                         {/* ── CTA row ── */}
//                         <motion.div {...fadeUp(0.5)}
//                             style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '48px' }}
//                         >
//                             <button style={{
//                                 display: 'flex', alignItems: 'center', gap: '12px',
//                                 padding: '18px 40px',
//                                 background: 'var(--hero-coral)',
//                                 color: '#fff',
//                                 fontFamily: 'var(--hero-font-body)',
//                                 fontWeight: 800,
//                                 fontSize: '1rem',
//                                 letterSpacing: '0.3px',
//                                 border: 'none',
//                                 borderRadius: '14px',
//                                 cursor: 'pointer',
//                                 boxShadow: '0 8px 32px rgba(232,69,26,0.4), 0 2px 8px rgba(232,69,26,0.3)',
//                                 transition: 'transform 0.2s, box-shadow 0.2s, filter 0.2s',
//                             }}
//                                 onMouseEnter={e => {
//                                     e.currentTarget.style.transform = 'translateY(-3px)';
//                                     e.currentTarget.style.boxShadow = '0 16px 48px rgba(232,69,26,0.5), 0 4px 12px rgba(232,69,26,0.35)';
//                                 }}
//                                 onMouseLeave={e => {
//                                     e.currentTarget.style.transform = 'translateY(0)';
//                                     e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,69,26,0.4), 0 2px 8px rgba(232,69,26,0.3)';
//                                 }}
//                             >
//                                 Find Jobs Now
//                                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14M12 5l7 7-7 7" />
//                                 </svg>
//                             </button>

//                             {/* Social proof */}
//                             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                                 <div style={{ display: 'flex', marginLeft: '10px' }}>
//                                     {[
//                                         { bg: '#e8451a', letter: 'A' },
//                                         { bg: '#c9a84c', letter: 'B' },
//                                         { bg: '#2a5298', letter: 'C' },
//                                         { bg: '#22863a', letter: 'D' },
//                                     ].map((a, i) => (
//                                         <div key={i} className="h-avatar" style={{ background: a.bg }}>
//                                             {a.letter}
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div>
//                                     <div style={{ display: 'flex', gap: '2px', marginBottom: '3px' }}>
//                                         {[...Array(5)].map((_, i) => (
//                                             <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
//                                                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
//                                             </svg>
//                                         ))}
//                                     </div>
//                                     <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.2 }}>
//                                         <strong style={{ color: 'rgba(255,255,255,0.85)' }}>350+</strong> professionals applying daily
//                                     </span>
//                                 </div>
//                             </div>
//                         </motion.div>

//                         {/* ── Search bar ── */}
//                         <motion.div {...fadeUp(0.58)} style={{ marginBottom: '20px' }}>
//                             <div className="h-search-wrap">
//                                 <div className="h-search-field">
//                                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                                         <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
//                                     </svg>
//                                     <input
//                                         type="text"
//                                         placeholder="Job title, skills, or keywords..."
//                                         value={query}
//                                         onChange={e => setQuery(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="h-search-location">
//                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
//                                     </svg>
//                                     <select value={location} onChange={e => setLocation(e.target.value)}>
//                                         <option value="">All Locations</option>
//                                         <option value="remote">Remote 🌐</option>
//                                         <option value="ny">New York, NY</option>
//                                         <option value="sf">San Francisco, CA</option>
//                                         <option value="tx">Austin, TX</option>
//                                         <option value="wa">Seattle, WA</option>
//                                     </select>
//                                 </div>
//                                 <button className="h-search-btn">
//                                     Search
//                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                         <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </motion.div>

//                         {/* Trending tags */}
//                         <motion.div {...fadeUp(0.64)}
//                             style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}
//                         >
//                             <span style={{
//                                 fontSize: '0.65rem', fontWeight: 700, letterSpacing: '2px',
//                                 textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
//                                 marginRight: '2px',
//                             }}>Trending:</span>
//                             {tags.map(t => (
//                                 <button key={t}
//                                     className={`h-tag${activeTag === t ? ' active' : ''}`}
//                                     onClick={() => { setActiveTag(t); setQuery(t); }}
//                                 >
//                                     {t}
//                                 </button>
//                             ))}
//                         </motion.div>

//                     </div>{/* end left col */}

//                     {/* ── RIGHT COLUMN (stats panel) ── */}
//                     <div className="hero-right" style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'center',
//                         alignItems: 'stretch',
//                         padding: 'clamp(110px,16vh,180px) 40px 80px 20px',
//                         gap: '14px',
//                     }}>

//                         {/* Live stats cards */}
//                         {stats.map((s, i) => (
//                             <motion.div
//                                 key={i}
//                                 className="h-stat"
//                                 initial={{ opacity: 0, x: 40 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
//                             >
//                                 {s.isLive && (
//                                     <div style={{
//                                         width: '64px', height: '44px',
//                                         margin: '-10px auto 6px',
//                                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                     }}>
//                                         <Lottie animationData={chatGroupAnimation} loop style={{ width: '100%', height: '100%' }} />
//                                     </div>
//                                 )}

//                                 {/* Number */}
//                                 <div style={{
//                                     fontFamily: 'var(--hero-font-display)',
//                                     fontSize: '2.6rem',
//                                     fontWeight: 900,
//                                     color: '#fff',
//                                     lineHeight: 1,
//                                     marginBottom: '6px',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     gap: '6px',
//                                     height: '1.15em',
//                                     overflow: 'hidden',
//                                 }}>
//                                     <AnimatePresence mode="popLayout" initial={false}>
//                                         <motion.span
//                                             key={counts[i]}
//                                             initial={{ y: 20, opacity: 0 }}
//                                             animate={{ y: 0, opacity: 1 }}
//                                             exit={{ y: -20, opacity: 0 }}
//                                             transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                                             style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}
//                                         >
//                                             <span>{counts[i].toLocaleString()}</span>
//                                             <span style={{
//                                                 color: 'var(--hero-coral)',
//                                                 fontSize: '1.6rem',
//                                                 fontWeight: 700,
//                                             }}>{s.suffix}</span>
//                                         </motion.span>
//                                     </AnimatePresence>
//                                     {s.isLive && <span className="live-dot" />}
//                                 </div>

//                                 {/* Label */}
//                                 <div style={{
//                                     fontSize: '0.72rem', fontWeight: 800,
//                                     textTransform: 'uppercase', letterSpacing: '1.5px',
//                                     color: 'rgba(255,255,255,0.65)',
//                                     marginBottom: '3px',
//                                     fontFamily: 'var(--hero-font-body)',
//                                 }}>
//                                     {s.label}
//                                 </div>
//                                 <div style={{
//                                     fontSize: '0.68rem',
//                                     color: 'rgba(255,255,255,0.28)',
//                                     letterSpacing: '0.3px',
//                                     fontFamily: 'var(--hero-font-body)',
//                                 }}>
//                                     {s.sub}
//                                 </div>
//                             </motion.div>
//                         ))}

//                         {/* Bottom note */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.9 }}
//                             style={{
//                                 textAlign: 'center', marginTop: '4px',
//                                 fontSize: '0.65rem', fontWeight: 600,
//                                 color: 'rgba(255,255,255,0.2)',
//                                 letterSpacing: '1px', textTransform: 'uppercase',
//                                 fontFamily: 'var(--hero-font-body)',
//                             }}
//                         >
//                             Updated in real-time
//                         </motion.div>

//                     </div>{/* end right col */}

//                 </div>{/* end grid */}

//                 {/* ── Bottom wave ── */}
//                 <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 10 }}>
//                     <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
//                         <path d="M0 100 L0 48 Q360 8 720 52 Q1080 96 1440 52 L1440 100 Z" fill="var(--bg-white, #fff)" />
//                     </svg>
//                 </div>

//                 {/* ── Scroll cue ── */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.4 }}
//                     className="scroll-cue"
//                     style={{
//                         position: 'absolute', bottom: '32px', left: '50%',
//                         transform: 'translateX(-50%)',
//                         zIndex: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
//                     }}
//                 >
//                     <span style={{ fontSize: '0.6rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--hero-font-body)' }}>
//                         Scroll
//                     </span>
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M12 5v14M5 12l7 7 7-7" />
//                     </svg>
//                 </motion.div>

//             </section>
//         </>
//     );
// };

// export default Hero;




























import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import chatGroupAnimation from '../assets/chat-group.json';

/* ─────────────────────────────────────────────────────────
   Counter hook
───────────────────────────────────────────────────────── */
const useCounter = (end, duration = 2000, start = false, isLive = false) => {
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);
    useEffect(() => {
        if (!start) return;
        let t0 = null;
        const tick = (ts) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
            if (p < 1) requestAnimationFrame(tick); else setDone(true);
        };
        requestAnimationFrame(tick);
    }, [end, duration, start]);
    useEffect(() => {
        if (!isLive || !done) return;
        const id = setInterval(() => setCount(c => c + 1), 1000);
        return () => clearInterval(id);
    }, [isLive, done]);
    return count;
};

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const stats = [
    { value: 50, suffix: 'K+', label: 'Jobs Posted', sub: 'Active listings' },
    { value: 1308, suffix: '', label: 'Live Now', sub: 'Online right now', isLive: true },
    { value: 12, suffix: 'K+', label: 'Companies', sub: 'Actively hiring' },
    { value: 500, suffix: '+', label: 'Added Daily', sub: 'Fresh every morning' },
];



const tickerItems = [
    '50K+ Live Jobs', 'W2 & C2C Roles', 'H1B Sponsored', 'Remote & Hybrid',
    'Direct Apply Links', 'ATS-Friendly Resumes', 'Daily Fresh Listings', 'USA Tech Focused',
    '50K+ Live Jobs', 'W2 & C2C Roles', 'H1B Sponsored', 'Remote & Hybrid',
    'Direct Apply Links', 'ATS-Friendly Resumes', 'Daily Fresh Listings', 'USA Tech Focused',
];

/* ─────────────────────────────────────────────────────────
   Hero
───────────────────────────────────────────────────────── */
export default function Hero() {
    const [started, setStarted] = useState(false);
    const [mx, setMx] = useState(0);
    const [my, setMy] = useState(0);
    const rootRef = useRef(null);

    useEffect(() => { const t = setTimeout(() => setStarted(true), 300); return () => clearTimeout(t); }, []);

    useEffect(() => {
        const h = (e) => {
            if (!rootRef.current) return;
            const r = rootRef.current.getBoundingClientRect();
            setMx((e.clientX - r.left) / r.width);
            setMy((e.clientY - r.top) / r.height);
        };
        window.addEventListener('mousemove', h, { passive: true });
        return () => window.removeEventListener('mousemove', h);
    }, []);

    const s0 = useCounter(stats[0].value, 1800, started);
    
    // Calculate live count with a +2 daily increase since April 2, 2026
    const baseValue = stats[1].value;
    const startDate = new Date('2026-04-02');
    const daysSince = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
    const s1 = baseValue + (Math.max(0, daysSince) * 2);

    const s2 = useCounter(stats[2].value, 2000, started);
    const s3 = useCounter(stats[3].value, 1200, started);
    const counts = [s0, s1, s2, s3];

    /* parallax transforms */
    const bgX = `${(mx - 0.5) * -22}px`;
    const bgY = `${(my - 0.5) * -14}px`;

    return (
        <>
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

            .hero-root * { box-sizing: border-box; }

            /* ── Ticker ── */
            @keyframes ticker {
                from { transform: translateX(0); }
                to   { transform: translateX(-50%); }
            }
            .ticker-track { animation: ticker 30s linear infinite; }
            .ticker-track:hover { animation-play-state: paused; }

            /* ── Mesh gradient pulse ── */
            @keyframes meshPulse {
                0%,100% { opacity: 0.55; transform: scale(1)   rotate(0deg); }
                50%      { opacity: 0.75; transform: scale(1.08) rotate(3deg); }
            }
            @keyframes meshPulseB {
                0%,100% { opacity: 0.4; transform: scale(1)    rotate(0deg); }
                50%      { opacity: 0.6; transform: scale(1.06) rotate(-4deg); }
            }

            /* ── Glow ring ── */
            @keyframes glowRing {
                0%,100% { box-shadow: 0 0 0 0 rgba(232,69,26,0); }
                50%      { box-shadow: 0 0 60px 20px rgba(232,69,26,0.08); }
            }

            /* ── Floating orb ── */
            @keyframes floatUp {
                0%,100% { transform: translateY(0px);  }
                50%      { transform: translateY(-12px); }
            }
            @keyframes floatDown {
                0%,100% { transform: translateY(0px); }
                50%      { transform: translateY(10px); }
            }

            /* ── Live dot ── */
            @keyframes livePulse {
                0%   { box-shadow: 0 0 0 0   rgba(34,197,94,.7); }
                70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
                100% { box-shadow: 0 0 0 0   rgba(34,197,94,0); }
            }

            /* ── Scroll indicator ── */
            @keyframes scrollDrop {
                0%   { transform: translateY(0);   opacity: 1; }
                100% { transform: translateY(10px); opacity: 0; }
            }

            /* ── Stat card hover ── */
            .h-stat-card {
                background: rgba(251, 246, 238, 0.4);
                border: 1px solid rgba(0, 0, 0, 0.08);
                border-radius: 20px;
                padding: 22px 20px 18px;
                transition: transform .3s ease, background .3s ease, border-color .3s ease, box-shadow .3s ease;
                cursor: default;
                text-align: center;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
            }
            .h-stat-card:hover {
                transform: translateY(-6px);
                background: rgba(255,255,255,0.07);
                border-color: rgba(232,69,26,0.35);
                box-shadow: 0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(232,69,26,.12);
            }

            /* ── Search bar ── */
            .h-search-outer {
                background: rgba(255, 255, 255, 0.08);
                backdrop-filter: blur(30px);
                -webkit-backdrop-filter: blur(30px);
                border-radius: 20px;
                border: 1.5px solid rgba(255, 255, 255, 0.12);
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                display: flex;
                align-items: stretch;
                overflow: hidden;
                width: 100%;
                max-width: 680px;
                margin: 0 auto;
                transition: all 0.3s ease;
            }
            .h-search-field {
                flex: 1; min-width: 0;
                display: flex; align-items: center; gap: 10px;
                border-right: 1px solid rgba(255,255,255,0.1);
            }
            .h-search-field input {
                border: none; outline: none;
                width: 100%; padding: 19px 0;
                font-size: .93rem; font-family: 'Cabinet Grotesk', sans-serif;
                background: transparent; color: #fff;
            }
            .h-search-field input::placeholder { color: #bbb; }
            .h-search-loc {
                display: flex; align-items: center; gap: 9px;
                padding: 0 16px; min-width: 148px;
                border-right: 1px solid rgba(0,0,0,.07);
            }
            .h-search-loc select {
                border: none; outline: none; background: transparent;
                font-size: .87rem; font-family: 'Cabinet Grotesk', sans-serif;
                color: #fff; cursor: pointer; width: 100%; padding: 19px 0;
            }
            .h-search-btn {
                display: flex; align-items: center; gap: 8px;
                padding: 0 32px;
                background: #e8451a; color: #fff;
                font-weight: 800; font-size: .9rem;
                font-family: 'Cabinet Grotesk', sans-serif;
                letter-spacing: .5px; border: none; cursor: pointer;
                transition: filter .2s ease;
                white-space: nowrap;
            }
            .h-search-btn:hover { filter: brightness(1.1); }

            /* ── Tags ── */
            .h-tag {
                display: inline-flex; align-items: center; gap: 6px;
                padding: 7px 16px; border-radius: 100px;
                font-size: .75rem; font-weight: 700;
                font-family: 'Cabinet Grotesk', sans-serif;
                border: 1px solid rgba(255,255,255,0.1);
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                cursor: pointer; transition: all .2s ease;
                backdrop-filter: blur(6px);
            }
            .h-tag:hover, .h-tag.active {
                background: rgba(232,69,26,0.25);
                border-color: rgba(232,69,26,0.5);
                color: #fff;
            }

            /* ── CTA button ── */
            .h-cta-btn {
                display: inline-flex; align-items: center; gap: 12px;
                padding: 18px 44px;
                background: #e8451a;
                color: #fff; font-weight: 900; font-size: 1rem;
                font-family: 'Cabinet Grotesk', sans-serif;
                letter-spacing: .4px; border: none; border-radius: 16px;
                cursor: pointer;
                box-shadow: 0 8px 32px rgba(232,69,26,.45), 0 2px 8px rgba(232,69,26,.3);
                transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
            }
            .h-cta-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 20px 56px rgba(232,69,26,.55), 0 4px 16px rgba(232,69,26,.35);
                filter: brightness(1.06);
            }

            /* ── Ghost btn ── */
            .h-ghost-btn {
                display: inline-flex; align-items: center; gap: 10px;
                padding: 17px 32px;
                background: rgba(255,255,255,.06);
                color: rgba(255,255,255,.8);
                font-weight: 700; font-size: .95rem;
                font-family: 'Cabinet Grotesk', sans-serif;
                letter-spacing: .3px;
                border: 1px solid rgba(255,255,255,.12);
                border-radius: 16px; cursor: pointer;
                backdrop-filter: blur(10px);
                transition: all .25s ease;
            }
            .h-ghost-btn:hover {
                background: rgba(255,255,255,.1);
                border-color: rgba(255,255,255,.22);
                transform: translateY(-2px);
            }

            @media (max-width: 768px) {
                .h-search-loc { display: none; }
                .h-search-outer { max-width: 100%; }
                .hero-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
                .hero-cta-row { flex-direction: column !important; align-items: stretch !important; }
                .h-cta-btn, .h-ghost-btn { justify-content: center; }
            }
        `}</style>

            <section ref={rootRef} className="hero-root" style={{
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                background: 'transparent',
            }}>

                {/* ══════════════════════════════════
                BACKGROUND SYSTEM
            ══════════════════════════════════ */}

                {/* Photo layer — parallax */}
                <div style={{
                    position: 'absolute', inset: '-5%', zIndex: 0,
                    backgroundImage: 'url("/gatebrige.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: `calc(50% + ${bgX}) calc(50% + ${bgY})`,
                    opacity: 0.8,
                    transform: 'scale(1.1)',
                    transition: 'background-position .9s cubic-bezier(.25,.46,.45,.94)',
                }} />

                {/* Deep cinematic gradient — left to right opacity */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(110deg, rgba(251,246,238,.55) 0%, rgba(251,246,238,.35) 40%, rgba(251,246,238,0) 65%, transparent 100%)',
                }} />

                {/* Bottom mist */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', zIndex: 2,
                    background: 'linear-gradient(0deg, var(--ink-900) 0%, rgba(251,246,238,.2) 55%, transparent 100%)',
                }} />

                {/* ── MESH GRADIENTS — the "wow" factor ── */}
                <div style={{
                    position: 'absolute', zIndex: 2, pointerEvents: 'none',
                    top: '-20%', left: '-15%',
                    width: '75vw', height: '75vw', borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 40%, rgba(232,69,26,0.18) 0%, rgba(180,40,10,0.08) 40%, transparent 70%)',
                    animation: 'meshPulse 12s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute', zIndex: 2, pointerEvents: 'none',
                    top: '10%', right: '-20%',
                    width: '65vw', height: '65vw', borderRadius: '50%',
                    background: 'radial-gradient(circle at 60% 40%, rgba(201,168,76,0.1) 0%, rgba(150,110,40,0.05) 40%, transparent 70%)',
                    animation: 'meshPulseB 15s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute', zIndex: 2, pointerEvents: 'none',
                    bottom: '5%', left: '30%',
                    width: '50vw', height: '30vw', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(60,100,255,0.05) 0%, transparent 70%)',
                    animation: 'meshPulse 18s ease-in-out infinite',
                }} />

                {/* ── Noise grain ── */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E")`,
                    backgroundSize: '180px',
                    opacity: 0.6, mixBlendMode: 'overlay',
                }} />

                {/* ── Scanlines ── */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.012) 3px)',
                }} />

                {/* ── Floating geometric ornaments ── */}
                {/* Large circle ring — upper right */}
                <div style={{
                    position: 'absolute', top: '8%', right: '5%', zIndex: 4, pointerEvents: 'none',
                    width: '260px', height: '260px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.04)',
                    animation: 'floatDown 11s ease-in-out infinite',
                }}>
                    <div style={{
                        position: 'absolute', inset: '30px', borderRadius: '50%',
                        border: '1px solid rgba(232,69,26,0.08)',
                    }} />
                    <div style={{
                        position: 'absolute', inset: '70px', borderRadius: '50%',
                        border: '1px dashed rgba(201,168,76,0.12)',
                    }} />
                </div>

                {/* Small accent dot — top right area */}
                <div style={{
                    position: 'absolute', top: '18%', right: '18%', zIndex: 4, pointerEvents: 'none',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: 'rgba(232,69,26,0.6)',
                    boxShadow: '0 0 16px rgba(232,69,26,0.4)',
                    animation: 'floatUp 5s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute', top: '35%', right: '8%', zIndex: 4, pointerEvents: 'none',
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: 'rgba(201,168,76,0.5)',
                    boxShadow: '0 0 12px rgba(201,168,76,0.3)',
                    animation: 'floatDown 7s ease-in-out infinite',
                }} />

                {/* Vertical line — far left */}
                <div style={{
                    position: 'absolute', left: '0', top: '12%', bottom: '12%', width: '1px', zIndex: 5,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(232,69,26,0.3) 30%, rgba(201,168,76,0.2) 70%, transparent 100%)',
                }} />

                {/* Horizontal hairlines */}
                <div style={{
                    position: 'absolute', top: '11%', left: 0, right: 0, height: '1px', zIndex: 5,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)',
                }} />

                {/* ══════════════════════════════════
                TOP TICKER BAR
            ══════════════════════════════════ */}
                <div style={{
                    position: 'relative', zIndex: 20,
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <div className="ticker-track" style={{ display: 'flex', width: 'max-content', padding: '11px 0' }}>
                        {tickerItems.map((item, i) => (
                            <span key={i} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '14px',
                                paddingRight: '40px',
                                fontSize: '0.72rem', fontWeight: 700,
                                fontFamily: "'Cabinet Grotesk', sans-serif",
                                color: i % 4 === 0 ? 'rgba(232,69,26,0.9)' : 'rgba(0,0,0,0.4)',
                                letterSpacing: '1.5px', textTransform: 'uppercase', whiteSpace: 'nowrap',
                            }}>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(232,69,26,0.5)', display: 'inline-block', flexShrink: 0 }} />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════════
                HERO BODY
            ══════════════════════════════════ */}
                <div style={{
                    position: 'relative', zIndex: 10, flex: 1,
                    display: 'flex', flexDirection: 'column',
                    padding: 'clamp(60px,10vh,100px) clamp(24px,6vw,100px) 60px',
                    maxWidth: '1300px', width: '100%', margin: '0 auto',
                }}>

                    {/* ── EYEBROW ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6, delay: .15, ease: [.16, 1, .3, 1] }}
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '36px' }}
                    >
                        {/* Live indicator pill */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '7px',
                            padding: '6px 14px', borderRadius: '100px',
                            background: 'rgba(34,197,94,0.08)',
                            border: '1px solid rgba(34,197,94,0.2)',
                        }}>
                            <span style={{
                                width: '7px', height: '7px', borderRadius: '50%',
                                background: '#22c55e', display: 'inline-block',
                                animation: 'livePulse 1.8s infinite',
                            }} />
                            <span style={{
                                fontSize: '0.68rem', fontWeight: 800,
                                fontFamily: "'Cabinet Grotesk', sans-serif",
                                color: 'rgba(34,197,94,0.9)', letterSpacing: '1px', textTransform: 'uppercase',
                            }}>Live · {s1.toLocaleString()} Active</span>
                        </div>
                        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />
                        <span style={{
                            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '2.5px',
                            textTransform: 'uppercase',
                            color: 'rgba(0,0,0,0.45)',
                            fontFamily: "'Cabinet Grotesk', sans-serif",
                        }}>BigCareerDream · W2 · C2C · Sponsored</span>
                    </motion.div>

                    {/* ── HEADLINE — the centrepiece ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .8, delay: .25, ease: [.16, 1, .3, 1] }}
                        style={{ marginBottom: '32px' }}
                    >
                        <h1 style={{ margin: 0, padding: 0 }}>

                            {/* "Find Your Next" — thin serif */}
                            <span style={{
                                display: 'block',
                                fontFamily: "'Instrument Serif', Georgia, serif",
                                fontSize: 'clamp(2.8rem, 6vw, 5.8rem)',
                                fontWeight: 400,
                                fontStyle: 'italic',
                                color: '#111827',
                                lineHeight: 1.0,
                                letterSpacing: '-1px',
                            }}>Find Your Next</span>

                            <span style={{
                                display: 'block',
                                fontFamily: "'Bebas Neue', Impact, sans-serif",
                                fontSize: 'clamp(5rem, 14vw, 14rem)',
                                fontWeight: 400,
                                letterSpacing: '2px',
                                lineHeight: 0.88,
                                background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 30%, #e8451a 55%, #ff7043 75%, rgba(255,255,255,0.6) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                backgroundSize: '200% auto',
                                filter: 'drop-shadow(0 0 60px rgba(232,69,26,0.2))',
                            }}>TECH CAREER</span>

                            {/* "in the USA" + country flag area */}
                            <span style={{
                                display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap',
                                marginTop: '6px',
                            }}>
                                <span style={{
                                    fontFamily: "'Instrument Serif', Georgia, serif",
                                    fontSize: 'clamp(2.8rem, 6vw, 5.8rem)',
                                    fontWeight: 400, fontStyle: 'normal',
                                    color: '#111827',
                                    letterSpacing: '-1px', lineHeight: 1.0,
                                }}>in the USA</span>
                            </span>

                        </h1>
                    </motion.div>

                    {/* ── SUBTEXT + FEATURE PILLS in one row ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .65, delay: .4, ease: [.16, 1, .3, 1] }}
                        style={{
                            display: 'flex', alignItems: 'flex-start',
                            gap: '40px', flexWrap: 'wrap',
                            marginBottom: '44px',
                            paddingBottom: '40px',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}
                    >
                        {/* Left: paragraph */}
                        <p style={{
                            margin: 0, flex: '0 0 auto', maxWidth: '360px',
                            fontSize: 'clamp(.88rem,1.4vw,1rem)',
                            color: '#374151',
                            lineHeight: 1.8,
                            fontFamily: "'Cabinet Grotesk', sans-serif",
                            fontWeight: 400,
                        }}>
                            Thousands of verified tech jobs delivered fresh every morning.{' '}
                            <span style={{ color: '#111827', fontWeight: 700 }}>
                                Search, filter, and apply directly
                            </span>{' '}
                            — no recruiters, no fluff, just opportunity.
                        </p>

                        {/* Right: feature grid 2×2 */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: '0 0 auto' }}>
                            {[
                                { emoji: '🔗', label: 'Direct Job Links' },
                                { emoji: '📄', label: 'ATS Resumes' },
                                { emoji: '🛂', label: 'H1B Sponsored' },
                                { emoji: '⚡', label: 'Daily Fresh Jobs' },
                            ].map((f, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '9px',
                                    padding: '10px 16px', borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.55)',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    fontSize: '0.8rem', fontWeight: 700,
                                    fontFamily: "'Cabinet Grotesk', sans-serif",
                                    color: '#111827',
                                    letterSpacing: '0.2px',
                                    whiteSpace: 'nowrap',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                }}>
                                    <span>{f.emoji}</span>
                                    {f.label}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── FOUNDING OFFER STRIP ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .5, delay: .5 }}
                        style={{ marginBottom: '24px' }}
                    >
                        {/* <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            padding: '12px 22px 12px 16px',
                            borderRadius: '14px',
                            background: 'rgba(201,168,76,0.06)',
                            border: '1px solid rgba(201,168,76,0.18)',
                            backdropFilter: 'blur(10px)',
                        }}> */}
                        {/* <div style={{
                                padding: '5px 12px', borderRadius: '8px',
                                background: 'rgba(201,168,76,0.15)',
                                fontSize: '0.65rem', fontWeight: 900,
                                color: '#c9a84c', letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                fontFamily: "'Cabinet Grotesk', sans-serif",
                            }}>50% OFF</div>
                            <span style={{
                                fontSize: '0.85rem', fontWeight: 600,
                                color: 'rgba(201,168,76,0.8)',
                                fontFamily: "'Cabinet Grotesk', sans-serif",
                            }}>
                                Founding member pricing — limited spots remaining
                            </span>
                            <div style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                background: '#22c55e', animation: 'livePulse 2s infinite',
                            }} />
                        </div> */}
                    </motion.div>

                    {/* ── CTA ROW ── */}
                    <motion.div
                        className="hero-cta-row"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .6, delay: .58, ease: [.16, 1, .3, 1] }}
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '84px' }}
                    >
                        <button className="h-cta-btn">
                            Find Jobs Now
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </button>

                        <button className="h-ghost-btn">
                            View All Plans
                        </button>

                        {/* Social proof */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '4px' }}>
                            <div style={{ display: 'flex' }}>
                                {[
                                    { bg: '#e8451a' }, { bg: '#c9a84c' },
                                    { bg: '#2a5298' }, { bg: '#16a34a' },
                                ].map((a, i) => (
                                    <div key={i} style={{
                                        width: '30px', height: '30px', borderRadius: '50%',
                                        border: '2px solid rgba(8,6,4,0.7)',
                                        marginLeft: i === 0 ? 0 : '-9px',
                                        background: a.bg,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.58rem', fontWeight: 900, color: '#fff',
                                        fontFamily: "'Cabinet Grotesk', sans-serif",
                                    }}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div style={{ display: 'flex', gap: '2px', marginBottom: '3px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'rgba(0,0,0,0.5)',
                                    fontFamily: "'Cabinet Grotesk', sans-serif",
                                }}>
                                    <span style={{ color: 'rgba(0,0,0,0.9)', fontWeight: 700 }}>350+</span> pros applying daily
                                </div>
                            </div>
                        </div>
                    </motion.div>





                    {/* ── STATS ROW ── */}
                    <motion.div
                        className="hero-stats-grid"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .7, delay: .85, ease: [.16, 1, .3, 1] }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '14px',
                        }}
                    >
                        {stats.map((s, i) => (
                            <div key={i} className="h-stat-card">
                                {s.isLive && (
                                    <div style={{
                                        width: '56px', height: '40px',
                                        margin: '-6px auto 8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Lottie animationData={chatGroupAnimation} loop style={{ width: '100%', height: '100%' }} />
                                    </div>
                                )}

                                {/* Number */}
                                <div style={{
                                    fontFamily: "'Bebas Neue', Impact, sans-serif",
                                    fontSize: '2.8rem', lineHeight: 1, color: '#111827',
                                    marginBottom: '6px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: '4px', height: '1.1em', overflow: 'hidden',
                                }}>
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.span
                                            key={counts[i]}
                                            initial={{ y: 18, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -18, opacity: 0 }}
                                            transition={{ duration: .28, ease: [.22, 1, .36, 1] }}
                                            style={{ display: 'flex', alignItems: 'baseline', gap: '1px' }}
                                        >
                                            {counts[i].toLocaleString()}
                                            <span style={{ color: '#e8451a', fontSize: '1.8rem', fontFamily: "'Bebas Neue', sans-serif" }}>
                                                {s.suffix}
                                            </span>
                                        </motion.span>
                                    </AnimatePresence>
                                    {s.isLive && (
                                        <span style={{
                                            width: '7px', height: '7px', borderRadius: '50%',
                                            background: '#22c55e', display: 'inline-block',
                                            flexShrink: 0, marginLeft: '3px',
                                            animation: 'livePulse 1.8s infinite',
                                        }} />
                                    )}
                                </div>

                                <div style={{
                                    fontSize: '0.68rem', fontWeight: 800,
                                    textTransform: 'uppercase', letterSpacing: '1.5px',
                                    color: 'rgba(0,0,0,0.6)',
                                    fontFamily: "'Cabinet Grotesk', sans-serif",
                                    marginBottom: '3px',
                                }}>{s.label}</div>

                                <div style={{
                                    fontSize: '0.65rem', color: 'rgba(0,0,0,0.35)',
                                    fontFamily: "'Cabinet Grotesk', sans-serif",
                                    letterSpacing: '0.2px',
                                }}>{s.sub}</div>
                            </div>
                        ))}
                    </motion.div>

                </div>

                {/* ══════════════════════════════════
                BOTTOM WAVE & AIRPLANE
            ══════════════════════════════════ */}
                <style>{`
                    @keyframes heroFly {
                        0% { offset-distance: 0%; opacity: 0; }
                        5% { opacity: 1; }
                        95% { opacity: 1; }
                        100% { offset-distance: 100%; opacity: 0; }
                    }
                    .airplane-path {
                        offset-path: path("M0 40 Q360 0 720 44 Q1080 88 1440 44");
                        animation: heroFly 12s linear infinite;
                        transform-box: fill-box;
                        transform-origin: center;
                        offset-rotate: auto 90deg;
                        transform: scale(2.5);
                        filter: drop-shadow(0 4px 6px rgba(232, 69, 26, 0.35));
                    }
                    @media (max-width: 768px) {
                        .airplane-path {
                            transform: scale(4.5);
                        }
                    }
                `}</style>

                <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, zIndex: 100 }}>
                    <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
                        {/* The curve path for reference/animation */}
                        <path d="M0 90 L0 40 Q360 0 720 44 Q1080 88 1440 44 L1440 90 Z" fill="var(--bg-white, #ffffff)" />

                        {/* Airplane inside SVG for perfect coordinate alignment */}
                        <g className="airplane-path">
                            <path d="M21 13v-2L13 6V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V6l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-8.5L21 13z" fill="#e8451a" />
                        </g>
                    </svg>
                </div>

                {/* ── Scroll cue ── */}
                {/* <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    style={{
                        position: 'absolute', bottom: '28px', left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    }}
                >
                    <span style={{
                        fontSize: '0.58rem', letterSpacing: '2.5px', textTransform: 'uppercase',
                        color: 'rgba(0,0,0,0.35)',
                        fontFamily: "'Cabinet Grotesk', sans-serif",
                    }}>Scroll</span>
                    <div style={{
                        width: '22px', height: '34px', borderRadius: '12px',
                        border: '1.5px solid rgba(0,0,0,0.15)',
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                        padding: '5px',
                    }}>
                        <div style={{
                            width: '4px', height: '8px', borderRadius: '2px',
                            background: 'rgba(0, 0, 0, 0.25)',
                            animation: 'scrollDrop 1.6s ease-in-out infinite',
                        }} />
                    </div>
                </motion.div> */}

            </section>
        </>
    );
}




























