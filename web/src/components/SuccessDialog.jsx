import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, PartyPopper, ShieldCheck } from 'lucide-react';

const Confetti = () => {
    const particles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * window.innerWidth * 0.8,
        y: -Math.random() * window.innerHeight * 0.8 - 100,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: ['#f97316', '#22c55e', '#3b82f6', '#eab308', '#ec4899'][Math.floor(Math.random() * 5)]
    }));

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{ 
                        x: p.x, 
                        y: p.y, 
                        rotate: p.rotation, 
                        scale: p.scale,
                        opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: '10px',
                        height: '10px',
                        background: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px'
                    }}
                />
            ))}
        </div>
    );
};

const SuccessDialog = ({ isOpen, onClose, planName, amount, orderId }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.85)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                    >
                        {/* Dialog */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '32px',
                                maxWidth: '480px',
                                width: '100%',
                                padding: '48px 40px',
                                textAlign: 'center',
                                position: 'relative',
                                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
                                overflow: 'hidden'
                            }}
                        >
                            <Confetti />
                            {/* Decorative glow */}
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '200px',
                                height: '100px',
                                background: 'radial-gradient(ellipse, rgba(34,197,94,0.15) 0%, transparent 70%)',
                                filter: 'blur(40px)',
                                zIndex: 0
                            }} />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 32px',
                                    boxShadow: '0 20px 40px -10px rgba(34,197,94,0.4)',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                <CheckCircle2 size={40} color="#fff" strokeWidth={2.5} />
                            </motion.div>

                            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>Congratulations!</h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px', fontWeight: 500 }}>
                                Login credentials are sent to your mail.
                            </p>

                            <div style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '20px',
                                padding: '24px',
                                marginBottom: '32px',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Amount Paid</span>
                                    <span style={{ color: '#fff', fontWeight: 700 }}>${amount}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>Plan</span>
                                    <span style={{ color: '#fff', fontWeight: 700 }}>{planName}</span>
                                </div>
                                {orderId && (
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                                        Receipt Reference: {orderId}
                                    </div>
                                )}
                            </div>

                            {/* Progress bar container */}
                            <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', height: '6px', width: '100%', overflow: 'hidden' }}>
                                <motion.div 
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 3, ease: 'linear' }}
                                    style={{ background: '#22c55e', height: '100%', borderRadius: '100px' }}
                                />
                            </div>

                                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                                        <motion.div 
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <CheckCircle2 size={14} style={{ color: '#22c55e' }} /> 
                                            <span>Redirecting to login...</span>
                                        </motion.div>
                                    </div>

                                    <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)' }} />

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>If you are not redirected automatically:</p>
                                        <motion.button
                                            whileHover={{ scale: 1.02, background: 'rgba(34,197,94,0.1)' }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={onClose}
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                background: 'transparent',
                                                border: '1px solid rgba(34,197,94,0.4)',
                                                borderRadius: '16px',
                                                color: '#22c55e',
                                                fontSize: '0.9rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            Sign In Now
                                            <CheckCircle2 size={16} />
                                        </motion.button>
                                    </div>
                                </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SuccessDialog;
