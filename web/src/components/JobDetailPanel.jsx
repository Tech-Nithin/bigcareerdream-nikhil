import {
    MapPin, Clock, DollarSign, ExternalLink, Wifi, CheckCircle2,
    Share2, X, Briefcase, Award, Code2, Calendar, BadgeCheck, ShieldCheck
} from 'lucide-react';
import { TieIcon, BookmarkIcon } from './CustomIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../api';

const JobDetailPanel = ({ job, onClose, isSaved, isApplied, clientSkills, loading }) => {
    const [showFollowUp, setShowFollowUp] = useState(false);
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const clientId = storedUser?.client_id || 'client-1';
    const [localSaved, setLocalSaved] = useState(isSaved);
    const [localApplied, setLocalApplied] = useState(isApplied);

    useEffect(() => { setLocalSaved(isSaved); }, [isSaved]);
    useEffect(() => { setLocalApplied(isApplied); }, [isApplied]);

    useEffect(() => {
        if (job) {
            setShowFollowUp(false);
        }
    }, [job?.id]);

    if (!job) return null;

    // Build User Skills Regex for highlighting
    const userSkillsArr = (clientSkills || '').split(',').map(s => s.trim()).filter(Boolean);
    const userSkillsRegexString = userSkillsArr.length > 0
        ? `\\b(${userSkillsArr.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`
        : null;

    const handleSaveToggle = async () => {
        const nextSaved = !localSaved;
        setLocalSaved(nextSaved);
        try {
            if (localSaved) {
                await api.unsaveJob(clientId, job.jobId || job.id);
            } else {
                await api.saveJob(clientId, job);
            }
            window.dispatchEvent(new CustomEvent('saved-jobs-updated', { 
                detail: { jobId: job.jobId || job.id, isSaved: nextSaved } 
            }));
        } catch (err) {
            setLocalSaved(isSaved);
            console.error('Error toggling job save:', err);
        }
    };

    const handleApplyClick = () => {
        const targetLink = job.jobUrlExternal || job.jobUrl || '#';
        window.open(targetLink, '_blank', 'noopener,noreferrer');
        setTimeout(() => setShowFollowUp(true), 3000);
    };

    const handleConfirmApplied = async (status) => {
        if (status === 'applied') {
            setLocalApplied(true);
            try {
                await api.applyJob(clientId, job);
                window.dispatchEvent(new CustomEvent('application-submitted', {
                    detail: { jobId: job.jobId || job.id }
                }));
            } catch (err) {
                setLocalApplied(isApplied);
                console.error('Error recording application:', err);
            }
        }
        setShowFollowUp(false);
    };

    // Parse comma-separated fields safely
    const parseCommaString = (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val !== 'string') return [];
        return val.split(',').map(s => s.trim()).filter(Boolean);
    };

    const skillsArr = parseCommaString(job.skills);
    const techArr = parseCommaString(job.techStack);

    const isRemote = job.isRemote === true || ['yes', 'true', 'remote'].includes(String(job.isRemote || '').toLowerCase());

    // Salary display
    const salaryDisplay = job.salary || (job.salaryMin && job.salaryMax
        ? `$${job.salaryMin.toLocaleString()} – $${job.salaryMax.toLocaleString()}${job.salaryInterval ? ' / ' + job.salaryInterval : ''}`
        : null);

    // Logo
    const colorIdx = (job.companyName || '').length % 6;
    const logoGradients = [
        ['#4F46E5', '#818CF8'], ['#DC2626', '#F87171'], ['#059669', '#34D399'],
        ['#D97706', '#FBBF24'], ['#7C3AED', '#A78BFA'], ['#0891B2', '#22D3EE'],
    ];
    const [gFrom, gTo] = logoGradients[colorIdx];

    return (
        <div className="h-full bg-[var(--color-bg)] flex flex-col border-l border-[var(--color-border)] rounded-2xl overflow-hidden relative">

            {/* Follow-up Popup */}
            <AnimatePresence>
                {showFollowUp && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                    >
                        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl shadow-2xl max-w-xs w-full text-center">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Applied for this job?</h4>
                            <p className="text-sm text-[var(--color-text-muted)] mb-6">
                                Did you complete your application for <span className="text-[var(--color-text-primary)] font-medium">{job.title}</span> at {job.companyName}?
                            </p>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => handleConfirmApplied('applied')} className="w-full py-2.5 bg-[var(--color-primary)] text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                                    Yes, I Applied
                                </button>
                                <button onClick={() => handleConfirmApplied('not_applied')} className="w-full py-2.5 bg-[var(--color-surface-2)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-xl font-bold text-sm hover:bg-[var(--color-surface)] transition-colors">
                                    Not Yet
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="p-4 border-b border-[var(--color-border)] rounded-2xl flex items-center justify-between bg-[var(--color-surface)] sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] md:hidden">
                        <X className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">Job Details</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hidden md:block">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-6">

                {/* ── Hero ─────────────────────────────────────────── */}
                <div>
                    {/* Company logo */}
                    {job.companyImageUrl ? (
                        <img src={job.companyImageUrl} alt={job.companyName} className="w-16 h-16 rounded-2xl object-contain border border-[var(--color-border)] bg-white p-1 mb-4 shadow-sm" />
                    ) : (
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg" style={{ background: `linear-gradient(135deg, ${gFrom}, ${gTo})` }}>
                            {job.companyName?.[0] || 'C'}
                        </div>
                    )}

                    <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1 leading-tight">{job.title}</h1>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] mb-4">
                        <span className="font-medium">{job.companyName}</span>
                        <span className="text-[var(--color-text-muted)]">•</span>
                        <span className="text-sm text-[var(--color-text-muted)]">{job.location}</span>
                    </div>

                    {/* Metadata badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {[
                            job.location && { icon: MapPin, text: job.location },
                            isRemote && { icon: Wifi, text: 'Remote' },
                            job.workLocation && !isRemote && { icon: Briefcase, text: job.workLocation },
                            job.contractType && { icon: TieIcon, text: job.contractType },
                            job.w2C2cType && job.w2C2cType !== job.contractType && { icon: BadgeCheck, text: job.w2C2cType },
                            job.visaRequirements && { icon: Award, text: `Visa: ${job.visaRequirements}` },
                            job.workAuthorization && { icon: ShieldCheck, text: `Auth: ${job.workAuthorization}` },
                            job.badgeJobType && { icon: BadgeCheck, text: job.badgeJobType },
                            job.experienceLevel && { icon: Clock, text: job.experienceLevel },
                            job.salaryInterval && salaryDisplay && { icon: DollarSign, text: salaryDisplay },
                            job.postedTime && { icon: Calendar, text: `Posted ${job.postedTime}` },
                        ].filter(Boolean).map(({ icon: Icon, text }, i) => (
                            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]">
                                {Icon && <Icon className="w-3.5 h-3.5" />}{text}
                            </span>
                        ))}
                    </div>

                    {/* Salary highlight */}
                    {salaryDisplay && (
                        <div className="p-3 rounded-xl bg-[var(--color-primary-subtle)]/20 border border-[var(--color-primary)]/20 mb-4">
                            <p className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider mb-0.5">Compensation</p>
                            <p className="text-lg font-black text-[var(--color-primary)]">{salaryDisplay}</p>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleApplyClick}
                            className={`flex-1 btn-primary justify-center py-2.5 text-sm font-bold ${localApplied ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
                            disabled={localApplied}
                        >
                            {localApplied ? 'Application Tracked ✓' : 'Apply Directly'}
                        </button>
                        <button
                            onClick={handleSaveToggle}
                            className={`px-4 rounded-xl border transition-all flex items-center justify-center ${localSaved
                                ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-primary)]'
                                : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]'}`}
                        >
                            <BookmarkIcon className="w-5 h-5" fill={localSaved ? 'currentColor' : 'none'} />
                        </button>
                    </div>
                </div>

                {/* ── Match Score Breakdown ────────────────────────── */}
                <section className="rounded-2xl overflow-hidden border border-[var(--color-border)]">
                    {loading ? (
                        <div className="p-6 space-y-4 animate-pulse">
                            <div className="h-4 bg-[var(--color-surface-2)] rounded w-1/3" />
                            <div className="h-8 bg-[var(--color-surface-2)] rounded w-full" />
                            <div className="space-y-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-10 bg-[var(--color-surface-2)] rounded w-full" />
                                ))}
                            </div>
                        </div>
                    ) : job.finalMatchPercent == null ? (
                        // No scoring data — show a prompt
                        <div className="px-4 py-5 bg-[var(--color-surface)] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl flex-shrink-0">🎯</div>
                            <div>
                                <p className="font-bold text-[var(--color-text-primary)] text-sm">Match Score Breakdown</p>
                                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                                    {storedUser ? "Complete your profile to see how well this job matches you — skills, experience, domain, and location." : "Log in and complete your profile to see how well this job matches you — skills, experience, domain, and location."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header with score */}
                            <div className="px-4 pt-4 pb-3 bg-[var(--color-surface)]">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-[var(--color-text-primary)] text-base flex items-center gap-2">
                                        <span>🎯</span> Match Score Breakdown
                                    </h3>
                                    <div className={`px-3 py-1 rounded-full text-xs font-black ${job.finalMatchPercent >= 80 ? 'bg-green-500/20 text-green-500' :
                                        job.finalMatchPercent >= 50 ? 'bg-amber-500/20 text-amber-500' :
                                            'bg-[var(--color-surface-2)] text-[var(--color-text-muted)]'
                                        }`}>
                                        {job.matchLevel || 'Low Match'}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-[var(--color-text-muted)]">Overall Match</span>
                                        <span className="text-2xl font-black" style={{ color: job.finalMatchPercent >= 80 ? '#22c55e' : job.finalMatchPercent >= 50 ? '#f59e0b' : 'var(--color-text-muted)' }}>
                                            {job.finalMatchPercent}%
                                        </span>
                                    </div>
                                    <div className="h-2.5 w-full rounded-full bg-[var(--color-surface-2)]">
                                        <div
                                            className="h-2.5 rounded-full transition-all duration-700"
                                            style={{
                                                width: `${job.finalMatchPercent}%`,
                                                background: job.finalMatchPercent >= 80 ? 'linear-gradient(90deg, #22c55e, #16a34a)' :
                                                    job.finalMatchPercent >= 50 ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                                                        'linear-gradient(90deg, var(--color-primary), var(--color-primary))'
                                            }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-[var(--color-text-muted)]">
                                        Base 30% + (Score {job.totalScore ?? '?'}/8 × 8%) {job.remoteBonus > 0 ? `+ ${job.remoteBonus}% Remote Bonus` : ''}
                                    </p>
                                </div>
                            </div>

                            {/* Dimension Rows */}
                            <div className="divide-y divide-[var(--color-border)] bg-[var(--color-bg)]">
                                {[
                                    {
                                        label: '⚡ Experience',
                                        score: job.experienceScore ?? 0,
                                        max: 3,
                                        reason: job.experienceScore === 3 ? 'Your experience meets or exceeds the requirement.' :
                                            job.experienceScore === 2 ? 'You are 1 year below the requirement.' :
                                                job.experienceScore === 1 ? 'You are 2 years below the requirement.' :
                                                    'Your experience is significantly below the requirement.'
                                    },
                                    {
                                        label: '🛠 Skills Match',
                                        score: job.skillsScore ?? 0,
                                        max: 3,
                                        reason: job.skillsScore === 3 ? 'Strong overlap (>60%) between your skills and job requirements.' :
                                            job.skillsScore === 2 ? 'Moderate overlap (30–60%) with required skills.' :
                                                job.skillsScore === 1 ? 'Low overlap (<30%) but some skills match.' :
                                                    'None of your skills match the listed requirements.'
                                    },
                                    {
                                        label: '🏢 Domain & Role Match',
                                        score: job.domainScore ?? 0,
                                        max: 1,
                                        reason: job.domainScore === 1 ? 'Job title/description matches your selected domain or job roles.' :
                                            'Job domain does not closely match your profile.'
                                    },
                                    {
                                        label: '📍 Location Match',
                                        score: job.locationScore ?? 0,
                                        max: 1,
                                        reason: job.locationScore === 1 ? 'Job location matches your country.' :
                                            'Job is in a different country than your profile.'
                                    },
                                    ...(job.remoteBonus > 0 ? [{
                                        label: '🌐 Remote Bonus',
                                        score: job.remoteBonus,
                                        max: 3,
                                        reason: 'This job offers remote work, giving you a bonus boost.'
                                    }] : []),
                                ].map(({ label, score, max, reason }) => (
                                    <div key={label} className="px-4 py-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold text-[var(--color-text-primary)]">{label}</span>
                                            <span className="flex items-center gap-1">
                                                {Array.from({ length: max }).map((_, i) => (
                                                    <div key={i} className={`w-4 h-4 rounded-sm ${i < score ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-surface-2)]'}`} />
                                                ))}
                                                <span className="text-[10px] font-black ml-1 text-[var(--color-text-muted)]">{score}/{max}</span>
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">{reason}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Skill-by-skill match */}
                            {(() => {
                                const jobSkills = (job.skills || '').split(/[,|]/).map(s => s.trim().toLowerCase()).filter(Boolean);
                                const userSkills = (clientSkills || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
                                const matched = jobSkills.filter(s => userSkills.some(u => u === s || u.includes(s) || s.includes(u)));
                                const unmatched = jobSkills.filter(s => !matched.includes(s));
                                if (jobSkills.length === 0) return null;
                                return (
                                    <div className="px-4 py-3 bg-[var(--color-surface)]">
                                        <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-3">Skill-by-Skill Breakdown</p>
                                        <div className="flex flex-wrap gap-2">
                                            {matched.map(s => (
                                                <span key={s} className="px-2.5 py-1 rounded-full text-[10px] font-black bg-green-500/15 text-green-500 border border-green-500/30">
                                                    ✓ {s}
                                                </span>
                                            ))}
                                            {unmatched.map(s => (
                                                <span key={s} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                        {matched.length > 0 && (
                                            <p className="text-[10px] text-[var(--color-text-muted)] mt-2">
                                                ✅ {matched.length} of {jobSkills.length} required skills found in your profile
                                            </p>
                                        )}
                                    </div>
                                );
                            })()}
                        </>
                    )}
                </section>

                {/* ── Description ────────────────────────────────── */}
                <section>
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-lg">About the Role</h3>
                    {loading ? (
                        <div className="space-y-3 animate-pulse">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-4 bg-[var(--color-surface-2)] rounded w-full" />
                            ))}
                            <div className="h-4 bg-[var(--color-surface-2)] rounded w-2/3" />
                        </div>
                    ) : job.description ? (
                        <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                            {job.description
                                .replace(/<[^>]*>?/gm, '') // Strip HTML tags
                                .replace(/&nbsp;/g, ' ')   // Decode &nbsp;
                                .replace(/&amp;/g, '&')    // Decode &amp;
                                .replace(/&lt;/g, '<')     // Decode &lt;
                                .replace(/&gt;/g, '>')     // Decode &gt;
                                .replace(/&quot;/g, '"')   // Decode &quot;
                                .split('\n').reduce((acc, line, li) => {
                                    const trimmed = line.trim();

                                    // Empty line → spacer
                                    if (trimmed === '') {
                                        acc.elements.push(<div key={`spacer-${li}`} className="mb-4" />);
                                        return acc;
                                    }

                                    const endsWithColon = trimmed.endsWith(':');
                                    const isHeading = !acc.prevWasLabel && (
                                        endsWithColon || (
                                            trimmed.length > 0 &&
                                            trimmed.length <= 60 &&
                                            /^[A-Z]/.test(trimmed) &&
                                            !/[.,;:!?]$/.test(trimmed) &&
                                            !/^[-•*]/.test(trimmed) &&
                                            trimmed.split(/\s+/).length > 1
                                        )
                                    );

                                    acc.prevWasLabel = endsWithColon;

                                    if (isHeading) {
                                        acc.elements.push(
                                            <p
                                                key={`heading-${li}`}
                                                className="mt-6 mb-2 pl-3 font-bold text-[var(--color-primary)] text-[10px] uppercase tracking-wider"
                                                style={{ borderLeft: '3px solid var(--color-primary)' }}
                                            >
                                                {trimmed}
                                            </p>
                                        );
                                        return acc;
                                    }

                                    // Body text: split into sentences for bullet points
                                    const sentences = trimmed
                                        .split(/\.\s+/)
                                        .map(s => s.trim())
                                        .filter(Boolean);

                                    if (sentences.length === 0) return acc;

                                    const sentenceItems = sentences.map((s, si) => {
                                        // Add back the dot if it was stripped by split
                                        const sentenceText = s.endsWith('.') ? s : s + '.';

                                        // Highlighting logic
                                        const CAT_A_REGEX = /\b(H-?1B|H-?4|F-?1|OPT|STEM OPT|CPT|L-?1|O-?1|TN|E-?2|E-?3|EB-?1|EB-?2|EB-?3|Green Card|GC|I-?9|SSN|ITIN|H-?4 EAD)\b/gi;
                                        const CAT_B_REGEX = /\b(W-?2|1099|C2C|C2H|Contract-to-Hire|401\(k\)|H-?1B Transfer|GC Holder|USC|US Citizen|2080 hours|60\/40 contract|SOC 2|ISO 27001|HIPAA|PCI-DSS)\b/gi;
                                        const NUM_REGEX = /(\$?\d[\d,]*(?:\.\d+)?[+%]?(?:k|K|m|M)?(?:\/(?:hr|yr|mo|hour|year|month))?)/gi;

                                        const userRegexSource = userSkillsRegexString ? `|${userSkillsRegexString}` : '';
                                        const COMBINED_RE = new RegExp(`${CAT_B_REGEX.source}|${CAT_A_REGEX.source}|${NUM_REGEX.source}${userRegexSource}`, 'gi');

                                        const parts = [];
                                        let cursor = 0;
                                        const matches = Array.from(sentenceText.matchAll(COMBINED_RE));

                                        for (const m of matches) {
                                            if (m.index > cursor) {
                                                parts.push(<span key={`t${cursor}`}>{sentenceText.slice(cursor, m.index)}</span>);
                                            }
                                            const text = m[0];
                                            let style = {};
                                            let className = "inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded-md text-[10px] font-black transition-colors";
                                            const isCatA = new RegExp(`^${CAT_A_REGEX.source}$`, 'i').test(text);

                                            if (isCatA) {
                                                className += " bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-500/20";
                                            } else {
                                                style = { backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' };
                                            }

                                            parts.push(
                                                <span key={`m${m.index}`} className={className} style={style}>
                                                    {text}
                                                </span>
                                            );
                                            cursor = m.index + text.length;
                                        }

                                        if (cursor < sentenceText.length) {
                                            parts.push(<span key={`t${cursor}`}>{sentenceText.slice(cursor)}</span>);
                                        }

                                        return (
                                            <li key={si} className="mb-2 pl-1">
                                                {parts.length ? parts : sentenceText}
                                            </li>
                                        );
                                    });

                                    acc.elements.push(
                                        <ul key={`list-${li}`} className="list-disc pl-5 mb-4 space-y-1 text-sm text-[var(--color-text-secondary)]">
                                            {sentenceItems}
                                        </ul>
                                    );
                                    return acc;
                                }, { elements: [], prevWasLabel: false }).elements}

                        </div>
                    ) : (
                        <p className="text-sm text-[var(--color-text-muted)] italic">No description available for this position.</p>
                    )}
                </section>




                {/* ── Skills ─────────────────────────────────────── */}
                {
                    skillsArr.length > 0 && (
                        <section>
                            <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-lg flex items-center gap-2">
                                <Award className="w-5 h-5 text-[var(--color-primary)]" /> Required Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skillsArr.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold border border-[var(--color-primary)]/30 bg-[var(--color-primary-subtle)]/20 text-[var(--color-primary)]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )
                }

                {/* ── Tech Stack ─────────────────────────────────── */}
                {
                    techArr.length > 0 && (
                        <section>
                            <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-lg flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-[var(--color-primary)]" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {techArr.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )
                }

                {/* ── Meta info table ────────────────────────────── */}
                <section className="p-4 rounded-2xl bg-[var(--color-surface-2)]/50 border border-[var(--color-border)] space-y-2">
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-3 text-sm uppercase tracking-wider">Job Details</h3>
                    {[
                        { label: 'Employment Type', value: job.contractType || job.badgeJobType },
                        { label: 'Contract Type', value: job.w2C2cType },
                        { label: 'Visa Requirements', value: job.visaRequirements },
                        { label: 'Work Authorization', value: job.workAuthorization },
                        { label: 'Normalized Title', value: job.normalizedTitle },
                        { label: 'Industry/Domain', value: job.domain },
                        { label: 'Seniority Level', value: job.seniorityLevel },
                        { label: 'Easy Apply', value: job.isEasyApply ? 'Yes' : 'No' },
                        { label: 'Work Location', value: job.workLocation },
                        { label: 'Remote', value: job.isRemote ? 'Yes' : 'No' },
                        { label: 'Experience', value: job.experienceLevel },
                        { label: 'Salary Min', value: job.salaryMin ? `$${Number(job.salaryMin).toLocaleString()}` : null },
                        { label: 'Salary Max', value: job.salaryMax ? `$${Number(job.salaryMax).toLocaleString()}` : null },
                        { label: 'Salary Interval', value: job.salaryInterval },
                        { label: 'Date Posted', value: job.postedTime },
                        { label: 'Source Platform', value: job.platform || 'Dice.com' },
                    ].filter(r => r.value).map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-xs">
                            <span className="text-[var(--color-text-muted)] font-medium">{label}</span>
                            <span className="text-[var(--color-text-primary)] font-semibold text-right max-w-[60%] truncate">{value}</span>
                        </div>
                    ))}
                </section>

                {/* ── Footer Actions ──────────────────────────────── */}
                <section className="flex gap-3 pt-6 border-t border-[var(--color-border)]">
                    <button
                        onClick={handleSaveToggle}
                        className={`px-6 rounded-xl border transition-all flex items-center justify-center ${localSaved
                            ? 'border-red-500 bg-red-500/10 text-red-500'
                            : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]'}`}
                        title={localSaved ? "Remove from Saved" : "Save Job"}
                    >
                        <BookmarkIcon className="w-5 h-5" fill={localSaved ? 'currentColor' : 'none'} />
                        {localSaved && <span className="ml-2 text-xs font-bold">Remove</span>}
                    </button>
                    <button
                        onClick={handleApplyClick}
                        className={`flex-1 btn-primary justify-center py-3 text-sm font-bold ${localApplied ? 'opacity-60 grayscale cursor-not-allowed' : ''}`}
                        disabled={localApplied}
                    >
                        {localApplied ? 'Application Tracked ✓' : 'Apply Directly'}
                    </button>
                </section>

            </div >
        </div >
    );
};

export default JobDetailPanel;
