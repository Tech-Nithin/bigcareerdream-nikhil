import { useState } from 'react';
import { X, CheckCircle, Send, MessageSquare, HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api';

const HelpModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('help'); // 'feedback' or 'help'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        category: '',
        customCategory: '',
        description: '',
        rating: null,
        image: null
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Added for shining border animation
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (activeTab === 'feedback') {
                await api.submitFeedback({
                    client_id: formData.name,
                    email: formData.email,
                    category: formData.category,
                    custom_category: formData.customCategory,
                    rating: formData.rating,
                    feedback_description: formData.description,
                    image: formData.image
                });
            } else {
                await api.submitHelpRequest({
                    client_id: formData.name,
                    email: formData.email,
                    category: formData.category,
                    issue_description: formData.description,
                    image: formData.image
                });
            }
            setSubmitted(true);
        } catch (err) {
            console.error('Submission error:', err);
            setError('Failed to submit. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            category: '',
            customCategory: '',
            description: '',
            rating: null,
            image: null
        });
        setSubmitted(false);
    };

    const handleClose = () => {
        onClose();
        // Reset after close animation finishes
        setTimeout(() => {
            resetForm();
            setActiveTab('help');
        }, 300);
    };

    const tabs = [
        { id: 'feedback', label: 'Feedback', icon: MessageSquare },
        { id: 'help', label: 'Help & Support', icon: HelpCircle }
    ];

    const categories = [
        "Color Theme",
        "Grid System",
        "Collapsible Left Panel",
        "Chatbot",
        "Categorized Job",
        "Custom"
    ];

    const ratings = [
        { emoji: '😡', label: 'Terrible' },
        { emoji: '😕', label: 'Poor' },
        { emoji: '😐', label: 'Ok' },
        { emoji: '🙂', label: 'Good' },
        { emoji: '😍', label: 'Amazing' }
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none p-4"
                    >
                        <div
                            className="bg-[var(--color-surface)] border border-[var(--color-border)] w-full max-w-4xl rounded-2xl shadow-2xl pointer-events-auto flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            {/* Header & Curved Tabs */}
                            <div className="relative overflow-hidden bg-[var(--color-surface-2)] flex-shrink-0">
                                {/* SVG Wave Background */}
                                <div className="absolute inset-0 z-0">
                                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
                                        <path d="M0,80 C150,150 350,0 500,80 L500,0 L0,0 Z"
                                            fill="var(--color-surface)"
                                            className="transition-all duration-700 ease-in-out" />
                                        <path d="M0,80 C150,150 350,0 500,80 L500,150 L0,150 Z"
                                            fill="transparent"
                                            stroke="var(--color-border)"
                                            strokeWidth="1"
                                            strokeDasharray="4 4"
                                            opacity="0.3" />
                                    </svg>
                                </div>

                                <div className="relative z-10 flex items-center justify-between p-4 pb-1">
                                    <div className="flex gap-6" role="tablist">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                role="tab"
                                                aria-selected={activeTab === tab.id}
                                                onClick={() => {
                                                    setActiveTab(tab.id);
                                                    setSubmitted(false);
                                                }}
                                                className={`group flex flex-col items-start transition-all duration-300 ${activeTab === tab.id ? 'scale-105' : 'hover:opacity-100'
                                                    }`}
                                            >
                                                <span className={`text-xs font-bold uppercase tracking-widest mb-1 transition-colors ${activeTab === tab.id ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
                                                    }`}>
                                                    {tab.label}
                                                </span>
                                                {activeTab === tab.id && (
                                                    <motion.div
                                                        layoutId="curved-tab-accent"
                                                        className="h-1 w-6 bg-[var(--color-primary)] rounded-full shadow-[0_0_10px_var(--color-primary)]"
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="relative z-10 px-6 pb-3">
                                    <h2 className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">
                                        {activeTab === 'feedback' ? 'User Feedback' : 'Help & Support'}
                                    </h2>
                                    <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 opacity-80">
                                        {activeTab === 'feedback' ? 'Tell us how we can improve our platform.' : "Have a question? We're here to guide you."}
                                    </p>
                                </div>
                            </div>

                            {/* Scrollable Content -> Now Fixed-ish */}
                            <div className="p-5 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="flex flex-col items-center text-center py-8"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                                                {activeTab === 'feedback' ? 'Feedback Submitted!' : 'Help Request Sent!'}
                                            </h3>
                                            <p className="text-[var(--color-text-secondary)] max-w-xs text-sm">
                                                {activeTab === 'feedback'
                                                    ? 'Thank you for your valuable feedback. It helps us build a better experience for you.'
                                                    : 'Your request has been logged. Our support team will respond to you within 24 hours.'}
                                            </p>
                                            <button
                                                onClick={handleClose}
                                                className="mt-6 w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
                                            >
                                                Done
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <div className="flex flex-col gap-4">
                                            {activeTab === 'help' && (
                                                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-[var(--color-primary-subtle)]">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="p-1.5 bg-[var(--color-primary)] rounded-lg">
                                                            <Sparkles className="w-3.5 h-3.5 text-white" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-bold text-[var(--color-text-primary)]">Product Onboarding</h4>
                                                            <p className="text-[9px] text-[var(--color-text-secondary)] opacity-70">Master the platform in 10 steps.</p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                window.dispatchEvent(new CustomEvent('trigger-product-tour'));
                                                                onClose();
                                                            }}
                                                            className="ml-auto px-4 py-1.5 bg-white dark:bg-black/20 border border-[var(--color-border)] rounded-lg text-[10px] font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-all flex items-center gap-2"
                                                        >
                                                            Start Tour
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Left Column: Form Fields */}
                                                <motion.form
                                                    key={activeTab}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    onSubmit={handleSubmit}
                                                    className="space-y-3"
                                                >
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1 opacity-60">
                                                                Full Name
                                                            </label>
                                                            <input
                                                                required
                                                                type="text"
                                                                placeholder="John Doe"
                                                                className="w-full px-4 py-2 rounded-xl bg-[var(--color-surface-2)] border border-gray-300 dark:border-[var(--color-text-muted)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all text-xs text-[var(--color-text-primary)] shadow-sm"
                                                                value={formData.name}
                                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1 opacity-60">
                                                                Phone
                                                            </label>
                                                            <input
                                                                required
                                                                type="tel"
                                                                placeholder="+1 234..."
                                                                className="w-full px-4 py-2 rounded-xl bg-[var(--color-surface-2)] border border-gray-300 dark:border-[var(--color-text-muted)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all text-xs text-[var(--color-text-primary)] shadow-sm"
                                                                value={formData.phone}
                                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1 opacity-60">
                                                            Email
                                                        </label>
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            className="w-full px-4 py-2 rounded-xl bg-[var(--color-surface-2)] border border-gray-300 dark:border-[var(--color-text-muted)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all text-xs text-[var(--color-text-primary)] shadow-sm"
                                                            value={formData.email}
                                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-3">
                                                        <div>
                                                            <label className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1 opacity-60">
                                                                Category
                                                            </label>
                                                            <select
                                                                required
                                                                className="w-full px-4 py-2 rounded-xl bg-[var(--color-surface-2)] border border-gray-300 dark:border-[var(--color-text-muted)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all text-xs text-[var(--color-text-primary)] shadow-sm appearance-none"
                                                                value={formData.category}
                                                                onChange={e => setFormData({ ...formData, category: e.target.value, customCategory: '' })}
                                                            >
                                                                <option value="" disabled>Select a feature...</option>
                                                                {categories.map(cat => (
                                                                    <option key={cat} value={cat}>{cat}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <AnimatePresence>
                                                            {formData.category === 'Custom' && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <input
                                                                        required
                                                                        type="text"
                                                                        placeholder="Specifically..."
                                                                        className="w-full px-4 py-2 rounded-xl bg-[var(--color-surface-2)] border border-gray-300 dark:border-[var(--color-text-muted)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all text-xs text-[var(--color-text-primary)] shadow-sm"
                                                                        value={formData.customCategory}
                                                                        onChange={e => setFormData({ ...formData, customCategory: e.target.value })}
                                                                    />
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>

                                                    {activeTab === 'feedback' && (
                                                        <div>
                                                            <label className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2 opacity-60">
                                                                Visual Rating
                                                            </label>
                                                            <div
                                                                onMouseEnter={() => setIsHovered(true)}
                                                                onMouseLeave={() => setIsHovered(false)}
                                                                className="relative p-[1.5px] rounded-2xl overflow-hidden group/rating"
                                                            >
                                                                {/* Shining Border Effect */}
                                                                <motion.div
                                                                    animate={{
                                                                        rotate: [0, 360],
                                                                    }}
                                                                    transition={{
                                                                        duration: 4,
                                                                        repeat: Infinity,
                                                                        ease: "linear",
                                                                    }}
                                                                    className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,var(--color-primary)_50%,transparent_70%,transparent_100%)] opacity-0 group-hover/rating:opacity-100 transition-opacity duration-500"
                                                                />

                                                                <div className="relative flex justify-between items-center bg-[var(--color-surface-2)] backdrop-blur-md p-3 px-5 rounded-[15px] border border-gray-300 dark:border-[var(--color-text-muted)]/40 z-10 transition-colors group-hover/rating:bg-[var(--color-surface-2)]/80">
                                                                    {ratings.map((r, i) => (
                                                                        <motion.button
                                                                            key={i}
                                                                            type="button"
                                                                            whileHover={{ scale: 1.6, zIndex: 20 }}
                                                                            whileTap={{ scale: 1.8 }}
                                                                            onClick={() => setFormData({ ...formData, rating: i })}
                                                                            className={`group flex flex-col items-center gap-1 transition-all duration-300 ${formData.rating === i ? 'scale-125' : 'opacity-70 hover:opacity-100'}`}
                                                                        >
                                                                            <span className="text-3xl filter drop-shadow-md select-none">{r.emoji}</span>
                                                                            <span className={`text-[7px] font-bold uppercase tracking-tighter transition-colors ${formData.rating === i ? 'text-[var(--color-primary)]' : 'text-transparent'}`}>
                                                                                {r.label}
                                                                            </span>
                                                                        </motion.button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div>
                                                        <label className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1 opacity-60">
                                                            {activeTab === 'feedback' ? 'Detailed Feedback' : 'Issue Description'}
                                                        </label>
                                                        <textarea
                                                            required
                                                            rows={activeTab === 'feedback' ? 2 : 4}
                                                            placeholder={activeTab === 'feedback' ? "Tell us what you love or what we can fix..." : "Describe the issue you're facing..."}
                                                            className="w-full px-4 py-2 rounded-xl bg-[var(--color-surface-2)] border border-gray-300 dark:border-[var(--color-text-muted)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all text-xs text-[var(--color-text-primary)] resize-none shadow-sm"
                                                            value={formData.description}
                                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                        />
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-xs shadow-xl shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="w-3.5 h-3.5" /> {activeTab === 'feedback' ? 'Send Feedback' : 'Get Help'}
                                                            </>
                                                        )}
                                                    </button>
                                                    {error && (
                                                        <p className="text-[10px] text-red-500 text-center font-bold">{error}</p>
                                                    )}
                                                </motion.form>

                                                {/* Right Column: Image Upload & Preview Grid */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="flex flex-col gap-3"
                                                >
                                                    <label className="block text-[9px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-1 opacity-60">
                                                        Share a visual (Screenshot/Image)
                                                    </label>
                                                    <div
                                                        className={`relative flex-1 min-h-[250px] border-2 border-dashed rounded-3xl overflow-hidden transition-all duration-500 ${formData.image ? 'border-[var(--color-primary)]' : 'border-gray-300 dark:border-[var(--color-text-muted)]/40 bg-[var(--color-surface-2)]/50 hover:bg-[var(--color-surface-2)]'
                                                            }`}
                                                    >
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                        />

                                                        <AnimatePresence mode="wait">
                                                            {formData.image ? (
                                                                <motion.div
                                                                    key="preview"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    exit={{ opacity: 0 }}
                                                                    className="absolute inset-0 group"
                                                                >
                                                                    <img
                                                                        src={formData.image}
                                                                        alt="Preview"
                                                                        className="w-full h-full object-cover rounded-2xl"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                                        <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs">Change Visual</div>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setFormData(prev => ({ ...prev, image: null }));
                                                                        }}
                                                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform z-20"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                </motion.div>
                                                            ) : (
                                                                <motion.div
                                                                    key="placeholder"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    exit={{ opacity: 0 }}
                                                                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                                                                >
                                                                    <div className="w-12 h-12 bg-[var(--color-surface)] rounded-2xl shadow-sm flex items-center justify-center mb-3 text-[var(--color-primary)]">
                                                                        <Sparkles className="w-6 h-6" />
                                                                    </div>
                                                                    <p className="text-xs font-bold text-[var(--color-text-primary)] mb-1">Click to upload visual</p>
                                                                    <p className="text-[9px] text-[var(--color-text-muted)]">PNG, JPG or WebP (Max 5MB)</p>

                                                                    {/* Abstract Grid Decor */}
                                                                    <div className="mt-8 grid grid-cols-3 gap-2 opacity-20 text-[var(--color-text-muted)]">
                                                                        {[...Array(6)].map((_, i) => (
                                                                            <div key={i} className="w-8 h-8 bg-current rounded-lg" />
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default HelpModal;
