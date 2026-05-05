import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';

const SigninPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: '100vh', background: '#fff' }}>
            <SignIn 
                onBack={() => navigate('/home')}
                onCreateAccount={() => {
                    navigate('/home');
                    // Wait for navigation then scroll
                    setTimeout(() => {
                        const pricingElement = document.getElementById('pricing');
                        if (pricingElement) {
                            pricingElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }}
            />
        </div>
    );
};

export default SigninPage;
