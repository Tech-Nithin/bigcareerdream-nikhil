import React, { useState } from 'react';
import { api } from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowLeft, Eye, EyeOff, CheckCircle2, Loader2, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onBack, onCreateAccount }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', isError: false });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!email || !password || isLoading) return;
        console.log('%c[Auth] Sign-in attempt started...', 'color: #3b82f6;', { email });
        setIsLoading(true);
        try {
            const data = await api.login(email, password);
            console.log('%c[Auth] Login Response Received Success:', 'color: #10b981;', data);

            // With the new handleResponse, non-200 actually throws an error.
            // But we check success property for extra safety.
            if (!data || data.success === false) {
                throw new Error(data.message || 'Authentication failed');
            }
            
            if (!data.data) {
                throw new Error('Incomplete account data received from server');
            }

            localStorage.setItem('user', JSON.stringify(data.data));
            const userData = data.data;
            
            // USE THE NEW isOnboarded FLAG FROM BACKEND
            const hasCompletedOnboarding = userData && userData.isOnboarded === true;
            
            const destination = hasCompletedOnboarding ? '/dashboard/candidate' : '/onboarding';
            console.log('%c[Auth] User Route Determined:', 'color: #8b5cf6;', { 
                isOnboarded: userData.isOnboarded, 
                client_id: userData.client_id,
                destination 
            });

            const msg = hasCompletedOnboarding ? 'Welcome back! Going to dashboard...' : 'Valid credentials! Redirecting to setup...';
            setToast({ show: true, message: msg, isError: false });
            
            setTimeout(() => {
                navigate(destination);
            }, 1500);
        } catch (err) {
            console.error('[Auth] Sign in failed:', err.message);
            // Clear any partial/faulty user data
            localStorage.removeItem('user');
            
            setToast({ show: true, message: err.message, isError: true });
            setTimeout(() => setToast({ show: false, message: '', isError: false }), 6000);
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            background: '#fff',
            fontFamily: "'Outfit', sans-serif",
            overflow: 'hidden'
        }}>
            {/* ── LEFT PANEL: BRANDING & INFO ── */}
            <div style={{
                flex: '1.2',
                background: '#e8451a',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '80px',
                color: '#fff',
                overflow: 'hidden'
            }} className="signin-left-panel">
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '50%',
                    filter: 'blur(80px)'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-5%',
                    left: '-5%',
                    width: '300px',
                    height: '300px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }} />

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ position: 'relative', zIndex: 2 }}
                >
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ 
                            fontSize: '4.5rem', 
                            fontWeight: 900, 
                            lineHeight: 0.9, 
                            letterSpacing: '-2px',
                            marginBottom: '24px',
                            textTransform: 'uppercase'
                        }}>
                            Welcome<br />Back!
                        </h1>
                        <p style={{ 
                            fontSize: '1.2rem', 
                            opacity: 0.9, 
                            maxWidth: '400px', 
                            lineHeight: 1.6,
                            fontWeight: 500
                        }}>
                            To keep connected with us please login with your personal info and discover thousands of tech opportunities.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '60px' }}>
                        {[
                            { icon: <Zap size={24} />, title: "Real-time Job Alerts", text: "Be the first to apply to high-paying tech roles." },
                            { icon: <Rocket size={24} />, title: "C2C & W2 Support", text: "Specialized roles for consultants and full-time pros." },
                            { icon: <ShieldCheck size={24} />, title: "Verified Listings", text: "Direct corporate links with 0% recruitment fluff." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}
                            >
                                <div style={{ 
                                    padding: '12px', 
                                    background: 'rgba(255,255,255,0.15)', 
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Watermark */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '40px', 
                    left: '80px', 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    letterSpacing: '2px', 
                    opacity: 0.4,
                    textTransform: 'uppercase'
                }}>
                    Big Career Dream © 2026
                </div>
            </div>

            {/* ── RIGHT PANEL: SIGN IN FORM ── */}
            <div style={{
                flex: '1',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '80px',
                position: 'relative'
            }}>
                {/* Back to Home Button */}
                <motion.button
                    onClick={() => {
                        console.log('%c[Auth] Navigating back to home...', 'color: #999;');
                        onBack();
                    }}
                    whileHover={{ scale: 1.05 }}
                    style={{
                        position: 'absolute',
                        top: '40px',
                        left: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#f8f9fa',
                        border: '1px solid #eee',
                        padding: '10px 20px',
                        borderRadius: '100px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#444',
                        transition: 'all 0.2s'
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </motion.button>

                <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
                    <div style={{ marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                            Sign In
                        </h2>
                        <p style={{ color: '#666', fontSize: '1rem', fontWeight: 500 }}>
                            Access your candidate dashboard to track applications.
                        </p>
                    </div>

                    {/* Login Form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', marginLeft: '4px' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                <input
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 52px', borderRadius: '16px',
                                        border: '2px solid #f1f1f1', background: '#fcfcfc',
                                        fontSize: '0.95rem', color: '#111', outline: 'none', transition: 'all 0.2s',
                                        fontFamily: "'Outfit', sans-serif"
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#e8451a'}
                                    onBlur={e => e.target.style.borderColor = '#f1f1f1'}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111', marginLeft: '4px' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: '100%', padding: '16px 52px 16px 52px', borderRadius: '16px',
                                        border: '2px solid #f1f1f1', background: '#fcfcfc',
                                        fontSize: '0.95rem', color: '#111', outline: 'none', transition: 'all 0.2s',
                                        fontFamily: "'Outfit', sans-serif"
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#e8451a'}
                                    onBlur={e => e.target.style.borderColor = '#f1f1f1'}
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#999', cursor: 'pointer' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e8451a', cursor: 'pointer' }}>Forgot Password?</span>
                        </div>

                        <button
                            onClick={handleSignIn}
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '18px',
                                background: '#111',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '16px',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.background = '#e8451a'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                            onMouseLeave={e => { if (!isLoading) { e.currentTarget.style.background = '#111'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In Now'}
                        </button>

                        <div style={{ 
                            marginTop: '24px', 
                            textAlign: 'center', 
                            fontSize: '0.95rem', 
                            fontWeight: 500, 
                            color: '#666' 
                        }}>
                            Don't have an account? <span 
                                onClick={() => {
                                    console.log('%c[Auth] Switching to Create Account...', 'color: #e8451a;');
                                    onCreateAccount();
                                }} 
                                style={{ color: '#e8451a', fontWeight: 700, cursor: 'pointer' }}
                            >Create Account</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            top: '40px',
                            left: '50%',
                            background: '#111',
                            color: '#fff',
                            padding: '16px 32px',
                            borderRadius: '100px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            zIndex: 10000,
                            border: `1px solid ${toast.isError ? '#ef4444' : '#e8451a'}`
                        }}
                    >
                        {toast.isError ? '⚠️' : <CheckCircle2 size={20} style={{ color: '#e8451a' }} />}
                        <span style={{ fontWeight: 600 }}>{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @media (max-width: 992px) {
                    .signin-left-panel { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default SignIn;
