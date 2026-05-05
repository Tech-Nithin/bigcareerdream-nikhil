import { MapPin, Clock, Briefcase, DollarSign, Wifi, Building2, ExternalLink } from 'lucide-react';
import { BookmarkIcon } from './CustomIcons';
import { useState, useEffect, memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import api from '../api';
import CircularProgress from './CircularProgress';

const JobCard = memo(({ job, isExpanded, onToggleExpand, className, id, isSaved, isApplied, tab }) => {
    const { isDark } = useTheme();
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const clientId = storedUser?.client_id || 'client-1';

    const [localSaved, setLocalSaved] = useState(isSaved);
    const [localApplied, setLocalApplied] = useState(isApplied);

    useEffect(() => { setLocalSaved(isSaved); }, [isSaved]);
    useEffect(() => { setLocalApplied(isApplied); }, [isApplied]);

    const handleSaveToggle = async (e) => {
        e.stopPropagation();
        const nextSaved = !localSaved;
        setLocalSaved(nextSaved); // Optimistic

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
            setLocalSaved(isSaved); // Rollback
            console.error('Error toggling job save:', err);
        }
    };

    // Use real match scores from API
    const matchScore = job?.finalMatchPercent;
    const getMatchLabel = (score) => {
        return job?.matchLevel || 'Fair';
    };

    // Logo gradient colours seeded by company name
    const colorIdx = (job?.companyName || '').length % 6;
    const logoColors = [
        ['#4F46E5', '#818CF8'], ['#DC2626', '#F87171'], ['#059669', '#34D399'],
        ['#D97706', '#FBBF24'], ['#7C3AED', '#A78BFA'], ['#0891B2', '#22D3EE']
    ];
    const [logoFrom, logoTo] = logoColors[colorIdx];

    // Parse skills string into an array safely
    const parseCommaString = (val) => {
        if (Array.isArray(val)) return val;
        if (typeof val !== 'string') return [];
        return val.split(',').map(s => s.trim()).filter(Boolean);
    };

    const skillsArr = parseCommaString(job?.skills).slice(0, 4);

    const isRemote = job?.isRemote === true || ['yes', 'true', 'remote'].includes(String(job?.isRemote || '').toLowerCase());

    return (
        <article
            id={id}
            className={`group relative rounded-2xl border bg-[var(--color-surface)] shadow-lg hover:shadow-md hover:border-[var(--color-primary)]/60 transition-all duration-200 cursor-pointer overflow-hidden flex ${className}`}
            style={{ borderColor: 'var(--color-border)' }}
            onClick={onToggleExpand}
        >
            {/* LEFT: Main Content */}
            <div className="flex-1 p-3 flex gap-3 min-w-0 flex-col">
                <div className="flex gap-3">
                    {/* Logo: real image or gradient initial */}
                    {job?.companyImageUrl ? (
                        <img
                            src={job.companyImageUrl}
                            alt={job.companyName}
                            className="w-12 h-12 rounded-lg object-contain bg-white flex-shrink-0 p-0.5 opacity-90"
                            style={{ border: '1px solid var(--color-border-subtle)' }}
                            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                        />
                    ) : null}
                    <div
                        className="w-10 h-10 rounded-lg items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm"
                        style={{
                            background: `linear-gradient(135deg, ${logoFrom}, ${logoTo})`,
                            display: job?.companyImageUrl ? 'none' : 'flex',
                        }}
                    >
                        {(job?.companyName || 'C')[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-[var(--color-text-primary)] leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                            {job?.title}
                        </h3>
                        <div className="text-xs text-[var(--color-text-secondary)] font-medium mt-0.5 flex items-center gap-1.5 truncate">
                            <span className="text-[var(--color-text-primary)]">{job?.companyName}</span>
                            &nbsp;&nbsp; &nbsp;&nbsp;
                            <MapPin className="w-3 h-3 text-[var(--color-text-disabled)]" />
                            <span className="truncate">{job?.location}</span>
                            &nbsp;&nbsp; &nbsp;&nbsp;
                            {isRemote && (
                                <span className="flex items-center gap-0.5 text-[var(--color-primary)] font-semibold ml-1">
                                    <Wifi className="w-3 h-3" /> Remote
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Metadata Pills */}
                <div className="flex flex-wrap gap-1.5 mt-0.5 pl-13">
                    {[
                        job?.contractType && { label: job.contractType },
                        job?.w2C2cType && job.w2C2cType !== job.contractType && { label: job.w2C2cType, highlight: true },
                        job?.visaRequirements && { label: `Visa: ${job.visaRequirements}`, highlight: true },
                        job?.experienceLevel && { label: job.experienceLevel },
                        (job?.salary || job?.salaryMin) && { 
                            label: job.salary || `$${(job.salaryMin/1000).toFixed(0)}k-$${(job.salaryMax/1000).toFixed(0)}k`, 
                            icon: DollarSign 
                        },
                    ].filter(Boolean).map((item, i) => {
                        const isHighlight = item.highlight || (item.label && String(item.label).toLowerCase().match(/w2|c2c|visa|h1b/));
                        return (
                            <span
                                key={i}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap flex items-center gap-1 ${isHighlight
                                    ? 'bg-[var(--color-primary)] text-white border-transparent'
                                    : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
                                    }`}
                            >
                                {item.icon && <item.icon className="w-2.5 h-2.5" />}
                                {item.label}
                            </span>
                        );
                    })}
                </div>

                {/* Skills chips */}
                {skillsArr.length > 0 && (
                    <div className="flex flex-wrap gap-1 pl-13">
                        {skillsArr.map((skill, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded text-[10px] font-medium text-[var(--color-text-muted)] whitespace-nowrap" style={{ border: '1px solid var(--color-border-subtle)' }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-1 pl-13">
                    <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
                        {job?.postedTime && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {job.postedTime}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            {isRemote ? <Wifi className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                            {isRemote ? 'Remote' : 'On-site'}
                        </span>

                        {tab === 'liked' ? (
                            <button
                                onClick={handleSaveToggle}
                                className="px-3 py-1 rounded-lg text-xs font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors"
                            >
                                Remove
                            </button>
                        ) : (
                            <button
                                onClick={handleSaveToggle}
                                className={`p-1 rounded-full transition-colors ml-1 ${localSaved ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-2)]'}`}
                                title={localSaved ? "Remove from Saved" : "Save Job"}
                            >
                                <BookmarkIcon className="w-4 h-4" fill={localSaved ? 'currentColor' : 'none'} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT: Match Score */}
            <div className="p-2 flex-shrink-0 flex flex-col items-center justify-center gap-2 min-w-[100px]">
                {matchScore != null ? (
                    <CircularProgress
                        percentage={matchScore}
                        size={64}
                        strokeWidth={5}
                    />
                ) : (
                    <div
                        className="rounded-full border-4 border-dashed flex items-center justify-center"
                        style={{ width: 64, height: 64, borderColor: 'var(--color-border)' }}
                    >
                        <span className="text-xl font-black text-[var(--color-text-muted)]">?</span>
                    </div>
                )}
                <div className="flex flex-col items-center">
                    {localApplied ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[8px] font-black uppercase tracking-tighter shadow-sm">
                            Applied
                        </span>
                    ) : (
                        <span className={`text-[9px] font-bold uppercase tracking-widest opacity-90 ${isDark ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'}`}>
                            {matchScore != null ? getMatchLabel(matchScore) : 'Complete Profile'}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
});

export default JobCard;