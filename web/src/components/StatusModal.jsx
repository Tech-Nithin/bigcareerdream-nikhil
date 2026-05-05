import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Rocket, Sparkles } from 'lucide-react';

const StatusModal = ({ isOpen, onClose, type = 'info', title, message }) => {
    const config = {
        success: {
            icon: CheckCircle,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            button: 'bg-emerald-500'
        },
        error: {
            icon: AlertCircle,
            color: 'text-red-500',
            bg: 'bg-red-500/10',
            border: 'border-red-500/20',
            button: 'bg-red-500'
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            button: 'bg-orange-500'
        },
        info: {
            icon: Info,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            button: 'bg-blue-500'
        },
        lock: {
            icon: Sparkles,
            color: 'text-primary',
            bg: 'bg-primary/10',
            border: 'border-primary/20',
            button: 'bg-primary'
        }
    };

    const current = config[type] || config.info;
    const Icon = current.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[201] pointer-events-none p-4"
                    >
                        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] w-full max-w-sm rounded-3xl shadow-2xl pointer-events-auto overflow-hidden relative">
                            {/* Decorative Background Element */}
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 ${current.bg} blur-3xl -z-10 rounded-full`} />

                            <div className="p-8 text-center">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-xl hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Icon */}
                                <div className={`w-20 h-20 ${current.bg} rounded-3xl flex items-center justify-center mx-auto mb-6 border ${current.border} shadow-inner`}>
                                    <Icon className={`w-10 h-10 ${current.color} drop-shadow-sm`} />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-black text-[var(--color-text-primary)] mb-3 tracking-tight">
                                    {title}
                                </h3>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8 font-medium">
                                    {message}
                                </p>

                                {/* Action */}
                                <button
                                    onClick={onClose}
                                    className={`w-full py-4 ${current.button} text-white font-black rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-black/10`}
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StatusModal;
