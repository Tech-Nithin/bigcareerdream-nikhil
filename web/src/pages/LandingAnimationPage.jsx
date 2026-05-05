import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { setAnimationSeen } from '../utils/cookieUtils';

const LandingAnimationPage = () => {
    const navigate = useNavigate();

    const handleComplete = () => {
        setAnimationSeen();
        navigate('/home', { replace: true });
    };

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#0A0A0A' }}>
            <LoadingScreen onComplete={handleComplete} />
        </div>
    );
};

export default LandingAnimationPage;
