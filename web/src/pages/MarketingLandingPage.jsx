import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import JobTypeMarquee from '../components/JobTypeMarquee';
import StackedCards from '../components/StackedCards';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import EmailCapture from '../components/EmailCapture';
import JobCardMarquee from '../components/JobCardMarquee';
import Footer from '../components/Footer';
import SignIn from '../components/SignIn';

import PortfolioPage from '../components/PortfolioPage';
import WhatsAppButton from '../components/WhatsAppButton';
import { setPersistentData, hasSeenAnimation } from '../utils/cookieUtils';

import '../marketing.css';

function MarketingLandingPage() {
    const navigate = useNavigate();
    const [showPortfolio, setShowPortfolio] = useState(false);

    useEffect(() => {
        // Redirection logic if animation hasn't been seen
        if (!hasSeenAnimation() && window.location.pathname === '/home') {
            // Optional: navigate('/') if you want to force animation
        }
    }, []);

    const handleStartPlan = (plan) => {
        // Store selected plan in cookies
        setPersistentData('selectedPlan', plan);
        // Navigate to dedicated route
        navigate('/investment');
    };

    return (
        <div className="marketing-page">
            <ReactLenis root>
                <motion.div
                    key="main-app"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative' }}
                >
                    <AnimatePresence mode="wait">
                        {showPortfolio ? (
                            <PortfolioPage
                                key="portfolio"
                                onBack={() => setShowPortfolio(false)}
                            />
                        ) : (
                            <motion.div
                                key="landing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ position: 'relative' }}
                            >
                                <div className="mesh-bg" />
                                <Navbar />
                                <main>
                                    <Hero />
                                    <StackedCards />
                                    <About />
                                    <JobTypeMarquee />
                                    <HowItWorks />
                                    <JobCardMarquee />
                                    <Pricing onStartPlan={handleStartPlan} />
                                    <Testimonials />
                                    <EmailCapture />
                                    <Footer onPortfolioClick={() => setShowPortfolio(true)} />
                                </main>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <WhatsAppButton />
                </motion.div>
            </ReactLenis>
        </div>
    );
}

export default MarketingLandingPage;
