// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const Footer = () => {
//     const sections = {
//         home: ['Results', 'About', 'Contact', 'Blog'],
//         services: [
//             ['Market Research', 'Brand Messaging', 'Campaigns', 'Website Design', 'Communications', 'Performance Marketing'],
//             ['Brand Strategy', 'Brand Identity', 'Go-To-Market', 'Web Development', 'Content & SEO', 'Social Media & UGC']
//         ],
//         industries: ['AI', 'Alt Medicine', 'B2B', 'Clinics & Hospitals', 'Consumer Health', 'Financial Services', 'Fintech', 'HealthTech', 'Real Estate', 'Tech']
//     };

//     const socialLinks = [
//         { name: 'LinkedIn', href: '#' },
//         { name: 'Instagram', href: '#' },
//         { name: 'Behance', href: '#' }
//     ];

//     return (
//         <footer style={{
//             backgroundColor: '#FF3B00',
//             color: '#FFFFFF',
//             padding: '80px 6% 0',
//             fontFamily: "'Outfit', sans-serif",
//             position: 'relative',
//             overflow: 'hidden'
//         }}>
//             <div className="container" style={{ position: 'relative', zIndex: 2 }}>
//                 {/* Top Section: Email Capture */}
//                 <div style={{ marginBottom: '80px', maxWidth: '400px' }}>
//                     <div style={{
//                         position: 'relative',
//                         border: '1.5px solid rgba(255, 255, 255, 0.8)',
//                         borderRadius: '100px',
//                         padding: '12px 24px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                     }}>
//                         <input
//                             type="text"
//                             placeholder="ENTER EMAIL ADDRESS.."
//                             style={{
//                                 background: 'none',
//                                 border: 'none',
//                                 color: '#FFFFFF',
//                                 fontSize: '0.8rem',
//                                 fontWeight: '700',
//                                 outline: 'none',
//                                 width: '80%',
//                                 textTransform: 'uppercase'
//                             }}
//                         />
//                         <ArrowRight size={18} />
//                     </div>
//                 </div>

//                 {/* Main Section: Socials & Nav */}
//                 <div style={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: '40px',
//                     justifyContent: 'space-between',
//                     marginBottom: '100px'
//                 }}>
//                     {/* Left: Social & Contact */}
//                     <div style={{ display: 'flex', gap: '60px', flex: '1 1 300px' }}>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                             {socialLinks.map((link) => (
//                                 <a key={link.name} href={link.href} style={{
//                                     color: '#FFFFFF',
//                                     textDecoration: 'none',
//                                     fontSize: '0.95rem',
//                                     fontWeight: '500',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     gap: '8px'
//                                 }}>
//                                     {link.name} <ArrowRight size={14} />
//                                 </a>
//                             ))}
//                         </div>
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//                             <a href="#" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: '500' }}>Start A Project</a>
//                             <p style={{ margin: 0, fontWeight: '500' }}>Text or Call: +1 (415) 840 4427</p>
//                             <p style={{ margin: 0, fontWeight: '500' }}>[email protected]</p>
//                         </div>
//                     </div>

//                     {/* Right: Navigation Sections */}
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', flex: '2 1 600px' }}>
//                         {/* Home */}
//                         <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '30px' }}>
//                             <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '30px' }}>Home</h4>
//                             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                                 {sections.home.map(item => <li key={item} style={{ fontSize: '0.9rem', opacity: 0.9 }}>{item}</li>)}
//                             </ul>
//                         </div>

//                         {/* Services */}
//                         <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '30px' }}>
//                             <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '30px' }}>Services</h4>
//                             <div style={{ display: 'flex', gap: '40px' }}>
//                                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                                     {sections.services[0].map(item => <li key={item} style={{ fontSize: '0.9rem', opacity: 0.9 }}>{item}</li>)}
//                                 </ul>
//                                 <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                                     {sections.services[1].map(item => <li key={item} style={{ fontSize: '0.9rem', opacity: 0.9 }}>{item}</li>)}
//                                 </ul>
//                             </div>
//                         </div>

//                         {/* Industries */}
//                         <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '30px' }}>
//                             <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '30px' }}>Industries</h4>
//                             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                                 {sections.industries.map(item => <li key={item} style={{ fontSize: '0.9rem', opacity: 0.9 }}>{item}</li>)}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Section: Privacy & Policy */}
//                 <div style={{
//                     display: 'flex',
//                     gap: '30px',
//                     padding: '30px 0',
//                     fontSize: '0.75rem',
//                     fontWeight: '700',
//                     letterSpacing: '0.5px',
//                     borderTop: '1px solid rgba(255,255,255,0.2)'
//                 }}>
//                     <a href="#" style={{ color: '#FFFFFF', textDecoration: 'none' }}>PRIVACY POLICY</a>
//                     <a href="#" style={{ color: '#FFFFFF', textDecoration: 'none' }}>TERMS AND CONDITIONS</a>
//                 </div>
//             </div>

//             {/* Large Background Text */}
//             <div style={{
//                 width: '100vw',
//                 marginLeft: 'calc(-6% - 1px)',
//                 lineHeight: '0.9',
//                 pointerEvents: 'none',
//                 userSelect: 'none',
//                 marginTop: '-20px',
//                 overflow: 'hidden',
//                 display: 'flex',
//                 justifyContent: 'center'
//             }}>
//                 <h1 style={{
//                     fontSize: '19.2vw',
//                     fontWeight: '900',
//                     margin: 0,
//                     color: '#FFFFFF',
//                     letterSpacing: '-0.02em',
//                     transform: 'translateY(15%)',
//                     whiteSpace: 'nowrap',
//                     display: 'block',
//                     width: '100%',
//                     textAlign: 'center',
//                     padding: '0 2vw'
//                 }}>
//                     NextHire
//                 </h1>
//             </div>
//         </footer>
//     );
// };

// export default Footer;






























import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

const Footer = ({ onPortfolioClick }) => {
    const [openService, setOpenService] = useState(null);

    const sections = {
        home: ['Results', 'About', 'Contact', 'Blog'],
        services: [
            {
                title: 'Resume',
                content: 'Professional resume crafting tailored to highlight your unique strengths and career achievements.'
            },
            {
                title: 'Portfolio',
                content: 'Creative portfolio development to showcase your best work and build a strong personal brand.'
            },
            {
                title: 'GitHub',
                content: 'Strategic GitHub profile optimization to demonstrate your technical prowess and open-source contributions.'
            }
        ]
    };

    const socialLinks = [
        { name: 'LinkedIn', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'Behance', href: '#' }
    ];

    const fullText = 'endless job opportunities';
    const [displayed, setDisplayed] = useState('');
    const [started, setStarted] = useState(false);
    const footerRef = useRef(null);
    const NextHireRef = useRef(null);
    const blockRef = useRef(null);

    // leftPx = pixel offset from left edge of blockRef where "I" starts
    const [leftPx, setLeftPx] = useState(null);
    const [targetWidth, setTargetWidth] = useState(null);

    const measure = useCallback(() => {
        const el = NextHireRef.current;
        const block = blockRef.current;
        if (!el || !block) return;

        const cs = window.getComputedStyle(el);
        const fontSize = parseFloat(cs.fontSize);
        const letterSpacingVal = cs.letterSpacing;
        let letterSpacing = 0;

        if (letterSpacingVal.includes('px')) {
            letterSpacing = parseFloat(letterSpacingVal);
        } else if (letterSpacingVal.includes('em')) {
            letterSpacing = parseFloat(letterSpacingVal) * fontSize;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.font = `900 ${fontSize}px Outfit, sans-serif`;

        const chars = ['B', 'I', 'G', ' ', 'C', 'A', 'R', 'E', 'E', 'R', ' ', 'D', 'R', 'E', 'A', 'M'];
        const widths = chars.map(c => ctx.measureText(c).width + letterSpacing);
        const totalWidth = widths.reduce((a, b) => a + b, 0) - letterSpacing;

        const blockWidth = block.offsetWidth;
        const textStartX = (blockWidth - totalWidth) / 2;

        // "DREAM" starts at index 11
        const dreamStartIndex = 11;
        const offsetToDream = widths.slice(0, dreamStartIndex).reduce((a, b) => a + b, 0);
        const dreamWidth = widths.slice(dreamStartIndex).reduce((a, b) => a + b, 0) - letterSpacing;

        // Align exactly over "DREAM"
        setLeftPx(textStartX + offsetToDream);
        setTargetWidth(dreamWidth);
    }, []);

    useEffect(() => {
        if (document.fonts) {
            document.fonts.load('900 100px Outfit').then(measure);
        } else {
            setTimeout(measure, 600);
        }
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [measure]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting && !started) setStarted(true); },
            { threshold: 0.1 }
        );
        if (footerRef.current) observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started || displayed.length >= fullText.length) return;
        const t = setTimeout(() => setDisplayed(fullText.slice(0, displayed.length + 1)), 65);
        return () => clearTimeout(t);
    }, [started, displayed]);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&family=Playfair+Display:ital@1&display=swap');
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .service-item {
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .service-item:hover {
                    opacity: 1 !important;
                    transform: translateX(5px);
                }
                .dropdown-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.4s ease, margin-top 0.3s ease, opacity 0.3s ease;
                    opacity: 0;
                    font-size: 0.8rem;
                    line-height: 1.4;
                    margin-top: 0;
                    color: rgba(255, 255, 255, 0.98);
                }
                .dropdown-content.open {
                    max-height: 100px;
                    opacity: 1;
                    margin-top: 8px;
                    margin-bottom: 8px;
                }
            `}</style>

            <footer ref={footerRef} style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                // padding: '80px 6% 120px',
                padding: '80px 6% 0',
                fontFamily: "'Outfit', sans-serif",
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                >
                    <source
                        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Dark Overlay for Text Readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                    {/* Email */}
                    <div style={{ marginBottom: '80px', maxWidth: '400px' }}>
                        <div style={{ border: '1.5px solid rgba(255,255,255,0.8)', borderRadius: '100px', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <input type="text" placeholder="ENTER EMAIL ADDRESS.." style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.8rem', fontWeight: '700', outline: 'none', width: '80%', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }} />
                            <ArrowRight size={18} />
                        </div>
                    </div>

                    {/* Nav */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', marginBottom: '100px' }}>
                        <div style={{ display: 'flex', gap: '60px', flex: '1 1 300px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {socialLinks.map(link => (
                                    <a key={link.name} href={link.href} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {link.name} <ArrowRight size={14} />
                                    </a>
                                ))}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>Start A Project</a>
                                <p style={{ margin: 0, fontWeight: '500' }}>Text or Call: +91 63095 86062</p>
                                <p style={{ margin: 0, fontWeight: '500' }}>[email protected]</p>
                            </div>
                        </div>

                        {/* Navigation Sections */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0',
                            flex: '2 1 600px',
                            justifyContent: 'space-between'
                        }}>
                            {/* Home Section */}
                            <div style={{
                                borderLeft: '1px solid rgba(255,255,255,0.2)',
                                paddingLeft: '30px',
                                flex: '1'
                            }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: '0 0 30px' }}>Home</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {sections.home.map(item => <li key={item} style={{ fontSize: '0.9rem', opacity: 0.9 }}>{item}</li>)}
                                </ul>
                            </div>

                            {/* Services Section */}
                            <div style={{
                                borderLeft: '1px solid rgba(255,255,255,0.2)',
                                paddingLeft: '30px',
                                flex: '1'
                            }}>
                                <h4
                                    style={{ fontSize: '1rem', fontWeight: '800', margin: '0 0 30px', cursor: 'pointer' }}
                                    onClick={() => onPortfolioClick && onPortfolioClick()}
                                >
                                    Services
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {sections.services.map((service, i) => (
                                        <div key={i}>
                                            <div
                                                className="service-item"
                                                onClick={() => {
                                                    if (service.title === 'Portfolio' && onPortfolioClick) {
                                                        onPortfolioClick();
                                                    } else {
                                                        setOpenService(openService === i ? null : i);
                                                    }
                                                }}
                                                style={{
                                                    fontSize: '0.9rem',
                                                    opacity: 0.9,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    fontWeight: openService === i ? '700' : '400'
                                                }}
                                            >
                                                {service.title}
                                                <ArrowRight
                                                    size={12}
                                                    style={{
                                                        transform: openService === i ? 'rotate(90deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.3s ease'
                                                    }}
                                                />
                                            </div>
                                            <div className={`dropdown-content ${openService === i ? 'open' : ''}`}>
                                                {service.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Privacy */}
                    <div style={{ display: 'flex', gap: '30px', padding: '30px 0', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>PRIVACY POLICY</a>
                        <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>TERMS AND CONDITIONS</a>
                    </div>
                </div>

                {/* BIG CAREER DREAM block */}
                <div ref={blockRef} style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100vw',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    marginBottom: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>

                    {/*
                      Caption row — sits ABOVE the h1 in normal document flow.
                      Height is fixed so it doesn't collapse; caption is absolute within it,
                      anchored to the bottom of this row (= top of the letters).
                      left is set in px from canvas measurement.
                    */}
                    <div style={{ position: 'relative', width: '100%', height: '2.2vw', minHeight: '18px', marginBottom: '4px' }}>
                        {leftPx !== null && targetWidth !== null && (
                            <div style={{
                                position: 'absolute',
                                left: leftPx,
                                width: targetWidth,
                                bottom: 0,
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                fontSize: 'clamp(0.65rem, 1.05vw, 0.95rem)',
                                color: '#FFFFFF',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                letterSpacing: '0.01em',
                                whiteSpace: 'nowrap',
                                lineHeight: 1,
                                pointerEvents: 'none',
                                userSelect: 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                {fullText.split('').map((char, i) => (
                                    <span key={i} style={{ visibility: i < displayed.length ? 'visible' : 'hidden', position: 'relative' }}>
                                        {char === ' ' ? '\u00A0' : char}
                                        {i === displayed.length - 1 && displayed.length < fullText.length && (
                                            <span style={{
                                                position: 'absolute',
                                                left: '100%',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '1.5px',
                                                height: '0.85em',
                                                background: 'rgba(8, 3, 3, 0.94)',
                                                marginLeft: '2px',
                                                animation: 'blink 0.75s steps(1) infinite',
                                            }} />
                                        )}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* BIG CAREER DREAM — centered, tight fit, no clipping */}
                    <h1 ref={NextHireRef} style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 900,
                        fontSize: '9.6vw',
                        letterSpacing: '-0.02em',
                        color: '#FFFFFF',
                        textShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.3)',
                        margin: 0,
                        padding: 0,
                        whiteSpace: 'nowrap',
                        display: 'block',
                        width: 'auto',
                        textAlign: 'center',
                        lineHeight: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                    }}>
                        BIG CAREER DREAM
                    </h1>
                </div>
            </footer >
        </>
    );
};

export default Footer;