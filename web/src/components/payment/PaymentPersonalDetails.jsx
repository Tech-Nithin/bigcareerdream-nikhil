import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronRight, ChevronDown, Search, Check, AlertCircle, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import TermsDialog from '../TermsDialog';

const COUNTRIES = [
    { name: 'United States', code: 'US', dial: '+1' },
    { name: 'United Kingdom', code: 'GB', dial: '+44' },
    { name: 'Canada', code: 'CA', dial: '+1' },
    { name: 'Australia', code: 'AU', dial: '+61' },
    { name: 'Germany', code: 'DE', dial: '+49' },
    { name: 'France', code: 'FR', dial: '+33' },
    { name: 'India', code: 'IN', dial: '+91' },
    { name: 'Japan', code: 'JP', dial: '+81' },
    { name: 'China', code: 'CN', dial: '+86' },
    { name: 'Brazil', code: 'BR', dial: '+55' },
    { name: 'South Africa', code: 'ZA', dial: '+27' },
    { name: 'United Arab Emirates', code: 'AE', dial: '+971' },
    { name: 'Singapore', code: 'SG', dial: '+65' },
    { name: 'Mexico', code: 'MX', dial: '+52' },
    { name: 'Italy', code: 'IT', dial: '+39' },
    { name: 'Spain', code: 'ES', dial: '+34' },
    { name: 'Netherlands', code: 'NL', dial: '+31' },
    { name: 'Sweden', code: 'SE', dial: '+46' },
    { name: 'Switzerland', code: 'CH', dial: '+41' },
    { name: 'Norway', code: 'NO', dial: '+47' },
];

const PaymentPersonalDetails = () => {
    const navigate = useNavigate();
    const {
        plan,
        formData,
        setFormData,
        selectedCountry,
        setSelectedCountry,
        setLeadId,
        setOtpState,
        showToast
    } = useOutletContext();

    const [isValid, setIsValid] = useState(false);
    const [touched, setTouched] = useState({});
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Email Validation State
    const [emailStatus, setEmailStatus] = useState('idle'); // 'idle', 'checking', 'exists', 'new'
    const [emailError, setEmailError] = useState('');

    const validateField = (name, value) => {
        if (!value || (typeof value === 'string' && value.trim() === '')) return false;
        if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (name === 'phone') return value.replace(/\D/g, '').length >= 10;
        if (name === 'termsAccepted') return value === true;
        return true;
    };

    // Real-time Email Check
    useEffect(() => {
        const checkEmailExists = async () => {
            const email = formData.email.trim();
            if (!email) {
                setEmailStatus('idle');
                setEmailError('');
                return;
            }

            if (validateField('email', email)) {
                setEmailStatus('checking');
                setEmailError('');
                try {
                    const response = await api.post('/auth/check-email', { email });
                    if (response.exists) {
                        setEmailStatus('exists');
                        setEmailError('Account already exists with this email.');
                    } else {
                        setEmailStatus('new');
                    }
                } catch (err) {
                    console.error("Email check failed:", err);
                    setEmailStatus('idle');
                }
            } else {
                setEmailStatus('invalid');
                setEmailError('Please enter a valid email address \n(e.g. name@gmail.com)');
            }
        };

        const timer = setTimeout(checkEmailExists, 300);
        return () => clearTimeout(timer);
    }, [formData.email]);

    useEffect(() => {
        const result = emailStatus === 'new' &&
            validateField('phone', formData.phone) &&
            validateField('firstName', formData.firstName) &&
            validateField('lastName', formData.lastName) &&
            formData.termsAccepted;
        setIsValid(result);
    }, [formData, emailStatus]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const isFieldInvalid = (name) => {
        return touched[name] && !validateField(name, formData[name]);
    };

    const handleNext = async (e) => {
        e.preventDefault();
        if (isValid) {
            setIsSubmitting(true);
            try {
                console.log('%c[Journey] Step 1: Requesting OTP...', 'color: #3b82f6;', { email: formData.email, plan: plan.name });
                const response = await api.post('/auth/generate-otp', {
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

                if (response.leadId) {
                    setLeadId(response.leadId);
                }

                setOtpState(prev => ({
                    ...prev,
                    isSent: true,
                    resendTimer: 300 // 5 minutes
                }));
                showToast(`OTP sent to ${formData.email}`);
                navigate('/investment/otp');
            } catch (err) {
                console.error("Failed to generate OTP:", err);
                showToast(err.message || 'Failed to send OTP. Please try again.');
                setIsSubmitting(false);
            }
        }
    };

    const isOtherFieldsDisabled = emailStatus !== 'new';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ position: 'relative' }}
        >
            <h3 className="mobile-h3" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>Personal Information</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '32px' }}>Fill in your details to create your secure account.</p>

            <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* 1. EMAIL FIELD (FIRST) */}
                <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: (emailStatus === 'exists' || emailStatus === 'invalid') ? '#f97316' : 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>
                        Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            style={{
                                width: '100%',
                                padding: '14px',
                                paddingRight: '45px',
                                background: 'rgba(255,255,255,0.03)',
                                border: `1px solid ${(emailStatus === 'exists' || emailStatus === 'invalid') ? '#f97316' : emailStatus === 'new' ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
                                borderRadius: '12px',
                                color: '#fff',
                                transition: 'all 0.3s ease'
                            }}
                        />
                        <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                            {emailStatus === 'checking' && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#f97316', borderRadius: '50%' }}
                                />
                            )}
                            {emailStatus === 'new' && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#22c55e' }}>
                                    <Check size={20} strokeWidth={3} />
                                </motion.div>
                            )}
                            {(emailStatus === 'invalid' || emailStatus === 'exists') && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#f97316' }}>
                                    <AlertCircle size={20} />
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {(emailStatus === 'exists' || emailStatus === 'invalid') && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    marginTop: '12px',
                                    padding: '16px',
                                    background: 'rgba(249,115,22,0.1)',
                                    border: '1px solid rgba(249,115,22,0.2)',
                                    borderRadius: '16px'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <AlertCircle size={16} color="#f97316" />
                                        <span style={{ fontSize: '0.9rem', color: '#f97316', fontWeight: 600 }}>{emailError}</span>
                                    </div>

                                    {emailStatus === 'exists' && (
                                        <button
                                            type="button"
                                            onClick={() => navigate('/signin')}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '12px',
                                                background: '#f97316',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '50px',
                                                fontSize: '0.9rem',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s ease',
                                                boxShadow: '0 4px 15px rgba(249,115,22,0.3)'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <LogIn size={18} /> Sign In to Your Account
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        )}
                        {emailStatus === 'new' && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ fontSize: '0.75rem', color: '#22c55e', marginTop: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                                This email is available for registration.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* OTHER FIELDS (ENABLED ONLY IF NEW USER) */}
                <div style={{ opacity: isOtherFieldsDisabled ? 0.3 : 1, pointerEvents: isOtherFieldsDisabled ? 'none' : 'auto', transition: 'all 0.4s ease' }}>
                    <div className="name-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: isFieldInvalid('firstName') ? '#f97316' : 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>First Name</label>
                            <input required type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${isFieldInvalid('firstName') ? '#f97316' : 'rgba(255,255,255,0.08)'}`, borderRadius: '12px', color: '#fff' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>Middle Name</label>
                            <input type="text" name="middleName" placeholder="M." value={formData.middleName} onChange={handleInputChange} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: isFieldInvalid('lastName') ? '#f97316' : 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>Last Name</label>
                        <input required type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${isFieldInvalid('lastName') ? '#f97316' : 'rgba(255,255,255,0.08)'}`, borderRadius: '12px', color: '#fff' }} />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: isFieldInvalid('phone') ? '#f97316' : 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase' }}>Phone Number</label>
                        <div style={{ position: 'relative', zIndex: isCountryOpen ? 50 : 1 }}>
                            <div
                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                                style={{
                                    position: 'absolute',
                                    left: '8px',
                                    top: '8px',
                                    bottom: '8px',
                                    width: '100px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s',
                                    zIndex: 3
                                }}
                            >
                                <img
                                    src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                                    alt={selectedCountry.name}
                                    style={{ width: '20px', height: 'auto', borderRadius: '2px' }}
                                />
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f97316' }}>{selectedCountry.dial}</span>
                                <ChevronDown size={14} color="rgba(255,255,255,0.3)" />
                            </div>

                            <input
                                required
                                type="tel"
                                name="phone"
                                placeholder="(555) 000-0000"
                                value={formData.phone}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                style={{
                                    width: '100%',
                                    padding: '14px 14px 14px 115px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${isFieldInvalid('phone') ? '#f97316' : 'rgba(255,255,255,0.08)'}`,
                                    borderRadius: '12px',
                                    color: '#fff'
                                }}
                            />

                            <AnimatePresence>
                                {isCountryOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        style={{
                                            position: 'absolute',
                                            top: '60px',
                                            left: 0,
                                            width: '100%',
                                            maxHeight: '300px',
                                            background: '#1a1a1a',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '16px',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                                            zIndex: 10,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                                            <Search size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)' }} />
                                            <input
                                                autoFocus
                                                placeholder="Search country..."
                                                value={countrySearch}
                                                onChange={(e) => setCountrySearch(e.target.value)}
                                                style={{ width: '100%', padding: '10px 10px 10px 40px', background: 'rgba(255,255,255,0.03)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
                                            />
                                        </div>
                                        <div className="country-scroll" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} style={{ overflowY: 'auto', maxHeight: '230px', padding: '8px' }}>
                                            {COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase())).map((c) => (
                                                <div
                                                    key={c.code}
                                                    className={`country-item ${selectedCountry.code === c.code ? 'active' : ''}`}
                                                    style={{ padding: '10px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', background: selectedCountry.code === c.code ? 'rgba(249,115,22,0.1)' : 'transparent' }}
                                                    onClick={() => {
                                                        setSelectedCountry(c);
                                                        setIsCountryOpen(false);
                                                        setCountrySearch('');
                                                    }}
                                                >
                                                    <img
                                                        src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                                                        alt={c.name}
                                                        style={{ width: '24px', height: 'auto', borderRadius: '2px' }}
                                                    />
                                                    <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 500, flex: 1 }}>{c.name}</span>
                                                    <span style={{ fontSize: '0.85rem', color: '#f97316', fontWeight: 700 }}>{c.dial}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                            <input required type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} style={{ width: '20px', height: '20px', accentColor: '#f97316', marginTop: '2px' }} />
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                                I have read and agree to the <button type="button" onClick={() => setIsTermsOpen(true)} style={{ color: '#f97316', background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>Terms and Conditions</button>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        style={{
                            marginTop: '20px',
                            padding: '16px',
                            background: isValid ? '#f97316' : 'rgba(255,255,255,0.05)',
                            color: isValid ? '#fff' : 'rgba(255,255,255,0.2)',
                            borderRadius: '16px',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            cursor: (isValid && !isSubmitting) ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: 'none',
                            boxShadow: isValid ? '0 10px 25px -5px rgba(249,115,22,0.4)' : 'none',
                            opacity: isSubmitting ? 0.8 : 1
                        }}
                    >
                        {isSubmitting ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTopColor: '#fff',
                                        borderRadius: '50%'
                                    }}
                                />
                                Sending OTP...
                            </div>
                        ) : (
                            <>Continue to Payment <ChevronRight size={20} /></>
                        )}
                    </button>
                </div>
            </form>

            <TermsDialog
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
                planName={plan.name}
            />
        </motion.div>
    );
};

export default PaymentPersonalDetails;
