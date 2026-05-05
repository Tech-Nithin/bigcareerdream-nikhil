import { Calendar, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api';

const DatePicker = ({ selectedDate, onDateSelect }) => {
    const [availableDates, setAvailableDates] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchAvailableDates();
        }
    }, [isOpen]);

    const fetchAvailableDates = async () => {
        try {
            setIsLoading(true);
            const result = await api.getDatasetDates();
            if (result.dates) {
                setAvailableDates(result.dates);
            }
        } catch (error) {
            console.error('Error fetching dates:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return 'All Jobs (Latest)';

        const [day, month, year] = dateStr.split('-');
        const date = new Date(`${year}-${month}-${day}`);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-150"
                style={{
                    backgroundColor: 'var(--color-surface-2)',
                    borderColor: 'var(--color-border)',
                }}
            >
                <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {formatDisplayDate(selectedDate)}
                </span>
                <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--color-text-muted)' }}
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-2 w-56 rounded-xl border shadow-xl z-50 py-1 overflow-hidden"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-border)',
                            }}
                        >
                            <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                                    Select Dataset Date
                                </p>
                            </div>

                            <div className="max-h-64 overflow-y-auto scrollbar-thin">
                                <button
                                    onClick={() => { onDateSelect(null); setIsOpen(false); }}
                                    className={`w-full px-4 py-2 text-left text-sm transition-colors hover:opacity-80 flex items-center justify-between ${!selectedDate ? 'bg-[var(--color-primary-subtle)]' : ''}`}
                                    style={{ color: !selectedDate ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
                                    onMouseEnter={e => !selectedDate ? null : e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'}
                                    onMouseLeave={e => !selectedDate ? null : e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <span>All Jobs (Latest)</span>
                                    {!selectedDate && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />}
                                </button>

                                {availableDates.map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => { onDateSelect(date); setIsOpen(false); }}
                                        className={`w-full px-4 py-2 text-left text-sm transition-colors hover:opacity-80 flex items-center justify-between ${selectedDate === date ? 'bg-[var(--color-primary-subtle)]' : ''}`}
                                        style={{ color: selectedDate === date ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
                                        onMouseEnter={e => selectedDate === date ? null : e.currentTarget.style.backgroundColor = 'var(--color-surface-2)'}
                                        onMouseLeave={e => selectedDate === date ? null : e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <span>{formatDisplayDate(date)}</span>
                                        {selectedDate === date && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />}
                                    </button>
                                ))}

                                {isLoading && <div className="p-3 text-center text-xs text-[var(--color-text-muted)]">Loading dates...</div>}
                                {!isLoading && availableDates.length === 0 && <div className="p-3 text-center text-xs text-[var(--color-text-muted)]">No historical data</div>}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DatePicker;
