// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Check, Star, Zap, Shield, TrendingUp } from 'lucide-react';

// const plans = [
//     {
//         name: 'Starter',
//         price: 19.99,
//         period: '/ mo',
//         duration: '1-Month Plan',
//         badge: null,
//         features: [
//             'Free Resume Review',
//             'Daily Job Updates',
//             'Access to All Job Listings',
//             'Email Support',
//             'W2 & C2C Job Filters',
//         ],
//         btn: 'Get Started',
//         gradient: 'linear-gradient(135deg, var(--bg-white) 0%, var(--cream-100) 100%)',
//         border: 'var(--border-light)',
//         accentColor: 'var(--text-muted)',
//         checkColor: 'var(--accent-primary)',
//         btnStyle: 'outline',
//     },
//     {
//         name: 'Growth',
//         price: 34.99,
//         period: '/ 2mo',
//         duration: '2-Month Plan',
//         badge: 'Most Popular',
//         features: [
//             'Resume Building Included',
//             'Portfolio Creation',
//             'Priority Daily Job Updates',
//             'Priority Support 24/7',
//             'Sponsored Job Access',
//             'Direct Apply Links',
//         ],
//         btn: 'Start Growing →',
//         gradient: 'linear-gradient(145deg, var(--ink-900) 0%, var(--ink-800) 100%)',
//         border: 'transparent',
//         accentColor: '#FFFFFF',
//         checkColor: 'var(--accent-primary)',
//         btnStyle: 'solid-coral',
//         featured: true,
//     },
//     {
//         name: 'Pro',
//         price: 55.99,
//         period: '/ 3mo',
//         duration: '3-Month Plan',
//         badge: 'Best Value',
//         features: [
//             'All Growth Features',
//             'GitHub Profile Optimization',
//             'Dedicated Career Coach',
//             'Interview Prep Toolkit',
//             'Premium Job Alerts',
//             'LinkedIn Profile Review',
//         ],
//         btn: 'Go Pro',
//         gradient: 'linear-gradient(135deg, var(--cream-200) 0%, var(--sand-300) 100%)',
//         border: 'var(--border-light)',
//         accentColor: 'var(--text-body)',
//         checkColor: 'var(--ink-900)',
//         btnStyle: 'outline-ink',
//     },
// ];

// const Pricing = () => {
//     return (
//         <section
//             id="pricing"
//             style={{
//                 padding: 'var(--section-pad)',
//                 background: 'var(--bg-section)',
//                 position: 'relative', overflow: 'hidden',
//             }}
//         >
//             {/* BG decoration */}
//             <div style={{
//                 position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
//                 width: '800px', height: '500px',
//                 background: 'radial-gradient(ellipse, var(--coral-100) 0%, transparent 65%)',
//                 filter: 'blur(60px)', pointerEvents: 'none',
//             }} />

//             <div className="container" style={{ position: 'relative', zIndex: 2 }}>
//                 <motion.div
//                     initial={{ opacity: 0, y: 24 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     style={{ textAlign: 'center', marginBottom: '70px' }}
//                 >
//                     <div className="section-badge">Pricing Plans</div>
//                     <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--text-heading)', marginBottom: '16px', letterSpacing: '-1px' }}>
//                         Simple,{' '}
//                         <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Transparent</span>
//                         {' '}Pricing
//                     </h2>
//                     <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '440px', margin: '0 auto' }}>
//                         No hidden fees. No surprises. Cancel anytime with one click.
//                     </p>
//                 </motion.div>

//                 <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//                     gap: '22px',
//                     alignItems: 'start',
//                 }}>
//                     {plans.map((plan, i) => (
//                         <motion.div
//                             key={i}
//                             initial={{ opacity: 0, y: 48 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.5, delay: i * 0.1 }}
//                             className="pricing-card"
//                             style={{
//                                 borderRadius: '22px',
//                                 padding: plan.featured ? '44px 36px' : '40px 34px',
//                                 background: plan.gradient,
//                                 border: plan.featured ? 'none' : `1.5px solid ${plan.border}`,
//                                 position: 'relative',
//                                 boxShadow: plan.featured
//                                     ? '0 24px 80px rgba(26,18,8,0.25), 0 0 0 1px rgba(255,255,255,0.05)'
//                                     : 'var(--shadow-sm)',
//                                 transform: plan.featured ? 'scale(1.04)' : 'scale(1)',
//                             }}
//                         >
//                             {/* Glowing ring for featured */}
//                             {plan.featured && (
//                                 <div style={{
//                                     position: 'absolute', inset: '-2px',
//                                     borderRadius: '24px',
//                                     background: 'linear-gradient(135deg, var(--coral-600), var(--coral-500), var(--sand-500))',
//                                     zIndex: -1,
//                                     filter: 'blur(2px)',
//                                     opacity: 0.3,
//                                 }} />
//                             )}

//                             {plan.badge && (
//                                 <div style={{
//                                     position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
//                                     background: plan.featured
//                                         ? 'linear-gradient(135deg, var(--coral-600), var(--coral-500))'
//                                         : 'linear-gradient(135deg, var(--ink-800), var(--ink-700))',
//                                     color: '#FFFFFF',
//                                     padding: '5px 22px', borderRadius: '50px',
//                                     fontSize: '0.68rem', fontWeight: 800,
//                                     letterSpacing: '1.5px', textTransform: 'uppercase',
//                                     fontFamily: "'Outfit', sans-serif",
//                                     display: 'flex', alignItems: 'center', gap: '6px',
//                                     boxShadow: plan.featured ? '0 4px 16px rgba(232,69,26,0.35)' : 'var(--shadow-sm)',
//                                     whiteSpace: 'nowrap',
//                                 }}>
//                                     <Star size={9} fill="currentColor" /> {plan.badge}
//                                 </div>
//                             )}

//                             {/* Plan name */}
//                             <div style={{ marginBottom: '28px' }}>
//                                 <p style={{
//                                     fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', fontWeight: 700,
//                                     letterSpacing: '2.5px', textTransform: 'uppercase',
//                                     color: plan.featured ? 'rgba(255,255,255,0.7)' : 'var(--accent-primary)',
//                                     marginBottom: '10px',
//                                 }}>{plan.name}</p>
//                                 <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', marginBottom: '8px' }}>
//                                     <span style={{ fontSize: '0.9rem', color: plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', alignSelf: 'flex-start', marginTop: '10px' }}>$</span>
//                                     <span style={{
//                                         fontFamily: "'Outfit', sans-serif", fontWeight: 900,
//                                         fontSize: '3.8rem', lineHeight: 1,
//                                         color: plan.featured ? '#FFFFFF' : 'var(--text-heading)',
//                                         letterSpacing: '-2px',
//                                     }}>{plan.price.toFixed(2).split('.')[0]}</span>
//                                     <span style={{ fontSize: '1.2rem', color: plan.featured ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
//                                         .{plan.price.toFixed(2).split('.')[1]}
//                                     </span>
//                                     <span style={{ color: plan.featured ? 'rgba(255,255,255,0.5)' : 'var(--text-faint)', fontSize: '0.85rem', marginLeft: '4px' }}>{plan.period}</span>
//                                 </div>
//                                 <div style={{
//                                     display: 'inline-flex', alignItems: 'center', gap: '6px',
//                                     padding: '4px 12px',
//                                     background: plan.featured ? 'rgba(255,255,255,0.12)' : 'var(--coral-100)',
//                                     borderRadius: '6px',
//                                     border: plan.featured ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border-light)',
//                                 }}>
//                                     <Zap size={10} color={plan.featured ? 'var(--coral-500)' : 'var(--accent-primary)'} />
//                                     <span style={{ color: plan.featured ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', fontSize: '0.75rem', fontFamily: "'Outfit', sans-serif" }}>
//                                         {plan.duration}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Divider */}
//                             <div style={{
//                                 width: '100%', height: '1px',
//                                 background: plan.featured
//                                     ? 'rgba(255,255,255,0.12)'
//                                     : 'linear-gradient(90deg, transparent, var(--border-light), transparent)',
//                                 marginBottom: '26px',
//                             }} />

//                             {/* Features */}
//                             <ul style={{ listStyle: 'none', marginBottom: '34px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
//                                 {plan.features.map((f, j) => (
//                                     <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '11px', fontSize: '0.88rem', color: plan.featured ? 'rgba(255,255,255,0.85)' : 'var(--text-body)' }}>
//                                         <div style={{
//                                             width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
//                                             background: plan.featured ? 'rgba(255,255,255,0.15)' : 'var(--cream-100)',
//                                             display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                             border: plan.featured ? '1px solid rgba(255,255,255,0.2)' : `1px solid var(--border-light)`,
//                                         }}>
//                                             <Check size={11} color={plan.checkColor} strokeWidth={3} />
//                                         </div>
//                                         {f}
//                                     </li>
//                                 ))}
//                             </ul>

//                             {/* CTA */}
//                             <button
//                                 style={{
//                                     width: '100%', padding: '14px', borderRadius: '10px',
//                                     fontSize: '0.95rem', fontWeight: 800,
//                                     fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
//                                     transition: 'all 0.28s ease', letterSpacing: '0.3px',
//                                     ...(plan.btnStyle === 'solid-coral' ? {
//                                         background: 'var(--accent-primary)',
//                                         color: '#FFFFFF',
//                                         border: 'none',
//                                         boxShadow: '0 4px 20px rgba(232,69,26,0.25)',
//                                     } : plan.btnStyle === 'outline-ink' ? {
//                                         background: 'transparent',
//                                         color: 'var(--ink-900)',
//                                         border: '2px solid var(--ink-900)',
//                                     } : {
//                                         background: 'transparent',
//                                         color: 'var(--accent-primary)',
//                                         border: '2px solid var(--coral-100)',
//                                     }),
//                                 }}
//                                 onMouseEnter={e => {
//                                     e.currentTarget.style.transform = 'translateY(-3px)';
//                                     if (plan.btnStyle === 'solid-coral') e.currentTarget.style.background = 'var(--coral-500)';
//                                     else if (plan.btnStyle === 'outline') e.currentTarget.style.background = 'var(--cream-100)';
//                                     else e.currentTarget.style.background = 'var(--cream-200)';
//                                 }}
//                                 onMouseLeave={e => {
//                                     e.currentTarget.style.transform = 'translateY(0)';
//                                     if (plan.btnStyle === 'solid-coral') e.currentTarget.style.background = 'var(--accent-primary)';
//                                     else e.currentTarget.style.background = 'transparent';
//                                 }}
//                             >
//                                 {plan.btn}
//                             </button>
//                         </motion.div>
//                     ))}
//                 </div>

//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true }}
//                     style={{
//                         textAlign: 'center', marginTop: '44px',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap',
//                     }}
//                 >
//                     {[['🔒', 'Secure payment'], ['⚡', 'Instant access'], ['↩', 'Cancel anytime'], ['🇺🇸', 'US-based support']].map(([icon, text], i) => (
//                         <span key={i} style={{ color: '#9CA3AF', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
//                             {icon} {text}
//                         </span>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default Pricing;




























// import React, { useState } from 'react';
// import { Check, Zap, Star, Shield, ArrowRight, Sparkles, Clock, Headphones, FileText, Briefcase, Code2, Users, TrendingUp, BookOpen } from 'lucide-react';

// const plans = [
//     {
//         name: 'Starter',
//         originalPrice: 29.99,
//         price: 19.99,
//         period: '/ mo',
//         duration: 'for 1 month',
//         badge: null,
//         tagline: 'Everything for new job seekers, plus:',
//         taglineIcon: Shield,
//         highlight: 'Free Resume Review',
//         features: [
//             { icon: FileText, text: 'Free Resume Review' },
//             { icon: Zap, text: 'Daily Job Updates' },
//             { icon: Briefcase, text: 'Access to All Job Listings' },
//             { icon: Headphones, text: 'Email Support' },
//             { icon: Check, text: 'W2 & C2C Job Filters' },
//         ],
//         extras: null,
//         btn: 'Get Started',
//         dark: false,
//     },
//     {
//         name: 'Growth',
//         originalPrice: 59.99,
//         price: 34.99,
//         period: '/ 2mo',
//         duration: 'for 2 months',
//         badge: 'Most Popular',
//         tagline: 'Everything in Starter, plus:',
//         taglineIcon: Star,
//         highlight: '500 monthly credits',
//         features: [
//             { icon: FileText, text: 'Resume Building Included' },
//             { icon: Code2, text: 'Portfolio Creation' },
//             { icon: Zap, text: 'Priority Daily Job Updates' },
//             { icon: Headphones, text: 'Priority Support 24/7' },
//             { icon: TrendingUp, text: 'Sponsored Job Access' },
//             { icon: ArrowRight, text: 'Direct Apply Links' },
//         ],
//         extras: [
//             'LinkedIn Profile Boost',
//             'Career Progress Dashboard',
//             'Job match AI recommendations',
//         ],
//         btn: 'Start Growing',
//         dark: true,
//         featured: true,
//     },
//     {
//         name: 'Pro',
//         originalPrice: 89.99,
//         price: 55.99,
//         period: '/ 3mo',
//         duration: 'for 3 months',
//         badge: 'Best Value',
//         tagline: 'Everything in Growth, plus:',
//         taglineIcon: Sparkles,
//         highlight: '1000 monthly credits',
//         features: [
//             { icon: Code2, text: 'GitHub Profile Optimization' },
//             { icon: Users, text: 'Dedicated Career Coach' },
//             { icon: BookOpen, text: 'Interview Prep Toolkit' },
//             { icon: Zap, text: 'Premium Job Alerts' },
//             { icon: FileText, text: 'LinkedIn Profile Review' },
//         ],
//         extras: [
//             'Dedicated Career Coach (1-on-1)',
//             'Mock interview sessions included',
//             'Salary negotiation guidance',
//             'and other Pro benefits',
//         ],
//         btn: 'Go Pro',
//         dark: false,
//     },
// ];

// const Pricing = () => {
//     const [hovered, setHovered] = useState(null);

//     return (
//         <section style={{
//             minHeight: '100vh',
//             background: '#0a0a0a',
//             fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//             padding: '80px 24px',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//         }}>
//             {/* Header */}
//             <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '560px' }}>
//                 <div style={{
//                     display: 'inline-flex', alignItems: 'center', gap: '8px',
//                     background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
//                     borderRadius: '100px', padding: '6px 18px', marginBottom: '24px',
//                     fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase',
//                     color: 'rgba(255,255,255,0.5)', fontWeight: 600,
//                 }}>
//                     <Sparkles size={12} color="#f97316" /> Pricing Plans
//                 </div>
//                 <h2 style={{
//                     fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff',
//                     margin: '0 0 16px', letterSpacing: '-1.5px', lineHeight: 1.1,
//                 }}>
//                     Simple,{' '}
//                     <span style={{ color: '#f97316', fontStyle: 'italic' }}>Transparent</span>
//                     {' '}Pricing
//                 </h2>
//                 <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', margin: 0, lineHeight: 1.6 }}>
//                     No hidden fees. No surprises. Cancel anytime with one click.
//                 </p>
//             </div>

//             {/* Cards */}
//             <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//                 gap: '16px',
//                 width: '100%',
//                 maxWidth: '1020px',
//                 alignItems: 'start',
//             }}>
//                 {plans.map((plan, i) => {
//                     const TaglineIcon = plan.taglineIcon;
//                     const isHovered = hovered === i;
//                     const bg = plan.dark
//                         ? '#111'
//                         : '#111';

//                     return (
//                         <div
//                             key={i}
//                             onMouseEnter={() => setHovered(i)}
//                             onMouseLeave={() => setHovered(null)}
//                             style={{
//                                 borderRadius: '20px',
//                                 padding: '32px 28px',
//                                 background: plan.dark ? '#fff' : '#111',
//                                 border: plan.dark ? 'none' : '1px solid rgba(255,255,255,0.08)',
//                                 position: 'relative',
//                                 transition: 'transform 0.25s ease, box-shadow 0.25s ease',
//                                 transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
//                                 boxShadow: plan.dark
//                                     ? isHovered
//                                         ? '0 32px 80px rgba(249,115,22,0.2), 0 0 0 1px rgba(249,115,22,0.3)'
//                                         : '0 20px 60px rgba(0,0,0,0.4)'
//                                     : isHovered
//                                         ? '0 20px 60px rgba(0,0,0,0.5)'
//                                         : '0 4px 20px rgba(0,0,0,0.3)',
//                             }}
//                         >
//                             {/* Badge */}
//                             {plan.badge && (
//                                 <div style={{
//                                     position: 'absolute', top: '-13px', left: '28px',
//                                     background: plan.dark ? '#f97316' : '#1a1a1a',
//                                     color: plan.dark ? '#fff' : 'rgba(255,255,255,0.7)',
//                                     padding: '4px 14px', borderRadius: '100px',
//                                     fontSize: '0.68rem', fontWeight: 700,
//                                     letterSpacing: '1px', textTransform: 'uppercase',
//                                     border: plan.dark ? 'none' : '1px solid rgba(255,255,255,0.1)',
//                                     display: 'flex', alignItems: 'center', gap: '5px',
//                                 }}>
//                                     <Star size={9} fill="currentColor" /> {plan.badge}
//                                 </div>
//                             )}

//                             {/* Plan name */}
//                             <p style={{
//                                 fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px',
//                                 textTransform: 'uppercase', margin: '0 0 16px',
//                                 color: plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)',
//                             }}>{plan.name}</p>

//                             {/* Pricing */}
//                             <div style={{ marginBottom: '24px' }}>
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
//                                     <span style={{
//                                         fontSize: '1rem', color: plan.dark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)',
//                                         textDecoration: 'line-through',
//                                     }}>${plan.originalPrice}</span>
//                                 </div>
//                                 <div style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
//                                     <span style={{
//                                         fontSize: '2rem', fontWeight: 800, lineHeight: 1,
//                                         color: plan.dark ? '#000' : '#fff',
//                                         alignSelf: 'flex-start', marginTop: '8px',
//                                     }}>$</span>
//                                     <span style={{
//                                         fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-3px',
//                                         color: plan.dark ? '#000' : '#fff',
//                                     }}>{plan.price.toFixed(2).split('.')[0]}</span>
//                                     <span style={{
//                                         fontSize: '1.5rem', fontWeight: 700,
//                                         color: plan.dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)',
//                                         marginBottom: '8px',
//                                     }}>.{plan.price.toFixed(2).split('.')[1]}</span>
//                                     <span style={{
//                                         fontSize: '0.9rem',
//                                         color: plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)',
//                                         marginLeft: '6px',
//                                     }}>{plan.period}</span>
//                                 </div>
//                                 <p style={{
//                                     fontSize: '0.82rem',
//                                     color: plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)',
//                                     margin: '4px 0 0',
//                                 }}>{plan.duration}</p>
//                             </div>

//                             {/* CTA Button */}
//                             <button style={{
//                                 width: '100%',
//                                 padding: '14px',
//                                 borderRadius: '12px',
//                                 fontSize: '0.95rem',
//                                 fontWeight: 700,
//                                 cursor: 'pointer',
//                                 border: 'none',
//                                 marginBottom: '28px',
//                                 background: plan.dark
//                                     ? '#000'
//                                     : 'rgba(255,255,255,0.08)',
//                                 color: plan.dark ? '#fff' : 'rgba(255,255,255,0.85)',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 gap: '8px',
//                                 transition: 'all 0.2s ease',
//                                 letterSpacing: '0.2px',
//                             }}
//                                 onMouseEnter={e => {
//                                     e.currentTarget.style.background = plan.dark ? '#1a1a1a' : 'rgba(255,255,255,0.14)';
//                                     e.currentTarget.style.transform = 'scale(1.01)';
//                                 }}
//                                 onMouseLeave={e => {
//                                     e.currentTarget.style.background = plan.dark ? '#000' : 'rgba(255,255,255,0.08)';
//                                     e.currentTarget.style.transform = 'scale(1)';
//                                 }}
//                             >
//                                 {plan.btn}
//                                 <ArrowRight size={16} />
//                             </button>

//                             {/* Tagline */}
//                             <div style={{
//                                 display: 'flex', alignItems: 'center', gap: '8px',
//                                 marginBottom: '6px',
//                             }}>
//                                 <div style={{
//                                     width: '26px', height: '26px', borderRadius: '50%',
//                                     background: plan.dark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)',
//                                     display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
//                                 }}>
//                                     <TaglineIcon size={13} color={plan.dark ? '#000' : 'rgba(255,255,255,0.6)'} />
//                                 </div>
//                                 <p style={{
//                                     fontSize: '0.9rem', fontWeight: 700, margin: 0,
//                                     color: plan.dark ? '#000' : '#fff',
//                                 }}>{plan.tagline}</p>
//                             </div>
//                             <p style={{
//                                 fontSize: '0.82rem', margin: '0 0 20px 34px',
//                                 color: plan.dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)',
//                             }}>{plan.highlight}</p>

//                             {/* Divider */}
//                             <div style={{
//                                 height: '1px',
//                                 background: plan.dark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.07)',
//                                 marginBottom: '20px',
//                             }} />

//                             {/* Features */}
//                             <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column' }}>
//                                 {plan.features.map((f, j) => {
//                                     const Icon = f.icon;
//                                     return (
//                                         <li key={j} style={{
//                                             display: 'flex', alignItems: 'center', gap: '12px',
//                                             padding: '11px 0',
//                                             borderBottom: j < plan.features.length - 1
//                                                 ? `1px solid ${plan.dark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`
//                                                 : 'none',
//                                         }}>
//                                             <div style={{
//                                                 width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
//                                                 background: plan.dark ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)',
//                                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                                 border: `1px solid ${plan.dark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}`,
//                                             }}>
//                                                 <Check size={13} color={plan.dark ? '#000' : 'rgba(255,255,255,0.7)'} strokeWidth={2.5} />
//                                             </div>
//                                             <span style={{
//                                                 fontSize: '0.875rem',
//                                                 color: plan.dark ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.7)',
//                                                 fontWeight: 500,
//                                             }}>{f.text}</span>
//                                         </li>
//                                     );
//                                 })}
//                             </ul>

//                             {/* Extras / Also included */}
//                             {plan.extras && (
//                                 <div style={{
//                                     background: plan.dark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)',
//                                     borderRadius: '12px',
//                                     padding: '16px',
//                                     border: `1px solid ${plan.dark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
//                                 }}>
//                                     <p style={{
//                                         fontSize: '0.72rem', fontWeight: 700, margin: '0 0 10px',
//                                         color: plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)',
//                                         textTransform: 'uppercase', letterSpacing: '1px',
//                                         textDecoration: 'underline', textUnderlineOffset: '3px',
//                                     }}>Also included in this plan:</p>
//                                     <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                                         {plan.extras.map((e, k) => (
//                                             <li key={k} style={{
//                                                 fontSize: '0.82rem',
//                                                 color: plan.dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)',
//                                                 lineHeight: 1.5,
//                                             }}>{e}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Footer trust bar */}
//             <div style={{
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 gap: '32px', flexWrap: 'wrap', marginTop: '48px',
//             }}>
//                 {[
//                     ['🔒', 'Secure payment'],
//                     ['⚡', 'Instant access'],
//                     ['↩', 'Cancel anytime'],
//                     ['🇺🇸', 'US-based support'],
//                 ].map(([icon, text], i) => (
//                     <span key={i} style={{
//                         color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem',
//                         display: 'flex', alignItems: 'center', gap: '6px',
//                     }}>
//                         {icon} {text}
//                     </span>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Pricing;



























import React, { useState, useEffect } from 'react';
import { Check, Zap, Star, Shield, ArrowRight, Sparkles, Headphones, FileText, Briefcase, Code2, Users, TrendingUp, Link2, Crown } from 'lucide-react';

const FlutterBadge = () => {
    const [pulse, setPulse] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => setPulse(p => !p), 900);
        return () => clearInterval(interval);
    }, []);
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: pulse
                ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                : 'linear-gradient(90deg, #16a34a, #15803d)',
            color: '#fff',
            padding: '3px 10px 3px 8px',
            borderRadius: '100px',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            boxShadow: pulse
                ? '0 0 14px rgba(34,197,94,0.7), 0 0 28px rgba(34,197,94,0.35)'
                : '0 0 6px rgba(34,197,94,0.3)',
            transition: 'all 0.9s ease',
            verticalAlign: 'middle',
            marginLeft: '6px',
            whiteSpace: 'nowrap',
        }}>
            <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#fff',
                display: 'inline-block',
                boxShadow: pulse ? '0 0 6px #fff' : 'none',
                transition: 'all 0.9s ease',
            }} />
            ∞ Unlimited Job Links
        </span>
    );
};

const FlutterKeyword = ({ text, isPro }) => {
    const [pulse, setPulse] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => setPulse(p => !p), 900);
        return () => clearInterval(interval);
    }, []);
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: isPro
                ? (pulse
                    ? 'linear-gradient(90deg, #d4af37, #f5d870, #d4af37)'
                    : 'linear-gradient(90deg, #b8922a, #d4af37, #b8922a)')
                : (pulse
                    ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                    : 'linear-gradient(90deg, #16a34a, #15803d)'),
            color: isPro ? '#3d2800' : '#fff',
            padding: '2px 9px 2px 7px',
            borderRadius: '100px',
            fontSize: '0.73rem',
            fontWeight: 800,
            letterSpacing: '0.3px',
            boxShadow: isPro
                ? (pulse ? '0 0 14px rgba(212,175,55,0.75), 0 0 28px rgba(212,175,55,0.35)' : '0 0 6px rgba(212,175,55,0.3)')
                : (pulse ? '0 0 14px rgba(34,197,94,0.7), 0 0 28px rgba(34,197,94,0.35)' : '0 0 6px rgba(34,197,94,0.3)'),
            transition: 'all 0.9s ease',
            verticalAlign: 'middle',
            margin: '0 2px',
            whiteSpace: 'nowrap',
        }}>
            <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: isPro ? '#3d2800' : '#fff',
                display: 'inline-block',
                boxShadow: pulse ? (isPro ? '0 0 5px rgba(61,40,0,0.6)' : '0 0 6px #fff') : 'none',
                transition: 'all 0.9s ease',
                flexShrink: 0,
            }} />
            {text}
        </span>
    );
};

const HighlightText = ({ text, keywords, isPro, isDark }) => {
    const baseColor = isPro ? 'rgba(255,255,255,0.4)' : isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)';
    if (!keywords || keywords.length === 0) return <span style={{ color: baseColor }}>{text}</span>;

    const regex = new RegExp(`(${keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
        <span style={{ color: baseColor }}>
            {parts.map((part, idx) => {
                const isKeyword = keywords.some(k => k.toLowerCase() === part.toLowerCase());
                if (!isKeyword) return <span key={idx}>{part}</span>;
                return <FlutterKeyword key={idx} text={part} isPro={isPro} />;
            })}
        </span>
    );
};

const plans = [
    {
        name: 'Starter',
        originalPrice: 29.99,
        price: 19.99,
        period: '/ mo',
        duration: 'for 1 month',
        badge: null,
        tagline: 'Your launchpad into the job market.',
        taglineIcon: Shield,
        highlight: 'Everything a serious job seeker needs — on day one.',
        features: [
            { icon: Zap, text: 'Fresh Job Listings Delivered Daily', highlight: false },
            { icon: Briefcase, text: 'Full Access to All Job Listings', highlight: false },
            { icon: Headphones, text: 'Responsive Email Support', highlight: false },
            { icon: Check, text: 'W2 & C2C Job Filters', highlight: false },
            { icon: Link2, text: null, highlight: true },
        ],
        extras: null,
        btn: 'Start for $19.99',
        dark: false,
    },
    {
        name: 'Growth',
        originalPrice: 69.99,
        price: 39.99,
        period: '/ 2mo',
        duration: 'for 2 months',
        badge: 'Most Popular',
        badgeIcon: 'star',
        tagline: 'Built for those who mean business.',
        taglineIcon: Star,
        highlight: 'Stop applying blindly. Start landing interviews.',
        features: [
            { icon: Link2, text: '∞ Unlimited Direct Job Links', highlight: false },
            { icon: FileText, text: 'ATS-Friendly Resume — Crafted to Get Shortlisted', highlight: false },
            { icon: TrendingUp, text: 'Exclusive Sponsorship Job Listings', highlight: false },
        ],
        extras: [
            { text: 'Recruiters scan your resume in 6 seconds — our ATS Friendly Resume makes every second count.', keywords: ['ATS Friendly Resume'] },
            { text: 'H1B & Sponsorship jobs most candidates never even see — yours to apply first.', keywords: ['H1B & Sponsorship'] },
            { text: 'Apply directly with unlimited job links. No middlemen, no delays.', keywords: ['unlimited job links'] },
        ],
        btn: 'Accelerate My Search →',
        dark: true,
        featured: true,
    },
    {
        name: 'Pro',
        originalPrice: 99.99,
        price: 59.99,
        period: '/ 3mo',
        duration: 'for 3 months',
        badge: 'Best Value',
        badgeIcon: 'crown',
        tagline: 'The complete career acceleration package.',
        taglineIcon: Sparkles,
        highlight: 'Everything you need. Nothing held back.',
        features: [
            { icon: Link2, text: '∞ Unlimited Direct Job Links', highlight: false },
            { icon: FileText, text: 'ATS-Friendly Resume That Opens Doors', highlight: false },
            { icon: Code2, text: 'Standout Portfolio That Gets You Noticed', highlight: false },
            { icon: TrendingUp, text: 'Exclusive Sponsorship Job Listings', highlight: false },
        ],
        extras: [
            { text: 'Your ATS Friendly Resume gets you past the bots and into the interview room.', keywords: ['ATS Friendly Resume'] },
            { text: 'A Portfolio that screams "hire me" before you say a single word.', keywords: ['Portfolio'] },
            { text: 'H1B & Sponsorship jobs with visa support — your unfair, unbeatable advantage.', keywords: ['H1B & Sponsorship'] },
        ],
        btn: 'Claim My Pro Access →',
        dark: false,
    },
];

const Pricing = ({ onStartPlan }) => {
    const [hovered, setHovered] = useState(null);

    return (
        <section id="pricing" style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            padding: '80px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <style>{`
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes crownFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
      `}</style>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '580px' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '100px', padding: '6px 18px', marginBottom: '24px',
                    fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)', fontWeight: 600,
                }}>
                    <Sparkles size={12} color="#f97316" /> Pricing Plans
                </div>
                <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff',
                    margin: '0 0 16px', letterSpacing: '-1.5px', lineHeight: 1.1,
                }}>
                    Simple,{' '}
                    <span style={{ color: '#f97316', fontStyle: 'italic' }}>Transparent</span>
                    {' '}Pricing
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', margin: 0, lineHeight: 1.6 }}>
                    No hidden fees. No surprises. Cancel anytime with one click.
                </p>
            </div>

            {/* Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
                width: '100%',
                maxWidth: '1020px',
                alignItems: 'start',
            }}>
                {plans.map((plan, i) => {
                    const TaglineIcon = plan.taglineIcon;
                    const isHovered = hovered === i;
                    const isPro = plan.name === 'Pro';

                    return (
                        <div
                            key={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{
                                borderRadius: '20px',
                                padding: '32px 28px',
                                background: plan.dark ? '#fff' : '#111',
                                border: plan.dark ? 'none' : isPro
                                    ? '1px solid rgba(212,175,55,0.25)'
                                    : '1px solid rgba(255,255,255,0.08)',
                                position: 'relative',
                                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                                boxShadow: plan.dark
                                    ? isHovered
                                        ? '0 32px 80px rgba(249,115,22,0.2), 0 0 0 1px rgba(249,115,22,0.3)'
                                        : '0 20px 60px rgba(0,0,0,0.4)'
                                    : isPro
                                        ? isHovered
                                            ? '0 20px 60px rgba(212,175,55,0.15), 0 0 0 1px rgba(212,175,55,0.2)'
                                            : '0 4px 20px rgba(0,0,0,0.3)'
                                        : isHovered
                                            ? '0 20px 60px rgba(0,0,0,0.5)'
                                            : '0 4px 20px rgba(0,0,0,0.3)',
                            }}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div style={{
                                    position: 'absolute', top: '-13px', left: '28px',
                                    background: isPro
                                        ? 'linear-gradient(90deg, #b8922a, #d4af37, #f5d870, #d4af37, #b8922a)'
                                        : plan.dark ? '#f97316' : '#1a1a1a',
                                    backgroundSize: isPro ? '200% auto' : undefined,
                                    animation: isPro ? 'goldShimmer 3s linear infinite' : undefined,
                                    color: isPro ? '#3d2800' : plan.dark ? '#fff' : 'rgba(255,255,255,0.7)',
                                    padding: '4px 14px', borderRadius: '100px',
                                    fontSize: '0.68rem', fontWeight: 800,
                                    letterSpacing: '1px', textTransform: 'uppercase',
                                    border: isPro ? 'none' : plan.dark ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    boxShadow: isPro ? '0 2px 12px rgba(212,175,55,0.4)' : undefined,
                                }}>
                                    {isPro
                                        ? <Crown size={10} fill="currentColor" style={{ animation: 'crownFloat 2s ease-in-out infinite' }} />
                                        : <Star size={9} fill="currentColor" />
                                    }
                                    {plan.badge}
                                </div>
                            )}

                            {/* Plan name */}
                            <p style={{
                                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '2px',
                                textTransform: 'uppercase', margin: '0 0 16px',
                                color: isPro
                                    ? 'rgba(212,175,55,0.6)'
                                    : plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)',
                            }}>{plan.name}</p>

                            {/* Pricing */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                    <span style={{
                                        fontSize: '1rem', color: plan.dark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)',
                                        textDecoration: 'line-through',
                                    }}>${plan.originalPrice}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
                                    <span style={{
                                        fontSize: '2rem', fontWeight: 800, lineHeight: 1,
                                        color: isPro ? '#d4af37' : plan.dark ? '#000' : '#fff',
                                        alignSelf: 'flex-start', marginTop: '8px',
                                    }}>$</span>
                                    <span style={{
                                        fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-3px',
                                        color: isPro ? '#d4af37' : plan.dark ? '#000' : '#fff',
                                    }}>{plan.price.toFixed(2).split('.')[0]}</span>
                                    <span style={{
                                        fontSize: '1.5rem', fontWeight: 700,
                                        color: isPro ? 'rgba(212,175,55,0.7)' : plan.dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.5)',
                                        marginBottom: '8px',
                                    }}>.{plan.price.toFixed(2).split('.')[1]}</span>
                                    <span style={{
                                        fontSize: '0.9rem',
                                        color: isPro ? 'rgba(212,175,55,0.5)' : plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)',
                                        marginLeft: '6px',
                                    }}>{plan.period}</span>
                                </div>
                                <p style={{
                                    fontSize: '0.82rem',
                                    color: plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.35)',
                                    margin: '4px 0 0',
                                }}>{plan.duration}</p>
                            </div>

                            {/* CTA Button */}
                            <button style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: isPro ? '1.5px solid rgba(212,175,55,0.4)' : 'none',
                                marginBottom: '28px',
                                background: isPro
                                    ? 'rgba(212,175,55,0.08)'
                                    : plan.dark
                                        ? '#000'
                                        : 'rgba(255,255,255,0.08)',
                                color: isPro ? '#d4af37' : plan.dark ? '#fff' : 'rgba(255,255,255,0.85)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease',
                                letterSpacing: '0.2px',
                            }}
                                onClick={() => {
                                    onStartPlan(plan);
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = isPro ? 'rgba(212,175,55,0.16)' : plan.dark ? '#1a1a1a' : 'rgba(255,255,255,0.14)';
                                    e.currentTarget.style.transform = 'scale(1.01)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = isPro ? 'rgba(212,175,55,0.08)' : plan.dark ? '#000' : 'rgba(255,255,255,0.08)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {plan.btn}
                                <ArrowRight size={16} />
                            </button>

                            {/* Tagline */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <div style={{
                                    width: '26px', height: '26px', borderRadius: '50%',
                                    background: isPro ? 'rgba(212,175,55,0.1)' : plan.dark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    border: isPro ? '1px solid rgba(212,175,55,0.2)' : 'none',
                                }}>
                                    <TaglineIcon size={13} color={isPro ? '#d4af37' : plan.dark ? '#000' : 'rgba(255,255,255,0.6)'} />
                                </div>
                                <p style={{
                                    fontSize: '0.9rem', fontWeight: 700, margin: 0,
                                    color: isPro ? '#d4af37' : plan.dark ? '#000' : '#fff',
                                }}>{plan.tagline}</p>
                            </div>
                            <p style={{
                                fontSize: '0.82rem', margin: '0 0 20px 34px',
                                color: plan.dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)',
                                lineHeight: 1.5,
                                fontStyle: 'italic',
                            }}>{plan.highlight}</p>

                            {/* Divider */}
                            <div style={{
                                height: '1px',
                                background: isPro
                                    ? 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)'
                                    : plan.dark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.07)',
                                marginBottom: '20px',
                            }} />

                            {/* Features */}
                            <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column' }}>
                                {plan.features.map((f, j) => {
                                    return (
                                        <li key={j} style={{
                                            display: 'flex', alignItems: 'center', gap: '12px',
                                            padding: '11px 0',
                                            borderBottom: j < plan.features.length - 1
                                                ? `1px solid ${isPro ? 'rgba(212,175,55,0.08)' : plan.dark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`
                                                : 'none',
                                        }}>
                                            <div style={{
                                                width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                                                background: f.highlight
                                                    ? 'rgba(34,197,94,0.12)'
                                                    : isPro ? 'rgba(212,175,55,0.08)' : plan.dark ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: f.highlight
                                                    ? '1px solid rgba(34,197,94,0.3)'
                                                    : `1px solid ${isPro ? 'rgba(212,175,55,0.15)' : plan.dark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}`,
                                            }}>
                                                <Check size={13} color={
                                                    f.highlight ? '#22c55e'
                                                        : isPro ? '#d4af37'
                                                            : plan.dark ? '#000' : 'rgba(255,255,255,0.7)'
                                                } strokeWidth={2.5} />
                                            </div>
                                            {f.highlight ? (
                                                <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2px' }}>
                                                    <span style={{ color: plan.dark ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.6)' }}>Get access to</span>
                                                    <FlutterBadge />
                                                </span>
                                            ) : (
                                                <span style={{
                                                    fontSize: '0.875rem',
                                                    color: isPro ? 'rgba(255,255,255,0.75)' : plan.dark ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.7)',
                                                    fontWeight: 500,
                                                }}>{f.text}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Extras / Why people love this plan */}
                            {plan.extras && (
                                <div style={{
                                    background: isPro
                                        ? 'rgba(212,175,55,0.04)'
                                        : plan.dark ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    border: `1px solid ${isPro ? 'rgba(212,175,55,0.15)' : plan.dark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
                                }}>
                                    <p style={{
                                        fontSize: '0.72rem', fontWeight: 700, margin: '0 0 10px',
                                        color: isPro ? 'rgba(212,175,55,0.5)' : plan.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)',
                                        textTransform: 'uppercase', letterSpacing: '1px',
                                        textDecoration: 'underline', textUnderlineOffset: '3px',
                                    }}>Why people love this plan:</p>
                                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {plan.extras.map((e, k) => (
                                            <li key={k} style={{
                                                fontSize: '0.82rem',
                                                lineHeight: 1.6,
                                                paddingLeft: '12px',
                                                borderLeft: `2px solid ${isPro ? 'rgba(212,175,55,0.3)' : plan.dark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'}`,
                                            }}>
                                                <HighlightText text={e.text} keywords={e.keywords} isPro={isPro} isDark={plan.dark} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer trust bar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '32px', flexWrap: 'wrap', marginTop: '48px',
            }}>
                {[
                    ['🔒', 'Secure payment'],
                    ['⚡', 'Instant access'],
                    ['↩', 'Cancel anytime'],
                    ['🇺🇸', 'US-based support'],
                ].map(([icon, text], i) => (
                    <span key={i} style={{
                        color: 'rgba(255,255,255,0.25)', fontSize: '0.82rem',
                        display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                        {icon} {text}
                    </span>
                ))}
            </div>
        </section>
    );
};

export default Pricing;