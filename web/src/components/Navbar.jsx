import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import Lottie from 'lottie-react';
import arrowAnimation from '../assets/slider-arrow-right.json';

const Navbar = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about-marketing' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Testimonials', href: '#testimonials' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%',
                    height: scrolled ? '70px' : '88px',
                    padding: '0 6%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    zIndex: 1000,
                    // Premium Glassmorphism
                    background: scrolled
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
            >
                {/* Logo */}
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
                    <img
                        src="/joblinks.png"
                        alt="Big Career Dream Logo"
                        style={{
                            width: '40px', height: '40px',
                            borderRadius: '10px',
                            objectFit: 'contain',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                        }}
                    />
                    <span className="brand-text" style={{
                        fontSize: 'clamp(1rem, 3.5vw, 1.4rem)', fontWeight: 900,
                        color: (scrolled ? 'var(--text-heading)' : 'rgba(0, 0, 0, 0.9)'),
                        letterSpacing: '-0.5px', transition: 'color 0.3s',
                        fontFamily: "'Outfit', sans-serif",
                        whiteSpace: 'nowrap',
                    }}>
                        Big Career<span style={{ color: 'var(--accent-primary)' }}>Dream</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-only">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} style={{
                            fontSize: '0.9rem', fontWeight: 600,
                            color: (scrolled ? 'var(--text-body)' : 'rgba(0,0,0,0.7)'),
                            textDecoration: 'none', transition: 'all 0.3s ease',
                            position: 'relative',
                            fontFamily: "'Outfit', sans-serif"
                        }}
                            onMouseEnter={e => { e.currentTarget.style.color = scrolled ? 'var(--accent-primary)' : 'rgba(0, 0, 0, 1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = scrolled ? 'var(--text-body)' : 'rgba(0,0,0,0.7)'; }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: scrolled ? 'var(--text-body)' : 'rgba(0,0,0,0.8)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: "'Outfit', sans-serif",
                            overflow: 'hidden',
                            height: '40px',
                            padding: '0 12px'
                        }}
                        className="desktop-only nav-btn-slide"
                        onClick={() => navigate('/signin')}
                    >
                        <div className="btn-slide-track">
                            <div className="btn-slide-layer">
                                <User size={18} style={{ marginRight: '8px' }} /> Sign In
                            </div>
                            <div className="btn-slide-layer" style={{ color: 'var(--accent-primary)' }}>
                                <User size={18} style={{ marginRight: '8px' }} /> Sign In
                            </div>
                        </div>
                    </button>
                    <button
                        style={{
                            background: 'var(--accent-primary)',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0 24px',
                            borderRadius: '10px',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            boxShadow: '0 8px 20px rgba(232, 69, 26, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.3s ease',
                            fontFamily: "'Outfit', sans-serif",
                            overflow: 'hidden',
                            height: '44px',
                        }}
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="nav-btn-slide secondary-hover desktop-only"
                    >
                        <div className="btn-slide-track full-width">
                            <div className="btn-slide-layer">
                                Get Started
                                <div style={{ width: '28px', height: '28px', marginLeft: '4px' }}>
                                    <Lottie
                                        animationData={arrowAnimation}
                                        loop={true}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            </div>
                            <div className="btn-slide-layer">
                                Get Started
                                <div style={{ width: '28px', height: '28px', marginLeft: '4px' }}>
                                    <Lottie
                                        animationData={arrowAnimation}
                                        loop={true}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenu(true)}
                        style={{ background: 'transparent', border: 'none', color: scrolled ? 'var(--text-heading)' : 'rgba(0,0,0,0.8)', cursor: 'pointer' }}
                        className="mobile-only"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed', inset: 0, background: 'var(--cream-100)', zIndex: 2000,
                            padding: '40px 6%', display: 'flex', flexDirection: 'column'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src="/joblinks.png" alt="Logo" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'contain' }} />
                                <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-heading)', fontFamily: "'Outfit', sans-serif" }}>
                                    Big Career<span style={{ color: 'var(--accent-primary)' }}>Dream</span>
                                </span>
                            </div>
                            <button onClick={() => setMobileMenu(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-heading)', cursor: 'pointer' }}>
                                <X size={32} />
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} style={{
                                    fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-heading)', textDecoration: 'none',
                                    fontFamily: "'Outfit', sans-serif"
                                }}>{link.name}</a>
                            ))}
                            <hr style={{ border: 'none', height: '1px', background: 'var(--border-light)' }} />
                            {/* Sign In button */}
                            <button
                                onClick={() => { setMobileMenu(false); navigate('/signin'); }}
                                style={{
                                    background: 'transparent',
                                    color: 'var(--text-heading)',
                                    border: '1.5px solid var(--border-light)',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    fontFamily: "'Outfit', sans-serif",
                                    cursor: 'pointer',
                                }}
                            >Sign In</button>
                            {/* Get Started button — matches desktop navbar exactly */}
                            <button
                                onClick={() => {
                                    setMobileMenu(false);
                                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                style={{
                                    background: 'var(--accent-primary)',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    padding: '0 28px',
                                    borderRadius: '12px',
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    fontFamily: "'Outfit', sans-serif",
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 20px rgba(232, 69, 26, 0.25)',
                                    height: '58px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                }}
                            >
                                Get Started
                                <div style={{ width: '32px', height: '32px', marginLeft: '4px' }}>
                                    <Lottie
                                        animationData={arrowAnimation}
                                        loop={true}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                 .nav-btn-slide {
                     position: relative;
                     display: inline-flex;
                     flex-direction: column;
                 }
                 
                 .btn-slide-track {
                     display: flex;
                     flex-direction: column;
                     transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                     width: 100%;
                 }
                 
                 .btn-slide-track.full-width {
                     width: 100%;
                 }
                 
                 .nav-btn-slide:hover .btn-slide-track {
                     transform: translateY(-50%);
                 }
                 
                 .btn-slide-layer {
                     height: 40px;
                     display: flex;
                     align-items: center;
                     justify-content: center;
                     white-space: nowrap;
                     flex-shrink: 0;
                 }
                 
                 button.nav-btn-slide.secondary-hover:hover {
                     transform: scale(1.03) !important;
                     background: var(--coral-500) !important;
                 }
                 
                 button.nav-btn-slide.secondary-hover {
                     height: 44px !important;
                 }
                 
                 button.nav-btn-slide.secondary-hover .btn-slide-layer {
                     height: 44px !important;
                 }

                 /* Desktop-only: visible on screens wider than 768px */
                 .desktop-only {
                     display: flex !important;
                 }
                 /* Mobile-only: hidden on desktop */
                 .mobile-only {
                     display: none !important;
                 }

                 @media (max-width: 768px) {
                     .desktop-only {
                         display: none !important;
                     }
                     .mobile-only {
                         display: flex !important;
                     }
                     .brand-text {
                         font-size: clamp(0.85rem, 4vw, 1.1rem) !important;
                         letter-spacing: -0.3px !important;
                     }
                 }
             `}</style>
        </>
    );
};

export default Navbar;





















// // Header.tsx
// import React from 'react';

// interface HeaderProps {
//     title?: string;
// }

// const Header: React.FC<HeaderProps> = ({ title = "Manychat" }) => {
//     return (
//     <>
//             {/* Sentry and Google Sign-In scripts */}
//             <script
//                 type="text/plain"
//                 data-usercentrics="Google Sign-In"
//                 src="https://accounts.google.com/gsi/intermediate"
//                 async
//             />
//             <meta name="sentry-trace" content="0f259f866ea919905fbf767c0789ee6d-65ae7d86a9c1fe08-0" />
//             <meta name="baggage" content="sentry-environment=production,sentry-release=09e5434f6f5dec5c9b746c1975f7db303103e523,sentry-public_key=fd87064c2af248eeb5722985deeda40c,sentry-trace_id=0f259f866ea919905fbf767c0789ee6d,sentry-org_id=1241926,sentry-sampled=false,sentry-sample_rand=0.07146946084212835,sentry-sample_rate=0.01" />

//             {/* Polyfill script */}
//             <script src="https://mccdn.me/martech/next-lp/_next/static/chunks/polyfills-42372ed130431b0a.js" noModule />

//             {/* Main content wrapper */}
//             <div hidden>
//                 {/* $ */}
//                 {/* /$ */}
//             </div>

//             {/* ScrollTriggers component */}
//             <div data-sentry-component="ScrollTriggers" data-sentry-source-file="ScrollTriggers.tsx">
//                 <div
//                     className="page-wrapper !pt-0"
//                     style={{ scrollBehavior: 'smooth' }}
//                     data-sentry-component="HeaderFooterWrapperRedesign"
//                     data-sentry-source-file="HeaderFooterWrapperRedesign.tsx"
//                 >
//                     {/* TopBarRedesign component */}
//                     <div
//                         className="fixed_old inset-x-0 top-0 z-20 TopBarRedesign_container__2wa39"
//                         style={{ top: 'var(--top-banner-height)' }}
//                         data-sentry-component="TopBarRedesign"
//                         data-sentry-source-file="TopBarRedesign.tsx"
//                     >
//                         <div
//                             className="relative transition-colors md:mx-2rem md:mt-2rem"
//                             style={{ color: 'white' }}
//                         >
//                             {/* MobileMenuRedesign component */}
//                             <div
//                                 className="TopBarRedesign_menu__e8eJ_"
//                                 data-sentry-component="MobileMenuRedesign"
//                                 data-sentry-source-file="MobileMenuRedesign.tsx"
//                             >
//                                 <div className="TopBarRedesign_menu-inner__QDgQg">
//                                     <div className="min-h-full px-1.6rem pb-2rem sm:px-3.2rem">
//                                         <div className="TopBarRedesign_menu-container__ivKxq flex flex-col items-center">
//                                             {/* Get Started Button */}
//                                             <a
//                                                 className="p_y-s p_x-l !rounded-[10rem] !px-2rem !py-[1.4rem] !font-cofo !text-[1.4rem]/[2rem] !font-normal !uppercase !tracking-[0.01em] before:!rounded-[10rem] caps b_rd-xl pointer inline-block whitespace-nowrap mt-2rem !bg-neonPink button"
//                                                 href="https://app.manychat.com/signup/facebookAuth?channel=instagram"
//                                                 data-sentry-element="Tag"
//                                                 data-sentry-component="Btn"
//                                                 data-sentry-source-file="Btn.tsx"
//                                                 link="/signup"
//                                                 label="Get Started"
//                                             >
//                                                 <span className="text_center flex_jcc height flex_aic mx-0.8rem flex">
//                                                     <span className="button__center">
//                                                         <span>Get Started</span>
//                                                         <span className="button__before">Get Started</span>
//                                                         <span className="button__after">Get Started</span>
//                                                     </span>
//                                                 </span>
//                                             </a>

//                                             {/* Sign In Link */}
//                                             <a
//                                                 href="https://app.manychat.com/signin"
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="mb-2rem block px-4rem py-1.6rem uppercase !mt-[0.4rem]"
//                                                 link="/signin"
//                                                 label="Sign In"
//                                                 itemProp="url"
//                                                 data-sentry-element="WrappedComponent"
//                                                 data-sentry-component="Link"
//                                                 data-sentry-source-file="Link.tsx"
//                                             >
//                                                 <span className="mc-text-label" itemProp="name">Sign In</span>
//                                             </a>

//                                             {/* Product Menu Item */}
//                                             <div className="w-full" data-sentry-component="MenuItemRedesign" data-sentry-source-file="MenuItemRedesign.tsx">
//                                                 <div className="mb-[0.4rem] flex flex-col rounded-[0.8rem] bg-white">
//                                                     <div className="TopBarRedesign_menu-name__LeOuy TopBarRedesign_underline-ov__9uwoN flex items-center justify-between px-2rem py-1.6rem uppercase">
//                                                         <span className="TopBarRedesign_underline-item__oIOg_ mc-text-label">Product</span>
//                                                         <div className="TopBarRedesign_menu-arrow__hBDMS arrowhead"></div>
//                                                     </div>
//                                                     <div className="TopBarRedesign_menu-drop__Ij3dZ">
//                                                         <div>
//                                                             <div className="flex flex-col px-2rem pb-2rem pt-1.6rem">
//                                                                 <a
//                                                                     className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 flex items-center"
//                                                                     href="/product/instagram"
//                                                                     link="/product/instagram"
//                                                                     label="Instagram"
//                                                                     description="Automate your Instagram Marketing"
//                                                                     icon="https://mccdn.me/martech/next-lp//_next/static/media/instagram.c93e282d.svg"
//                                                                     data-sentry-element="WrappedComponent"
//                                                                     data-sentry-component="ComponentWithHandler"
//                                                                     data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                 >
//                                                                     <img
//                                                                         className="h-2.4rem w-2.4rem"
//                                                                         src="https://mccdn.me/martech/next-lp//_next/static/media/instagram.c93e282d.svg"
//                                                                         alt=""
//                                                                     />
//                                                                     <div className="TopBarRedesign_underline-ov__9uwoN">
//                                                                         <span className="TopBarRedesign_underline-item__oIOg_ ml-0.8rem">Instagram</span>
//                                                                     </div>
//                                                                 </a>

//                                                                 <a
//                                                                     className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 flex items-center mt-0.8rem"
//                                                                     href="/product/whatsapp"
//                                                                     link="/product/whatsapp"
//                                                                     label="WhatsApp"
//                                                                     description="Connect with your Customers Instantly"
//                                                                     icon="https://mccdn.me/martech/next-lp//_next/static/media/whatsapp.1cc2e1a0.svg"
//                                                                     data-sentry-element="WrappedComponent"
//                                                                     data-sentry-component="ComponentWithHandler"
//                                                                     data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                 >
//                                                                     <img
//                                                                         className="h-2.4rem w-2.4rem"
//                                                                         src="https://mccdn.me/martech/next-lp//_next/static/media/whatsapp.1cc2e1a0.svg"
//                                                                         alt=""
//                                                                     />
//                                                                     <div className="TopBarRedesign_underline-ov__9uwoN">
//                                                                         <span className="TopBarRedesign_underline-item__oIOg_ ml-0.8rem">WhatsApp</span>
//                                                                     </div>
//                                                                 </a>

//                                                                 <a
//                                                                     className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 flex items-center mt-0.8rem"
//                                                                     href="/product/messenger-marketing"
//                                                                     link="/product/messenger-marketing"
//                                                                     label="Messenger"
//                                                                     description="Facebook Messenger chatbot #1"
//                                                                     icon="https://mccdn.me/martech/next-lp//_next/static/media/messenger.6bbd502f.svg"
//                                                                     data-sentry-element="WrappedComponent"
//                                                                     data-sentry-component="ComponentWithHandler"
//                                                                     data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                 >
//                                                                     <img
//                                                                         className="h-2.4rem w-2.4rem"
//                                                                         src="https://mccdn.me/martech/next-lp//_next/static/media/messenger.6bbd502f.svg"
//                                                                         alt=""
//                                                                     />
//                                                                     <div className="TopBarRedesign_underline-ov__9uwoN">
//                                                                         <span className="TopBarRedesign_underline-item__oIOg_ ml-0.8rem">Messenger</span>
//                                                                     </div>
//                                                                 </a>

//                                                                 <a
//                                                                     className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 flex items-center mt-0.8rem"
//                                                                     href="/product/tiktok"
//                                                                     link="/product/tiktok"
//                                                                     label="TikTok"
//                                                                     description="Turn TikTok Views into Profits with Automation."
//                                                                     icon="https://mccdn.me/martech/next-lp//_next/static/media/tiktok.2025bae0.svg"
//                                                                     data-sentry-element="WrappedComponent"
//                                                                     data-sentry-component="ComponentWithHandler"
//                                                                     data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                 >
//                                                                     <img
//                                                                         className="h-2.4rem w-2.4rem"
//                                                                         src="https://mccdn.me/martech/next-lp//_next/static/media/tiktok.2025bae0.svg"
//                                                                         alt=""
//                                                                     />
//                                                                     <div className="TopBarRedesign_underline-ov__9uwoN">
//                                                                         <span className="TopBarRedesign_underline-item__oIOg_ ml-0.8rem">TikTok</span>
//                                                                     </div>
//                                                                 </a>

//                                                                 <a
//                                                                     href="/product/ai"
//                                                                     target="_self"
//                                                                     rel=""
//                                                                     className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 flex items-center mt-0.8rem"
//                                                                     link="https://manychat.com/product/ai"
//                                                                     label="Manychat AI"
//                                                                     description="A Smarter Way to Chat Automation"
//                                                                     icon="https://mccdn.me/martech/next-lp//_next/static/media/ai.f36285af.svg"
//                                                                     data-sentry-element="WrappedComponent"
//                                                                     data-sentry-component="Link"
//                                                                     data-sentry-source-file="Link.tsx"
//                                                                 >
//                                                                     <img
//                                                                         className="h-2.4rem w-2.4rem"
//                                                                         src="https://mccdn.me/martech/next-lp//_next/static/media/ai.f36285af.svg"
//                                                                         alt=""
//                                                                     />
//                                                                     <div className="TopBarRedesign_underline-ov__9uwoN">
//                                                                         <span className="TopBarRedesign_underline-item__oIOg_ ml-0.8rem">Manychat AI</span>
//                                                                     </div>
//                                                                 </a>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Solutions Menu Item */}
//                                             <div className="w-full" data-sentry-component="MenuItemRedesign" data-sentry-source-file="MenuItemRedesign.tsx">
//                                                 <div className="mb-[0.4rem] flex flex-col rounded-[0.8rem] bg-white">
//                                                     <div className="TopBarRedesign_menu-name__LeOuy TopBarRedesign_underline-ov__9uwoN flex items-center justify-between px-2rem py-1.6rem uppercase">
//                                                         <span className="TopBarRedesign_underline-item__oIOg_ mc-text-label">Solutions</span>
//                                                         <div className="TopBarRedesign_menu-arrow__hBDMS arrowhead"></div>
//                                                     </div>
//                                                     <div className="TopBarRedesign_menu-drop__Ij3dZ">
//                                                         <div>
//                                                             <div className="px-2rem pb-2rem pt-1.6rem sm:!grid sm:grid-cols-2 sm:gap-x-2rem sm:gap-y-3.2rem">
//                                                                 <div className="flex flex-col items-start">
//                                                                     <span className="mc-text-label mb-1.6rem uppercase opacity-40">by Business Type</span>
//                                                                     <div className="flex flex-col items-start">
//                                                                         <a
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5"
//                                                                             href="/creators"
//                                                                             label="for Creators"
//                                                                             link="/creators"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">for Creators</span>
//                                                                         </a>
//                                                                         <a
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             href="/meet-chatmarketing-for-ecommerce"
//                                                                             label="for eCommerce"
//                                                                             link="/meet-chatmarketing-for-ecommerce"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">for eCommerce</span>
//                                                                         </a>
//                                                                         <a
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             href="/sm-marketers"
//                                                                             label="for SM Marketers"
//                                                                             link="/sm-marketers"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">for SM Marketers</span>
//                                                                         </a>
//                                                                         <a
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             href="/product/for-agencies"
//                                                                             label="for Agencies"
//                                                                             link="/product/for-agencies"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">for Agencies</span>
//                                                                         </a>
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="flex flex-col items-start mt-3.2rem sm:mt-0">
//                                                                     <span className="mc-text-label mb-1.6rem uppercase opacity-40">by Use Case</span>
//                                                                     <div className="flex flex-col items-start">
//                                                                         <a
//                                                                             href="https://get.manychat.com/grow"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5"
//                                                                             label="Grow Your Followers"
//                                                                             link="https://get.manychat.com/grow"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Grow Your Followers</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://get.manychat.com/use-case/collect-emails"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Collect Emails"
//                                                                             link="https://get.manychat.com/use-case/collect-emails"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Collect Emails</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://get.manychat.com/use-case/request-to-follow"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Request to Follow"
//                                                                             link="https://get.manychat.com/use-case/request-to-follow"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Request to Follow</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://get.manychat.com/use-case/comment-to-dm"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Respond to Comments"
//                                                                             link="https://get.manychat.com/use-case/comment-to-dm"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Respond to Comments</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://get.manychat.com/rip-link-in-bio"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Send Links in DM"
//                                                                             link="https://get.manychat.com/rip-link-in-bio"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Send Links in DM</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://get.manychat.com/use-case/follow-to-dm"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Follow to DM"
//                                                                             link="https://get.manychat.com/use-case/follow-to-dm"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Follow to DM</span>
//                                                                         </a>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Agencies Menu Item */}
//                                             <div className="w-full" data-sentry-component="MenuItemRedesign" data-sentry-source-file="MenuItemRedesign.tsx">
//                                                 <div className="mb-[0.4rem] flex flex-col rounded-[0.8rem] bg-white">
//                                                     <div className="TopBarRedesign_menu-name__LeOuy TopBarRedesign_underline-ov__9uwoN flex items-center justify-between px-2rem py-1.6rem uppercase">
//                                                         <span className="TopBarRedesign_underline-item__oIOg_ mc-text-label">Agencies</span>
//                                                         <div className="TopBarRedesign_menu-arrow__hBDMS arrowhead"></div>
//                                                     </div>
//                                                     <div className="TopBarRedesign_menu-drop__Ij3dZ">
//                                                         <div>
//                                                             <div className="flex flex-col px-2rem pb-2rem pt-1.6rem">
//                                                                 <a
//                                                                     href="https://manychat.com/agency/listing"
//                                                                     className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 flex items-center"
//                                                                     link="/"
//                                                                     label="Hire an Agency"
//                                                                     description="Get help from chat marketing experts"
//                                                                     icon="https://mccdn.me/martech/next-lp//_next/static/media/agency.39129aee.svg"
//                                                                     data-sentry-element="WrappedComponent"
//                                                                     data-sentry-component="ComponentWithHandler"
//                                                                     data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                 >
//                                                                     <img
//                                                                         className="h-2.4rem w-2.4rem"
//                                                                         src="https://mccdn.me/martech/next-lp//_next/static/media/agency.39129aee.svg"
//                                                                         alt=""
//                                                                     />
//                                                                     <div className="TopBarRedesign_underline-ov__9uwoN">
//                                                                         <span className="TopBarRedesign_underline-item__oIOg_ ml-0.8rem">Hire an Agency</span>
//                                                                     </div>
//                                                                 </a>
//                                                                 <a
//                                                                     href="/affiliate/"
//                                                                     target="_blank"
//                                                                     rel=""
//                                                                     className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 flex items-center mt-0.8rem"
//                                                                     link="https://manychat.com/affiliate/"
//                                                                     label="Join the Affiliate Program"
//                                                                     description="Earn up to 50% recurring commission"
//                                                                     icon="https://mccdn.me/martech/next-lp//_next/static/media/affiliate.35a34f8e.svg"
//                                                                     data-sentry-element="WrappedComponent"
//                                                                     data-sentry-component="Link"
//                                                                     data-sentry-source-file="Link.tsx"
//                                                                 >
//                                                                     <img
//                                                                         className="h-2.4rem w-2.4rem"
//                                                                         src="https://mccdn.me/martech/next-lp//_next/static/media/affiliate.35a34f8e.svg"
//                                                                         alt=""
//                                                                     />
//                                                                     <div className="TopBarRedesign_underline-ov__9uwoN">
//                                                                         <span className="TopBarRedesign_underline-item__oIOg_ ml-0.8rem">Join the Affiliate Program</span>
//                                                                     </div>
//                                                                 </a>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Pricing Menu Item */}
//                                             <div className="w-full" data-sentry-component="MenuItemRedesign" data-sentry-source-file="MenuItemRedesign.tsx">
//                                                 <a
//                                                     className="TopBarRedesign_menu-name__LeOuy TopBarRedesign_underline-ov__9uwoN mb-[0.4rem] flex items-center justify-between rounded-[0.8rem] bg-white px-2rem py-1.6rem uppercase"
//                                                     href="/pricing"
//                                                     link="/pricing"
//                                                     label="Pricing"
//                                                     data-sentry-element="WrappedComponent"
//                                                     data-sentry-component="ComponentWithHandler"
//                                                     data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                 >
//                                                     <span className="mc-text-label">Pricing</span>
//                                                 </a>
//                                             </div>

//                                             {/* Resources Menu Item */}
//                                             <div className="w-full" data-sentry-component="MenuItemRedesign" data-sentry-source-file="MenuItemRedesign.tsx">
//                                                 <div className="mb-[0.4rem] flex flex-col rounded-[0.8rem] bg-white">
//                                                     <div className="TopBarRedesign_menu-name__LeOuy TopBarRedesign_underline-ov__9uwoN flex items-center justify-between px-2rem py-1.6rem uppercase">
//                                                         <span className="TopBarRedesign_underline-item__oIOg_ mc-text-label">Resources</span>
//                                                         <div className="TopBarRedesign_menu-arrow__hBDMS arrowhead"></div>
//                                                     </div>
//                                                     <div className="TopBarRedesign_menu-drop__Ij3dZ">
//                                                         <div>
//                                                             <div className="px-2rem pb-2rem pt-1.6rem sm:!grid sm:grid-cols-2 sm:gap-x-2rem sm:gap-y-3.2rem">
//                                                                 <div className="flex flex-col items-start">
//                                                                     <span className="mc-text-label mb-1.6rem uppercase opacity-40">Learn</span>
//                                                                     <div className="flex flex-col items-start">
//                                                                         <a
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5"
//                                                                             href="/resources/how-to"
//                                                                             label="How To Guides"
//                                                                             link="/resources/how-to"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">How To Guides</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://help.manychat.com/hc/en-us"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Help Center"
//                                                                             link="https://help.manychat.com/hc/en-us"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Help Center</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://community.manychat.com/events"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Webinars"
//                                                                             link="https://community.manychat.com/events"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Webinars</span>
//                                                                         </a>
//                                                                         <a
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             href="/resources/ebooks"
//                                                                             label="eBooks"
//                                                                             link="/resources/ebooks"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">eBooks</span>
//                                                                         </a>
//                                                                     </div>
//                                                                 </div>

//                                                                 <div className="flex flex-col items-start mt-3.2rem sm:mt-0">
//                                                                     <span className="mc-text-label mb-1.6rem uppercase opacity-40">Get Inspired</span>
//                                                                     <div className="flex flex-col items-start">
//                                                                         <a
//                                                                             href="https://manychat.com/blog/"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5"
//                                                                             label="Blog"
//                                                                             link="/"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Blog</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://community.manychat.com/"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Community"
//                                                                             link="https://community.manychat.com/"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Community</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://www.youtube.com/@manychat"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="YouTube channel"
//                                                                             link="https://www.youtube.com/@manychat"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">YouTube channel</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://com.manychat.com/"
//                                                                             target="_blank"
//                                                                             rel="noopener noreferrer"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Chronically Online"
//                                                                             link="https://com.manychat.com/"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="Link"
//                                                                             data-sentry-source-file="Link.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Chronically Online</span>
//                                                                         </a>
//                                                                         <a
//                                                                             href="https://manychat.com/blog/success-stories/"
//                                                                             className="TopBarRedesign_nav-link__ZbbSi TopBarRedesign_underline__8PXLt mc-text-h5 mt-0.8rem"
//                                                                             label="Success Stories"
//                                                                             link="/success-stories/"
//                                                                             data-sentry-element="WrappedComponent"
//                                                                             data-sentry-component="ComponentWithHandler"
//                                                                             data-sentry-source-file="withExperimentClickHandler.tsx"
//                                                                         >
//                                                                             <span className="TopBarRedesign_underline-item__oIOg_">Success Stories</span>
//                                                                         </a>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Top Bar with Logo and Navigation */}
//                             <div className="relative flex min-h-6rem items-center justify-between px-1.6rem sm:px-3.2rem md:min-h-[7.2rem] md:px-2rem md:py-1.2rem huge:px-[2.8rem]">
//                                 <div className="pointer-events-none !absolute left-0 top-0 h-full w-full md:rounded-[8px] TopBarRedesign_bg__BHdws"></div>

//                                 <div className="relative flex items-center">
//                                     <div className="z-[1] h-2rem sm:h-[2.8rem] TopBarRedesign_logo__SPvwR" data-sentry-component="Logo" data-sentry-source-file="Logo.tsx">
//                                         <a className="h-full overflow-hidden undefined" data-sentry-element="WrappedComponent" data-sentry-source-file="withExperimentClickHandler.tsx" data-sentry-component="ComponentWithHandler" href="/">
//                                             <svg fill="none" viewBox="0 0 151 28" className="h-full" data-sentry-element="svg" data-sentry-source-file="Logo.tsx">
//                                                 <g clipPath="url(#logo-a)" data-sentry-element="g" data-sentry-source-file="Logo.tsx">
//                                                     <path className="TopBarRedesign_letter__iZR7f TopBarRedesign_letter1__KKsy3" d="M26.323.443h-.215c-6.344 0-9.428 9.67-9.428 9.67v-7.42H0v20.391h6.666V9.49h3.556v13.595h7.154S21.05 6.947 24.49 8.154c2.319.886-4.22 14.916-4.22 14.916h9.446s1.31-9.138 1.33-12.3c.29-5.37-.542-10.332-4.73-10.332" data-sentry-element="path" data-sentry-source-file="Logo.tsx"></path>
//                                                     <path className="TopBarRedesign_letter__iZR7f TopBarRedesign_letter2__8aPQy" d="M42.462 9.725a5.016 5.016 0 0 0-.662-.915 5.4 5.4 0 0 0-1.738-1.267 5.045 5.045 0 0 0-2.14-.475 5.32 5.32 0 0 0-2.996.844 5.421 5.421 0 0 0-1.997 2.59 11.465 11.465 0 0 0-.713 4.318v.957c-.042 1.472.19 2.938.684 4.322a5.326 5.326 0 0 0 1.942 2.569 5.28 5.28 0 0 0 2.997.835 5.136 5.136 0 0 0 2.156-.463 5.671 5.671 0 0 0 1.782-1.267c.251-.265.477-.554.676-.862v2.155h6.666V7.505h-6.666l.008 2.22Zm.165 5.925c.013.66-.054 1.32-.2 1.963a2.455 2.455 0 0 1-.58 1.16 1.334 1.334 0 0 1-.968.381 1.27 1.27 0 0 1-.945-.38 2.378 2.378 0 0 1-.58-1.155 8.607 8.607 0 0 1-.185-1.969v-.83a8.115 8.115 0 0 1 .194-1.951c.082-.423.278-.814.565-1.13a1.293 1.293 0 0 1 .94-.367c.357-.012.704.12.967.366.294.314.495.706.58 1.131.147.64.214 1.295.2 1.951l.012.83Z" data-sentry-element="path" data-sentry-source-file="Logo.tsx"></path>
//                                                     <path className="TopBarRedesign_letter__iZR7f TopBarRedesign_letter3__J8qcS" d="M65.139 7.69a4.57 4.57 0 0 0-2.432-.61 5.649 5.649 0 0 0-2.405.498 5.538 5.538 0 0 0-1.823 1.344c-.342.387-.63.82-.855 1.287V7.516h-6.452v15.562h6.646v-9.33c-.013-.35.056-.699.2-1.018.11-.247.294-.454.524-.59a1.43