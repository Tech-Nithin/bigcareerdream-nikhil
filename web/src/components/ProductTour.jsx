import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';

const TOUR_STEPS = [
    {
        id: 'tour-logo',
        title: 'Welcome to Your Career Command Center',
        content: 'This is your starting point. Our platform consolidates the world\'s best tech opportunities into one sleek, unified interface.',
        position: 'bottom'
    },
    {
        id: 'tour-theme',
        title: 'UI Personalization',
        content: 'Switch between Dark and Light modes or choose different accent colors to make your workspace comfortable for long sessions.',
        position: 'bottom-right'
    },
    {
        id: 'tour-core-nav',
        title: 'The Central Hub',
        content: 'Your primary dashboard area. Switch between exploring new jobs, tracking saves, and managing active applications.',
        position: 'right'
    },
    {
        id: 'tour-jobs',
        title: 'Live Job Market',
        content: 'Browse through hundreds of real-time job openings from top companies. Filter by domain to find roles that match your stack.',
        position: 'right'
    },
    {
        id: 'tour-saved',
        title: 'Your Bookmarked Opportunities',
        content: 'Found a dream role? Bookmark it. Your saves stay persistent across sessions so you never lose a promising lead.',
        position: 'right'
    },
    {
        id: 'tour-applied',
        title: 'Application History (Tracking by Date)',
        content: 'This is your career diary. We automatically organize your history by date so you can monitor your outreach effectively.',
        position: 'right'
    },
    {
        id: 'tour-help',
        title: 'Support, Feedback & Tour Restart',
        content: 'Mastered the platform? If you ever need help or want to re-run this tour, use this curved modal to reach our support team.',
        position: 'right'
    }
];

const ProductTour = () => {
    const [currentStep, setCurrentStep] = useState(-1);
    const [spotlightRect, setSpotlightRect] = useState(null);

    const startTour = () => {
        const hasCompleted = localStorage.getItem('user_completed_tour');
        if (!hasCompleted) {
            // Add a small delay to ensure DOM is fully rendered
            setTimeout(() => {
                setCurrentStep(0);
            }, 1000);
        }
    };

    const nextStep = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            completeTour();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const skipTour = () => {
        completeTour();
    };

    const completeTour = () => {
        setCurrentStep(-1);
        localStorage.setItem('user_completed_tour', 'true');
    };

    const updateSpotlight = useCallback(() => {
        if (currentStep === -1) return;
        const targetId = TOUR_STEPS[currentStep].id;
        const element = document.getElementById(targetId);

        if (element) {
            const rect = element.getBoundingClientRect();
            // If element is not visible (height/width 0), try next
            if (rect.width === 0 || rect.height === 0) {
                nextStep();
                return;
            }
            setSpotlightRect({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
            // Scroll into view if needed
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // If element not found, skip to next step
            console.warn(`Tour target #${targetId} not found, skipping...`);
            if (currentStep < TOUR_STEPS.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                completeTour();
            }
        }
    }, [currentStep]);

    useEffect(() => {
        const handleTrigger = () => {
            localStorage.removeItem('user_completed_tour');
            setCurrentStep(0);
        };
        window.addEventListener('trigger-product-tour', handleTrigger);

        startTour();
        return () => window.removeEventListener('trigger-product-tour', handleTrigger);
    }, []);

    useEffect(() => {
        updateSpotlight();
        window.addEventListener('resize', updateSpotlight);
        return () => window.removeEventListener('resize', updateSpotlight);
    }, [currentStep, updateSpotlight]);

    if (currentStep === -1 || !spotlightRect) return null;

    const step = TOUR_STEPS[currentStep];

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* Dark Overlay with Spotlight Mask */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/70 pointer-events-auto"
                style={{
                    maskImage: `radial-gradient(circle ${Math.max(spotlightRect.width, spotlightRect.height) / 1.5 + 20}px at ${spotlightRect.left + spotlightRect.width / 2}px ${spotlightRect.top + spotlightRect.height / 2}px, transparent 100%, black 100%)`,
                    WebkitMaskImage: `radial-gradient(circle ${Math.max(spotlightRect.width, spotlightRect.height) / 1.5 + 20}px at ${spotlightRect.left + spotlightRect.width / 2}px ${spotlightRect.top + spotlightRect.height / 2}px, transparent 100%, black 100%)`
                }}
            />

            {/* Glowing Border for Spotlight */}
            <motion.div
                initial={false}
                animate={{
                    top: spotlightRect.top - 8,
                    left: spotlightRect.left - 8,
                    width: spotlightRect.width + 16,
                    height: spotlightRect.height + 16,
                    opacity: 1
                }}
                className="absolute border-2 border-yellow-400 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.5)] z-10"
            />

            {/* Tooltip */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        top: Math.max(16, Math.min(window.innerHeight - 300,
                            step.position.includes('bottom') ? spotlightRect.top + spotlightRect.height + 24 :
                                step.position.includes('top') ? spotlightRect.top - 200 :
                                    spotlightRect.top + spotlightRect.height / 2 - 100
                        )),
                        left: Math.max(16, Math.min(window.innerWidth - 336,
                            step.position.includes('right') ? spotlightRect.left + spotlightRect.width + 24 :
                                step.position.includes('left') ? spotlightRect.left - 344 :
                                    spotlightRect.left + spotlightRect.width / 2 - 160
                        ))
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute w-80 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl pointer-events-auto overflow-hidden text-left"
                >
                    {/* Progress Header */}
                    <div className="bg-[var(--color-surface-2)] p-4 flex items-center justify-between border-b border-[var(--color-border)]">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-yellow-400/10 rounded-lg">
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                            </div>
                            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                                Step {currentStep + 1} of {TOUR_STEPS.length}
                            </span>
                        </div>
                        <button onClick={skipTour} className="text-[10px] font-bold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors uppercase tracking-widest">
                            Skip
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-2 leading-tight">
                            {step.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed opacity-90">
                            {step.content}
                        </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-5 pb-5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                            {currentStep > 0 && (
                                <button
                                    onClick={prevStep}
                                    className="p-2 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-all"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95"
                        >
                            {currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Curved Design Accent */}
                    <div className="absolute top-0 right-0 left-0 h-1 overflow-hidden pointer-events-none">
                        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full opacity-10">
                            <path d="M0,80 C150,150 350,0 500,80 L500,0 L0,0 Z" fill="var(--color-primary)" />
                        </svg>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ProductTour;
