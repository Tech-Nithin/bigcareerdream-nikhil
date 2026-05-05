import React, { useEffect, useState, useRef } from 'react';
import api from '../utils/api';

const PayPalButton = ({ planName, amount, userInfo, leadId, onSuccess, onError }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isRendering, setIsRendering] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const renderStartedRef = useRef(false);

    useEffect(() => {
        const scriptId = 'paypal-sdk-script';
        
        const checkPaypal = () => {
            if (window.paypal) {
                setIsLoaded(true);
                return true;
            }
            return false;
        };

        if (checkPaypal()) return;

        // Poll for script if it was added by parent
        const interval = setInterval(() => {
            if (checkPaypal()) clearInterval(interval);
        }, 50);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isLoaded && window.paypal && containerRef.current && !renderStartedRef.current) {
            renderStartedRef.current = true;
            setIsRendering(true);
            setError(null);

            const renderButtons = () => {
                try {
                    if (!containerRef.current) {
                        renderStartedRef.current = false;
                        return;
                    }
                    
                    containerRef.current.innerHTML = '';
                    
                    window.paypal.Buttons({
                        onClick: (data, actions) => {
                            if (leadId && userInfo?.email) {
                                console.log('%c[Journey] PayPal button physically clicked!', 'color: #3b82f6;', { leadId });
                                api.post('/auth/update-lead-status', {
                                    leadId: leadId,
                                    email: userInfo.email,
                                    field: 'paypal_clicked',
                                    value: true
                                }).catch(err => console.error("Failed to track paypal_clicked:", err));
                            }
                        },
                        createOrder: async () => {
                            console.log('%c[PayPal] Creating order...', 'color: #f97316;', { planName, amount });
                            try {
                                const data = await api.post('/onboarding/paypal-create-order', { planName, amount });
                                console.log('%c[PayPal] Order Created successfully:', 'color: #10b981;', data.id);
                                return data.id;
                            } catch (err) {
                                console.error('PayPal Order Creation Error:', err);
                                setError(`Order failed: ${err.message}`);
                                if (onError) onError(err);
                                throw err;
                            }
                        },
                        onApprove: async (data, actions) => {
                            console.log('%c[PayPal] Transaction Approved. Capturing order...', 'color: #3b82f6;', data.orderID);
                            try {
                                const captureData = await api.post('/onboarding/paypal-capture-order', { 
                                    orderID: data.orderID,
                                    userInfo,
                                    planName,
                                    amount,
                                    leadId 
                                });
                                console.log('%c[PayPal] Order Captured successfully!', 'color: #10b981;', captureData);
                                if (onSuccess) onSuccess(captureData);
                            } catch (err) {
                                console.error('PayPal Capture Error:', err);
                                setError(`Payment capture failed: ${err.message}`);
                                if (onError) onError(err);
                            }
                        },
                        onError: (err) => {
                            console.error('PayPal SDK Error:', err);
                            setError('PayPal encountered an issue. Please try again.');
                            if (onError) onError(err);
                            renderStartedRef.current = false;
                        },
                        style: {
                            layout: 'vertical',
                            color: 'gold',
                            shape: 'rect',
                            label: 'paypal',
                        }
                    }).render(containerRef.current).then(() => {
                        setIsRendering(false);
                    }).catch(err => {
                        console.error('Render error:', err);
                        renderStartedRef.current = false;
                    });
                } catch (err) {
                    console.error('Critical render error:', err);
                    setError('Unable to display payment buttons.');
                    renderStartedRef.current = false;
                }
            };

            // If we are already loaded, render immediately. Otherwise wait a tiny bit for the DOM.
            const delay = isLoaded ? 0 : 50;
            const timeoutId = setTimeout(renderButtons, delay);
            return () => clearTimeout(timeoutId);
        }
    }, [isLoaded, planName, amount, userInfo, leadId, onSuccess, onError]);

    return (
        <div style={{ position: 'relative', width: '100%', margin: '20px 0' }}>
            {error && (
                <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    border: '1px solid rgba(239, 68, 68, 0.2)', 
                    color: '#ef4444', 
                    padding: '12px', 
                    borderRadius: '12px', 
                    fontSize: '0.85rem', 
                    marginBottom: '16px',
                    textAlign: 'left'
                }}>
                    {error}
                </div>
            )}
            
            <div style={{ position: 'relative', minHeight: '150px', width: '100%' }}>
                {isRendering && (
                    <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '12px',
                        zIndex: 1
                    }}>
                        <div style={{ height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', animation: 'paypalPulse 1.5s infinite ease-in-out' }} />
                        <div style={{ height: '48px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', animation: 'paypalPulse 1.5s infinite ease-in-out', animationDelay: '0.2s' }} />
                        
                        <style>{`
                            @keyframes paypalPulse {
                                0% { opacity: 0.3; }
                                50% { opacity: 0.6; }
                                100% { opacity: 0.3; }
                            }
                        `}</style>
                    </div>
                )}
                
                <div 
                    ref={containerRef}
                    style={{ 
                        position: 'relative',
                        opacity: isRendering ? 0 : 1,
                        transition: 'opacity 0.4s ease',
                        zIndex: 2,
                        width: '100%'
                    }} 
                />
            </div>
        </div>
    );
};

export default PayPalButton;
