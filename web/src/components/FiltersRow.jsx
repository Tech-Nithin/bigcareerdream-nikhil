import { X, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const FiltersRow = ({ jobDomains = [], selectedDomain, onDomainSelect }) => {
    const hasFilters = selectedDomain !== null && selectedDomain !== undefined;

    return (
        <div
            className="border-b px-4 py-2 theme-transition"
            style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
            }}
        >
            <div className="flex items-center gap-3">
                {/* Filter icon label */}
                <div className="flex items-center gap-1.5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-xs font-semibold">Domain</span>
                </div>

                {/* Scrollable chip row */}
                <div className="flex items-center gap-2 overflow-x-auto flex-1 scrollbar-none -mx-1 px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {jobDomains.length === 0 ? (
                        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            No domain filters available
                        </span>
                    ) : (
                        jobDomains.map((domain, idx) => {
                            const active = selectedDomain === domain;
                            return (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => onDomainSelect?.(domain)}
                                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border min-h-touch"
                                    style={{
                                        backgroundColor: active ? 'var(--color-primary)' : 'var(--color-surface-2)',
                                        color: active ? 'var(--color-primary-foreground)' : 'var(--color-text-secondary)',
                                        borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                                    }}
                                    aria-pressed={active}
                                >
                                    {domain}
                                    {active && <X className="w-3 h-3" />}
                                </motion.button>
                            );
                        })
                    )}
                </div>

                {/* Clear all — shown only when filter is active */}
                {hasFilters && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => onDomainSelect?.(null)}
                        className="flex-shrink-0 text-xs font-medium transition-all hover:opacity-70 min-h-touch flex items-center px-2"
                        style={{ color: 'var(--color-primary)' }}
                    >
                        Clear
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default FiltersRow;
