import React, { useRef, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ChevronRight } from 'lucide-react';
import api from '../../utils/api';

const PaymentOTP = () => {
    const navigate = useNavigate();
    const { 
        formData, 
        otpState, 
        setOtpState, 
        leadId, 
        plan,
        selectedCountry,
        showToast 
    } = useOutletContext();

    const firstOtpInputRef = useRef(null);

    // Redirect back to personal details if formData is empty (page refresh)
    useEffect(() => {
        if (!formData.email) {
            navigate('/investment', { replace: true });
        }
    }, [formData.email, navigate]);

    const handleVerifyOtp = async () => {
        if (otpState.value.length !== 6) return;

        setOtpState(prev => ({ ...prev, isVerifying: true, error: '' }));
        try {
            console.log('%c[Journey] Step 2: Verifying OTP...', 'color: #3b82f6;', { email: formData.email, leadId });
            const data = await api.post('/auth/verify-otp', {
                email: formData.email,
                otp: otpState.value,
                leadId: leadId
            });
            console.log('%c[Journey] OTP Verified successfully!', 'color: #10b981;');
            setOtpState(prev => ({ ...prev, isVerified: true, isVerifying: false, error: '' }));
            
            // Navigate to the verified screen which handles the auto-forward
            navigate('/investment/verified');
        } catch (err) {
            setOtpState(prev => ({ ...prev, error: err.message || 'Verification failed. Please try again.', isVerifying: false }));
        }
    };

    const handleResend = async () => {
        if (otpState.resendTimer > 0) return;
        setOtpState(prev => ({ ...prev, isVerifying: true, error: '' }));
        try {
            await api.post('/auth/generate-otp', {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                middleName: formData.middleName,
                phone: formData.phone,
                planName: plan.name,
                price: plan.price,
                country: selectedCountry.name,
                countryCode: selectedCountry.code
            });
            
            setOtpState(prev => ({
                ...prev,
                isVerifying: false,
                resendTimer: 300 // 5 minutes
            }));
            showToast(`New OTP sent to ${formData.email}`);
        } catch (err) {
            setOtpState(prev => ({ ...prev, error: err.message || 'Failed to send OTP', isVerifying: false }));
        }
    };

    if (!formData.email) return null; // Wait for redirect

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ textAlign: 'center' }}
        >
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(249,115,22,0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Mail size={32} />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px' }}>Verify Email</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '1rem', lineHeight: 1.5 }}>
                We've sent a 6-digit verification code to <br />
                <span style={{ color: '#fff', fontWeight: 700 }}>{formData.email}</span>
            </p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
                {[...Array(6)].map((_, i) => (
                    <input
                        key={i}
                        ref={i === 0 ? firstOtpInputRef : null}
                        type="text"
                        maxLength="1"
                        value={otpState.value[i] || ''}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const newOtp = otpState.value.split('');
                            if (val) {
                                newOtp[i] = val.slice(-1);
                                setOtpState(prev => ({ ...prev, value: newOtp.join('').slice(0, 6), error: '' }));
                                if (i < 5) e.target.nextSibling?.focus();
                            } else {
                                newOtp[i] = '';
                                setOtpState(prev => ({ ...prev, value: newOtp.join(''), error: '' }));
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Backspace') {
                                if (!otpState.value[i] && i > 0) {
                                    const newOtp = otpState.value.split('');
                                    newOtp[i - 1] = '';
                                    setOtpState(prev => ({ ...prev, value: newOtp.join(''), error: '' }));
                                    e.target.previousSibling?.focus();
                                }
                            }
                        }}
                        onPaste={(e) => {
                            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                            if (pastedData.length === 6) {
                                setOtpState(prev => ({ ...prev, value: pastedData, error: '' }));
                            }
                        }}
                        style={{
                            width: '50px',
                            height: '60px',
                            background: 'rgba(255,255,255,0.03)',
                            border: `2px solid ${otpState.error ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '12px',
                            fontSize: '1.5rem',
                            fontWeight: 800,
                            color: '#fff',
                            textAlign: 'center',
                            outline: 'none',
                            transition: 'all 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = '#f97316'}
                        onBlur={e => e.target.style.borderColor = otpState.error ? '#ef4444' : 'rgba(255,255,255,0.1)'}
                    />
                ))}
            </div>

            {otpState.error && (
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 600 }}>{otpState.error}</p>
                    <button 
                        onClick={() => {
                            setOtpState(prev => ({ ...prev, value: '', error: '' }));
                            setTimeout(() => firstOtpInputRef.current?.focus(), 10);
                        }}
                        style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Clear All
                    </button>
                </div>
            )}

            <button
                onClick={handleVerifyOtp}
                disabled={otpState.value.length !== 6 || otpState.isVerifying}
                style={{
                    width: '100%',
                    padding: '16px',
                    background: otpState.value.length === 6 ? '#f97316' : 'rgba(255,255,255,0.05)',
                    color: otpState.value.length === 6 ? '#fff' : 'rgba(255,255,255,0.2)',
                    borderRadius: '16px',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    cursor: otpState.value.length === 6 ? 'pointer' : 'not-allowed',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s'
                }}
            >
                {otpState.isVerifying ? 'Verifying...' : 'Verify & Continue'}
                {!otpState.isVerifying && <ChevronRight size={20} />}
            </button>

            <button
                onClick={handleResend}
                disabled={otpState.resendTimer > 0}
                style={{
                    marginTop: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: otpState.resendTimer > 0 ? 'rgba(255,255,255,0.2)' : '#f97316',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: otpState.resendTimer > 0 ? 'default' : 'pointer',
                    display: 'block',
                    margin: '10px auto'
                }}
            >
                {otpState.resendTimer > 0 
                    ? `Resend OTP in ${Math.floor(otpState.resendTimer / 60)}:${(otpState.resendTimer % 60).toString().padStart(2, '0')}` 
                    : 'Resend OTP'}
            </button>

            <button
                onClick={() => navigate('/investment', { replace: true })}
                style={{
                    marginTop: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
            >
                Cancel and Edit Details
            </button>
        </motion.div>
    );
};

export default PaymentOTP;
