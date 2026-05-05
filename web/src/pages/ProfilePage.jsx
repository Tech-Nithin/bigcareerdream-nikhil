import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin, Upload, Plus, X, Edit3, Save, FileText, ChevronRight, Loader2, Calendar, Briefcase, GraduationCap, LayoutGrid, Award, Rocket, Target, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();
    const [resumes, setResumes] = useState([]);
    const [activeResume, setActiveResume] = useState(null);
    const [clientProfile, setClientProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('resumes');
    const [isLoading, setIsLoading] = useState(true);
    const [isDetailLoading, setIsDetailLoading] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [isHistoryLocked, setIsHistoryLocked] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const clientId = storedUser?.client_id || 'client-1';

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const response = await api.getClientProfile(clientId);
                if (response.success) {
                    setClientProfile(response.client);
                    setResumes(response.resumes || []);
                    setActiveResume(response.resume);
                }
            } catch (err) {
                console.error('Error fetching unified profile:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAll();
    }, [clientId]);

    // Unified fetching handled in useEffect above.

    const fetchResumeDetails = async (id) => {
        setIsDetailLoading(true);
        try {
            const response = await api.getResumeDetails(id);
            if (response.success) {
                setActiveResume(response.data);
            }
        } catch (err) {
            console.error('Error fetching resume details:', err);
        } finally {
            setIsDetailLoading(false);
        }
    };

    const handleDeleteResume = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this resume?')) return;

        try {
            const response = await api.deleteResume(id);
            if (response.success) {
                const updatedResumes = resumes.filter(r => r.id !== id);
                setResumes(updatedResumes);
                if (activeResume?.id === id) {
                    if (updatedResumes.length > 0) {
                        fetchResumeDetails(updatedResumes[0].id);
                    } else {
                        setActiveResume(null);
                    }
                }
            }
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin" />
                    <p className="text-[var(--color-text-secondary)] font-bold tracking-tight">Loading your profile experience...</p>
                </div>
            </div>
        );
    }

    const infoFields = [
        { icon: Mail, label: 'Email', value: activeResume?.email || 'N/A' },
        { icon: Phone, label: 'Phone', value: activeResume?.phone || 'N/A' },
        { icon: MapPin, label: 'Location', value: activeResume?.experience?.[0]?.location || activeResume?.location || 'N/A' },
        { icon: Github, label: 'GitHub', value: activeResume?.github || 'N/A' },
        { icon: Linkedin, label: 'LinkedIn', value: activeResume?.linkedin || 'N/A' },
        { icon: Globe, label: 'Portfolio', value: activeResume?.portfolio || 'N/A' },
    ];

    const clientInfoFields = clientProfile ? [
        { icon: User, label: 'Client ID', value: clientProfile.client_id },
        { icon: Mail, label: 'Email', value: clientProfile.client_email || activeResume?.email },
        { icon: Phone, label: 'Phone', value: clientProfile.client_phone || activeResume?.phone || 'N/A' },
        { icon: MapPin, label: 'Location', value: clientProfile.client_country || activeResume?.experience?.[0]?.location || 'N/A' },
        { icon: Github, label: 'GitHub', value: clientProfile.client_github || activeResume?.github || 'N/A' },
        { icon: Linkedin, label: 'LinkedIn', value: clientProfile.client_linkedin || activeResume?.linkedin || 'N/A' },
        { icon: Globe, label: 'Portfolio', value: clientProfile.client_portfolio || activeResume?.portfolio || 'N/A' },
        { icon: Briefcase, label: 'Job Domain', value: clientProfile.client_job_domain || 'N/A' },
        { icon: Award, label: 'Experience', value: clientProfile.client_experience || (activeResume?.total_experience_years ? `${activeResume.total_experience_years} years` : 'N/A') },
        {
            icon: Target,
            label: 'Status',
            value: clientProfile.is_active ? 'Active' : 'Subscription completed',
            isStatus: true
        },
    ] : [];

    return (
        <div className="max-w-content mx-auto px-4 py-8 relative">
            {/* Floating Resume Switcher Accordion - Only show when in Resumes tab */}
            {activeTab === 'resumes' && (
                <div
                    className={`fixed right-0 top-32 z-50 transition-all duration-500 ease-in-out transform ${isHistoryOpen || isHistoryLocked ? 'translate-x-[2px]' : 'translate-x-[calc(100%-48px)]'}`}
                    onMouseEnter={() => !isHistoryLocked && setIsHistoryOpen(true)}
                    onMouseLeave={() => !isHistoryLocked && setIsHistoryOpen(false)}
                >
                    <div className="glow-border-container shadow-2xl flex items-start">
                        <div className="glow-border-content flex items-start overflow-hidden">
                            <button
                                onClick={() => setIsHistoryLocked(!isHistoryLocked)}
                                className={`w-12 py-8 flex flex-col items-center justify-center transition-colors ${isHistoryLocked ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]/10'}`}
                            >
                                {isHistoryLocked ? <X className="w-5 h-5 mb-2" /> : <LayoutGrid className="w-5 h-5 mb-2" />}
                                <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-widest">Resumes vault</span>
                            </button>
                            <div className="w-72 bg-[var(--color-surface)] p-5 max-h-[70vh] flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-black text-xs uppercase tracking-tighter text-[var(--color-text-primary)]">Resume Vault</h2>
                                    {isHistoryLocked && <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />}
                                </div>
                                <div className="space-y-2 overflow-y-auto custom-scrollbar pr-2 flex-1">
                                    {resumes.map((resume) => (
                                        <div key={resume.id} className="relative group">
                                            <button
                                                onClick={() => fetchResumeDetails(resume.id)}
                                                className={`w-full p-3 pr-10 rounded-xl border text-left transition-all ${activeResume?.id === resume.id
                                                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg'
                                                    : 'bg-[var(--color-surface-2)] border-[var(--color-border)] hover:border-[var(--color-primary)]/50 text-[var(--color-text-primary)]'
                                                    }`}
                                            >
                                                <p className="font-bold text-xs truncate">{(resume.name || 'Untitled').split(' ')[0]}'s History</p>
                                                <p className={`text-[8px] font-bold ${activeResume?.id === resume.id ? 'text-white/60' : 'text-[var(--color-text-muted)]'}`}>
                                                    {new Date(resume.created_at).toLocaleDateString()}
                                                </p>
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteResume(e, resume.id)}
                                                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white ${activeResume?.id === resume.id ? 'text-white/80' : 'text-red-500'}`}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setSearchParams({ modal: 'upload-resume' })}
                                    className="mt-4 w-full py-2 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-lg text-white text-[9px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                                >
                                    + Import New
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative flex-shrink-0">
                        {/* Always show initials instead of a profile picture */}
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-lg bg-gradient-to-br from-[var(--color-primary)] to-purple-600">
                            {(activeResume?.candidate_name || clientProfile?.client_name || 'S')[0]}
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h1 className="text-h3 font-black text-[var(--color-text-primary)]">{activeResume?.candidate_name || clientProfile?.client_name || 'Full Name'}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <p className="text-body-sm text-[var(--color-text-secondary)]">
                                        {clientProfile?.client_country || activeResume?.experience?.[0]?.location || 'Remote'} {activeResume?.total_experience_years && ` • ${activeResume.total_experience_years} years exp`}
                                    </p>
                                    {(clientProfile?.client_gender || activeResume?.gender) && (
                                        <span className="text-[10px] font-bold uppercase py-0.5 px-2 bg-[var(--color-surface-2)] rounded border border-[var(--color-border)] text-[var(--color-text-muted)]">
                                            {clientProfile?.client_gender || activeResume?.gender}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className="badge badge-primary">Client ID: {clientId}</span>
                                    {clientProfile?.is_active && <span className="text-xs text-[var(--color-primary)] font-bold">● ACTIVE</span>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate('/edit-profile')}
                                    className="btn-secondary gap-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]/10"
                                >
                                    <Edit3 className="w-4 h-4" /> Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] mb-6 w-fit">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'profile'
                        ? 'bg-white text-[var(--color-primary)] shadow-sm'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab('resumes')}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'resumes'
                        ? 'bg-white text-[var(--color-primary)] shadow-sm'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'}`}
                >
                    Resumes
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'profile' ? (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid lg:grid-cols-3 gap-6"
                    >
                        <div className="lg:col-span-1 space-y-6">
                            <div className="card p-6">
                                <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-6">Core Information</h2>
                                <div className="space-y-4">
                                    {clientInfoFields.map(({ icon: Icon, label, value, isStatus }, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-subtle)]/20 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold uppercase text-[var(--color-text-muted)] tracking-wider">{label}</p>
                                                {isStatus ? (
                                                    <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${value === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                        {value}
                                                    </span>
                                                ) : (
                                                    <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{value}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <div className="card p-6">
                                <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-6 flex items-center gap-2">
                                    <Target className="w-4 h-4 text-[var(--color-primary)]" /> Professional Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {(clientProfile?.client_skills || activeResume?.skills?.join(', '))?.split(/[,,|]/).map((skill, i) => (
                                        skill.trim() && (
                                            <span key={i} className="px-4 py-1.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-[11px] font-bold rounded-xl hover:border-[var(--color-primary)] transition-all cursor-default">
                                                {skill.trim()}
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>

                            {clientProfile?.client_chosen_alternative_jobroles?.length > 0 && (
                                <div className="card p-6">
                                    <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-6 flex items-center gap-2">
                                        <LayoutGrid className="w-4 h-4 text-[var(--color-primary)]" /> Alternative Job Roles
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {clientProfile.client_chosen_alternative_jobroles.map((role, i) => (
                                            <div key={i} className="p-4 bg-[var(--color-surface-2)]/50 border border-[var(--color-border)] rounded-2xl flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                                                <span className="text-sm font-bold text-[var(--color-text-primary)]">{role}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(clientProfile?.client_resume || activeResume?.resume_url || clientProfile?.client_cover_letter || clientProfile?.client_portfolio) && (
                                <div className="card p-6">
                                    <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-6">Documents & Links</h2>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {(clientProfile?.client_resume || activeResume?.resume_url) && (
                                            <a href={clientProfile?.client_resume || activeResume?.resume_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-[var(--color-surface-2)]/30 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group text-center">
                                                <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                                    <FileText className="w-6 h-6 text-red-500" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-primary)]">Resume</span>
                                            </a>
                                        )}
                                        {clientProfile.client_cover_letter && (
                                            <a href={clientProfile.client_cover_letter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-[var(--color-surface-2)]/30 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group text-center">
                                                <div className="p-3 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                                    <FileText className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-primary)]">Cover Letter</span>
                                            </a>
                                        )}
                                        {clientProfile.client_portfolio && (
                                            <a href={clientProfile.client_portfolio} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-[var(--color-surface-2)]/30 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group text-center">
                                                <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                                    <Globe className="w-6 h-6 text-purple-500" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-primary)]">Portfolio</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="resumes"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                    >
                        {(!activeResume && resumes.length === 0) ? (
                            <div className="max-w-content mx-auto px-4 py-16 text-center">
                                <div className="card p-12 max-w-xl mx-auto">
                                    <div className="w-20 h-20 bg-[var(--color-surface-2)] rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <FileText className="w-10 h-10 text-[var(--color-text-muted)]" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>No Resume Found</h2>
                                    <p className="text-[var(--color-text-secondary)] mb-8">Upload your resume from the dashboard to see your professional profile here.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Left column: Contact, Skills & Certs */}
                                <div className="space-y-6 lg:col-span-1">
                                    <div className="card p-5">
                                        <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Contact</h2>
                                        <div className="space-y-3">
                                            {infoFields.map(({ icon: Icon, label, value }, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-subtle)]/20 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="w-4 h-4 text-[var(--color-primary)]" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[10px] font-bold uppercase text-[var(--color-text-muted)]">{label}</p>
                                                        <p className="text-sm truncate font-semibold text-[var(--color-text-primary)]">{value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="card p-5">
                                        <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Skills</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {activeResume?.skills?.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-[10px] font-black rounded-lg hover:border-[var(--color-primary)] transition-colors cursor-default capitalize">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {activeResume?.certifications?.length > 0 && (
                                        <div className="card p-5">
                                            <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-4 flex items-center gap-2">
                                                <Award className="w-4 h-4 text-[var(--color-primary)]" /> Certifications
                                            </h2>
                                            <div className="space-y-3">
                                                {activeResume.certifications.map((cert, i) => (
                                                    <div key={i} className="p-3 bg-[var(--color-surface-2)]/50 border border-[var(--color-border)] rounded-xl">
                                                        <p className="text-xs font-bold text-[var(--color-text-primary)]">{typeof cert === 'string' ? cert : cert.name}</p>
                                                        {cert.issuer && <p className="text-[10px] text-[var(--color-primary)] font-bold">{cert.issuer}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right column: Experience, Projects & Education */}
                                <div className="space-y-6 lg:col-span-2">
                                    {activeResume?.summary && (
                                        <div className="card p-5 bg-gradient-to-r from-[var(--color-primary-subtle)]/10 to-transparent border-l-4 border-l-[var(--color-primary)]">
                                            <h2 className="font-bold text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-3 flex items-center gap-2">
                                                <Target className="w-4 h-4 text-[var(--color-primary)]" /> Professional Summary
                                            </h2>
                                            <p className="text-sm text-[var(--color-text-primary)] leading-relaxed italic">
                                                "{activeResume.summary}"
                                            </p>
                                        </div>
                                    )}

                                    <div className="card p-5">
                                        <div className="flex items-center justify-between mb-5">
                                            <h2 className="font-bold text-lg text-[var(--color-text-primary)] flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-[var(--color-primary)]" /> Experience
                                            </h2>
                                            <div className="flex gap-2">
                                                <a
                                                    href={`${window.location.protocol}//${window.location.hostname}:4000/api/onboarding/view-resume/${activeResume?.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-secondary gap-2 px-3 py-1.5 text-[10px] shadow-sm"
                                                >
                                                    <FileText className="w-3.5 h-3.5" /> View Original
                                                </a>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeResume?.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className={isDetailLoading ? 'opacity-50 transition-opacity' : ''}
                                                >
                                                    {activeResume?.experience?.map((exp, i) => (
                                                        <div key={i} className="flex gap-4">
                                                            <div className="flex flex-col items-center">
                                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0 bg-gradient-to-br from-[var(--color-primary)] to-purple-500 shadow-md">
                                                                    {exp.company[0]}
                                                                </div>
                                                                {i < activeResume.experience.length - 1 && (
                                                                    <div className="w-px flex-1 mt-2 bg-[var(--color-border)]" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 pb-6">
                                                                <div className="flex flex-wrap items-center justify-between gap-x-4">
                                                                    <div>
                                                                        <p className="font-black text-[var(--color-text-primary)]">{exp.position}</p>
                                                                        <p className="text-sm font-bold text-[var(--color-primary)]">{exp.company}</p>
                                                                    </div>
                                                                    <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
                                                                        {exp.start_date} – {exp.end_date || 'Present'}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-[var(--color-text-secondary)] mt-3 leading-relaxed line-clamp-3 overflow-hidden">
                                                                    {exp.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {activeResume?.projects?.length > 0 && (
                                        <div className="card p-5">
                                            <h2 className="font-bold text-lg text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                                                <Rocket className="w-5 h-5 text-[var(--color-primary)]" /> Projects
                                            </h2>
                                            <div className="grid gap-4">
                                                {activeResume.projects.map((proj, i) => (
                                                    <div key={i} className="p-4 bg-[var(--color-surface-2)]/30 border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-primary)] transition-all group">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">{proj.name}</h4>
                                                            {proj.link && (
                                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase text-[var(--color-primary)] hover:underline">
                                                                    View Project ↗
                                                                </a>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                                            {proj.description}
                                                        </p>
                                                        {proj.technologies && (
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {proj.technologies.map((tech, j) => (
                                                                    <span key={j} className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider bg-[var(--color-surface-2)] px-2 py-0.5 rounded">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="card p-5">
                                        <h2 className="font-bold text-lg text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                                            <GraduationCap className="w-5 h-5 text-[var(--color-primary)]" /> Education
                                        </h2>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {activeResume?.education?.map((edu, i) => (
                                                <div key={i} className="p-4 bg-[var(--color-surface-2)]/50 border border-[var(--color-border)] rounded-2xl hover:border-[var(--color-primary)] transition-all">
                                                    <h4 className="font-bold text-sm text-[var(--color-text-primary)] leading-tight">{edu.degree}</h4>
                                                    <p className="text-[10px] text-[var(--color-primary)] font-black uppercase mt-1 tracking-tighter">{edu.institution}</p>
                                                    <p className="text-[10px] text-[var(--color-text-muted)] font-bold mt-0.5">{edu.field_of_study}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;
