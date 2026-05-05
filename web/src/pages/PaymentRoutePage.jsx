import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Lock, Mail } from 'lucide-react';
import { getPersistentData, setPersistentData } from '../utils/cookieUtils';

const COUNTRIES = [
    { name: 'United States', code: 'US', dial: '+1' },
    { name: 'United Kingdom', code: 'GB', dial: '+44' },
    // Only keeping a few here for the demo, components rely on their local copy or persistent state if required
];

const PaymentRoutePage = () => {
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [leadId, setLeadId] = useState(null);

    // Shared Form State
    const [formData, setFormData] = useState(() => {
        const saved = getPersistentData('paymentFormData');
        return saved || {
            email: '',
            phone: '',
            firstName: '',
            middleName: '',
            lastName: '',
            termsAccepted: false
        };
    });

    const [selectedCountry, setSelectedCountry] = useState(() => {
        const saved = getPersistentData('selectedCountry');
        return saved || { name: 'United States', code: 'US', dial: '+1' };
    });

    // Shared OTP State
    const [otpState, setOtpState] = useState({
        isSent: false,
        value: '',
        isVerifying: false,
        error: '',
        showPopup: false,
        isVerified: false,
        resendTimer: 0,
        toast: { show: false, message: '' }
    });

    // Persist data
    useEffect(() => {
        setPersistentData('paymentFormData', formData);
    }, [formData]);

    useEffect(() => {
        setPersistentData('selectedCountry', selectedCountry);
    }, [selectedCountry]);

    // Resend Timer Countdown globally
    useEffect(() => {
        let timer;
        if (otpState.resendTimer > 0) {
            timer = setInterval(() => {
                setOtpState(prev => ({ ...prev, resendTimer: prev.resendTimer - 1 }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpState.resendTimer]);

    // Load Plan on Mount
    useEffect(() => {
        const savedPlan = getPersistentData('selectedPlan');
        if (savedPlan) {
            setPlan(savedPlan);
        } else {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    // Pre-load PayPal SDK immediately on mount to speed up the final step
    useEffect(() => {
        const scriptId = 'paypal-sdk-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    const showToast = (message) => {
        setOtpState(prev => ({ ...prev, toast: { show: true, message } }));
        setTimeout(() => {
            setOtpState(prev => ({ ...prev, toast: { show: false, message: '' } }));
        }, 3000);
    };

    const handleBack = () => {
        navigate('/home');
    };

    const handleSuccess = () => {
        navigate('/signin');
    };

    if (!plan) return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <p>Loading investment details...</p>
        </div>
    );

    const contextValue = {
        plan, 
        formData, setFormData, 
        selectedCountry, setSelectedCountry,
        otpState, setOtpState,
        leadId, setLeadId,
        showToast,
        onPaymentSuccess: handleSuccess
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="payment-container"
            style={{
                minHeight: '100vh',
                background: '#0a0a0a',
                color: '#fff',
                padding: '40px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflowX: 'hidden'
            }}
        >
            <style>{`
                @media (max-width: 768px) {
                    .payment-container { padding: 20px 16px !important; }
                    .payment-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
                    .mobile-card-padding { padding: 24px !important; }
                    .mobile-form-padding { padding: 32px 24px !important; }
                    .mobile-h2 { font-size: 2rem !important; }
                }
            `}</style>
            {/* Background elements */}
            <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />

            <div style={{ maxWidth: '800px', width: '100%', position: 'relative', zIndex: 1 }}>
                {/* Header/Back Button */}
                <button
                    onClick={handleBack}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        marginBottom: '40px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >
                    <ChevronLeft size={20} /> Back to Pricing
                </button>

                <div className="payment-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: '40px', alignItems: 'start' }}>
                    {/* Left Side: Summary Layout Container */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="mobile-card-padding" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px' }}>
                            <div style={{ color: '#f97316', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Selected Plan</div>
                            <h2 className="mobile-h2" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px' }}>{plan.name}</h2>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 800 }}>${plan.price}</span>
                                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>{plan.period}</span>
                            </div>
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '20px 0' }} />
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
                                {plan.features && plan.features.map((f, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                                        <div style={{ color: '#22c55e' }}>✔</div> {typeof f === 'string' ? f : f.text || 'Premium Access'}
                                    </li>
                                )).slice(0, 5)}
                            </ul>
                        </div>

                        <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.1)', borderRadius: '16px', padding: '20px', display: 'flex', gap: '12px' }}>
                            <Lock size={20} color="#22c55e" style={{ flexShrink: 0 }} />
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                                End-to-end encrypted registration process. Your details are safe and never shared.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Render the Active Sub-Route here */}
                    <div className="mobile-form-padding" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '32px', padding: '40px', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5)' }}>
                        <AnimatePresence mode="wait">
                            <Outlet context={contextValue} />
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Global Toast Notification */}
            <AnimatePresence>
                {otpState.toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        style={{
                            position: 'fixed',
                            bottom: '40px',
                            left: '50%',
                            background: '#1a1a1a',
                            border: '1px solid #f97316',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            zIndex: 10000
                        }}
                    >
                        <Mail size={20} style={{ color: '#f97316' }} />
                        <span style={{ fontWeight: 600 }}>{otpState.toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PaymentRoutePage;
