import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import PayPalButton from '../PayPalButton';
import SuccessDialog from '../SuccessDialog';

const PaymentCheckout = () => {
    const navigate = useNavigate();
    const { 
        plan, 
        formData, 
        leadId, 
        selectedCountry, 
        showToast,
        onPaymentSuccess // Passed from layout to handle the final callback
    } = useOutletContext();
    
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [successData, setSuccessData] = useState(null);

    // Boot if no plan or no email (i.e. skipped steps)
    useEffect(() => {
        if (!plan || !formData.email) {
            navigate('/investment', { replace: true });
        }
    }, [plan, formData.email, navigate]);

    if (!plan || !formData.email) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{ position: 'relative', textAlign: 'center' }}
        >
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', color: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <CheckCircle2 size={32} />
            </div>
            <h3 className="mobile-h3" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>Secure Checkout</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px' }}>
                Select your payment method to complete the order for <span style={{ color: '#fff', fontWeight: 700 }}>{plan.name}</span>.
            </p>

            <div style={{ minHeight: '150px', position: 'relative' }}>
                <PayPalButton
                    planName={plan.name}
                    amount={plan.price}
                    leadId={leadId}
                    userInfo={{ ...formData, phone: `${selectedCountry.dial}${formData.phone}` }}
                    onSuccess={async (data) => {
                        setSuccessData(data);
                        setIsSuccessOpen(true);
                        showToast("Sign in credentials are sent to your mail!");
                    }}
                    onError={(err) => {
                        console.error('Payment Error:', err);
                    }}
                />
            </div>

            <SuccessDialog
                isOpen={isSuccessOpen}
                onClose={() => {
                    if (onPaymentSuccess) onPaymentSuccess();
                    else navigate('/signin', { replace: true });
                }}
                planName={plan.name}
                amount={plan.price}
                orderId={successData?.id || successData?.orderID}
            />
        </motion.div>
    );
};

export default PaymentCheckout;
