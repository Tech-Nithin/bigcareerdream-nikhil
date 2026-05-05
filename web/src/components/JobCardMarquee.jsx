




















import React from 'react';
import { Briefcase, Twitter, Linkedin, Facebook, Github, Mail, MapPin, Phone } from 'lucide-react';

// Self-contained SVG components — correct viewBox + complete paths
const BrandIcons = {
    Google: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    ),

    Apple: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.19 1.28-2.17 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="white" />
        </svg>
    ),

    Microsoft: () => (
        <svg viewBox="0 0 23 23" width="100%" height="100%">
            <rect x="1" y="1" width="10" height="10" fill="#F25022" />
            <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
            <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
            <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
        </svg>
    ),

    Amazon: () => (
        <img src="/amazon.png" alt="Amazon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Meta: () => (
        <img src="/meta.png" alt="Meta" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Netflix: () => (
        <img src="/netflix.png" alt="Netflix" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Nvidia: () => (
        <img src="/nvidia_logo.jpg" alt="Nvidia" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Stripe: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.32 2.475-3.296 2.475-5.998 0-4.14-2.467-5.87-6.541-7.039z" fill="white" />
        </svg>
    ),

    Spotify: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <circle cx="12" cy="12" r="12" fill="#1DB954" />
            <path d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25zm-.1 2.8c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm-1.2 2.75c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85z" fill="white" />
        </svg>
    ),

    Uber: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" fill="#000" />
            <path d="M6 7.2h2.4v5.58a2.406 2.406 0 002.4 2.4 2.406 2.406 0 002.4-2.4V7.2H15.6v5.58A4.806 4.806 0 0110.8 17.58 4.806 4.806 0 016 12.78V7.2z" fill="white" />
        </svg>
    ),

    Airbnb: () => (
        <img src="/airbnb.png" alt="Airbnb" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Salesforce: () => (
        <img src="/salesforce.png" alt="Salesforce" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Adobe: () => (
        <img src="/adobe.png" alt="Adobe" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    PayPal: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" fill="white" />
        </svg>
    ),

    GitHub: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="white" />
        </svg>
    ),

    Slack: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.687 8.834a2.528 2.528 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.521-2.521V2.522A2.527 2.527 0 0 1 15.166 0a2.528 2.528 0 0 1 2.521 2.522v6.312zM15.166 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zM15.166 17.687a2.527 2.527 0 0 1-2.521-2.521 2.526 2.526 0 0 1 2.521-2.521h6.312A2.528 2.528 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.521h-6.312z" fill="white" />
        </svg>
    ),

    Figma: () => (
        <svg viewBox="0 0 38 57" width="100%" height="100%">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
            <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
        </svg>
    ),

    Notion: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z" fill="#000" />
        </svg>
    ),

    Zoom: () => (
        <img src="/zoom.png" alt="Zoom" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Shopify: () => (
        <img src="/shopify-removebg-preview.png" alt="Shopify" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),

    Coinbase: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 5.455c3.62 0 6.837 2.053 8.37 5.09H3.63C5.163 7.508 8.38 5.455 12 5.455zm0 13.09c-3.62 0-6.837-2.053-8.37-5.09h16.74c-1.533 3.037-4.75 5.09-8.37 5.09z" fill="white" />
        </svg>
    ),

    HubSpot: () => (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path d="M22.462 11.268l-3.64-2.108V6.42a2.069 2.069 0 1 0-2.069 0v2.678l-4.098 2.37a2.069 2.069 0 1 0 1.034 1.79l4.064-2.35 3.646 2.112a2.069 2.069 0 1 0 1.063-1.752zm-8.996 4.32a5.88 5.88 0 1 1-5.88-5.88 5.88 5.88 0 0 1 5.88 5.88zm-5.88-3.77a3.77 3.77 0 1 0 0 7.54 3.77 3.77 0 0 0 0-7.54z" fill="white" />
        </svg>
    ),

    Cloudflare: () => (
        <img src="/cloudeflare1.png" alt="Cloudflare" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),
    Tesla: () => (
        <img src="/tesla.jpg" alt="Tesla" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),
    SpaceX: () => (
        <img src="/spacex.jpg" alt="SpaceX" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),
    Discord: () => (
        <img src="/discord.png" alt="Discord" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),
    Pinterest: () => (
        <img src="/Pinterest.webp" alt="Pinterest" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),
    Instagram: () => (
        <img src="/instagram.jpeg" alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),
    YouTube: () => (
        <img src="/youtube.png" alt="YouTube" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    ),
};

const row1 = [
    { name: 'Google', bg: '#ffffff', shadowColor: 'rgba(66,133,244,0.3)' },
    { name: 'Apple', bg: '#000000', shadowColor: 'rgba(255,255,255,0.1)' },
    { name: 'Microsoft', bg: '#ffffff', shadowColor: 'rgba(0,120,212,0.3)' },
    { name: 'Amazon', bg: '#ffffff', shadowColor: 'rgba(0,0,0,0.1)' },
    { name: 'Meta', bg: '#ffffff', shadowColor: 'rgba(0,0,0,0.1)' },
    { name: 'Netflix', bg: '#141414', shadowColor: 'rgba(229,9,20,0.4)' },
    { name: 'Nvidia', bg: '#76b900', shadowColor: 'rgba(118,185,0,0.5)' },
    { name: 'GitHub', bg: '#181717', shadowColor: 'rgba(255,255,255,0.1)' },
    { name: 'Tesla', bg: '#ffffff', shadowColor: 'rgba(0,0,0,0.1)' },
    { name: 'SpaceX', bg: '#000000', shadowColor: 'rgba(255,255,255,0.1)' },
];

const row2 = [
    { name: 'Stripe', bg: '#635BFF', shadowColor: 'rgba(99,91,255,0.5)' },
    { name: 'Spotify', bg: '#1DB954', shadowColor: 'rgba(29,185,84,0.5)' },
    { name: 'Uber', bg: '#000000', shadowColor: 'rgba(255,255,255,0.1)' },
    { name: 'Airbnb', bg: '#000000', shadowColor: 'rgba(255,255,255,0.1)' },
    { name: 'Salesforce', bg: '#ffffff', shadowColor: 'rgba(0,0,0,0.1)' },
    { name: 'Adobe', bg: '#FA0F00', shadowColor: 'rgba(250,15,0,0.4)' },
    { name: 'PayPal', bg: '#003087', shadowColor: 'rgba(0,48,135,0.5)' },
    { name: 'Shopify', bg: '#5E8E3E', shadowColor: 'rgba(94,142,62,0.5)' },
    { name: 'Discord', bg: '#5865F2', shadowColor: 'rgba(88,101,242,0.4)' },
    { name: 'Pinterest', bg: '#ffffff', shadowColor: 'rgba(0,0,0,0.1)' },
];

const row3 = [
    { name: 'Slack', bg: '#4A154B', shadowColor: 'rgba(74,21,75,0.5)' },
    { name: 'Figma', bg: '#1E1E1E', shadowColor: 'rgba(162,89,255,0.3)' },
    { name: 'Notion', bg: '#ffffff', shadowColor: 'rgba(0,0,0,0.2)' },
    { name: 'Zoom', bg: '#2D8CFF', shadowColor: 'rgba(45,140,255,0.5)' },
    { name: 'Cloudflare', bg: '#000000', shadowColor: 'rgba(255,255,255,0.1)' },
    { name: 'Coinbase', bg: '#0052FF', shadowColor: 'rgba(0,82,255,0.5)' },
    { name: 'HubSpot', bg: '#FF7A59', shadowColor: 'rgba(255,122,89,0.5)' },
    { name: 'Stripe', bg: '#635BFF', shadowColor: 'rgba(99,91,255,0.5)' },
    { name: 'Instagram', bg: '#ffffff', shadowColor: 'rgba(0,0,0,0.1)' },
    { name: 'YouTube', bg: '#000000', shadowColor: 'rgba(255,255,255,0.1)' },
];

const CARD_W = 120;
const CARD_H = 172;
const CARD_RADIUS = 24;
const CARD_GAP = 12;

const CompanyCard = ({ item, stagger, isOdd }) => {
    const IconComp = BrandIcons[item.name];
    const yShift = stagger && isOdd ? '22px' : '0px';

    return (
        <div
            style={{
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                minWidth: `${CARD_W}px`,
                borderRadius: `${CARD_RADIUS}px`,
                background: item.bg,
                border: '1.5px solid rgba(255,255,255,0.12)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: `0 ${CARD_GAP / 2}px`,
                flexShrink: 0,
                boxShadow: `0 8px 30px ${item.shadowColor || 'rgba(0,0,0,0.25)'}`,
                position: 'relative',
                overflow: 'hidden',
                transform: `translateY(${yShift})`,
                transition: 'transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s ease',
                cursor: 'default',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = stagger && isOdd ? 'translateY(10px) scale(1.08)' : 'translateY(-10px) scale(1.08)';
                e.currentTarget.style.boxShadow = `0 28px 60px ${item.shadowColor || 'rgba(0,0,0,0.4)'}`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = `translateY(${yShift})`;
                e.currentTarget.style.boxShadow = `0 8px 30px ${item.shadowColor || 'rgba(0,0,0,0.25)'}`;
            }}
        >
            {/* Icon fills most of the card */}
            <div style={{
                width: '80%',
                height: '74%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '4px',
            }}>
                {IconComp ? <IconComp /> : null}
            </div>

            {/* Bottom gradient + name */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '22px 6px 10px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.65) 0%, transparent 100%)',
                borderRadius: `0 0 ${CARD_RADIUS}px ${CARD_RADIUS}px`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <span style={{
                    fontSize: '0.6rem', fontWeight: 800,
                    color: 'rgba(255,255,255,0.95)',
                    letterSpacing: '0.8px', textTransform: 'uppercase',
                    textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                }}>
                    {item.name}
                </span>
            </div>
        </div>
    );
};

const MarqueeRow = ({ items, direction = 'left', speed = 38, stagger = false }) => {
    const animName = direction === 'left' ? 'tkMarqueeL' : 'tkMarqueeR';
    const tripled = [...items, ...items, ...items];

    return (
        <div style={{
            width: '100%', overflow: 'hidden', position: 'relative',
            height: `${CARD_H + 56}px`, display: 'flex', alignItems: 'center',
        }}>
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(90deg, #000000 0%, transparent 10%, transparent 90%, #000000 100%)',
            }} />
            <div style={{
                display: 'flex',
                animation: `${animName} ${speed}s linear infinite`,
                width: 'max-content',
                alignItems: 'center',
            }}>
                {tripled.map((item, i) => (
                    <CompanyCard key={i} item={item} stagger={stagger} isOdd={i % 2 === 1} />
                ))}
            </div>
        </div>
    );
};

const JobCardMarquee = () => (
    <footer style={{ background: '#000000', padding: '100px 0 40px', borderTop: '1px solid var(--ink-700)' }}>
        <style>{`
      @keyframes tkMarqueeL {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-33.333%); }
      }
      @keyframes tkMarqueeR {
        0%   { transform: translateX(-33.333%); }
        100% { transform: translateX(0); }
      }
    `}</style>

        <div className="container">
            <div style={{ marginBottom: '80px' }}>
                <p style={{
                    textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-faint)',
                    letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '40px',
                    fontFamily: "'Outfit', sans-serif"
                }}>
                    Trusted by talent from world-class teams
                </p>

                <MarqueeRow items={row1} direction="left" speed={36} stagger={false} />
                <div style={{ marginTop: '-14px' }}>
                    <MarqueeRow items={row2} direction="right" speed={44} stagger={true} />
                </div>
                <div style={{ marginTop: '-14px' }}>
                    <MarqueeRow items={row3} direction="left" speed={40} stagger={false} />
                </div>
            </div>

            {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '80px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '10px',
                            background: 'var(--accent-primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(232,69,26,0.2)',
                        }}>
                            <Briefcase size={22} color="#FFF" />
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.8px', fontFamily: "'Outfit', sans-serif" }}>
                            Next<span style={{ color: 'var(--accent-primary)' }}>Hire</span>
                        </span>
                    </a>
                    <p style={{ color: 'var(--sand-300)', lineHeight: 1.7, fontSize: '0.95rem', maxWidth: '300px', marginBottom: '32px' }}>
                        Accelerating tech careers through curated opportunities and premium professional branding services.
                    </p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {[Twitter, Linkedin, Facebook, Github].map((Icon, i) => (
                            <a key={i} href="#" style={{
                                width: '38px', height: '38px', borderRadius: '50%',
                                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--text-faint)', transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'var(--text-faint)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: '24px', fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>Services</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {['Job Search', 'Resume Building', 'Portfolio Sites', 'GitHub Review'].map(link => (
                            <li key={link}>
                                <a href="#" style={{ color: 'var(--sand-300)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--sand-300)'}>
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: '#FFFFFF', fontWeight: 800, marginBottom: '24px', fontSize: '1rem', fontFamily: "'Outfit', sans-serif" }}>Contact</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <li style={{ color: 'var(--sand-300)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> support@NextHire.jobs</li>
                        <li style={{ color: 'var(--sand-300)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> +1 (555) 000-0000</li>
                        <li style={{ color: 'var(--sand-300)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> San Francisco, CA</li>
                    </ul>
                </div>
            </div> */}
            {/* 
            <div style={{
                paddingTop: '32px', borderTop: '1px solid var(--ink-700)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px',
            }}>
                <p style={{ color: 'var(--text-faint)', fontSize: '0.85rem' }}>© 2024 NextHire Jobs. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '24px' }}>
                    <a href="#" style={{ color: 'var(--text-faint)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</a>
                    <a href="#" style={{ color: 'var(--text-faint)', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</a>
                </div>
            </div> */}
        </div>
    </footer>
);

export default JobCardMarquee;
