import { useState } from 'react';
import { Check, ChevronRight, User, FileText, Eye, Zap } from 'lucide-react';
import { TieIcon } from '../components/CustomIcons';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
    { id: 0, label: 'Resume', icon: FileText },
    { id: 1, label: 'Personal', icon: User },
    { id: 2, label: 'Questions', icon: TieIcon },
    { id: 3, label: 'Review', icon: Eye },
];

const ApplicationFlow = () => {
    const [step, setStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        useExisting: true,
        name: 'Shanmukh G.',
        email: 'shanmukh@example.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/shanmukh',
        coverLetter: '',
        workAuth: '',
        sponsorship: '',
    });

    const update = (key, val) => setFormData(d => ({ ...d, [key]: val }));

    const handleSubmit = () => {
        // Save to localStorage
        const applications = JSON.parse(localStorage.getItem('user_applications') || '[]');
        const newApp = {
            jobId: 1, // Mock Stripe Job ID for now
            jobTitle: 'Senior Frontend Engineer',
            company: 'Stripe',
            appliedDate: new Date().toISOString()
        };
        localStorage.setItem('user_applications', JSON.stringify([...applications, newApp]));

        // Dispatch event for UI updates (e.g. Sidebar counts)
        window.dispatchEvent(new CustomEvent('application-submitted'));

        setSubmitted(true);
        setTimeout(() => navigate('/jobs'), 3500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ backgroundColor: 'var(--color-primary-subtle)' }}>
                        <Check className="w-10 h-10" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h1 className="text-h2 font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Application Sent! 🎉</h1>
                    <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
                        Your application to Stripe has been submitted. You'll hear back within 5–7 days.
                    </p>
                    <p className="text-sm mt-4" style={{ color: 'var(--color-text-muted)' }}>Redirecting you to jobs…</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="max-w-xl mx-auto">
                {/* Job context */}
                <div className="card p-4 flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ background: 'linear-gradient(135deg, #635BFF, #8B83FF)' }}>S</div>
                    <div>
                        <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Senior Frontend Engineer</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Stripe • Remote • $160k–$200k</p>
                    </div>
                    <div className="ml-auto">
                        <span className="badge badge-primary"><Zap className="w-3 h-3" /> Easy Apply</span>
                    </div>
                </div>

                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8">
                    {STEPS.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-1 flex-1">
                            <div className="flex flex-col items-center gap-1.5 flex-1">
                                <button
                                    onClick={() => step > i && setStep(i)}
                                    disabled={step < i}
                                    className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all"
                                    style={{
                                        backgroundColor: step > i ? '#10B981' : step === i ? 'var(--color-primary)' : 'var(--color-surface-2)',
                                        color: step >= i ? 'white' : 'var(--color-text-muted)',
                                    }}
                                >
                                    {step > i ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                                </button>
                                <span className="text-xs text-center" style={{ color: step === i ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                    {s.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className="h-px flex-1 mb-5 mt-0" style={{ backgroundColor: step > i ? '#10B981' : 'var(--color-border)' }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }} className="card p-6">
                        {step === 0 && (
                            <div>
                                <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Your Resume</h2>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { id: 'existing', label: 'Use existing resume', sub: 'Shanmukh_Resume_2025.pdf', active: formData.useExisting },
                                        { id: 'upload', label: 'Upload new resume', sub: 'PDF or DOCX up to 10MB', active: !formData.useExisting },
                                    ].map(opt => (
                                        <button key={opt.id} onClick={() => update('useExisting', opt.id === 'existing')}
                                            className="p-4 rounded-xl border text-left transition-all"
                                            style={{
                                                borderColor: opt.active ? 'var(--color-primary)' : 'var(--color-border)',
                                                backgroundColor: opt.active ? 'var(--color-primary-subtle)' : 'var(--color-surface-2)',
                                            }}>
                                            <p className="font-medium" style={{ color: opt.active ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>{opt.label}</p>
                                            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{opt.sub}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-4">
                                <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Personal Information</h2>
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text' },
                                    { label: 'Email', key: 'email', type: 'email' },
                                    { label: 'Phone', key: 'phone', type: 'tel' },
                                    { label: 'LinkedIn', key: 'linkedin', type: 'url' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="label mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>{f.label}</label>
                                        <input className="input" type={f.type} value={formData[f.key]}
                                            onChange={e => update(f.key, e.target.value)} />
                                    </div>
                                ))}
                                <div>
                                    <label className="label mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>Cover Letter (optional)</label>
                                    <textarea className="input h-28 resize-none" placeholder="Briefly describe your interest in this role…"
                                        value={formData.coverLetter} onChange={e => update('coverLetter', e.target.value)} />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>Screening Questions</h2>
                                {[
                                    { label: 'Are you authorized to work in the US?', key: 'workAuth' },
                                    { label: 'Do you require visa sponsorship?', key: 'sponsorship' },
                                ].map(q => (
                                    <div key={q.key}>
                                        <label className="label mb-2 block" style={{ color: 'var(--color-text-secondary)' }}>{q.label}</label>
                                        <div className="flex gap-3">
                                            {['Yes', 'No'].map(opt => (
                                                <button key={opt} onClick={() => update(q.key, opt)}
                                                    className="flex-1 py-2.5 rounded-xl border font-medium text-sm transition-all"
                                                    style={{
                                                        borderColor: formData[q.key] === opt ? 'var(--color-primary)' : 'var(--color-border)',
                                                        backgroundColor: formData[q.key] === opt ? 'var(--color-primary-subtle)' : 'var(--color-surface-2)',
                                                        color: formData[q.key] === opt ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                                                    }}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h2 className="font-bold text-lg mb-5" style={{ color: 'var(--color-text-primary)' }}>Review & Submit</h2>
                                <div className="space-y-3 mb-6">
                                    {[
                                        { label: 'Resume', value: formData.useExisting ? 'Shanmukh_Resume_2025.pdf' : 'New Upload' },
                                        { label: 'Name', value: formData.name },
                                        { label: 'Email', value: formData.email },
                                        { label: 'Phone', value: formData.phone },
                                        { label: 'Work Auth', value: formData.workAuth || 'Not answered' },
                                        { label: 'Sponsorship', value: formData.sponsorship || 'Not answered' },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                    By submitting, you agree to share your profile information with Stripe.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex gap-3 mt-6">
                    {step > 0 && (
                        <button onClick={() => setStep(s => s - 1)} className="btn-secondary flex-1 justify-center">
                            Back
                        </button>
                    )}
                    {step < STEPS.length - 1 ? (
                        <button onClick={() => setStep(s => s + 1)} className="btn-primary flex-1 justify-center gap-2">
                            Continue <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button onClick={handleSubmit} className="btn-primary flex-1 justify-center gap-2">
                            <Zap className="w-4 h-4" /> Submit Application
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationFlow;
