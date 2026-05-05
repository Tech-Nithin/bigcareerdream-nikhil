import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText } from 'lucide-react';

const TermsDialog = ({ isOpen, onClose, planName }) => {
    const isStarter = planName === 'Starter';

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            background: '#1a1a1a',
                            width: '100%',
                            maxWidth: '600px',
                            maxHeight: '80vh',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '32px',
                            position: 'relative',
                            overflowY: 'auto',
                            color: '#fff',
                            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255,255,255,0.05)',
                                border: 'none',
                                color: 'rgba(255,255,255,0.4)',
                                padding: '8px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(249,115,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316' }}>
                                <FileText size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Terms & Conditions</h3>
                        </div>

                        <div style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
                            <section style={{ marginBottom: '24px' }}>
                                <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ShieldCheck size={18} color="#22c55e" /> {planName} Plan Agreement
                                </h4>
                                {isStarter ? (
                                    <div style={{ background: 'rgba(249,115,22,0.05)', borderLeft: '4px solid #f97316', padding: '16px', borderRadius: '4px' }}>
                                        <p style={{ margin: 0, fontWeight: 600, color: '#fff' }}>Important Notice:</p>
                                        <p style={{ margin: '8px 0 0' }}>
                                            By subscribing to the Starter plan ($19.99), you acknowledge that our service provides <strong>unlimited direct job links only</strong>. We do not apply for jobs on your behalf.
                                        </p>
                                    </div>
                                ) : (
                                    <p>
                                        By subscribing to the {planName} plan, you gain access to our advanced career acceleration tools, personalized support, and premium job matching algorithms.
                                    </p>
                                )}
                            </section>

                            <section style={{ marginBottom: '24px' }}>
                                <h5 style={{ color: '#fff', fontWeight: 700, marginBottom: '8px' }}>1. Scope of Service</h5>
                                <p>We provide a platform to discover and access job opportunities. While we strive for accuracy, the final application process and employment decisions rest with the respective employers.</p>
                            </section>

                            <section style={{ marginBottom: '24px' }}>
                                <h5 style={{ color: '#fff', fontWeight: 700, marginBottom: '8px' }}>2. Subscription & Payments</h5>
                                <p>All payments are processed securely via PayPal. Your subscription term begins immediately upon successful payment. You can cancel at any time, but partial periods are non-refundable.</p>
                            </section>

                            <section>
                                <h5 style={{ color: '#fff', fontWeight: 700, marginBottom: '8px' }}>3. User Responsibility</h5>
                                <p>Users are responsible for the information they provide during registration. We maintain strict privacy standards but do not guarantee employment results.</p>
                            </section>
                        </div>

                        <button
                            onClick={onClose}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: '#f97316',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 700,
                                marginTop: '32px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            I Understand & Accept
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TermsDialog;
