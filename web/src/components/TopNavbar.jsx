import { useState } from 'react';
import { Search, Moon, Sun, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { TieIcon } from './CustomIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemePicker from './ui/ThemePicker';

const TopNavbar = ({ onMenuToggle }) => {
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();
    const [searchFocused, setSearchFocused] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);
    
    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const userEmail = storedUser?.email || 'Guest';
    const userInitial = userEmail.charAt(0).toUpperCase();

    const navItems = [
        { label: 'React', count: 142, path: '/jobs?q=react' },
        { label: 'Node.js', count: 89, path: '/jobs?q=node' },
        { label: 'Design', count: 45, path: '/jobs?q=design' },
        { label: 'Python', count: 120, path: '/jobs?q=python' },
    ];

    const isActive = (path) => location.pathname === path.split('?')[0];

    const marqueeMessages = [
        "🚀 Update your portfolio today to increase visibility by 40%",
        "✨ AI Resume Review feature is live!",
        "💼 500+ new remote jobs added",
        "🌟 Tip: Customized cover letters work 3x better",
        "🔥 Hot: Fintech roles are booming",
        "📈 Trend: React & TypeScript demand is up 25%"
    ];

    return (
        <nav
            className="sticky top-0 z-50 border-b theme-transition"
            style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
            }}
        >
            <div className="flex items-center justify-between px-4 md:px-6 h-16 max-w-[1600px] mx-auto">
                {/* LEFT: Logo + Mobile Toggle */}
                <div className="flex items-center gap-4 w-64 flex-shrink-0">
                    {/* Mobile menu toggle */}
                    <button
                        className="btn-ghost p-2 md:hidden"
                        onClick={onMenuToggle}
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5" id="tour-logo">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                            <TieIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold hidden sm:block" style={{ color: 'var(--color-text-primary)' }}>
                            BigCareerDream
                        </span>
                    </Link>
                </div>

                {/* CENTER: Marquee instead of Search - Maximized scrolling area */}
                <div className="hidden md:flex flex-1 justify-center px-6 max-w-7xl overflow-hidden relative">
                    {/* Fade gradients */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--color-surface)] to-transparent z-10 pointer-events-none" />

                    <div className="flex items-center w-full overflow-hidden">
                        <motion.div
                            className="flex gap-12 whitespace-nowrap"
                            animate={{ x: [0, -1000] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...marqueeMessages, ...marqueeMessages, ...marqueeMessages].map((msg, idx) => (
                                <span
                                    key={idx}
                                    className="text-[13px] font-medium text-[var(--color-text-secondary)] flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] opacity-40"></span>
                                    {msg}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* RIGHT: Icons & User */}
                <div className="flex items-center justify-end gap-2 w-64 flex-shrink-0">
                    {/* Theme picker (accent colors) */}
                    <ThemePicker />

                    {/* Dark / Light toggle */}
                    <motion.button
                        id="tour-theme"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className="btn-ghost p-2 rounded-lg"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark
                            ? <Sun className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                            : <Moon className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
                        }
                    </motion.button>

                    {/* Notifications */}
                    <Link
                        to="/notifications"
                        className="btn-ghost p-2 rounded-lg relative"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5" style={{ color: 'var(--color-text-secondary)' }} />
                        <span
                            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'var(--color-primary)' }}
                        />
                    </Link>



                    {/* Avatar dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setAvatarOpen(o => !o)}
                            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all hover:opacity-80"
                            style={{ backgroundColor: 'var(--color-surface-2)' }}
                            aria-label="Account menu"
                            aria-expanded={avatarOpen}
                        >
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold text-xs"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                {userInitial}
                            </div>
                            <ChevronDown
                                className="w-3.5 h-3.5 transition-transform"
                                style={{
                                    color: 'var(--color-text-muted)',
                                    transform: avatarOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}
                            />
                        </button>

                        <AnimatePresence>
                            {avatarOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-xl z-50 py-1"
                                    style={{
                                        backgroundColor: 'var(--color-surface)',
                                        borderColor: 'var(--color-border)',
                                    }}
                                >
                                    {/* User Info Header */}
                                    <div className="px-4 py-3 border-b mb-1" style={{ borderColor: 'var(--color-border)' }}>
                                        <p className="text-[10px] uppercase tracking-wider font-bold mb-1 opacity-50" style={{ color: 'var(--color-text-primary)' }}>Account</p>
                                        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{userEmail}</p>
                                    </div>
                                    {[
                                        { label: 'My Profile', path: '/profile' },
                                        { label: 'Dashboard', path: '/dashboard/candidate' },
                                        { label: 'Settings', path: '/settings' },
                                        { label: 'Hard Refresh Jobs', onClick: () => { window.dispatchEvent(new Event('hard_refresh_jobs')); setAvatarOpen(false); } },
                                        { label: 'Sign Out', path: '/login', danger: true },
                                    ].map(item => item.path ? (
                                        <Link
                                            key={item.label}
                                            to={item.path}
                                            onClick={() => setAvatarOpen(false)}
                                            className="block px-4 py-2 text-sm transition-colors hover:opacity-80"
                                            style={{
                                                color: item.danger ? 'var(--color-error, #EF4444)' : 'var(--color-text-primary)',
                                                backgroundColor: 'transparent',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <button
                                            key={item.label}
                                            onClick={item.onClick}
                                            className="block w-full text-left px-4 py-2 text-sm transition-colors hover:opacity-80"
                                            style={{
                                                color: 'var(--color-primary)',
                                                backgroundColor: 'transparent',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
