import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Search, CheckCircle, ArrowRight, ArrowLeft,
    Upload, X, Sun, Moon, Rocket, Palette, LineChart, BarChart,
    Cpu, Users, HeartPulse, Wrench, GraduationCap, Sprout, DollarSign,
    Briefcase, Star, ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import api from '../api';
import * as idb from '../utils/idb';

import { HIERARCHY } from '../constants/hierarchy';
import StatusModal from '../components/StatusModal';

// ─── STEP 2 ────────────────────────────────────────────────────────────────────
const Step3Verification = ({ selectedSubDepts, formData, setFormData, onSave, onPrev, setStatusModal }) => {
    const [skillInput, setSkillInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSkillKey = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newSkill = skillInput.trim().replace(/,$/, '');
            if (newSkill && !formData.skills.includes(newSkill)) {
                setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skill) =>
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));

    const handleSave = async () => {
        // Validation check
        if (!formData.experience || formData.experience === '0' || formData.experience === '') {
            setStatusModal({
                isOpen: true,
                type: 'warning',
                title: 'Missing Info',
                message: "Please provide the experience."
            });
            return;
        }
        if (!formData.skills || formData.skills.length === 0) {
            setStatusModal({
                isOpen: true,
                type: 'warning',
                title: 'Missing Info',
                message: "Please provide skills."
            });
            return;
        }

        setIsSaving(true);
        await onSave();
        setIsSaving(false);
    };

    return (
        <motion.div
            key="step3-verify"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto space-y-4 py-8 px-4 flex flex-col justify-center min-h-[calc(100vh-80px)]"
        >
            <button onClick={onPrev} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors w-fit">
                <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="text-center">
                <h2 className="text-3xl font-black mb-1 dark:text-white leading-tight">Verify & Refine</h2>
                <p className="text-gray-500 text-xs mb-2">We've extracted this from your resume. Feel free to adjust.</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                    {selectedSubDepts.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">{s}</span>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/80 rounded-[1.5rem] p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Years of Experience</label>
                    <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/80 focus:border-primary/40 rounded-xl outline-none p-4 text-3xl font-black text-center text-gray-800 dark:text-white transition-all"
                        value={formData.experience}
                        placeholder="e.g. 5"
                        onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Skills</label>
                    <div className="flex flex-wrap gap-1.5 min-h-[24px] max-h-32 overflow-y-auto custom-scrollbar pr-2">
                        {formData.skills.map(skill => (
                            <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-lg border border-primary/20">
                                {skill}
                                <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => removeSkill(skill)} />
                            </span>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Add more skills..."
                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-gray-200 dark:border-white/80 focus:border-primary/40 rounded-xl outline-none p-4 text-base text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillKey}
                    />
                </div>

                <button
                    disabled={isSaving}
                    onClick={handleSave}
                    className="btn-primary w-full py-4 text-lg rounded-xl flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                    {isSaving ? 'Saving...' : 'Complete Onboarding'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

const Step2Upload = ({ formData, setFormData, onPrev, onStartParsing, clientStatus, onContinueWithExisting }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            key="step2-upload"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto text-center space-y-6 py-8 px-4 flex flex-col justify-center min-h-[calc(100vh-80px)]"
        >
            <button onClick={onPrev} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mx-auto">
                <ArrowLeft className="w-4 h-4" /> Go back
            </button>
            <div className="space-y-1">
                <h2 className="text-3xl font-black dark:text-white tracking-tighter/10">Resume Upload</h2>
                <p className="text-gray-500 text-sm">We'll auto-extract your experience and skills.</p>
            </div>

            <label className="block cursor-pointer">
                <div className={`p-8 border-dashed border-4 rounded-[1.5rem] transition-all bg-white dark:bg-transparent ${formData.resume ? 'border-primary/60 bg-primary/5' : 'border-gray-300 dark:border-gray-600 hover:border-primary/40 shadow-xl'}`}>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={e => setFormData(prev => ({ ...prev, resume: e.target.files[0] }))} />
                    {formData.resume ? (
                        <div className="space-y-2">
                            <FileText className="w-12 h-12 text-primary mx-auto" />
                            <p className="text-lg font-black text-gray-800 dark:text-white truncate">{formData.resume.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Click to replace</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto" />
                            <p className="text-lg font-bold text-gray-600 dark:text-gray-300">Drop your resume here</p>
                            <p className="text-[10px] text-gray-400">PDF, DOC, DOCX up to 10MB</p>
                        </div>
                    )}
                </div>
            </label>

            <button
                disabled={!formData.resume}
                onClick={() => onStartParsing(formData.resume)}
                className="btn-primary w-full py-4 text-xl rounded-[1.5rem] flex items-center justify-center gap-4 group disabled:opacity-50"
            >
                Ignite Scan
                <Rocket className="w-6 h-6 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform" />
            </button>

            {clientStatus?.is_active && clientStatus?.is_paid && (
                <button
                    onClick={onContinueWithExisting}
                    className="w-full py-4 text-sm font-black border-2 border-primary/30 text-primary hover:bg-primary/5 rounded-[1.5rem] transition-all flex items-center justify-center gap-2"
                >
                    Continue with existing resume
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </motion.div>
    );
};

// ─── COLOUR MAP ───────────────────────────────────────────────────────────────
const COLOR_MAP = {
    sky: { bg: 'bg-sky-500/15', icon: 'text-sky-400', border: 'border-sky-400/50', shadow: 'shadow-sky-500/20' },
    purple: { bg: 'bg-purple-500/15', icon: 'text-purple-400', border: 'border-purple-400/50', shadow: 'shadow-purple-500/20' },
    emerald: { bg: 'bg-emerald-500/15', icon: 'text-emerald-400', border: 'border-emerald-400/50', shadow: 'shadow-emerald-500/20' },
    orange: { bg: 'bg-orange-500/15', icon: 'text-orange-400', border: 'border-orange-400/50', shadow: 'shadow-orange-500/20' },
    red: { bg: 'bg-red-500/15', icon: 'text-red-400', border: 'border-red-400/50', shadow: 'shadow-red-500/20' },
    slate: { bg: 'bg-slate-500/15', icon: 'text-slate-300', border: 'border-slate-400/50', shadow: 'shadow-slate-500/20' },
    green: { bg: 'bg-green-500/15', icon: 'text-green-400', border: 'border-green-400/50', shadow: 'shadow-green-500/20' },
    pink: { bg: 'bg-pink-500/15', icon: 'text-pink-400', border: 'border-pink-400/50', shadow: 'shadow-pink-500/20' },
    amber: { bg: 'bg-amber-500/15', icon: 'text-amber-400', border: 'border-amber-400/50', shadow: 'shadow-amber-500/20' },
    indigo: { bg: 'bg-indigo-500/15', icon: 'text-indigo-400', border: 'border-indigo-400/50', shadow: 'shadow-indigo-500/20' },
};

// ─── SELECTED ROLES CARD ─────────────────────────────────────────────────────
const SelectedRolesCard = ({ selectedSubDepts, onContinue }) => {
    if (selectedSubDepts.length === 0) return null;

    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="lg:absolute lg:right-6 lg:top-20 z-30 w-full lg:w-80 mb-4 lg:mb-0"
        >
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-xl border-2 border-primary/30 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/30 p-1.5 rounded-lg">
                            <Star className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                            Selected Roles ({selectedSubDepts.length})
                        </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary/50" />
                </div>

                <div className="flex flex-wrap gap-2 mb-4 max-h-full overflow-y-auto custom-scrollbar">
                    {selectedSubDepts.map((role, index) => (
                        <motion.span
                            key={role}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-3 py-1.5 bg-primary/20 text-primary text-xs font-bold rounded-full border border-primary/30 shadow-lg shadow-primary/10"
                        >
                            {role}
                        </motion.span>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinue}
                    className="w-full btn-primary px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-xl shadow-primary/30"
                >
                    Continue with {selectedSubDepts.length} role{selectedSubDepts.length > 1 ? 's' : ''}
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ClientOnboarding = () => {
    const navigate = useNavigate();
    const { hash } = useLocation();
    const { isDark, toggleTheme } = useTheme();

    const [step, setStep] = useState(() => {
        const hashStep = window.location.hash.replace('#step', '');
        return (hashStep && !isNaN(hashStep)) ? parseInt(hashStep) : 1;
    });

    // Sync step with Hash
    useEffect(() => {
        const hashStep = hash.replace('#step', '');
        if (hashStep && !isNaN(hashStep)) {
            const stepNum = parseInt(hashStep);
            if (stepNum !== step) setStep(stepNum);
        } else if (!hash && step !== 1) {
            // Default to step 1 if no hash
            setStep(1);
        }
    }, [hash]);

    // Update Hash when step changes (if not already synced)
    useEffect(() => {
        const currentHashStep = parseInt(hash.replace('#step', ''));
        if (currentHashStep !== step) {
            // Use replace: true for internal state changes to avoid clogging history
            // but the user wants 'back' to work, so we should probably use push (default navigate)
            // navigate(`#step${step}`); 
        }
    }, [step]);

    // Step 1 state
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedSubDepts, setSelectedSubDepts] = useState([]);

    // Step 2
    const [formData, setFormData] = useState({ experience: '', skills: [], resume: null });

    // Step 3 / processing
    const [processProgress, setProcessProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [clientStatus, setClientStatus] = useState({ is_active: false, is_paid: false });
    const [statusModal, setStatusModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

    // Check existing client status for skipping upload
    useEffect(() => {
        const checkClientStatus = async () => {
            const rawUser = localStorage.getItem('user');
            if (!rawUser || rawUser === 'undefined' || rawUser === 'null') {
                console.warn("[Onboarding] No valid user session found, redirecting to sign-in.");
                navigate('/signin');
                return;
            }

            let storedUser;
            try {
                storedUser = JSON.parse(rawUser);
            } catch (e) {
                console.error("[Onboarding] Failed to parse user data, clearing and redirecting.");
                localStorage.removeItem('user');
                navigate('/signin');
                return;
            }

            const clientId = storedUser?.id || storedUser?.client_id;
            if (clientId) {
                try {
                    const res = await api.getClientProfile(clientId);
                    if (res && res.data) {
                        setClientStatus({
                            is_active: res.data.is_active,
                            is_paid: res.data.is_paid
                        });
                    }
                } catch (err) {
                    console.error("Error fetching client status:", err);
                }
            } else {
                console.warn("[Onboarding] Session exists but client_id is missing, redirecting.");
                navigate('/signin');
            }
        };
        checkClientStatus();
    }, [navigate]);

    const panelRef = useRef(null);

    const handleStepChange = (newStepNum) => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate(`#step${newStepNum}`);
            setStep(newStepNum);
            setIsTransitioning(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1000);
    };

    const nextStep = () => handleStepChange(step + 1);
    const prevStep = () => handleStepChange(step - 1);

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
        setSelectedSubDepts([]);
        // scroll right panel into view smoothly on mobile
        setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
    };

    const toggleSubDept = (sub) => {
        setSelectedSubDepts(prev =>
            prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
        );
    };

    const handleFinalSave = async () => {
        try {
            setStep('processing');
            setProcessProgress(0);

            // Artificial progress for saving
            const interval = setInterval(() => {
                setProcessProgress(prev => Math.min(prev + 5, 90));
            }, 100);

            const uploadFormData = new FormData();
            uploadFormData.append('resume', formData.resume);

            // Derive unique department names (job domains) from selected sub-departments
            const uniqueDepts = [];
            selectedSubDepts.forEach(sub => {
                HIERARCHY.forEach(cat => {
                    cat.departments.forEach(dept => {
                        if (dept.subDepts.includes(sub) && !uniqueDepts.includes(dept.name)) {
                            uniqueDepts.push(dept.name);
                        }
                    });
                });
            });

            // Map state to the structure expected by the backend clients table
            const finalParsedData = {
                ...formData.parsedData,
                skills: formData.skills,
                total_experience_years: formData.experience,
                selected_roles: selectedSubDepts,
                job_domain: uniqueDepts.join(', ')
            };

            uploadFormData.append('parsedData', JSON.stringify(finalParsedData));

            // Required security token for the backend
            const cfToken = import.meta.env.VITE_CLOUDFLARE_SECRET_VALIDATION_TOKEN || '6029523fa04467bdc1224533f7912d54@N1i2k3h4i5l6';
            uploadFormData.append('cloudflare_secret_id', cfToken);

            // Pass client_id from session so backend links to the correct paid user
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (storedUser.client_id) {
                uploadFormData.append('client_id', storedUser.client_id);
            }

            const response = await api.saveResume(uploadFormData);
            clearInterval(interval);
            setProcessProgress(100);

            if (response.success && response.id) {
                // Clear ALL tab caches (jobs, quick-apply, linkedin-apply, w2-c2c)
                await idb.clearJobs();

                // User has already paid before reaching onboarding — always go to dashboard
                setTimeout(() => navigate('/dashboard/candidate'), 400);
            } else {
                alert("Save failed: " + (response.error || "Unknown error"));
                setStep(3);
            }
        } catch (error) {
            console.error("Save error:", error);
            const errorMsg = error.message || "An error occurred while saving.";
            alert("Error: " + errorMsg);
            setStep(3);
        }
    };

    const handleContinueWithExisting = async () => {
        try {
            setStep('processing');
            setProcessProgress(0);
            const interval = setInterval(() => {
                setProcessProgress(prev => Math.min(prev + 10, 90));
            }, 50);

            const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
            const clientId = storedUser?.client_id;

            const uniqueDepts = [];
            selectedSubDepts.forEach(sub => {
                HIERARCHY.forEach(cat => {
                    cat.departments.forEach(dept => {
                        if (dept.subDepts.includes(sub) && !uniqueDepts.includes(dept.name)) {
                            uniqueDepts.push(dept.name);
                        }
                    });
                });
            });

            const job_domain = uniqueDepts.sort().join(', ');

            const response = await api.updateClientDomain(clientId, {
                job_domain,
                selected_roles: selectedSubDepts
            });

            clearInterval(interval);
            setProcessProgress(100);

            if (response.success) {
                // Clear ALL tab caches to force re-scoring with new domain
                await idb.clearJobs();
                setTimeout(() => navigate('/dashboard/candidate'), 500);
            } else {
                setStatusModal({
                    isOpen: true,
                    type: 'error',
                    title: 'Update Failed',
                    message: response.error || "Failed to update domain"
                });
                setStep(2);
            }
        } catch (error) {
            console.error("Update domain error:", error);
            setStatusModal({
                isOpen: true,
                type: 'error',
                title: 'System Error',
                message: "Update failed: " + (error.message || "An unknown error occurred.")
            });
            setStep(2);
        }
    };

    const startResumeParsing = async (file) => {
        if (!file) return;
        setStep('processing');
        setProcessProgress(0);

        // Simulated progress while waiting for API
        const interval = setInterval(() => {
            setProcessProgress(prev => {
                if (prev >= 95) return prev;
                return prev + 1;
            });
        }, 150);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('resume', file);
            const response = await api.parseResume(uploadFormData);

            clearInterval(interval);
            setProcessProgress(100);

            if (response.success && response.data) {
                const data = response.data;
                const experience = data.total_experience_years || data.experience || '';
                const skills = Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',').map(s => s.trim()) : []);

                // Validation prompt after parsing
                if (!experience || experience === '0' || skills.length === 0) {
                    let msg = "";
                    if (!experience || experience === '0') msg += "Please give the experience. ";
                    if (skills.length === 0) msg += "Please give skills.";
                    if (msg) alert(msg);
                }

                setFormData(prev => ({
                    ...prev,
                    experience,
                    skills,
                    parsedData: data
                }));
                setTimeout(() => setStep(3), 500);
            } else {
                console.error("Parsing failed, moving to manual verification");
                alert("We couldn't extract details from your resume. Please enter your experience and skills manually.");
                setStep(3);
            }
        } catch (error) {
            console.error("Parsing error:", error);
            clearInterval(interval);
            alert("An error occurred during parsing. Please enter your experience and skills manually.");
            setStep(3);
        }
    };

    // ── Step Indicator ─────────────────────────────────────────────────────────
    const StepIndicator = () => (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="h-1.5 bg-gray-200 dark:bg-gray-800">
                <motion.div
                    className="h-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
                    animate={{ width: `${(typeof step === 'number' ? step : 3) / 3 * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            <div className="absolute top-4 right-6 flex items-center gap-3">
                <button onClick={toggleTheme} className="p-2 rounded-full bg-surface-2 border border-border hover:scale-110 transition-transform">
                    {isDark ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-primary" />}
                </button>
                <div className="px-3 py-1 bg-black/30 backdrop-blur border border-white/10 rounded-full">
                    <span className="text-xs font-bold tracking-widest text-primary">
                        STEP {typeof step === 'number' ? step : 3} / 3
                    </span>
                </div>
            </div>
        </div>
    );

    // ── Step 1 ─────────────────────────────────────────────────────────────────
    const renderStep1 = () => (
        <motion.div
            key="step1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full min-h-screen pt-16"
        >
            {/* ── HEADER: only shown before a category is selected ─────────── */}
            {!activeCategory && (
                <div className="text-center pt-2 pb-2 px-4">
                    <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-primary/80 mb-1">Step 1 of 3</p>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight dark:text-white leading-tight">
                        What kind of work are you{' '}
                        <span className="text-primary italic">hiring for?</span>
                    </h1>
                    <p className="text-gray-400 mt-1 text-base max-w-sm mx-auto">
                        Start by choosing an industry category below.
                    </p>
                </div>
            )}

            {/* ── BACK BUTTON WITH SELECTED CATEGORY NAME ──────────────────────── */}
            {activeCategory && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between px-4 py-3 border-b border-white/8"
                >
                    <button
                        onClick={() => { setActiveCategory(null); setSelectedSubDepts([]); }}
                        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-[14px] font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to categories
                    </button>

                    {/* Selected Category Name */}
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${COLOR_MAP[activeCategory.color]?.bg}`}>
                            <activeCategory.icon className={`w-3 h-3 ${COLOR_MAP[activeCategory.color]?.icon}`} />
                        </div>
                        <span className="text-sm font-bold text-primary">
                            {activeCategory.label}
                        </span>
                    </div>
                </motion.div>
            )}

            {/* ── MAIN BODY: conditional layout ─────────────────────────────── */}
            <AnimatePresence mode="wait">

                {/* ── STATE A: No category selected — full-width icon grid ────── */}
                {!activeCategory && (
                    <motion.div
                        key="grid-full"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.28 }}
                        className="max-w-4xl mx-auto px-6 pb-12"
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {HIERARCHY.map((cat, i) => {
                                const c = COLOR_MAP[cat.color] || COLOR_MAP.sky;
                                return (
                                    <motion.button
                                        key={cat.id}
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.28 }}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        whileTap={{ scale: 0.94 }}
                                        onClick={() => handleCategoryClick(cat)}
                                        className={`
                                            flex flex-col items-center justify-center gap-4
                                            p-6 rounded-2xl border-2 border-gray-200 dark:border-white/10
                                            bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10
                                            hover:border-primary/30 dark:hover:border-white/25 transition-all duration-200 cursor-pointer
                                            shadow-lg
                                        `}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${c.bg} shadow-lg ${c.shadow}`}>
                                            <cat.icon className={`w-8 h-8 ${c.icon}`} />
                                        </div>
                                        <span className="text-[15px] font-bold leading-tight text-center dark:text-white text-gray-700">
                                            {cat.label}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* ── STATE B: Category selected — left stack + right panel ───── */}
                {
                    activeCategory && (
                        <motion.div
                            key="split-layout"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-100px)] relative"
                        >
                            {/* ── LEFT: Compact category stack ──────────────────────── */}
                            <div className="lg:w-56 xl:w-64 flex-shrink-0 bg-gray-50/50 dark:bg-black/30 border-r border-gray-200 dark:border-white/8 px-3 py-4 overflow-y-auto lg:h-[calc(100vh-100px)] lg:sticky lg:top-[100px]">
                                <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 px-2">
                                    Categories
                                </p>
                                <div className="flex flex-col gap-1.5">
                                    {HIERARCHY.map((cat) => {
                                        const c = COLOR_MAP[cat.color] || COLOR_MAP.sky;
                                        const isActive = activeCategory?.id === cat.id;
                                        return (
                                            <motion.button
                                                key={cat.id}
                                                whileHover={{ x: 3 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => handleCategoryClick(cat)}
                                                className={`
                                                flex items-center gap-3 px-3 py-2.5 rounded-xl
                                                text-left transition-all duration-150 cursor-pointer w-full
                                                ${isActive
                                                        ? `bg-primary/15 border-2 border-primary/40 shadow-md`
                                                        : `border-2 border-transparent hover:bg-gray-100 dark:hover:bg-white/8 hover:border-gray-200 dark:hover:border-white/10`
                                                    }
                                            `}
                                            >
                                                {/* compact icon */}
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${c.bg} ${isActive ? `shadow-md ${c.shadow}` : ''}`}>
                                                    <cat.icon className={`w-4 h-4 ${c.icon}`} />
                                                </div>
                                                <span className={`text-[13px] font-semibold leading-tight ${isActive ? 'text-primary' : 'dark:text-gray-300 text-gray-600'}`}>
                                                    {cat.label}
                                                </span>
                                                {isActive && (
                                                    <CheckCircle className="w-3.5 h-3.5 text-primary ml-auto flex-shrink-0" />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── RIGHT: Departments + sub-depts panel with top border ── */}
                            <div
                                ref={panelRef}
                                className="flex-1 overflow-y-auto px-5 lg:px-8 py-6 pb-32 lg:h-[calc(100vh-100px)] lg:overflow-y-auto relative"
                            >
                                {/* Top border with glow effect */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                {/* Panel header */}
                                {/* Panel header */}
                                <div className="flex flex-col gap-2 mb-7">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${COLOR_MAP[activeCategory.color]?.bg}`}>
                                            <activeCategory.icon className={`w-5 h-5 ${COLOR_MAP[activeCategory.color]?.icon}`} />
                                        </div>
                                        <h2 className="text-2xl font-black dark:text-white">{activeCategory.label}</h2>
                                        <AnimatePresence>
                                            {selectedSubDepts.length >= 4 && (
                                                <motion.div
                                                    key="desktop-suggestion"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className="hidden md:flex flex-col bg-[#F97316]/10 border border-[#F97316]/20 rounded-lg px-3 py-1.5 ml-2"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#F97316] font-bold text-[10px] uppercase tracking-widest">Reality:</span>
                                                        <p className="text-[13px] text-orange-700 dark:text-orange-300 font-medium">
                                                            less and focused job roles gets you hired quickly
                                                        </p>
                                                    </div>
                                                    <span className="text-[10px] font-bold bg-green-500/10 text-green-500 rounded-sm px-2 py-1 w-fit">
                                                        you can change your domain anytime
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Mobile-only suggestion (stacks below title on small screens) */}
                                    <AnimatePresence>
                                        {selectedSubDepts.length >= 4 && (
                                            <motion.div
                                                key="mobile-suggestion"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="md:hidden flex text-center items-start gap-2 bg-[#F97316]/10 border border-[#F97316]/20 rounded-lg px-3 py-2"
                                            >
                                                <span className="text-[#F97316] font-bold text-[10px] uppercase tracking-widest mt-0.5">Reality:</span>
                                                <div className="flex-1">
                                                    <p className="text-[12px] text-orange-700 dark:text-orange-300 font-medium">
                                                        Limited and focused job roles gets you hired quickly
                                                    </p>
                                                    <p className="text-[10px] mt-1 text-green-500 ">
                                                        you can change your domain anytime
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {/* Selected Roles Card - appears on the right side when roles are selected */}
                                <AnimatePresence>
                                    {selectedSubDepts.length > 0 && (
                                        <SelectedRolesCard
                                            selectedSubDepts={selectedSubDepts}
                                            onContinue={nextStep}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Departments + their roles */}
                                <div className="space-y-8">
                                    {activeCategory.departments.map((dept, di) => (
                                        <motion.div
                                            key={dept.name}
                                            initial={{ opacity: 0, y: 14 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: di * 0.07, duration: 0.28 }}
                                        >
                                            {/* Department name */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <Briefcase className={`w-4 h-4 ${COLOR_MAP[activeCategory.color]?.icon} flex-shrink-0`} />
                                                <p className="text-base font-black dark:text-white text-gray-800 uppercase tracking-wide">
                                                    {dept.name}
                                                </p>
                                            </div>

                                            {/* Sub-dept role chips */}
                                            <div className="flex flex-wrap gap-2 pl-6">
                                                {dept.subDepts.map((sub, si) => {
                                                    const selected = selectedSubDepts.includes(sub);
                                                    return (
                                                        <motion.button
                                                            key={sub}
                                                            initial={{ opacity: 0, scale: 0.88 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: di * 0.06 + si * 0.03, duration: 0.2 }}
                                                            whileHover={{ scale: 1.06 }}
                                                            whileTap={{ scale: 0.93 }}
                                                            onClick={() => toggleSubDept(sub)}
                                                            className={`
                                                            px-3 py-1.5 rounded-full text-[13px] font-bold border-2
                                                            transition-all duration-150 cursor-pointer
                                                            ${selected
                                                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30'
                                                                    : `bg-white dark:bg-white/5 border-gray-200 dark:border-white/15 dark:text-gray-300 text-gray-600
                                                                   hover:border-primary/50 dark:hover:border-primary/50 hover:text-primary hover:bg-primary/5`
                                                                }
                                                        `}
                                                        >
                                                            {selected && <span className="mr-1.5">✓</span>}
                                                            {sub}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>

                                            {/* divider */}
                                            {di < activeCategory.departments.length - 1 && (
                                                <div className="mt-8 border-t border-gray-100 dark:border-white/8" />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </motion.div >
    );

    // Old Step 3 removed, functionality merged into main render flow

    // ── Transition ─────────────────────────────────────────────────────────────
    const renderStepTransition = () => (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.2, 1, 0.2],
                            backgroundColor: ['var(--color-primary)', 'var(--color-primary-hover)', 'var(--color-primary)']
                        }}
                        transition={{
                            delay: i * 0.1,
                            repeat: Infinity,
                            duration: 0.8,
                            ease: "easeInOut"
                        }}
                        className="w-4 h-4 rounded-full shadow-[0_0_15px_var(--color-primary-subtle)]"
                    />
                ))}
            </div>
            <p className="text-primary font-bold tracking-[0.3em] uppercase text-xs animate-pulse">
                Loading..
            </p>
        </div>
    );

    const renderProcessing = () => (
        <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-screen space-y-6 fixed inset-0 bg-[#07070C] z-50"
        >
            {/* Background Logo for Processing Screen */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03] grayscale">
                <img
                    src="/logo_with_no_color.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] select-none"
                />
            </div>

            <div className="relative w-48 h-48 z-10">
                <motion.div
                    className="absolute inset-0 border-[8px] border-primary/10 rounded-full"
                    animate={{ rotate: processProgress * 3.6 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                >
                    <div className="absolute -top-2 left-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_var(--color-primary)]" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-1 z-10">
                    <img
                        src="/logo.png"
                        alt="Company Logo"
                        className="w-24 h-24 object-contain animate-pulse opacity-80"
                    />
                    <p className="text-primary font-mono text-2xl font-black">{processProgress}%</p>
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-3xl font-black text-white tracking-widest mb-4 italic uppercase">
                    {processProgress < 100 && step === 3 ? 'FINALIZING ONBOARDING' : 'DECODING PROFILE'}
                </h2>
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((i) => {
                        const threshold = i * 20;
                        const isActive = processProgress >= threshold;
                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: isActive ? [1, 1.4, 1] : 1,
                                    opacity: isActive ? 1 : 0.2,
                                    backgroundColor: isActive ? 'var(--color-primary)' : '#4b5563'
                                }}
                                transition={{ duration: 0.5 }}
                                className="w-3 h-3 rounded-full"
                            />
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );

    // ── Result ─────────────────────────────────────────────────────────────────
    const renderResult = () => (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-8 py-10 px-4 flex flex-col justify-center min-h-[calc(100vh-80px)]">
            <div className="w-28 h-28 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30 rotate-12">
                <CheckCircle className="w-14 h-14 text-white -rotate-12" />
            </div>
            <div>
                <h2 className="text-5xl font-black dark:text-white leading-tight tracking-tighter">
                    Your Path is<br /><span className="text-primary"> Validated.</span>
                </h2>
                <p className="text-gray-400 text-xl mt-4 max-w-lg mx-auto">
                    Matches found for&nbsp;
                    <span className="text-primary font-bold">
                        {selectedSubDepts.slice(0, 3).join(', ')}{selectedSubDepts.length > 3 && ` +${selectedSubDepts.length - 3} more`}
                    </span>.
                </p>
            </div>
            <button onClick={() => navigate('/jobs')} className="btn-primary px-16 py-6 text-2xl rounded-[2rem] hover:scale-105 transition-transform">
                Show Matches
            </button>
        </motion.div>
    );

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className={`min-h-screen relative overflow-x-hidden accent-orange ${isDark ? 'dark bg-[#07070C]' : 'bg-gray-50'} transition-colors duration-700`}>
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <img
                    src="/logo_with_no_color.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] opacity-[0.05] grayscale select-none"
                />
            </div>

            <StepIndicator />

            <div className="relative z-10 w-full">
                <AnimatePresence mode="wait">
                    {isTransitioning ? (
                        <motion.div
                            key="transition"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {renderStepTransition()}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {step === 1 && renderStep1()}
                            {step === 2 && (
                                <Step2Upload
                                    formData={formData}
                                    setFormData={setFormData}
                                    onPrev={prevStep}
                                    onStartParsing={startResumeParsing}
                                    clientStatus={clientStatus}
                                    onContinueWithExisting={handleContinueWithExisting}
                                />
                            )}
                            {step === 3 && (
                                <Step3Verification
                                    selectedSubDepts={selectedSubDepts}
                                    formData={formData}
                                    setFormData={setFormData}
                                    onPrev={prevStep}
                                    onSave={handleFinalSave}
                                    setStatusModal={setStatusModal}
                                />
                            )}
                            {step === 'processing' && renderProcessing()}
                            {step === 'result' && renderResult()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Add custom scrollbar styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--color-primary-rgb), 0.3);
                    border-radius: 20px;
                }
            ` }} />

            <StatusModal
                isOpen={statusModal.isOpen}
                onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
                type={statusModal.type}
                title={statusModal.title}
                message={statusModal.message}
            />
        </div>
    );
};

export default ClientOnboarding;