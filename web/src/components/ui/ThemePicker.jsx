import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, LIGHT_ACCENTS, DARK_ACCENTS } from '../../context/ThemeContext';

const ThemePicker = () => {
    const { isDark, lightAccent, darkAccent, setLightAccent, setDarkAccent } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="btn-ghost p-2 rounded-lg"
                aria-label="Choose accent color"
                aria-expanded={open}
            >
                <Palette className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 top-full mt-2 w-64 rounded-xl border p-4 shadow-xl z-100"
                        style={{
                            backgroundColor: 'var(--color-surface)',
                            borderColor: 'var(--color-border)',
                        }}
                    >
                        {/* Light mode accents */}
                        <div className="mb-4">
                            <p className="section-label mb-2.5">Light Mode Accent</p>
                            <div className="flex items-center gap-2">
                                {LIGHT_ACCENTS.map(accent => (
                                    <button
                                        key={accent.id}
                                        onClick={() => setLightAccent(accent.id)}
                                        title={accent.label}
                                        className="relative w-9 h-9 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                                        style={{ backgroundColor: accent.color }}
                                        aria-label={`Light ${accent.label}`}
                                    >
                                        {lightAccent === accent.id && (
                                            <Check className="w-4 h-4 text-white drop-shadow" strokeWidth={3} />
                                        )}
                                        {/* Ring for active */}
                                        {lightAccent === accent.id && (
                                            <span
                                                className="absolute inset-0 rounded-full ring-2 ring-offset-2"
                                                style={{
                                                    ringColor: accent.color,
                                                    boxShadow: `0 0 0 2px var(--color-surface), 0 0 0 4px ${accent.color}`,
                                                }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="divider !my-3" />

                        {/* Dark mode accents */}
                        <div>
                            <p className="section-label mb-2.5">Dark Mode Accent</p>
                            <div className="flex items-center gap-2">
                                {DARK_ACCENTS.map(accent => (
                                    <button
                                        key={accent.id}
                                        onClick={() => setDarkAccent(accent.id)}
                                        title={accent.label}
                                        className="relative w-9 h-9 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                                        style={{ backgroundColor: accent.color }}
                                        aria-label={`Dark ${accent.label}`}
                                    >
                                        {darkAccent === accent.id && (
                                            <Check className="w-4 h-4 text-white drop-shadow" strokeWidth={3} />
                                        )}
                                        {darkAccent === accent.id && (
                                            <span
                                                className="absolute inset-0 rounded-full"
                                                style={{
                                                    boxShadow: `0 0 0 2px var(--color-surface), 0 0 0 4px ${accent.color}`,
                                                }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                Your theme preference is saved automatically.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemePicker;
