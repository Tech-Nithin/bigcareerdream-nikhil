import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const fullText = "Big Career Dream";

    // Adaptive Configuration
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const particleCount = isMobile ? 7000 : 14000; // Efficient on mobile, dense on desktop
    const colors = ["#FFFFFF", "#E8E8E8", "#F5F5F5", "#DDDDDD"]; // White tones

    useEffect(() => {
        const fontStyle = "italic 900 110px 'Cormorant Garamond'";

        // Standard fonts loading check
        if (document.fonts) {
            document.fonts.load(fontStyle).then(() => {
                setTimeout(() => setFontsLoaded(true), 250);
            }).catch(() => {
                console.warn("Preloader font failed to load, falling back to system fonts.");
                setFontsLoaded(true);
            });
        } else {
            setTimeout(() => setFontsLoaded(true), 500);
        }
    }, []);

    useEffect(() => {
        if (!fontsLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let animationFrameId;
        let particles = [];

        const handleResize = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            initParticles();
        };

        const getTargetPoints = () => {
            const offscreen = document.createElement('canvas');
            const octx = offscreen.getContext('2d');
            const width = window.innerWidth;
            const height = window.innerHeight;
            offscreen.width = width;
            offscreen.height = height;

            // Single line scaling for "Big Career Dream"
            // Using 9% of width ensures it fits horizontally even on narrow mobile screens
            const fontSize = Math.min(width * 0.09, 110);
            octx.font = `italic 900 ${fontSize}px 'Cormorant Garamond', serif`;
            octx.textAlign = 'center';
            octx.textBaseline = 'middle';
            octx.fillStyle = 'white';

            // Draw full text in a single line as requested
            octx.fillText(fullText, width / 2, height / 2);

            const data = octx.getImageData(0, 0, width, height).data;
            const points = [];
            // Adaptive step calculation based on screen area vs particle count
            const step = Math.max(1, Math.floor(Math.sqrt((width * height) / particleCount) * 0.28));

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    if (data[(y * width + x) * 4 + 3] > 128) {
                        points.push({ x, y });
                    }
                }
            }
            return points;
        };

        class Particle {
            constructor(targetX, targetY) {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.targetX = targetX;
                this.targetY = targetY;

                this.vx = (Math.random() - 0.5) * 6;
                this.vy = (Math.random() - 0.5) * 6;
                this.size = Math.random() * 1.4 + 0.6;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.friction = 0.9;
                // Faster spring on mobile to ensure assembly even if FPS is lower
                const mobileSpringBoost = isMobile ? 0.05 : 0;
                this.springEase = 0.04 + Math.random() * 0.05 + mobileSpringBoost;
                this.randomOffset = Math.random() * 10;
            }

            update(p) {
                if (p < 25) {
                    this.vx += Math.sin(Date.now() * 0.001 + this.randomOffset) * 0.2;
                    this.vy += Math.cos(Date.now() * 0.001 + this.randomOffset) * 0.2;
                    this.vx *= this.friction;
                    this.vy *= this.friction;
                    this.x += this.vx;
                    this.y += this.vy;
                } else {
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    // Stronger force on mobile to compensate for potential frame drops
                    const forceMultiplier = isMobile ? 1.5 : 1;
                    const force = Math.min(0.2, (p - 20) * 0.01) * forceMultiplier;

                    this.vx += dx * this.springEase * force;
                    this.vy += dy * this.springEase * force;

                    const damping = p > 90 ? 0.7 : 0.85;
                    this.vx *= damping;
                    this.vy *= damping;

                    this.x += this.vx;
                    this.y += this.vy;

                    if (p > 98 && Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
                        this.x = this.targetX;
                        this.y = this.targetY;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            const targets = getTargetPoints();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const target = targets[i % targets.length];
                const jitterX = (Math.random() - 0.5) * 0.8;
                const jitterY = (Math.random() - 0.5) * 0.8;
                particles.push(new Particle(target.x + jitterX, target.y + jitterY));
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update(progressRef.current);
                p.draw();
            });
            animationFrameId = requestAnimationFrame(render);
        };

        const progressRef = { current: 0 };
        handleResize();
        window.addEventListener('resize', handleResize);
        render();

        const startTime = Date.now();
        const duration = 5000;

        const progressTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const p = Math.min((elapsed / duration) * 100, 100);
            setProgress(Math.floor(p));
            progressRef.current = p;

            if (p >= 88) setShowLogo(true);

            if (p >= 100) {
                clearInterval(progressTimer);
                setTimeout(() => onComplete?.(), 500);
            }
        }, 16);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            clearInterval(progressTimer);
        };
    }, [fontsLoaded, onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                key="loading-screen"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: '#0A0A0A', // Black background
                    zIndex: 9999,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif"
                }}
            >
                {!fontsLoaded && (
                    <div style={{ position: 'absolute', color: '#FFFFFF', fontWeight: 900 }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            style={{ width: 40, height: 40, border: '4px solid #333333', borderTopColor: '#FFFFFF', borderRadius: '50%' }}
                        />
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 5,
                        opacity: fontsLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease'
                    }}
                />

                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: showLogo ? 1 : 0, scale: showLogo ? 1 : 0.8 }}
                        style={{
                            width: 60,
                            height: 60,
                            background: 'linear-gradient(135deg, #FFFFFF, #CCCCCC)', // White logo
                            borderRadius: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 10px 30px rgba(255, 255, 255, 0.15)',
                            position: 'absolute',
                            top: '30%'
                        }}
                    >
                        <Briefcase size={28} color="#0A0A0A" strokeWidth={2} />
                    </motion.div>

                    <div style={{
                        position: 'absolute',
                        bottom: '10%',
                        width: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        {/* Status elements hidden for high-end minimalist feel */}
                    </div>
                </div>

                {/* Font import removed from here, now handled globally in index.html for better performance */}
            </motion.div>
        </AnimatePresence>
    );
};

export default LoadingScreen;