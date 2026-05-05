import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const PortfolioPage = ({ onBack }) => {
    // Array of placeholder portfolio items. You can edit the titles, descriptions, and links here.
    const portfolioItems = [
        {
            id: 1,
            title: "Project Alpha",
            description: "A comprehensive AI-driven analytics dashboard.",
            link: "#",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 2,
            title: "E-Commerce Rebrand",
            description: "Complete overhaul of a top-tier retail platform's user experience.",
            link: "#",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 3,
            title: "Fintech App UI",
            description: "A clean, modern mobile finance application interface.",
            link: "#",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 4,
            title: "Healthcare Portal",
            description: "Patient-centric medical dashboard with secure telemedicine features.",
            link: "#",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 5,
            title: "Real Estate Platform",
            description: "Premium property listing site with virtual tour capabilities.",
            link: "#",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=600"
        },
        {
            id: 6,
            title: "SaaS Landing Page",
            description: "High-converting marketing site for a B2B software company.",
            link: "#",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                minHeight: '100vh',
                backgroundColor: '#0A0A0A',
                color: '#FFFFFF',
                fontFamily: "'Outfit', sans-serif",
                position: 'relative',
                paddingBottom: '80px',
            }}
        >
            {/* Background elements for premium aesthetic */}
            <div className="mesh-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 6%' }}>
                {/* Header */}
                <header style={{ padding: '40px 0', display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={onBack}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            marginRight: '20px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>
                        Our <span style={{ color: 'var(--accent-primary, #FF3B00)' }}>Portfolio</span>
                    </h1>
                </header>

                {/* Portfolio Description */}
                <div style={{ marginBottom: '60px', maxWidth: '600px' }}>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                        Explore our latest projects and success stories. Click on any item below to view the live link.
                    </p>
                </div>

                {/* Portfolio Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '30px'
                }}>
                    {portfolioItems.map((item, index) => (
                        <motion.a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{
                                display: 'block',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                textDecoration: 'none',
                                color: '#FFFFFF',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                position: 'relative',
                                group: 'portfolio-card' // For hover effects if needed
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Image Container */}
                            <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                                }} />
                                {/* External Link Icon overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(10px)',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ExternalLink size={18} color="#FFFFFF" />
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '24px' }}>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: 700,
                                    margin: '0 0 10px 0',
                                    fontFamily: "'Outfit', sans-serif"
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '0.95rem',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    lineHeight: 1.5,
                                    margin: 0
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioPage;
