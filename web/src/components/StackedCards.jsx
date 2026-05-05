// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Briefcase, FileText, Globe, Github, ArrowRight, Zap } from 'lucide-react';

// const cards = [
//     {
//         id: 1,
//         icon: <Briefcase size={22} />,
//         tag: 'DAILY JOB LINKS',
//         title: 'Fresh Opportunities, Every Single Day',
//         desc: 'Every morning, our platform delivers hundreds of new job postings directly from top US companies. No stale listings, just curated links.',
//         highlight: 'Updated in the last 24 hours',
//         accentColor: '#2563EB',
//         accentGlow: 'rgba(37,99,235,0.4)',
//         mesh: 'linear-gradient(135deg, #F8FAFF 0%, #E0E7FF 100%)',
//         image: '/joblinks1.jpg',
//     },
//     {
//         id: 2,
//         icon: <FileText size={22} />,
//         tag: 'RESUME BUILDING',
//         title: 'ATS-Optimized Resumes That Get Callbacks',
//         desc: 'Our experts craft keyword-optimized resumes tailored to your target role, helping you land interviews at Fortune 500 companies.',
//         highlight: 'Professionally crafted in 48hrs',
//         accentColor: '#059669',
//         accentGlow: 'rgba(5,150,105,0.4)',
//         mesh: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
//         image: '/Online resume-rafiki (1).png',
//     },
//     {
//         id: 3,
//         icon: <Globe size={22} />,
//         tag: 'PORTFOLIO CREATION',
//         title: 'A Portfolio That Makes Recruiters Stop Scrolling',
//         desc: 'We design personal portfolio sites that showcase your projects and story — making recruiters take notice the moment they land.',
//         highlight: 'Launched in 5 business days',
//         accentColor: '#7C3AED',
//         accentGlow: 'rgba(124,58,237,0.4)',
//         mesh: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
//         image: '/Online resume-cuate.png',
//     },
//     {
//         id: 4,
//         icon: <Github size={22} />,
//         tag: 'GITHUB OPTIMIZATION',
//         title: 'Turn Your GitHub Into a Hiring Magnet',
//         desc: 'We optimize your profile and structure pinned repositories to ensure your contribution graph tells a story of consistent work.',
//         highlight: 'Visible to 10K+ recruiters monthly',
//         accentColor: '#0EA5E9',
//         accentGlow: 'rgba(14,165,233,0.4)',
//         mesh: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
//         image: '/undraw_github-profile_abde.png',
//     },
// ];

// const StackedCards = () => {
//     const containerRef = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ['start start', 'end end'],
//     });

//     return (
//         <section
//             ref={containerRef}
//             id="platform"
//             style={{
//                 position: 'relative',
//                 minHeight: `${cards.length * 100}vh`,
//                 background: '#FFFFFF',
//             }}
//         >
//             {/* Header Area */}
//             <div style={{ padding: '100px 6% 0', textAlign: 'center', position: 'relative', zIndex: 10 }}>
//                 <div className="section-badge">Premium Features</div>
//                 <h2 style={{
//                     fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
//                     fontWeight: 900, color: '#0A1628',
//                     marginBottom: '18px', letterSpacing: '-1.5px',
//                 }}>
//                     A Complete <span className="blue-text italic">Career Suite</span>
//                 </h2>
//                 <p style={{ color: '#6B7280', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto' }}>
//                     Everything you need to navigate the competitive US tech market with confidence and speed.
//                 </p>
//             </div>

//             {/* Sticky Container */}
//             <div style={{
//                 position: 'sticky', top: 0, height: '100vh',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 overflow: 'hidden',
//             }}>
//                 {cards.map((card, i) => (
//                     <StackCard key={card.id} card={card} index={i} total={cards.length} scrollYProgress={scrollYProgress} />
//                 ))}
//             </div>
//         </section>
//     );
// };

// const StackCard = ({ card, index, total, scrollYProgress }) => {
//     const start = index / total;
//     const end = (index + 1) / total;
//     const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh']);
//     const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
//     const scale = useTransform(scrollYProgress, [end, Math.min(end + 0.1, 1)], [1, 0.94]);
//     const blur = useTransform(scrollYProgress, [end, end + 0.05], ['0px', '4px']);

//     return (
//         <motion.div
//             style={{
//                 position: 'absolute',
//                 width: '90%', maxWidth: '1100px',
//                 y, opacity, scale, filter: `blur(${blur})`,
//                 borderRadius: '32px', overflow: 'hidden',
//                 boxShadow: '0 40px 100px rgba(10,22,40,0.12)',
//                 zIndex: index + 1,
//                 border: '1px solid rgba(148,163,184,0.15)',
//                 background: '#FFFFFF',
//             }}
//         >
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '520px' }}>
//                 {/* Visual Side — Order 0 for even, Order 1 for odd */}
//                 <div style={{
//                     order: index % 2 === 0 ? 0 : 1,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     minHeight: '260px'
//                 }}>
//                     <img src={card.image} alt={card.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 60%)' }} />

//                     {/* Floating Badge */}
//                     <div style={{
//                         position: 'absolute', top: '24px', left: '24px',
//                         background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
//                         padding: '8px 16px', borderRadius: '12px',
//                         display: 'flex', alignItems: 'center', gap: '8px',
//                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.5)'
//                     }}>
//                         <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.accentColor }} />
//                         <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0A1628', letterSpacing: '0.5px' }}>{card.tag}</span>
//                     </div>

//                     <div style={{
//                         position: 'absolute', bottom: '24px', right: '30px',
//                         fontSize: '6rem', fontWeight: 900, color: 'rgba(255,255,255,0.15)',
//                         lineHeight: 1, fontFamily: "'Outfit', sans-serif"
//                     }}>0{index + 1}</div>
//                 </div>

//                 {/* Content Side — Order 1 for even, Order 0 for odd */}
//                 <div style={{
//                     order: index % 2 === 0 ? 1 : 0,
//                     padding: '60px 50px', display: 'flex', flexDirection: 'column',
//                     justifyContent: 'center', background: card.mesh, position: 'relative',
//                 }}>
//                     {/* Mesh Overlay for texture */}
//                     <div style={{
//                         position: 'absolute', inset: 0, opacity: 0.1,
//                         backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)',
//                         backgroundSize: '24px 24px', pointerEvents: 'none'
//                     }} />

//                     <div style={{ position: 'relative', zIndex: 2 }}>
//                         <div style={{
//                             width: '54px', height: '54px', borderRadius: '16px',
//                             background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                             color: card.accentColor, marginBottom: '28px',
//                             boxShadow: `0 10px 25px ${card.accentGlow}`, border: '1px solid rgba(255,255,255,0.8)'
//                         }}>
//                             {card.icon}
//                         </div>

//                         <h3 style={{
//                             fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 900,
//                             color: '#0A1628', marginBottom: '20px', letterSpacing: '-0.8px',
//                             lineHeight: 1.2
//                         }}>{card.title}</h3>

//                         <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.75, marginBottom: '28px' }}>{card.desc}</p>

//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
//                             <div style={{
//                                 padding: '6px 14px', borderRadius: '50px', background: 'rgba(255,255,255,0.6)',
//                                 border: '1px solid rgba(148,163,184,0.1)', display: 'flex', alignItems: 'center', gap: '6px'
//                             }}>
//                                 <Zap size={14} color={card.accentColor} fill={card.accentColor} />
//                                 <span style={{ fontSize: '0.8rem', fontWeight: 700, color: card.accentColor }}>{card.highlight}</span>
//                             </div>
//                         </div>

//                         <button style={{
//                             padding: '12px 28px', borderRadius: '12px', background: '#0A1628',
//                             color: '#FFFFFF', border: 'none', fontWeight: 800, fontSize: '0.9rem',
//                             display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
//                             transition: 'all 0.3s ease', boxShadow: '0 10px 20px rgba(10,22,40,0.2)'
//                         }}
//                             onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(10,22,40,0.3)'; }}
//                             onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(10,22,40,0.2)'; }}
//                         >
//                             Explore Solution <ArrowRight size={16} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default StackedCards;




































// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Briefcase, FileText, Globe, Github, ArrowRight, Zap } from 'lucide-react';

// const cards = [
//     {
//         id: 1,
//         icon: <Briefcase size={22} />,
//         tag: 'DAILY JOB LINKS',
//         title: 'Fresh Opportunities, Every Single Day',
//         desc: 'Every morning, our platform delivers hundreds of new job postings directly from top US companies. No stale listings, just curated links.',
//         highlight: 'Updated in the last 24 hours',
//         accentColor: '#2563EB',
//         accentGlow: 'rgba(37,99,235,0.4)',
//         mesh: 'linear-gradient(135deg, #F8FAFF 0%, #E0E7FF 100%)',
//         image: '/joblinks1.jpg',
//     },
//     {
//         id: 2,
//         icon: <FileText size={22} />,
//         tag: 'RESUME BUILDING',
//         title: 'ATS-Optimized Resumes That Get Callbacks',
//         desc: 'Our experts craft keyword-optimized resumes tailored to your target role, helping you land interviews at Fortune 500 companies.',
//         highlight: 'Professionally crafted in 48hrs',
//         accentColor: '#059669',
//         accentGlow: 'rgba(5,150,105,0.4)',
//         mesh: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
//         image: '/Online resume-rafiki (1).png',
//     },
//     {
//         id: 3,
//         icon: <Globe size={22} />,
//         tag: 'PORTFOLIO CREATION',
//         title: 'A Portfolio That Makes Recruiters Stop Scrolling',
//         desc: 'We design personal portfolio sites that showcase your projects and story — making recruiters take notice the moment they land.',
//         highlight: 'Launched in 5 business days',
//         accentColor: '#7C3AED',
//         accentGlow: 'rgba(124,58,237,0.4)',
//         mesh: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
//         image: '/Online resume-cuate.png',
//     },
//     {
//         id: 4,
//         icon: <Github size={22} />,
//         tag: 'GITHUB OPTIMIZATION',
//         title: 'Turn Your GitHub Into a Hiring Magnet',
//         desc: 'We optimize your profile and structure pinned repositories to ensure your contribution graph tells a story of consistent work.',
//         highlight: 'Visible to 10K+ recruiters monthly',
//         accentColor: '#0EA5E9',
//         accentGlow: 'rgba(14,165,233,0.4)',
//         mesh: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
//         image: '/undraw_github-profile_abde.png',
//     },
// ];

// const StackedCards = () => {
//     const containerRef = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ['start start', 'end end'],
//     });

//     return (
//         <section
//             ref={containerRef}
//             id="platform"
//             style={{
//                 position: 'relative',
//                 minHeight: `${cards.length * 100}vh`,
//                 background: '#FFFFFF',
//             }}
//         >
//             {/* Sticky Container — header lives inside so no gap exists */}
//             <div style={{
//                 position: 'sticky', top: 0, height: '100vh',
//                 display: 'flex', flexDirection: 'column',
//                 alignItems: 'center', justifyContent: 'center',
//                 overflow: 'hidden',
//             }}>
//                 {/* Header Area */}
//                 <div style={{
//                     textAlign: 'center', position: 'relative', zIndex: 10,
//                     marginBottom: '40px', pointerEvents: 'none',
//                 }}>
//                     <div className="section-badge">Premium Features</div>
//                     <h2 style={{
//                         fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
//                         fontWeight: 900, color: '#0A1628',
//                         marginBottom: '18px', letterSpacing: '-1.5px',
//                     }}>
//                         A Complete <span className="blue-text italic">Career Suite</span>
//                     </h2>
//                     <p style={{ color: '#6B7280', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto' }}>
//                         Everything you need to navigate the competitive US tech market with confidence and speed.
//                     </p>
//                 </div>

//                 {/* Cards Layer */}
//                 <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
//                     {cards.map((card, i) => (
//                         <StackCard key={card.id} card={card} index={i} total={cards.length} scrollYProgress={scrollYProgress} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// const StackCard = ({ card, index, total, scrollYProgress }) => {
//     const start = index / total;
//     const end = (index + 1) / total;
//     const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh']);
//     const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
//     const scale = useTransform(scrollYProgress, [end, Math.min(end + 0.1, 1)], [1, 0.94]);
//     const blur = useTransform(scrollYProgress, [end, end + 0.05], ['0px', '4px']);

//     return (
//         <motion.div
//             style={{
//                 position: 'absolute',
//                 width: '90%', maxWidth: '1100px',
//                 y, opacity, scale, filter: `blur(${blur})`,
//                 borderRadius: '32px', overflow: 'hidden',
//                 boxShadow: '0 40px 100px rgba(10,22,40,0.12)',
//                 zIndex: index + 1,
//                 border: '1px solid rgba(148,163,184,0.15)',
//                 background: '#FFFFFF',
//             }}
//         >
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '520px' }}>
//                 {/* Visual Side — Order 0 for even, Order 1 for odd */}
//                 <div style={{
//                     order: index % 2 === 0 ? 0 : 1,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     minHeight: '260px'
//                 }}>
//                     <img src={card.image} alt={card.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 60%)' }} />

//                     {/* Floating Badge */}
//                     <div style={{
//                         position: 'absolute', top: '24px', left: '24px',
//                         background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
//                         padding: '8px 16px', borderRadius: '12px',
//                         display: 'flex', alignItems: 'center', gap: '8px',
//                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.5)'
//                     }}>
//                         <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.accentColor }} />
//                         <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0A1628', letterSpacing: '0.5px' }}>{card.tag}</span>
//                     </div>

//                     <div style={{
//                         position: 'absolute', bottom: '24px', right: '30px',
//                         fontSize: '6rem', fontWeight: 900, color: 'rgba(255,255,255,0.15)',
//                         lineHeight: 1, fontFamily: "'Outfit', sans-serif"
//                     }}>0{index + 1}</div>
//                 </div>

//                 {/* Content Side — Order 1 for even, Order 0 for odd */}
//                 <div style={{
//                     order: index % 2 === 0 ? 1 : 0,
//                     padding: '60px 50px', display: 'flex', flexDirection: 'column',
//                     justifyContent: 'center', background: card.mesh, position: 'relative',
//                 }}>
//                     {/* Mesh Overlay for texture */}
//                     <div style={{
//                         position: 'absolute', inset: 0, opacity: 0.1,
//                         backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)',
//                         backgroundSize: '24px 24px', pointerEvents: 'none'
//                     }} />

//                     <div style={{ position: 'relative', zIndex: 2 }}>
//                         <div style={{
//                             width: '54px', height: '54px', borderRadius: '16px',
//                             background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                             color: card.accentColor, marginBottom: '28px',
//                             boxShadow: `0 10px 25px ${card.accentGlow}`, border: '1px solid rgba(255,255,255,0.8)'
//                         }}>
//                             {card.icon}
//                         </div>

//                         <h3 style={{
//                             fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 900,
//                             color: '#0A1628', marginBottom: '20px', letterSpacing: '-0.8px',
//                             lineHeight: 1.2
//                         }}>{card.title}</h3>

//                         <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.75, marginBottom: '28px' }}>{card.desc}</p>

//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
//                             <div style={{
//                                 padding: '6px 14px', borderRadius: '50px', background: 'rgba(255,255,255,0.6)',
//                                 border: '1px solid rgba(148,163,184,0.1)', display: 'flex', alignItems: 'center', gap: '6px'
//                             }}>
//                                 <Zap size={14} color={card.accentColor} fill={card.accentColor} />
//                                 <span style={{ fontSize: '0.8rem', fontWeight: 700, color: card.accentColor }}>{card.highlight}</span>
//                             </div>
//                         </div>

//                         <button style={{
//                             padding: '12px 28px', borderRadius: '12px', background: '#0A1628',
//                             color: '#FFFFFF', border: 'none', fontWeight: 800, fontSize: '0.9rem',
//                             display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
//                             transition: 'all 0.3s ease', boxShadow: '0 10px 20px rgba(10,22,40,0.2)'
//                         }}
//                             onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(10,22,40,0.3)'; }}
//                             onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(10,22,40,0.2)'; }}
//                         >
//                             Explore Solution <ArrowRight size={16} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default StackedCards;































// import React, { useRef } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Briefcase, FileText, Globe, Github, ArrowRight, Zap } from 'lucide-react';

// const cards = [
//     {
//         id: 1,
//         icon: <Briefcase size={22} />,
//         tag: 'DAILY JOB LINKS',
//         title: 'Fresh Opportunities, Every Single Day',
//         desc: 'Every morning, our platform delivers hundreds of new job postings directly from top US companies. No stale listings, just curated links.',
//         highlight: 'Updated in the last 24 hours',
//         accentColor: '#2563EB',
//         accentGlow: 'rgba(37,99,235,0.4)',
//         mesh: 'linear-gradient(135deg, #F8FAFF 0%, #E0E7FF 100%)',
//         image: '/joblinks1.jpg',
//     },
//     {
//         id: 2,
//         icon: <FileText size={22} />,
//         tag: 'RESUME BUILDING',
//         title: 'ATS-Optimized Resumes That Get Callbacks',
//         desc: 'Our experts craft keyword-optimized resumes tailored to your target role, helping you land interviews at Fortune 500 companies.',
//         highlight: 'Professionally crafted in 48hrs',
//         accentColor: '#059669',
//         accentGlow: 'rgba(5,150,105,0.4)',
//         mesh: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
//         image: '/Online resume-rafiki (1).png',
//     },
//     {
//         id: 3,
//         icon: <Globe size={22} />,
//         tag: 'PORTFOLIO CREATION',
//         title: 'A Portfolio That Makes Recruiters Stop Scrolling',
//         desc: 'We design personal portfolio sites that showcase your projects and story — making recruiters take notice the moment they land.',
//         highlight: 'Launched in 5 business days',
//         accentColor: '#7C3AED',
//         accentGlow: 'rgba(124,58,237,0.4)',
//         mesh: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
//         image: '/Online resume-cuate.png',
//     },
//     {
//         id: 4,
//         icon: <Github size={22} />,
//         tag: 'GITHUB OPTIMIZATION',
//         title: 'Turn Your GitHub Into a Hiring Magnet',
//         desc: 'We optimize your profile and structure pinned repositories to ensure your contribution graph tells a story of consistent work.',
//         highlight: 'Visible to 10K+ recruiters monthly',
//         accentColor: '#0EA5E9',
//         accentGlow: 'rgba(14,165,233,0.4)',
//         mesh: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
//         image: '/undraw_github-profile_abde.png',
//     },
// ];

// const StackedCards = () => {
//     const containerRef = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ['start start', 'end end'],
//     });

//     return (
//         <section
//             ref={containerRef}
//             id="platform"
//             style={{
//                 position: 'relative',
//                 minHeight: `${(cards.length - 1) * 100 + 100}vh`, // First card takes 100vh, each subsequent card adds 100vh
//                 background: '#FFFFFF',
//             }}
//         >
//             {/* Sticky Container */}
//             <div style={{
//                 position: 'sticky',
//                 top: 0,
//                 height: '100vh',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//             }}>
//                 {/* Header Area */}
//                 <div style={{
//                     textAlign: 'center',
//                     position: 'relative',
//                     zIndex: 10,
//                     marginBottom: '40px',
//                     pointerEvents: 'none',
//                 }}>
//                     <div className="section-badge">Premium Features</div>
//                     <h2 style={{
//                         fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
//                         fontWeight: 900,
//                         color: '#0A1628',
//                         marginBottom: '18px',
//                         letterSpacing: '-1.5px',
//                     }}>
//                         A Complete <span className="blue-text italic">Career Suite</span>
//                     </h2>
//                     <p style={{
//                         color: '#6B7280',
//                         fontSize: '1.1rem',
//                         maxWidth: '580px',
//                         margin: '0 auto'
//                     }}>
//                         Everything you need to navigate the competitive US tech market with confidence and speed.
//                     </p>
//                 </div>

//                 {/* Cards Container */}
//                 <div style={{
//                     position: 'relative',
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flex: 1
//                 }}>
//                     {/* First Card - Static */}
//                     <div style={{
//                         position: 'absolute',
//                         width: '90%',
//                         maxWidth: '1100px',
//                         zIndex: 1,
//                     }}>
//                         <StaticCard card={cards[0]} index={0} />
//                     </div>

//                     {/* Animated Cards (2nd, 3rd, 4th) */}
//                     {cards.slice(1).map((card, i) => {
//                         const actualIndex = i + 1; // 1, 2, 3
//                         return (
//                             <StackCard
//                                 key={card.id}
//                                 card={card}
//                                 index={actualIndex}
//                                 total={cards.length - 1} // Only animate 3 cards
//                                 scrollYProgress={scrollYProgress}
//                             />
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// };

// // Static first card component
// const StaticCard = ({ card, index }) => {
//     return (
//         <div
//             style={{
//                 width: '100%',
//                 borderRadius: '32px',
//                 overflow: 'hidden',
//                 boxShadow: '0 40px 100px rgba(10,22,40,0.12)',
//                 border: '1px solid rgba(148,163,184,0.15)',
//                 background: '#FFFFFF',
//             }}
//         >
//             <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//                 minHeight: '520px'
//             }}>
//                 {/* Visual Side */}
//                 <div style={{
//                     order: 0,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     minHeight: '260px'
//                 }}>
//                     <img src={card.image} alt={card.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         background: 'linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 60%)'
//                     }} />

//                     {/* Floating Badge */}
//                     <div style={{
//                         position: 'absolute',
//                         top: '24px',
//                         left: '24px',
//                         background: 'rgba(255,255,255,0.92)',
//                         backdropFilter: 'blur(10px)',
//                         padding: '8px 16px',
//                         borderRadius: '12px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                         border: '1px solid rgba(255,255,255,0.5)'
//                     }}>
//                         <div style={{
//                             width: '8px',
//                             height: '8px',
//                             borderRadius: '50%',
//                             background: card.accentColor
//                         }} />
//                         <span style={{
//                             fontSize: '0.75rem',
//                             fontWeight: 800,
//                             color: '#0A1628',
//                             letterSpacing: '0.5px'
//                         }}>{card.tag}</span>
//                     </div>

//                     <div style={{
//                         position: 'absolute',
//                         bottom: '24px',
//                         right: '30px',
//                         fontSize: '6rem',
//                         fontWeight: 900,
//                         color: 'rgba(255,255,255,0.15)',
//                         lineHeight: 1,
//                         fontFamily: "'Outfit', sans-serif"
//                     }}>0{index + 1}</div>
//                 </div>

//                 {/* Content Side */}
//                 <div style={{
//                     order: 1,
//                     padding: '60px 50px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     background: card.mesh,
//                     position: 'relative',
//                 }}>
//                     {/* Mesh Overlay */}
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         opacity: 0.1,
//                         backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)',
//                         backgroundSize: '24px 24px',
//                         pointerEvents: 'none'
//                     }} />

//                     <div style={{ position: 'relative', zIndex: 2 }}>
//                         <div style={{
//                             width: '54px',
//                             height: '54px',
//                             borderRadius: '16px',
//                             background: '#FFFFFF',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: card.accentColor,
//                             marginBottom: '28px',
//                             boxShadow: `0 10px 25px ${card.accentGlow}`,
//                             border: '1px solid rgba(255,255,255,0.8)'
//                         }}>
//                             {card.icon}
//                         </div>

//                         <h3 style={{
//                             fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
//                             fontWeight: 900,
//                             color: '#0A1628',
//                             marginBottom: '20px',
//                             letterSpacing: '-0.8px',
//                             lineHeight: 1.2
//                         }}>{card.title}</h3>

//                         <p style={{
//                             color: '#4B5563',
//                             fontSize: '1rem',
//                             lineHeight: 1.75,
//                             marginBottom: '28px'
//                         }}>{card.desc}</p>

//                         <div style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             marginBottom: '32px'
//                         }}>
//                             <div style={{
//                                 padding: '6px 14px',
//                                 borderRadius: '50px',
//                                 background: 'rgba(255,255,255,0.6)',
//                                 border: '1px solid rgba(148,163,184,0.1)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '6px'
//                             }}>
//                                 <Zap size={14} color={card.accentColor} fill={card.accentColor} />
//                                 <span style={{
//                                     fontSize: '0.8rem',
//                                     fontWeight: 700,
//                                     color: card.accentColor
//                                 }}>{card.highlight}</span>
//                             </div>
//                         </div>

//                         <button style={{
//                             padding: '12px 28px',
//                             borderRadius: '12px',
//                             background: '#0A1628',
//                             color: '#FFFFFF',
//                             border: 'none',
//                             fontWeight: 800,
//                             fontSize: '0.9rem',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '10px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             boxShadow: '0 10px 20px rgba(10,22,40,0.2)'
//                         }}
//                             onMouseEnter={e => {
//                                 e.currentTarget.style.transform = 'translateY(-3px)';
//                                 e.currentTarget.style.boxShadow = '0 15px 30px rgba(10,22,40,0.3)';
//                             }}
//                             onMouseLeave={e => {
//                                 e.currentTarget.style.transform = 'translateY(0)';
//                                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(10,22,40,0.2)';
//                             }}
//                         >
//                             Explore Solution <ArrowRight size={16} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Animated card component (for cards 2-4)
// const StackCard = ({ card, index, total, scrollYProgress }) => {
//     const start = (index - 1) / total; // Adjust start position
//     const end = index / total;

//     const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh']);
//     const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
//     const scale = useTransform(scrollYProgress, [end, Math.min(end + 0.1, 1)], [1, 0.94]);
//     const blur = useTransform(scrollYProgress, [end, end + 0.05], ['0px', '4px']);

//     return (
//         <motion.div
//             style={{
//                 position: 'absolute',
//                 width: '90%',
//                 maxWidth: '1100px',
//                 y,
//                 opacity,
//                 scale,
//                 filter: `blur(${blur})`,
//                 borderRadius: '32px',
//                 overflow: 'hidden',
//                 boxShadow: '0 40px 100px rgba(10,22,40,0.12)',
//                 zIndex: index + 1,
//                 border: '1px solid rgba(148,163,184,0.15)',
//                 background: '#FFFFFF',
//             }}
//         >
//             <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//                 minHeight: '520px'
//             }}>
//                 {/* Visual Side */}
//                 <div style={{
//                     order: index % 2 === 0 ? 0 : 1,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     minHeight: '260px'
//                 }}>
//                     <img src={card.image} alt={card.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         background: 'linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 60%)'
//                     }} />

//                     {/* Floating Badge */}
//                     <div style={{
//                         position: 'absolute',
//                         top: '24px',
//                         left: '24px',
//                         background: 'rgba(255,255,255,0.92)',
//                         backdropFilter: 'blur(10px)',
//                         padding: '8px 16px',
//                         borderRadius: '12px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px',
//                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                         border: '1px solid rgba(255,255,255,0.5)'
//                     }}>
//                         <div style={{
//                             width: '8px',
//                             height: '8px',
//                             borderRadius: '50%',
//                             background: card.accentColor
//                         }} />
//                         <span style={{
//                             fontSize: '0.75rem',
//                             fontWeight: 800,
//                             color: '#0A1628',
//                             letterSpacing: '0.5px'
//                         }}>{card.tag}</span>
//                     </div>

//                     <div style={{
//                         position: 'absolute',
//                         bottom: '24px',
//                         right: '30px',
//                         fontSize: '6rem',
//                         fontWeight: 900,
//                         color: 'rgba(255,255,255,0.15)',
//                         lineHeight: 1,
//                         fontFamily: "'Outfit', sans-serif"
//                     }}>0{index + 1}</div>
//                 </div>

//                 {/* Content Side */}
//                 <div style={{
//                     order: index % 2 === 0 ? 1 : 0,
//                     padding: '60px 50px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     background: card.mesh,
//                     position: 'relative',
//                 }}>
//                     {/* Mesh Overlay */}
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         opacity: 0.1,
//                         backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)',
//                         backgroundSize: '24px 24px',
//                         pointerEvents: 'none'
//                     }} />

//                     <div style={{ position: 'relative', zIndex: 2 }}>
//                         <div style={{
//                             width: '54px',
//                             height: '54px',
//                             borderRadius: '16px',
//                             background: '#FFFFFF',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: card.accentColor,
//                             marginBottom: '28px',
//                             boxShadow: `0 10px 25px ${card.accentGlow}`,
//                             border: '1px solid rgba(255,255,255,0.8)'
//                         }}>
//                             {card.icon}
//                         </div>

//                         <h3 style={{
//                             fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
//                             fontWeight: 900,
//                             color: '#0A1628',
//                             marginBottom: '20px',
//                             letterSpacing: '-0.8px',
//                             lineHeight: 1.2
//                         }}>{card.title}</h3>

//                         <p style={{
//                             color: '#4B5563',
//                             fontSize: '1rem',
//                             lineHeight: 1.75,
//                             marginBottom: '28px'
//                         }}>{card.desc}</p>

//                         <div style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             marginBottom: '32px'
//                         }}>
//                             <div style={{
//                                 padding: '6px 14px',
//                                 borderRadius: '50px',
//                                 background: 'rgba(255,255,255,0.6)',
//                                 border: '1px solid rgba(148,163,184,0.1)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '6px'
//                             }}>
//                                 <Zap size={14} color={card.accentColor} fill={card.accentColor} />
//                                 <span style={{
//                                     fontSize: '0.8rem',
//                                     fontWeight: 700,
//                                     color: card.accentColor
//                                 }}>{card.highlight}</span>
//                             </div>
//                         </div>

//                         <button style={{
//                             padding: '12px 28px',
//                             borderRadius: '12px',
//                             background: '#0A1628',
//                             color: '#FFFFFF',
//                             border: 'none',
//                             fontWeight: 800,
//                             fontSize: '0.9rem',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '10px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             boxShadow: '0 10px 20px rgba(10,22,40,0.2)'
//                         }}
//                             onMouseEnter={e => {
//                                 e.currentTarget.style.transform = 'translateY(-3px)';
//                                 e.currentTarget.style.boxShadow = '0 15px 30px rgba(10,22,40,0.3)';
//                             }}
//                             onMouseLeave={e => {
//                                 e.currentTarget.style.transform = 'translateY(0)';
//                                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(10,22,40,0.2)';
//                             }}
//                         >
//                             Explore Solution <ArrowRight size={16} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default StackedCards;














































// import React, { useRef, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Briefcase, FileText, Globe, Github, ArrowRight, Zap } from 'lucide-react';

// const cards = [
//     {
//         id: 1,
//         icon: <Briefcase size={22} />,
//         tag: 'DAILY JOB LINKS',
//         title: 'Fresh Opportunities, Every Single Day',
//         desc: 'Every morning, our platform delivers hundreds of new job postings directly from top US companies. No stale listings, just curated links.',
//         highlight: 'Updated in the last 24 hours',
//         accentColor: '#2563EB',
//         accentGlow: 'rgba(37,99,235,0.4)',
//         mesh: 'linear-gradient(135deg, #F8FAFF 0%, #E0E7FF 100%)',
//         image: '/joblinks1.jpg',
//     },
//     {
//         id: 2,
//         icon: <FileText size={22} />,
//         tag: 'RESUME BUILDING',
//         title: 'ATS-Optimized Resumes That Get Callbacks',
//         desc: 'Our experts craft keyword-optimized resumes tailored to your target role, helping you land interviews at Fortune 500 companies.',
//         highlight: 'Professionally crafted in 48hrs',
//         accentColor: '#059669',
//         accentGlow: 'rgba(5,150,105,0.4)',
//         mesh: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
//         image: '/Online resume-rafiki (1).png',
//     },
//     {
//         id: 3,
//         icon: <Globe size={22} />,
//         tag: 'PORTFOLIO CREATION',
//         title: 'A Portfolio That Makes Recruiters Stop Scrolling',
//         desc: 'We design personal portfolio sites that showcase your projects and story — making recruiters take notice the moment they land.',
//         highlight: 'Launched in 5 business days',
//         accentColor: '#7C3AED',
//         accentGlow: 'rgba(124,58,237,0.4)',
//         mesh: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
//         image: '/Online resume-cuate.png',
//     },
//     {
//         id: 4,
//         icon: <Github size={22} />,
//         tag: 'GITHUB OPTIMIZATION',
//         title: 'Turn Your GitHub Into a Hiring Magnet',
//         desc: 'We optimize your profile and structure pinned repositories to ensure your contribution graph tells a story of consistent work.',
//         highlight: 'Visible to 10K+ recruiters monthly',
//         accentColor: '#0EA5E9',
//         accentGlow: 'rgba(14,165,233,0.4)',
//         mesh: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
//         image: '/undraw_github-profile_abde.png',
//     },
// ];

// // Updated responsive styles with better mobile spacing
// const responsiveStyles = `
//     @media (max-width: 768px) {
//         .card-grid {
//             grid-template-columns: 1fr !important;
//         }
//         .visual-side {
//             order: 0 !important;
//             min-height: 180px !important;
//         }
//         .content-side {
//             order: 1 !important;
//             padding: 25px 20px !important;
//         }
//         .card-title {
//             font-size: 1.4rem !important;
//             margin-bottom: 12px !important;
//         }
//         .card-desc {
//             font-size: 0.9rem !important;
//             line-height: 1.5 !important;
//             margin-bottom: 20px !important;
//         }
//         .floating-badge {
//             padding: 5px 10px !important;
//             top: 12px !important;
//             left: 12px !important;
//         }
//         .floating-badge span {
//             font-size: 0.65rem !important;
//         }
//         .icon-box {
//             width: 40px !important;
//             height: 40px !important;
//             margin-bottom: 16px !important;
//             border-radius: 12px !important;
//         }
//         .icon-box svg {
//             width: 18px !important;
//             height: 18px !important;
//         }
//         .big-number {
//             font-size: 3rem !important;
//             bottom: 12px !important;
//             right: 16px !important;
//         }
//         .explore-btn {
//             padding: 8px 20px !important;
//             font-size: 0.8rem !important;
//         }
//         .section-header {
//             margin-bottom: 15px !important;
//         }
//         .section-badge {
//             font-size: 0.7rem !important;
//             margin-bottom: 5px !important;
//         }
//         h2 {
//             font-size: 1.6rem !important;
//             margin-bottom: 8px !important;
//             padding: 0 10px !important;
//         }
//         .header-description {
//             font-size: 0.85rem !important;
//             max-width: 280px !important;
//             margin: 0 auto !important;
//             padding: 0 15px !important;
//         }
//     }

//     @media (max-width: 480px) {
//         .visual-side {
//             min-height: 160px !important;
//         }
//         .content-side {
//             padding: 20px 15px !important;
//         }
//         .card-title {
//             font-size: 1.3rem !important;
//         }
//         .card-desc {
//             font-size: 0.85rem !important;
//             margin-bottom: 16px !important;
//         }
//         .floating-badge {
//             padding: 4px 8px !important;
//             gap: 4px !important;
//         }
//         .floating-badge span {
//             font-size: 0.6rem !important;
//         }
//         .floating-badge div {
//             width: 6px !important;
//             height: 6px !important;
//         }
//         .icon-box {
//             width: 36px !important;
//             height: 36px !important;
//             margin-bottom: 14px !important;
//         }
//         .icon-box svg {
//             width: 16px !important;
//             height: 16px !important;
//         }
//         .big-number {
//             font-size: 2.5rem !important;
//             bottom: 8px !important;
//             right: 12px !important;
//         }
//         .highlight-badge {
//             padding: 4px 10px !important;
//         }
//         .highlight-badge span {
//             font-size: 0.7rem !important;
//         }
//         .highlight-badge svg {
//             width: 12px !important;
//             height: 12px !important;
//         }
//         .explore-btn {
//             padding: 7px 16px !important;
//             font-size: 0.75rem !important;
//             gap: 6px !important;
//         }
//         .explore-btn svg {
//             width: 14px !important;
//             height: 14px !important;
//         }
//         .section-header {
//             margin-bottom: 10px !important;
//         }
//         h2 {
//             font-size: 1.4rem !important;
//         }
//         .header-description {
//             font-size: 0.8rem !important;
//             max-width: 250px !important;
//         }
//     }

//     /* Fix for very small devices */
//     @media (max-width: 360px) {
//         .visual-side {
//             min-height: 140px !important;
//         }
//         .card-title {
//             font-size: 1.2rem !important;
//         }
//         .content-side {
//             padding: 16px 12px !important;
//         }
//         h2 {
//             font-size: 1.3rem !important;
//         }
//         .header-description {
//             font-size: 0.75rem !important;
//             max-width: 220px !important;
//         }
//     }
// `;

// const StackedCards = () => {
//     const containerRef = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: containerRef,
//         offset: ['start start', 'end end'],
//     });

//     useEffect(() => {
//         // Add responsive styles to head
//         const style = document.createElement('style');
//         style.textContent = responsiveStyles;
//         document.head.appendChild(style);

//         return () => {
//             document.head.removeChild(style);
//         };
//     }, []);

//     return (
//         <section
//             ref={containerRef}
//             id="platform"
//             style={{
//                 position: 'relative',
//                 minHeight: `${(cards.length - 1) * 100 + 100}vh`,
//                 background: '#FFFFFF',
//             }}
//         >
//             {/* Sticky Container */}
//             <div style={{
//                 position: 'sticky',
//                 top: 0,
//                 height: '100vh',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//             }}>
//                 {/* Header Area - Adjusted spacing for mobile */}
//                 <div className="section-header" style={{
//                     textAlign: 'center',
//                     position: 'relative',
//                     zIndex: 10,
//                     marginBottom: 'clamp(15px, 3vh, 40px)',
//                     pointerEvents: 'none',
//                     padding: '0 10px',
//                     width: '100%',
//                     maxWidth: '1200px',
//                     marginLeft: 'auto',
//                     marginRight: 'auto',
//                     // Add top padding on mobile to prevent sticking to top
//                     marginTop: 'clamp(5px, 1vh, 0)',
//                 }}>
//                     <div className="section-badge" style={{
//                         fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
//                         marginBottom: 'clamp(5px, 1vh, 12px)',
//                         color: '#2563EB',
//                         fontWeight: 600,
//                         textTransform: 'uppercase',
//                         letterSpacing: '1px'
//                     }}>Premium Features</div>
//                     <h2 style={{
//                         fontSize: 'clamp(1.4rem, 5vw, 3.4rem)',
//                         fontWeight: 900,
//                         color: '#0A1628',
//                         marginBottom: 'clamp(8px, 1.5vh, 18px)',
//                         letterSpacing: '-0.02em',
//                         lineHeight: 1.2,
//                         padding: '0 5px',
//                         wordBreak: 'break-word',
//                     }}>
//                         A Complete <span style={{ color: '#2563EB', fontStyle: 'italic' }}>Career Suite</span>
//                     </h2>
//                     <p className="header-description" style={{
//                         color: '#6B7280',
//                         fontSize: 'clamp(0.8rem, 2.2vw, 1.1rem)',
//                         maxWidth: 'min(580px, 90%)',
//                         margin: '0 auto',
//                         lineHeight: 1.5,
//                         padding: '0 10px',
//                         wordBreak: 'break-word',
//                     }}>
//                         Everything you need to navigate the competitive US tech market with confidence and speed.
//                     </p>
//                 </div>

//                 {/* Cards Container - Adjusted for mobile */}
//                 <div style={{
//                     position: 'relative',
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flex: 1,
//                     padding: '0 10px',
//                     // Add max height to prevent overflow
//                     maxHeight: 'calc(100vh - 120px)',
//                 }}>
//                     {/* First Card - Static */}
//                     <div style={{
//                         position: 'absolute',
//                         width: 'min(95%, 1100px)',
//                         maxWidth: '1100px',
//                         zIndex: 1,
//                         // Center the card properly
//                         left: '50%',
//                         transform: 'translateX(-50%)',
//                     }}>
//                         <StaticCard card={cards[0]} index={0} />
//                     </div>

//                     {/* Animated Cards (2nd, 3rd, 4th) */}
//                     {cards.slice(1).map((card, i) => {
//                         const actualIndex = i + 1;
//                         return (
//                             <StackCard
//                                 key={card.id}
//                                 card={card}
//                                 index={actualIndex}
//                                 total={cards.length - 1}
//                                 scrollYProgress={scrollYProgress}
//                             />
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// };

// // Static first card component - Updated with mobile optimizations
// const StaticCard = ({ card, index }) => {
//     return (
//         <div
//             style={{
//                 width: '100%',
//                 borderRadius: 'clamp(16px, 3vw, 32px)',
//                 overflow: 'hidden',
//                 boxShadow: '0 20px 40px rgba(10,22,40,0.12)',
//                 border: '1px solid rgba(148,163,184,0.15)',
//                 background: '#FFFFFF',
//             }}
//         >
//             <div className="card-grid" style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(2, 1fr)',
//                 minHeight: 'clamp(350px, 55vh, 520px)',
//                 height: '100%'
//             }}>
//                 {/* Visual Side */}
//                 <div className="visual-side" style={{
//                     order: 0,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     minHeight: '240px',
//                     height: '100%',
//                 }}>
//                     <img src={card.image} alt={card.tag} style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover',
//                         display: 'block'
//                     }} />
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         background: 'linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 60%)'
//                     }} />

//                     {/* Floating Badge */}
//                     <div className="floating-badge" style={{
//                         position: 'absolute',
//                         top: '20px',
//                         left: '20px',
//                         background: 'rgba(255,255,255,0.92)',
//                         backdropFilter: 'blur(10px)',
//                         padding: '6px 14px',
//                         borderRadius: '10px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '6px',
//                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                         border: '1px solid rgba(255,255,255,0.5)'
//                     }}>
//                         <div style={{
//                             width: '7px',
//                             height: '7px',
//                             borderRadius: '50%',
//                             background: card.accentColor
//                         }} />
//                         <span style={{
//                             fontSize: '0.7rem',
//                             fontWeight: 800,
//                             color: '#0A1628',
//                             letterSpacing: '0.5px',
//                             whiteSpace: 'nowrap'
//                         }}>{card.tag}</span>
//                     </div>

//                     <div className="big-number" style={{
//                         position: 'absolute',
//                         bottom: '20px',
//                         right: '25px',
//                         fontSize: '5rem',
//                         fontWeight: 900,
//                         color: 'rgba(255,255,255,0.15)',
//                         lineHeight: 1,
//                         fontFamily: "'Outfit', sans-serif"
//                     }}>0{index + 1}</div>
//                 </div>

//                 {/* Content Side */}
//                 <div className="content-side" style={{
//                     order: 1,
//                     padding: '50px 40px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     background: card.mesh,
//                     position: 'relative',
//                 }}>
//                     {/* Mesh Overlay */}
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         opacity: 0.1,
//                         backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)',
//                         backgroundSize: '24px 24px',
//                         pointerEvents: 'none'
//                     }} />

//                     <div style={{ position: 'relative', zIndex: 2 }}>
//                         <div className="icon-box" style={{
//                             width: '50px',
//                             height: '50px',
//                             borderRadius: '14px',
//                             background: '#FFFFFF',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: card.accentColor,
//                             marginBottom: '24px',
//                             boxShadow: `0 10px 25px ${card.accentGlow}`,
//                             border: '1px solid rgba(255,255,255,0.8)'
//                         }}>
//                             {card.icon}
//                         </div>

//                         <h3 className="card-title" style={{
//                             fontSize: 'clamp(1.4rem, 2.2vw, 2.1rem)',
//                             fontWeight: 900,
//                             color: '#0A1628',
//                             marginBottom: '16px',
//                             letterSpacing: '-0.02em',
//                             lineHeight: 1.2,
//                         }}>{card.title}</h3>

//                         <p className="card-desc" style={{
//                             color: '#4B5563',
//                             fontSize: '0.95rem',
//                             lineHeight: 1.6,
//                             marginBottom: '24px',
//                         }}>{card.desc}</p>

//                         <div className="highlight-badge" style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             marginBottom: '28px',
//                             flexWrap: 'wrap'
//                         }}>
//                             <div style={{
//                                 padding: '5px 12px',
//                                 borderRadius: '50px',
//                                 background: 'rgba(255,255,255,0.6)',
//                                 border: '1px solid rgba(148,163,184,0.1)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                             }}>
//                                 <Zap size={13} color={card.accentColor} fill={card.accentColor} />
//                                 <span style={{
//                                     fontSize: '0.75rem',
//                                     fontWeight: 700,
//                                     color: card.accentColor,
//                                     whiteSpace: 'nowrap'
//                                 }}>{card.highlight}</span>
//                             </div>
//                         </div>

//                         <button className="explore-btn" style={{
//                             padding: '10px 24px',
//                             borderRadius: '10px',
//                             background: '#0A1628',
//                             color: '#FFFFFF',
//                             border: 'none',
//                             fontWeight: 800,
//                             fontSize: '0.85rem',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             boxShadow: '0 10px 20px rgba(10,22,40,0.2)',
//                             width: 'fit-content',
//                             whiteSpace: 'nowrap'
//                         }}
//                             onMouseEnter={e => {
//                                 e.currentTarget.style.transform = 'translateY(-3px)';
//                                 e.currentTarget.style.boxShadow = '0 15px 30px rgba(10,22,40,0.3)';
//                             }}
//                             onMouseLeave={e => {
//                                 e.currentTarget.style.transform = 'translateY(0)';
//                                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(10,22,40,0.2)';
//                             }}
//                         >
//                             Explore Solution <ArrowRight size={14} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Animated card component - Updated with mobile optimizations
// const StackCard = ({ card, index, total, scrollYProgress }) => {
//     const start = (index - 1) / total;
//     const end = index / total;

//     const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh']);
//     const opacity = useTransform(scrollYProgress, [start, start + 0.05], [0, 1]);
//     const scale = useTransform(scrollYProgress, [end, Math.min(end + 0.1, 1)], [1, 0.94]);
//     const blur = useTransform(scrollYProgress, [end, end + 0.05], ['0px', '4px']);

//     return (
//         <motion.div
//             style={{
//                 position: 'absolute',
//                 width: 'min(95%, 1100px)',
//                 maxWidth: '1100px',
//                 y,
//                 opacity,
//                 scale,
//                 filter: `blur(${blur})`,
//                 borderRadius: 'clamp(16px, 3vw, 32px)',
//                 overflow: 'hidden',
//                 boxShadow: '0 20px 40px rgba(10,22,40,0.12)',
//                 zIndex: index + 1,
//                 border: '1px solid rgba(148,163,184,0.15)',
//                 background: '#FFFFFF',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//             }}
//         >
//             <div className="card-grid" style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(2, 1fr)',
//                 minHeight: 'clamp(350px, 55vh, 520px)',
//                 height: '100%'
//             }}>
//                 {/* Visual Side */}
//                 <div className="visual-side" style={{
//                     order: index % 2 === 0 ? 0 : 1,
//                     position: 'relative',
//                     overflow: 'hidden',
//                     minHeight: '240px',
//                     height: '100%',
//                 }}>
//                     <img src={card.image} alt={card.tag} style={{
//                         width: '100%',
//                         height: '100%',
//                         objectFit: 'cover',
//                         display: 'block'
//                     }} />
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         background: 'linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 60%)'
//                     }} />

//                     {/* Floating Badge */}
//                     <div className="floating-badge" style={{
//                         position: 'absolute',
//                         top: '20px',
//                         left: '20px',
//                         background: 'rgba(255,255,255,0.92)',
//                         backdropFilter: 'blur(10px)',
//                         padding: '6px 14px',
//                         borderRadius: '10px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '6px',
//                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                         border: '1px solid rgba(255,255,255,0.5)'
//                     }}>
//                         <div style={{
//                             width: '7px',
//                             height: '7px',
//                             borderRadius: '50%',
//                             background: card.accentColor
//                         }} />
//                         <span style={{
//                             fontSize: '0.7rem',
//                             fontWeight: 800,
//                             color: '#0A1628',
//                             letterSpacing: '0.5px',
//                             whiteSpace: 'nowrap'
//                         }}>{card.tag}</span>
//                     </div>

//                     <div className="big-number" style={{
//                         position: 'absolute',
//                         bottom: '20px',
//                         right: '25px',
//                         fontSize: '5rem',
//                         fontWeight: 900,
//                         color: 'rgba(255,255,255,0.15)',
//                         lineHeight: 1,
//                         fontFamily: "'Outfit', sans-serif"
//                     }}>0{index + 1}</div>
//                 </div>

//                 {/* Content Side */}
//                 <div className="content-side" style={{
//                     order: index % 2 === 0 ? 1 : 0,
//                     padding: '50px 40px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     background: card.mesh,
//                     position: 'relative',
//                 }}>
//                     {/* Mesh Overlay */}
//                     <div style={{
//                         position: 'absolute',
//                         inset: 0,
//                         opacity: 0.1,
//                         backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1.5px, transparent 0)',
//                         backgroundSize: '24px 24px',
//                         pointerEvents: 'none'
//                     }} />

//                     <div style={{ position: 'relative', zIndex: 2 }}>
//                         <div className="icon-box" style={{
//                             width: '50px',
//                             height: '50px',
//                             borderRadius: '14px',
//                             background: '#FFFFFF',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: card.accentColor,
//                             marginBottom: '24px',
//                             boxShadow: `0 10px 25px ${card.accentGlow}`,
//                             border: '1px solid rgba(255,255,255,0.8)'
//                         }}>
//                             {card.icon}
//                         </div>

//                         <h3 className="card-title" style={{
//                             fontSize: 'clamp(1.4rem, 2.2vw, 2.1rem)',
//                             fontWeight: 900,
//                             color: '#0A1628',
//                             marginBottom: '16px',
//                             letterSpacing: '-0.02em',
//                             lineHeight: 1.2,
//                         }}>{card.title}</h3>

//                         <p className="card-desc" style={{
//                             color: '#4B5563',
//                             fontSize: '0.95rem',
//                             lineHeight: 1.6,
//                             marginBottom: '24px',
//                         }}>{card.desc}</p>

//                         <div className="highlight-badge" style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             marginBottom: '28px',
//                             flexWrap: 'wrap'
//                         }}>
//                             <div style={{
//                                 padding: '5px 12px',
//                                 borderRadius: '50px',
//                                 background: 'rgba(255,255,255,0.6)',
//                                 border: '1px solid rgba(148,163,184,0.1)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: '5px'
//                             }}>
//                                 <Zap size={13} color={card.accentColor} fill={card.accentColor} />
//                                 <span style={{
//                                     fontSize: '0.75rem',
//                                     fontWeight: 700,
//                                     color: card.accentColor,
//                                     whiteSpace: 'nowrap'
//                                 }}>{card.highlight}</span>
//                             </div>
//                         </div>

//                         <button className="explore-btn" style={{
//                             padding: '10px 24px',
//                             borderRadius: '10px',
//                             background: '#0A1628',
//                             color: '#FFFFFF',
//                             border: 'none',
//                             fontWeight: 800,
//                             fontSize: '0.85rem',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease',
//                             boxShadow: '0 10px 20px rgba(10,22,40,0.2)',
//                             width: 'fit-content',
//                             whiteSpace: 'nowrap'
//                         }}
//                             onMouseEnter={e => {
//                                 e.currentTarget.style.transform = 'translateY(-3px)';
//                                 e.currentTarget.style.boxShadow = '0 15px 30px rgba(10,22,40,0.3)';
//                             }}
//                             onMouseLeave={e => {
//                                 e.currentTarget.style.transform = 'translateY(0)';
//                                 e.currentTarget.style.boxShadow = '0 10px 20px rgba(10,22,40,0.2)';
//                             }}
//                         >
//                             Explore Solution <ArrowRight size={14} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default StackedCards;







































import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, FileText, Globe, Github, ArrowRight, Zap } from 'lucide-react';

const cards = [
    {
        id: 1,
        icon: <Briefcase size={22} />,
        tag: 'DAILY JOB LINKS',
        title: 'Fresh Opportunities, Every Single Day',
        desc: 'Every morning, our platform delivers hundreds of new job postings directly from top US companies. No stale listings, just curated links.',
        highlight: 'Updated in the last 24 hours',
        accentColor: '#2563EB',
        accentGlow: 'rgba(37,99,235,0.4)',
        mesh: 'linear-gradient(135deg, #F8FAFF 0%, #E0E7FF 100%)',
        image: '/joblinks1.jpg',
    },
    {
        id: 2,
        icon: <FileText size={22} />,
        tag: 'RESUME BUILDING',
        title: 'ATS-Optimized Resumes That Get Callbacks',
        desc: 'Our experts craft keyword-optimized resumes tailored to your target role, helping you land interviews at Fortune 500 companies.',
        highlight: 'Professionally crafted in 48hrs',
        accentColor: '#059669',
        accentGlow: 'rgba(5,150,105,0.4)',
        mesh: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
        image: '/Online resume-rafiki (1).png',
    },
    {
        id: 3,
        icon: <Globe size={22} />,
        tag: 'PORTFOLIO CREATION',
        title: 'A Portfolio That Makes Recruiters Stop Scrolling',
        desc: 'We design personal portfolio sites that showcase your projects and story — making recruiters take notice the moment they land.',
        highlight: 'Launched in 5 business days',
        accentColor: '#7C3AED',
        accentGlow: 'rgba(124,58,237,0.4)',
        mesh: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
        image: '/Online resume-cuate.png',
    },
    {
        id: 4,
        icon: <Github size={22} />,
        tag: 'GITHUB OPTIMIZATION',
        title: 'Turn Your GitHub Into a Hiring Magnet',
        desc: 'We optimize your profile and structure pinned repositories to ensure your contribution graph tells a story of consistent work.',
        highlight: 'Visible to 10K+ recruiters monthly',
        accentColor: '#0EA5E9',
        accentGlow: 'rgba(14,165,233,0.4)',
        mesh: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
        image: '/undraw_github-profile_abde.png',
    },
];

const responsiveStyles = `
    @media (max-width: 768px) {
        /* Single-column card layout on mobile */
        .card-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
            height: auto !important;
        }
        .visual-side {
            order: 0 !important;
            min-height: 180px !important;
            max-height: 200px !important;
            height: 200px !important;
        }
        .content-side {
            order: 1 !important;
            padding: 22px 18px !important;
        }
        .card-title {
            font-size: 1.15rem !important;
            margin-bottom: 8px !important;
        }
        .card-desc {
            font-size: 0.82rem !important;
            margin-bottom: 14px !important;
            line-height: 1.5 !important;
        }
        .icon-box {
            width: 38px !important;
            height: 38px !important;
            margin-bottom: 12px !important;
            border-radius: 10px !important;
        }
        .big-number {
            font-size: 3rem !important;
            bottom: 10px !important;
            right: 14px !important;
        }
        .floating-badge {
            top: 10px !important;
            left: 10px !important;
            padding: 4px 10px !important;
        }
        .floating-badge span {
            font-size: 0.65rem !important;
        }
        .explore-btn {
            padding: 8px 16px !important;
            font-size: 0.78rem !important;
        }
        /* Keep the sticky animation active on mobile — same as desktop */
        .sc-sticky-wrapper {
            height: 100vh !important;
        }
        .sc-card-layer {
            padding: 0 12px !important;
        }
    }
`;

const StackedCards = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = responsiveStyles;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <section
            ref={containerRef}
            id="platform"
            style={{
                position: 'relative',
                height: `${cards.length * 120}vh`, // More sensitive scroll
                background: 'var(--bg-section)',
            }}
        >
            <div className="sc-sticky-wrapper" style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}>
                {/* Header Area */}
                <div style={{
                    textAlign: 'center',
                    padding: 'clamp(20px, 5vh, 60px) 20px clamp(10px, 2vh, 20px)',
                    zIndex: 20,
                }}>
                    <div className="section-badge" style={{
                        fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                        marginBottom: '10px',
                        color: 'var(--accent-primary)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>Premium Features</div>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 6vw, 3.4rem)',
                        fontWeight: 900,
                        color: 'var(--text-heading)',
                        marginBottom: '10px',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2
                    }}>
                        A Complete <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic' }}>Career Suite</span>
                    </h2>
                </div>

                {/* Transitions Area */}
                <div className="sc-transitions-area" style={{ flex: 1, position: 'relative', width: '100%' }}>
                    {cards.map((card, i) => (
                        <TransitionCard
                            key={card.id}
                            card={card}
                            index={i}
                            total={cards.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TransitionCard = ({ card, index, total, scrollYProgress }) => {
    const isLast = index === total - 1;
    // Each card gets an equal slice of the scroll: [0.0 - 0.25, 0.25 - 0.5, etc.]
    const sectionSize = 1 / total;
    const start = index * sectionSize;
    const end = (index + 1) * sectionSize;

    // Snappy transition windows
    const enterEnd = start + sectionSize * 0.3; // Finish slide-in at 30% of section
    const exitStart = end - sectionSize * 0.2;  // Start slide-out at 80% of section

    // x transform: from right (100vw) -> center (0) -> left (-100vw)
    // For the last card, we DON'T slide out to the left, we just stay until end
    const x = useTransform(
        scrollYProgress,
        isLast
            ? [start, enterEnd]
            : [start, enterEnd, exitStart, end],
        isLast
            ? ['100vw', '0vw']
            : ['100vw', '0vw', '0vw', '-100vw']
    );

    // Fade and Scale
    const opacity = useTransform(
        scrollYProgress,
        isLast
            ? [start, enterEnd]
            : [start, enterEnd, exitStart, end],
        isLast
            ? [0, 1]
            : [0, 1, 1, 0]
    );

    const scale = useTransform(
        scrollYProgress,
        isLast
            ? [start, enterEnd]
            : [start, enterEnd, exitStart, end],
        isLast
            ? [0.85, 1]
            : [0.85, 1, 1, 0.85]
    );

    return (
        <motion.div
            className="sc-card-layer"
            style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                x,
                opacity,
                scale,
                zIndex: index + 10,
            }}
        >
            <div style={{ width: '100%', maxWidth: '1100px' }}>
                <CardContent card={card} index={index} />
            </div>
        </motion.div>
    );
}

const CardContent = ({ card, index }) => (
    <div
        style={{
            width: '100%',
            borderRadius: 'clamp(20px, 3vw, 32px)',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(10,22,40,0.12)',
            border: '1px solid rgba(148,163,184,0.15)',
            background: 'var(--bg-white)',
        }}
    >
        <div className="card-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            minHeight: 'clamp(300px, 60vh, 520px)',
            height: '100%'
        }}>
            <div className="visual-side" style={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: '260px',
            }}>
                <img src={card.image} alt={card.tag} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(225deg, rgba(37,99,235,0.2) 0%, transparent 60%)' }} />
                <div className="floating-badge" style={{
                    position: 'absolute', top: '24px', left: '24px', background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '12px', display: 'flex',
                    alignItems: 'center', gap: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,0.5)'
                }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: card.accentColor }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0A1628', letterSpacing: '0.5px' }}>{card.tag}</span>
                </div>
                <div className="big-number" style={{
                    position: 'absolute', bottom: '24px', right: '30px', fontSize: '6rem', fontWeight: 900,
                    color: 'rgba(10, 22, 40, 0.12)', lineHeight: 1, fontFamily: "'Outfit', sans-serif"
                }}>0{index + 1}</div>
            </div>

            <div className="content-side" style={{
                padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                background: card.mesh, position: 'relative',
            }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, #1A1208 1.5px, transparent 0)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div className="icon-box" style={{
                        width: '54px', height: '54px', borderRadius: '16px', background: 'var(--bg-white)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.accentColor,
                        marginBottom: '28px', boxShadow: `0 10px 25px ${card.accentGlow}`, border: '1px solid var(--border-light)'
                    }}>
                        {card.icon}
                    </div>
                    <h3 className="card-title" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 900, color: '#0A1628', marginBottom: '20px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{card.title}</h3>
                    <p className="card-desc" style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.6, marginBottom: '28px' }}>{card.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
                        <div style={{ padding: '6px 14px', borderRadius: '50px', background: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Zap size={14} color={card.accentColor} fill={card.accentColor} />
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: card.accentColor }}>{card.highlight}</span>
                        </div>
                    </div>
                    <button className="explore-btn" style={{
                        padding: '12px 28px', borderRadius: '12px', background: 'var(--ink-900)', color: 'var(--cream-100)',
                        border: 'none', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px',
                        cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 10px 20px rgba(10,22,40,0.2)'
                    }}>
                        Explore Solution <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default StackedCards;
