import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, LogIn, Briefcase, ArrowRight, CheckCircle, Link2, ShoppingBag } from 'lucide-react';
const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            style={{
                padding: 'var(--section-pad)',
                background: 'var(--bg-section)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Subtle dot grid */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1.5px, transparent 1.5px)',
                backgroundSize: '36px 36px',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                    <div className="section-badge">How It Works</div>
                    <h2 style={{
                        fontWeight: 900,
                        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                        color: 'var(--text-heading)',
                        marginBottom: '16px',
                        letterSpacing: '-1px',
                        lineHeight: 1.15,
                    }}>
                        Three Steps to Your{' '}
                        <span style={{
                            color: 'var(--accent-primary)',
                            fontStyle: 'italic',
                            fontFamily: "'Playfair Display', serif",
                        }}>
                            BIG Career Role
                        </span>
                    </h2>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.05rem',
                        maxWidth: '460px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                    }}>
                        From signup to application in minutes — no friction, no fluff.
                    </p>
                </motion.div>

                {/* ── Staggered Cards Row with Connecting Lines ── */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '40px',
                    position: 'relative',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }} className="stagger-row">

                    {/* ── STEP 1: Make a Payment ── */}
                    <div style={{ flex: '0 0 340px', position: 'relative', zIndex: 10 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Lavender Card */}
                            <div style={{
                                background: '#D8B4F8',
                                borderRadius: '24px',
                                padding: '24px',
                                position: 'relative',
                                overflow: 'hidden',
                                height: '220px',
                                boxShadow: '0 25px 70px rgba(168, 85, 247, 0.25)',
                            }}>
                                {/* Step Number Badge */}
                                <div style={{
                                    position: 'absolute', top: '16px', left: '16px',
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: '#1A1208',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#FFFFFF', fontWeight: 900, fontSize: '1rem',
                                    fontFamily: "'Outfit', sans-serif",
                                    zIndex: 2,
                                }}>1</div>

                                {/* Secure Checkout Badge */}
                                <div style={{
                                    position: 'absolute', bottom: '24px', right: '24px',
                                    background: '#1A1208',
                                    color: '#FFFFFF',
                                    padding: '7px 16px',
                                    borderRadius: '10px',
                                    fontWeight: 700, fontSize: '0.9rem',
                                    fontFamily: "'Outfit', sans-serif",
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                }}>
                                    <CheckCircle size={16} />
                                    Secure Pay
                                </div>

                                {/* Payment UI Illustration */}
                                <div style={{
                                    position: 'absolute', top: '35px', right: '30px',
                                    width: '120px', height: '150px',
                                    background: 'rgba(255,255,255,0.7)',
                                    borderRadius: '16px',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    padding: '16px',
                                    backdropFilter: 'blur(10px)',
                                }}>
                                    <CreditCard size={32} color="#7C3AED" />
                                    <div style={{ width: '80%', height: '8px', background: '#E9D5FF', borderRadius: '4px' }} />
                                    <div style={{ width: '60%', height: '8px', background: '#E9D5FF', borderRadius: '4px' }} />
                                    <div style={{
                                        marginTop: '6px',
                                        background: '#7C3AED', color: '#FFF',
                                        borderRadius: '8px', padding: '6px 14px',
                                        fontSize: '0.7rem', fontWeight: 700,
                                    }}>Pay Now</div>
                                </div>
                            </div>

                            {/* Text Below Card */}
                            <div style={{ padding: '28px 8px 0' }}>
                                <h3 style={{ fontWeight: 900, fontSize: '1.6rem', color: 'var(--text-heading)', marginBottom: '10px', fontFamily: "'Outfit', sans-serif" }}>
                                    Make a Payment
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                    Choose a plan and complete your secure checkout. Instant confirmation, no hidden fees.
                                </p>
                            </div>
                        </motion.div>

                    </div>

                    {/* ── STEP 2: Sign In & Get Access ── */}
                    <div style={{ flex: '0 0 340px', position: 'relative', zIndex: 11, marginTop: '80px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {/* Deep Purple Card Content ... */}
                            <div style={{
                                background: '#7C3AED',
                                borderRadius: '24px',
                                padding: '28px 24px',
                                position: 'relative',
                                overflow: 'hidden',
                                height: '240px',
                                boxShadow: '0 25px 80px rgba(124, 58, 237, 0.4)',
                            }}>
                                {/* Step Number Badge */}
                                <div style={{
                                    position: 'absolute', top: '16px', left: '16px',
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: '#1A1208',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#FFFFFF', fontWeight: 900, fontSize: '1rem',
                                    fontFamily: "'Outfit', sans-serif",
                                    zIndex: 2,
                                }}>2</div>

                                {/* Chat Bubble Mockup */}
                                <div style={{
                                    marginTop: '28px',
                                    display: 'flex', flexDirection: 'column', gap: '12px',
                                    alignItems: 'center',
                                }}>
                                    {/* White Chat Bubble */}
                                    <div style={{
                                        background: '#FFFFFF',
                                        borderRadius: '16px 16px 16px 4px',
                                        padding: '16px 20px',
                                        color: '#1A1208',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        fontFamily: "'Outfit', sans-serif",
                                        boxShadow: '0 6px 24px rgba(0,0,0,0.18)',
                                        maxWidth: '240px',
                                        textAlign: 'left',
                                    }}>
                                        Welcome back! Your<br />dashboard is ready.
                                    </div>

                                    {/* Dark Action Button */}
                                    <div style={{
                                        background: '#1A1208',
                                        color: '#FFFFFF',
                                        borderRadius: '14px',
                                        padding: '12px 24px',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        fontFamily: "'Outfit', sans-serif",
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    }}>
                                        <LogIn size={16} />
                                        Sign In Now
                                    </div>
                                </div>
                            </div>

                            {/* Text Below Card */}
                            <div style={{ padding: '28px 8px 0' }}>
                                <h3 style={{ fontWeight: 900, fontSize: '1.6rem', color: 'var(--text-heading)', marginBottom: '10px', fontFamily: "'Outfit', sans-serif" }}>
                                    Sign In & Get Access
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                    Your account is instantly activated. Unlock your personalized dashboard and job feed.
                                </p>
                            </div>
                        </motion.div>

                    </div>

                    {/* ── STEP 3: Apply for Jobs ── */}
                    <div style={{ flex: '0 0 340px', position: 'relative', zIndex: 12, marginTop: '160px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {/* Neon Pink/Magenta Card */}
                            <div style={{
                                background: 'linear-gradient(135deg, #FF00CC 0%, #FF4D9E 100%)',
                                borderRadius: '24px',
                                padding: '28px 24px',
                                position: 'relative',
                                overflow: 'hidden',
                                height: '220px',
                                boxShadow: '0 25px 80px rgba(255, 0, 204, 0.4)',
                            }}>
                                {/* Step Number Badge */}
                                <div style={{
                                    position: 'absolute', top: '16px', left: '16px',
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: '#1A1208',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#FFFFFF', fontWeight: 900, fontSize: '1rem',
                                    fontFamily: "'Outfit', sans-serif",
                                    zIndex: 2,
                                }}>3</div>

                                {/* Apply UI Mockup */}
                                <div style={{
                                    marginTop: '24px',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                                }}>
                                    {/* Notification Badge */}
                                    <div style={{
                                        background: '#FF6B40',
                                        color: '#FFF', fontWeight: 800,
                                        borderRadius: '100px', padding: '8px 18px',
                                        fontSize: '0.95rem',
                                        fontFamily: "'Outfit', sans-serif",
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                                        alignSelf: 'flex-end', marginRight: '20px',
                                    }}>
                                        <ShoppingBag size={16} /> 12 Jobs
                                    </div>

                                    {/* Apply Pill */}
                                    <div style={{
                                        background: 'rgba(255,255,255,0.95)',
                                        color: '#1A1208',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        fontFamily: "'Outfit', sans-serif",
                                        borderRadius: '100px',
                                        padding: '10px 24px',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
                                    }}>
                                        <Link2 size={16} />
                                        applied!
                                    </div>
                                </div>
                            </div>

                            {/* Text Below Card */}
                            <div style={{ padding: '28px 8px 0' }}>
                                <h3 style={{ fontWeight: 900, fontSize: '1.6rem', color: 'var(--text-heading)', marginBottom: '10px', fontFamily: "'Outfit', sans-serif" }}>
                                    Apply for Jobs
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                    Browse fresh, verified listings updated daily. One-click apply links take you straight to the company.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* ── Bottom CTA stripe ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    style={{
                        marginTop: '100px',
                        padding: '40px 60px',
                        background: 'linear-gradient(135deg, #7C3AED 0%, #FF00CC 100%)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '28px',
                        boxShadow: '0 25px 70px rgba(124, 58, 237, 0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute', right: '-60px', top: '-80px',
                        width: '300px', height: '300px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)',
                        borderRadius: '50%',
                    }} />
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '8px' }}>
                            Ready to get started?
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
                            Pay once. Sign in. Start applying — it really is that simple.
                        </p>
                    </div>
                    <button
                        style={{
                            position: 'relative', zIndex: 2, flexShrink: 0,
                            background: '#FFFFFF',
                            color: '#7C3AED',
                            border: 'none',
                            padding: '16px 32px',
                            borderRadius: '14px',
                            fontSize: '1rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            fontFamily: "'Outfit', sans-serif",
                            display: 'flex', alignItems: 'center', gap: '10px',
                            boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
                        }}
                    >
                        Get Started Now <ArrowRight size={18} />
                    </button>
                </motion.div>

            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .connector-desktop {
                        display: none !important;
                    }
                }
                @media (max-width: 768px) {
                    #how-it-works .stagger-row {
                        flex-direction: column;
                        align-items: center;
                        gap: 20px !important;
                    }
                    #how-it-works .stagger-row > * {
                        margin-left: 0 !important;
                        margin-top: 0 !important;
                        flex: 0 0 auto !important;
                        width: 100%;
                        max-width: 360px;
                    }
                    #how-it-works .stagger-row > *:not(:first-child) {
                        margin-top: 40px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;






























// import React from 'react';
// import { motion } from 'framer-motion';
// import { CreditCard, LogIn, ArrowRight, CheckCircle, Link2, ShoppingBag } from 'lucide-react';

// const HowItWorks = () => {
//     return (
//         <section
//             id="how-it-works"
//             style={{
//                 padding: 'var(--section-pad)',
//                 background: 'var(--bg-section)',
//                 position: 'relative',
//                 overflow: 'hidden',
//             }}
//         >
//             <div className="container" style={{ position: 'relative', zIndex: 2 }}>

//                 {/* ── Header ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 24 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     style={{ textAlign: 'center', marginBottom: '80px' }}
//                 >
//                     <div className="section-badge">How It Works</div>
//                     <h2 style={{
//                         fontWeight: 900,
//                         fontSize: 'clamp(2rem, 4vw, 3.2rem)',
//                         color: 'var(--text-heading)',
//                         marginBottom: '16px',
//                         letterSpacing: '-1px',
//                         lineHeight: 1.15,
//                     }}>
//                         Three Steps to Your{' '}
//                         <span style={{
//                             color: 'var(--accent-primary)',
//                             fontStyle: 'italic',
//                             fontFamily: "'Playfair Display', serif",
//                         }}>
//                             BIG Career Role
//                         </span>
//                     </h2>
//                     <p style={{
//                         color: 'var(--text-muted)',
//                         fontSize: '1.05rem',
//                         maxWidth: '460px',
//                         margin: '0 auto',
//                         lineHeight: 1.7,
//                     }}>
//                         From signup to application in minutes — no friction, no fluff.
//                     </p>
//                 </motion.div>

//                 {/* ── Staggered Cascading Cards ── */}
//                 {/* Outer wrapper: wide enough to hold all 3 offset cards + their text */}
//                 <div
//                     className="stagger-row"
//                     style={{
//                         display: 'flex',
//                         alignItems: 'flex-start',
//                         justifyContent: 'center',
//                         position: 'relative',
//                         gap: '0px',
//                         /* enough bottom padding so step-3 text (tallest offset) isn't clipped */
//                         paddingBottom: '40px',
//                     }}
//                 >

//                     {/* ══════════════════════════════
//                         STEP 1
//                         — sits at the top-left
//                         — its text block is clear below the card
//                     ══════════════════════════════ */}
//                     <motion.div
//                         className="step-item"
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.55, delay: 0 }}
//                         style={{
//                             flex: '0 0 380px',
//                             zIndex: 10,
//                             marginTop: '0px',
//                             marginLeft: '0px',
//                         }}
//                     >
//                         {/* Card */}
//                         <div style={{
//                             background: '#C9A8F5',
//                             borderRadius: '28px',
//                             padding: '28px',
//                             position: 'relative',
//                             height: '290px',
//                             overflow: 'hidden',
//                             boxShadow: '0 20px 60px rgba(168,85,247,0.22)',
//                         }}>
//                             {/* Number badge */}
//                             <div style={{
//                                 width: '42px', height: '42px', borderRadius: '50%',
//                                 background: '#1A1208',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                 color: '#fff', fontWeight: 900, fontSize: '1.1rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 position: 'absolute', top: '18px', left: '18px', zIndex: 3,
//                             }}>1</div>

//                             {/* Small white square top right */}
//                             <div style={{
//                                 position: 'absolute', top: '16px', right: '20px',
//                                 width: '28px', height: '28px',
//                                 background: 'rgba(255,255,255,0.5)',
//                                 borderRadius: '7px',
//                             }} />

//                             {/* Illustration box */}
//                             <div style={{
//                                 position: 'absolute',
//                                 bottom: '58px', left: '28px',
//                                 width: '150px', height: '150px',
//                                 background: 'rgba(200,170,240,0.55)',
//                                 borderRadius: '20px',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                 overflow: 'hidden',
//                             }}>
//                                 <div style={{
//                                     position: 'absolute', top: '24px',
//                                     width: '54px', height: '54px', borderRadius: '50%',
//                                     background: 'rgba(255,255,255,0.55)',
//                                 }} />
//                                 <div style={{
//                                     position: 'absolute', bottom: 0,
//                                     width: '100%', height: '72px',
//                                     background: 'rgba(130,70,200,0.28)',
//                                     borderRadius: '0 0 20px 20px',
//                                 }} />
//                                 <CreditCard size={28} color="rgba(255,255,255,0.82)" style={{ position: 'absolute', bottom: '30px' }} />
//                             </div>

//                             {/* PAY NOW badge */}
//                             <div style={{
//                                 position: 'absolute',
//                                 bottom: '24px', right: '24px',
//                                 background: '#1A1208',
//                                 color: '#fff',
//                                 fontWeight: 800, fontSize: '1rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 padding: '12px 24px',
//                                 borderRadius: '14px',
//                                 letterSpacing: '0.5px',
//                                 boxShadow: '0 4px 18px rgba(0,0,0,0.28)',
//                             }}>
//                                 PAY NOW
//                             </div>
//                         </div>

//                         {/* Text — sits directly below its own card */}
//                         <div style={{ padding: '28px 4px 0' }}>
//                             <h3 style={{
//                                 fontWeight: 900, fontSize: '1.65rem',
//                                 color: 'var(--text-heading)', marginBottom: '12px',
//                                 fontFamily: "'Outfit', sans-serif", lineHeight: 1.2,
//                             }}>
//                                 Make a<br />Payment
//                             </h3>
//                             <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0, maxWidth: '300px' }}>
//                                 Choose a plan and complete your secure checkout. Instant confirmation, no hidden fees.
//                             </p>
//                         </div>
//                     </motion.div>

//                     {/* ══════════════════════════════
//                         STEP 2
//                         — overlaps step 1 horizontally,
//                           pushed down 120px
//                     ══════════════════════════════ */}
//                     <motion.div
//                         className="step-item"
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.55, delay: 0.15 }}
//                         style={{
//                             flex: '0 0 380px',
//                             zIndex: 11,
//                             marginTop: '120px',
//                             marginLeft: '-60px',
//                         }}
//                     >
//                         {/* Card */}
//                         <div style={{
//                             background: '#7C3AED',
//                             borderRadius: '28px',
//                             padding: '28px 26px',
//                             position: 'relative',
//                             height: '290px',
//                             overflow: 'hidden',
//                             boxShadow: '0 25px 70px rgba(124,58,237,0.45)',
//                         }}>
//                             {/* Number badge */}
//                             <div style={{
//                                 width: '42px', height: '42px', borderRadius: '50%',
//                                 background: 'rgba(255,255,255,0.22)',
//                                 border: '2px solid rgba(255,255,255,0.5)',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                 color: '#fff', fontWeight: 900, fontSize: '1.1rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 position: 'absolute', top: '18px', left: '18px', zIndex: 3,
//                             }}>2</div>

//                             {/* Chat bubble */}
//                             <div style={{
//                                 marginTop: '68px',
//                                 background: '#fff',
//                                 borderRadius: '20px 20px 20px 4px',
//                                 padding: '16px 22px',
//                                 color: '#1A1208',
//                                 fontWeight: 600, fontSize: '1rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 lineHeight: 1.45,
//                                 boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
//                                 maxWidth: '260px',
//                                 margin: '68px auto 0',
//                             }}>
//                                 Hey! Happy you're<br />interested! Tap 👆
//                             </div>

//                             {/* Sign In button */}
//                             <div style={{
//                                 background: '#1A1208',
//                                 color: '#fff',
//                                 borderRadius: '14px',
//                                 padding: '14px 26px',
//                                 fontWeight: 700, fontSize: '1rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 display: 'flex', alignItems: 'center', gap: '10px',
//                                 justifyContent: 'center',
//                                 marginTop: '16px',
//                                 maxWidth: '220px',
//                                 marginLeft: 'auto', marginRight: 'auto',
//                                 boxShadow: '0 4px 14px rgba(0,0,0,0.28)',
//                                 cursor: 'pointer',
//                             }}>
//                                 <LogIn size={16} />
//                                 Sign In Now
//                             </div>
//                         </div>

//                         {/* Text */}
//                         <div style={{ padding: '28px 4px 0' }}>
//                             <h3 style={{
//                                 fontWeight: 900, fontSize: '1.65rem',
//                                 color: 'var(--text-heading)', marginBottom: '12px',
//                                 fontFamily: "'Outfit', sans-serif", lineHeight: 1.2,
//                             }}>
//                                 Sign In &<br />Get Access
//                             </h3>
//                             <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0, maxWidth: '300px' }}>
//                                 Your account is instantly activated. Unlock your personalized dashboard and job feed.
//                             </p>
//                         </div>
//                     </motion.div>

//                     {/* ══════════════════════════════
//                         STEP 3
//                         — overlaps step 2 horizontally,
//                           pushed down 240px
//                     ══════════════════════════════ */}
//                     <motion.div
//                         className="step-item"
//                         initial={{ opacity: 0, y: 50 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.55, delay: 0.3 }}
//                         style={{
//                             flex: '0 0 380px',
//                             zIndex: 12,
//                             marginTop: '240px',
//                             marginLeft: '-60px',
//                         }}
//                     >
//                         {/* Card */}
//                         <div style={{
//                             background: 'linear-gradient(140deg, #FF00CC 0%, #FF4D9E 100%)',
//                             borderRadius: '28px',
//                             padding: '28px 26px',
//                             position: 'relative',
//                             height: '290px',
//                             overflow: 'visible',
//                             boxShadow: '0 25px 70px rgba(255,0,204,0.45)',
//                         }}>
//                             {/* Number badge */}
//                             <div style={{
//                                 width: '42px', height: '42px', borderRadius: '50%',
//                                 background: 'rgba(255,255,255,0.28)',
//                                 border: '2px solid rgba(255,255,255,0.6)',
//                                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                                 color: '#fff', fontWeight: 900, fontSize: '1.1rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 position: 'absolute', top: '18px', left: '18px', zIndex: 3,
//                             }}>3</div>

//                             {/* Orange floating badge */}
//                             <div style={{
//                                 position: 'absolute',
//                                 top: '-18px', right: '26px',
//                                 background: '#FF6B40',
//                                 color: '#fff',
//                                 fontWeight: 800, fontSize: '1rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 borderRadius: '100px',
//                                 padding: '10px 22px',
//                                 display: 'flex', alignItems: 'center', gap: '8px',
//                                 boxShadow: '0 6px 22px rgba(0,0,0,0.28)',
//                                 zIndex: 5,
//                             }}>
//                                 <ShoppingBag size={16} /> 12 Jobs
//                             </div>

//                             {/* applied! pill */}
//                             <div style={{
//                                 position: 'absolute',
//                                 bottom: '44px',
//                                 left: '50%',
//                                 transform: 'translateX(-50%)',
//                                 background: 'rgba(255,255,255,0.2)',
//                                 border: '1.5px solid rgba(255,255,255,0.35)',
//                                 color: '#fff',
//                                 fontWeight: 700, fontSize: '1.05rem',
//                                 fontFamily: "'Outfit', sans-serif",
//                                 borderRadius: '100px',
//                                 padding: '14px 32px',
//                                 display: 'flex', alignItems: 'center', gap: '8px',
//                                 whiteSpace: 'nowrap',
//                                 backdropFilter: 'blur(10px)',
//                             }}>
//                                 <Link2 size={16} />
//                                 applied! 🖤
//                             </div>
//                         </div>

//                         {/* Text */}
//                         <div style={{ padding: '28px 4px 0' }}>
//                             <h3 style={{
//                                 fontWeight: 900, fontSize: '1.65rem',
//                                 color: 'var(--text-heading)', marginBottom: '12px',
//                                 fontFamily: "'Outfit', sans-serif", lineHeight: 1.2,
//                             }}>
//                                 Apply for Jobs
//                             </h3>
//                             <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0, maxWidth: '300px' }}>
//                                 Browse fresh, verified listings updated daily. One-click apply links take you straight to the company.
//                             </p>
//                         </div>
//                     </motion.div>

//                 </div>

//                 {/* ── Bottom CTA stripe ── */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.5 }}
//                     style={{
//                         marginTop: '140px',
//                         padding: '40px 60px',
//                         background: 'linear-gradient(135deg, #7C3AED 0%, #FF00CC 100%)',
//                         borderRadius: '24px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         flexWrap: 'wrap',
//                         gap: '28px',
//                         boxShadow: '0 25px 70px rgba(124,58,237,0.3)',
//                         position: 'relative',
//                         overflow: 'hidden',
//                     }}
//                 >
//                     <div style={{
//                         position: 'absolute', right: '-60px', top: '-80px',
//                         width: '300px', height: '300px',
//                         background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)',
//                         borderRadius: '50%',
//                     }} />
//                     <div style={{ position: 'relative', zIndex: 2 }}>
//                         <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>
//                             Ready to get started?
//                         </h3>
//                         <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
//                             Pay once. Sign in. Start applying — it really is that simple.
//                         </p>
//                     </div>
//                     <button
//                         style={{
//                             position: 'relative', zIndex: 2, flexShrink: 0,
//                             background: '#fff', color: '#7C3AED',
//                             border: 'none', padding: '16px 32px',
//                             borderRadius: '14px', fontSize: '1rem',
//                             fontWeight: 800, cursor: 'pointer',
//                             fontFamily: "'Outfit', sans-serif",
//                             display: 'flex', alignItems: 'center', gap: '10px',
//                             boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
//                             transition: 'all 0.3s ease',
//                         }}
//                         onMouseEnter={e => {
//                             e.currentTarget.style.transform = 'translateY(-3px)';
//                             e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
//                         }}
//                         onMouseLeave={e => {
//                             e.currentTarget.style.transform = 'translateY(0)';
//                             e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
//                         }}
//                     >
//                         Get Started Now <ArrowRight size={18} />
//                     </button>
//                 </motion.div>

//             </div>

//             <style>{`
//                 @media (max-width: 1060px) {
//                     #how-it-works .stagger-row {
//                         flex-direction: column !important;
//                         align-items: center !important;
//                     }
//                     #how-it-works .step-item {
//                         margin-left: 0 !important;
//                         margin-top: 32px !important;
//                         flex: 0 0 auto !important;
//                         width: 100% !important;
//                         max-width: 400px !important;
//                     }
//                     #how-it-works .step-item:first-child {
//                         margin-top: 0 !important;
//                     }
//                 }
//             `}</style>
//         </section>
//     );
// };

// export default HowItWorks;
