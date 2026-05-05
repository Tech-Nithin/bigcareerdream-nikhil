import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Accent color definitions
export const LIGHT_ACCENTS = [
    { id: 'green', label: 'Green', color: '#089F25', hex: '#089F25' },
    { id: 'blue', label: 'Blue', color: '#2563EB', hex: '#2563EB' },
    { id: 'pink', label: 'Pink', color: '#EC4899', hex: '#EC4899' },
    { id: 'purple', label: 'Purple', color: '#7C3AED', hex: '#7C3AED' },
    { id: 'orange', label: 'Orange', color: '#EA580C', hex: '#EA580C' },
];

export const DARK_ACCENTS = [
    { id: 'yellow', label: 'Yellow', color: '#EEBA2C', hex: '#EEBA2C' },
    { id: 'cyan', label: 'Cyan', color: '#06B6D4', hex: '#06B6D4' },
    { id: 'purple', label: 'Purple', color: '#A855F7', hex: '#A855F7' },
    { id: 'orange', label: 'Orange', color: '#F97316', hex: '#F97316' },
    { id: 'green', label: 'Green', color: '#22C55E', hex: '#22C55E' },
];

const applyTheme = (isDark, lightAccent, darkAccent) => {
    const html = document.documentElement;

    // Remove all accent classes
    const accentList = ['green', 'blue', 'pink', 'purple', 'orange', 'yellow', 'cyan'];
    accentList.forEach(a => html.classList.remove(`accent-${a}`));

    // Apply dark / light
    if (isDark) {
        html.classList.add('dark');
        html.classList.add(`accent-${darkAccent}`);
    } else {
        html.classList.remove('dark');
        html.classList.add(`accent-${lightAccent}`);
    }
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [lightAccent, setLightAccentState] = useState('green');
    const [darkAccent, setDarkAccentState] = useState('yellow');

    // Init from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('jb-theme');
        const savedLight = localStorage.getItem('jb-light-accent') || 'green';
        const savedDark = localStorage.getItem('jb-dark-accent') || 'yellow';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const dark = savedTheme === 'dark' || (!savedTheme && (prefersDark || true));
        setIsDark(dark);
        setLightAccentState(savedLight);
        setDarkAccentState(savedDark);
        applyTheme(dark, savedLight, savedDark);
    }, []);

    const toggleTheme = () => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('jb-theme', next ? 'dark' : 'light');
            applyTheme(next, lightAccent, darkAccent);
            return next;
        });
    };

    const setLightAccent = (accent) => {
        setLightAccentState(accent);
        localStorage.setItem('jb-light-accent', accent);
        if (!isDark) applyTheme(isDark, accent, darkAccent);
    };

    const setDarkAccent = (accent) => {
        setDarkAccentState(accent);
        localStorage.setItem('jb-dark-accent', accent);
        if (isDark) applyTheme(isDark, lightAccent, accent);
    };

    return (
        <ThemeContext.Provider value={{
            isDark,
            toggleTheme,
            lightAccent,
            darkAccent,
            setLightAccent,
            setDarkAccent,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used inside ThemeProvider');
    return context;
};
