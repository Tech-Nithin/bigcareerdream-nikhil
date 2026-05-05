// web/src/pages/JobListingPage.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, ChevronDown, ChevronRight, ChevronLeft, Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';
import JobCard from '../components/JobCard';
import Marquee from '../components/Marquee';
import AWizzardPanel from '../components/AWizzardPanel';
import JobDetailPanel from '../components/JobDetailPanel';
import api from '../api';
import DatePicker from '../components/DatePicker';
import * as idb from '../utils/idb';
import { Timer } from 'lucide-react';

// Lazy-like embedding for advanced features
import ProfilePage from './ProfilePage';
import MessagingPage from './MessagingPage';
import NotificationsPage from './NotificationsPage';

// ── Normaliser: maps dice_job_links row → component-friendly shape ─────────
const normaliseJob = (row) => ({
    // Identity
    id: row.id || row.job_id || row.jobId,
    jobId: row.job_id || row.jobId || row.id,

    // Display
    title: row.job_title || row.title || 'Untitled Position',
    companyName: row.company_name || row.company || 'Unknown Company',
    companyImageUrl: row.company_logo_url || row.company_image_url || row.company_logo || null,

    // Location
    location: row.location_display || row.location || [row.location_city || row.city, row.location_state || row.state, row.location_country || row.country].filter(Boolean).join(', ') || 'Unknown Location',
    locationCity: row.location_city || row.city,
    locationState: row.location_state || row.state,
    locationCountry: row.location_country || row.country,
    isRemote: row.is_remote || row.work_mode === 'Remote' || row.remote_eligible,
    workLocation: row.work_mode || row.work_location,

    // Type & employment
    contractType: row.contract_type || row.employment_type?.replace('_', '-') || row.badge_job_type || null,
    jobTypeLabel: row.job_type_label || row.time_type,
    w2C2cType: row.w2_c2c_type,
    badgeJobType: row.badge_job_type,

    // Pay
    salary: row.salary || null,
    salaryMin: row.salary_min,
    salaryMax: row.salary_max,
    salaryInterval: row.salary_interval,

    // Experience & skills
    experienceLevel: row.experience || row.experience_level || (row.experience_min && row.experience_max ? `${row.experience_min}–${row.experience_max} years` : row.experience_min ? `${row.experience_min}+ years` : null),
    seniorityLevel: row.seniority_level,
    isEasyApply: !!row.is_easy_apply,
    skills: row.skills || null,
    techStack: row.tech_stack || null,

    // Time
    postedTime: row.created_at_utc || row.date_posted || row.posted_date || null,
    scrapedAt: row.scraped_at,
    createdAt: row.created_at,
    savedAt: row.saved_at,
    appliedAt: row.applied_at,

    // Links
    applyLink: row.job_url_external || row.apply_url || row.job_url || '#',
    jobUrl: row.job_url,
    jobUrlExternal: row.job_url_external,

    // Content
    description: row.description || null,
    visaRequirements: row.visa_requirements,
    workAuthorization: row.work_authorization,
    domain: row.domain,
    platform: row.platform,
    normalizedTitle: row.normalized_title,

    // Matching Scores
    experienceScore: row.experience_score,
    skillsScore: row.skills_score,
    domainScore: row.domain_score,
    locationScore: row.location_score,
    totalScore: row.total_score,
    finalMatchPercent: row.final_match_percent,
    matchLevel: row.match_level,
});

// Domain chips for filtering
const DOMAINS = ['All', 'React', 'Python', 'Node.js', 'AWS', 'Java', 'SQL'];

const JobListingPage = () => {
    const { setSidebarCollapsed, isChatOpen, setChatOpen } = useLayout();
    const { selectedFilter } = useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentTab = searchParams.get('tab') || 'jobs';

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [searchQ, setSearchQ] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('All');
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [clientSkills, setClientSkills] = useState('');
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [scannedTotal, setScannedTotal] = useState(0);
    const [detailsLoading, setDetailsLoading] = useState(false);

    // Sync selected job to URL for persistence across reloads
    useEffect(() => {
        if (selectedJob) {
            const jobId = selectedJob.jobId || selectedJob.id;
            if (jobId && searchParams.get('job') !== String(jobId)) {
                searchParams.set('job', String(jobId));
                setSearchParams(searchParams, { replace: true });
            }
        }
    }, [selectedJob, searchParams, setSearchParams]);
    const [clientId, setClientId] = useState(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        return storedUser?.client_id || 'client-1';
    });

    const [countdown, setCountdown] = useState(300); // 5 minutes
    const [showTimer, setShowTimer] = useState(false);

    // Listen for login/logout events to update clientId and refetch
    useEffect(() => {
        const handleAuthChange = () => {
            const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
            setClientId(storedUser?.client_id || 'client-1');
        };
        window.addEventListener('storage', handleAuthChange);
        window.addEventListener('user_logged_in', handleAuthChange);
        return () => {
            window.removeEventListener('storage', handleAuthChange);
            window.removeEventListener('user_logged_in', handleAuthChange);
        };
    }, []);



    // User job state
    const [savedJobIds, setSavedJobIds] = useState(new Set());
    const [appliedJobIds, setAppliedJobIds] = useState(new Set());

    // Always derive page from URL — single source of truth
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const jobsPerPage = 10;

    // Applied Jobs Logic
    const [expandedDates, setExpandedDates] = useState({});
    const [savedJobsVersion, setSavedJobsVersion] = useState(0);

    // Refs
    const debounceRef = useRef(null);
    const jobListRef = useRef(null);
    const prevDomainRef = useRef(selectedDomain);
    const prevSearchRef = useRef(searchQ);

    // ── Timer Effect ──────────────────────────────────────────────────────
    useEffect(() => {
        let timer;
        if (showTimer && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setShowTimer(false);
        }
        return () => clearInterval(timer);
    }, [showTimer, countdown]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // ── Fetch from Supabase (via Express) ──────────────────────────────────
    const fetchJobs = useCallback(async (searchTerm = '', page = 1, currentFilter = selectedFilter, date = selectedDate, forceRefresh = false) => {
        setLoading(true);
        setError(null);
        try {
            let result;

            // ── Scored tabs: Jobs, Quick Apply, LinkedIn, W2 ────────────────
            const scoredTabs = ['jobs', 'quick-apply', 'linkedin-apply', 'w2-c2c'];
            if (scoredTabs.includes(currentTab)) {
                // Tab → API function + IDB store key
                const tabConfig = {
                    'jobs': { fetch: () => api.getWorkdayJobs({ client_id: clientId, page: 1, limit: 500 }) },
                    'quick-apply': { fetch: () => api.getQuickApplyJobs({ client_id: clientId, page: 1, limit: 500 }) },
                    'linkedin-apply': { fetch: () => api.getLinkedInApplyJobs({ client_id: clientId, page: 1, limit: 500 }) },
                    'w2-c2c': { fetch: () => api.getW2Jobs({ client_id: clientId, page: 1, limit: 500 }) },
                };

                // 1. Try tab-specific IDB cache
                const cachedJobs = await idb.getJobs(currentTab);
                if (cachedJobs.length > 0 && !forceRefresh) {
                    const meta = await idb.getMetadata(currentTab);
                    cachedJobs.sort((a, b) => (b.finalMatchPercent || b.final_match_percent || 0) - (a.finalMatchPercent || a.final_match_percent || 0));
                    const pageJobs = cachedJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
                    setJobs(pageJobs);
                    setTotal(meta.total || cachedJobs.length);
                    setScannedTotal(meta.scannedTotal || 0);
                    setIsPersonalized(true);
                    if (window.innerWidth >= 1024 && pageJobs.length > 0) {
                        const urlJobId = searchParams.get('job');
                        const found = urlJobId ? pageJobs.find(j => String(j.id) === String(urlJobId) || String(j.jobId) === String(urlJobId)) : null;
                        setSelectedJob(found || pageJobs[0]);
                        if (found) {
                            setTimeout(() => {
                                const jobElement = document.getElementById(`job-card-${urlJobId}`);
                                if (jobElement) jobElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                        }
                    }
                    setLoading(false);
                    return;
                }

                // 2. No cache — show timer and fetch ALL
                if (!forceRefresh) setShowTimer(true);
                result = await tabConfig[currentTab].fetch();

                if (result.success) {
                    let normalised = result.data.map(row => ({ ...normaliseJob(row) }));
                    normalised.sort((a, b) => (b.finalMatchPercent || 0) - (a.finalMatchPercent || 0));

                    const totalCount = result.total || normalised.length;
                    const scanned = result.scannedTotal || 0;

                    // Cache all and store metadata
                    await idb.saveJobs(normalised, currentTab);
                    await idb.saveMetadata({ total: totalCount, scannedTotal: scanned }, currentTab);

                    // Paginate for display
                    const pageJobs = normalised.slice((page - 1) * jobsPerPage, page * jobsPerPage);
                    setJobs(pageJobs);
                    setTotal(totalCount);
                    setScannedTotal(scanned);
                    setIsPersonalized(true);
                    if (result.client_skills) setClientSkills(result.client_skills);
                    setShowTimer(false);

                    if (window.innerWidth >= 1024 && pageJobs.length > 0) {
                        const urlJobId = searchParams.get('job');
                        const found = urlJobId ? pageJobs.find(j => String(j.id) === String(urlJobId) || String(j.jobId) === String(urlJobId)) : null;
                        setSelectedJob(found || pageJobs[0]);
                        if (found) {
                            setTimeout(() => {
                                const jobElement = document.getElementById(`job-card-${urlJobId}`);
                                if (jobElement) jobElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                        }
                    }
                } else {
                    setError(result.error || 'Failed to fetch jobs');
                    setShowTimer(false);
                }
                setLoading(false);
                return;
            }

            // ── Non-scored tabs: liked, applied ─────────────────────────────
            if (currentTab === 'liked') {
                result = await api.getSavedJobs(clientId);
            } else if (currentTab === 'applied') {
                result = await api.getAppliedJobs(clientId);
            } else {
                // Staffing Agency fallback → dice-jobs
                const offset = (page - 1) * jobsPerPage;
                result = await api.getDiceJobs({ search: searchTerm, filter: 'Staffing Agency', limit: jobsPerPage, offset, date, client_id: clientId, forceRefresh });
            }

            if (result.success) {
                let normalised = result.data.map(row => ({
                    ...normaliseJob(row),
                    savedAt: row.saved_at,
                    appliedAt: row.applied_at
                }));

                if ((currentTab === 'liked' || currentTab === 'applied') && searchTerm) {
                    const q = searchTerm.toLowerCase();
                    normalised = normalised.filter(j =>
                        j.title?.toLowerCase().includes(q) ||
                        j.companyName?.toLowerCase().includes(q) ||
                        j.skills?.toLowerCase().includes(q)
                    );
                }

                setJobs(normalised);
                setTotal(result.total || normalised.length);
                setIsPersonalized(result.isPersonalized || false);
                setScannedTotal(result.scannedTotal || 0);
                if (result.client_skills) setClientSkills(result.client_skills);

                // Restore selected job from URL param or select first
                if (window.innerWidth >= 1024 && normalised.length > 0) {
                    const urlJobId = searchParams.get('job');
                    const found = urlJobId ? normalised.find(j => String(j.id) === String(urlJobId) || String(j.jobId) === String(urlJobId)) : null;
                    setSelectedJob(found || normalised[0]);
                    if (found) {
                        setTimeout(() => {
                            const jobElement = document.getElementById(`job-card-${urlJobId}`);
                            if (jobElement) jobElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                    }
                }
            } else {
                setError(result.error || 'Failed to fetch jobs');
                setShowTimer(false);
            }
        } catch (err) {
            setError('Could not connect to the server. Make sure it is running.');
            setShowTimer(false);
        } finally {
            setLoading(false);
        }
    }, [jobsPerPage, currentTab, clientId]);

    // ── Main effect: handles initial load + domain/tab changes ─────────────
    useEffect(() => {
        // Clear selection when tab changes
        setSelectedJob(null);
        const domainSearch = selectedDomain === 'All' ? '' : selectedDomain;
        fetchJobs(domainSearch || searchQ, currentPage, selectedFilter, selectedDate);
    }, [currentTab, selectedDomain, selectedFilter, currentPage, selectedDate, fetchJobs]); // searchQ is handled by the debouncer separately

    // Listen for manual hard refresh
    useEffect(() => {
        const handleHardRefresh = () => {
            fetchJobs(searchQ, currentPage, selectedFilter, selectedDate, true);
        };
        window.addEventListener('hard_refresh_jobs', handleHardRefresh);
        return () => window.removeEventListener('hard_refresh_jobs', handleHardRefresh);
    }, [fetchJobs, searchQ, currentPage, selectedFilter, selectedDate]);

    // ── Reset page to 1 when domain changes ────────────────────────────────
    useEffect(() => {
        if (prevDomainRef.current !== selectedDomain) {
            prevDomainRef.current = selectedDomain;
            setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                if (next.get('page') !== '1') next.set('page', '1');
                next.delete('job'); // Reset selection too
                return next;
            }, { replace: true });
        }
    }, [selectedDomain]);

    // ── Debounced search ───────────────────────────────────────────────────
    useEffect(() => {
        if (!['jobs', 'w2-c2c', 'linkedin-apply', 'staffing-agency', 'quick-apply'].includes(currentTab)) return;
        if (prevSearchRef.current === searchQ) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            prevSearchRef.current = searchQ;
            setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                if (next.get('page') !== '1') next.set('page', '1');
                return next;
            }, { replace: true });

            const domainSearch = selectedDomain === 'All' ? '' : selectedDomain;
            fetchJobs(domainSearch || searchQ, 1, selectedFilter, selectedDate);
        }, 400);
        return () => clearTimeout(debounceRef.current);
    }, [searchQ, selectedFilter]);

    useEffect(() => {
        setSidebarCollapsed(isChatOpen);
    }, [isChatOpen, setSidebarCollapsed]);


    const fetchUserStats = useCallback(async () => {
        try {
            const [savedRes, appliedRes] = await Promise.all([
                api.getSavedJobs(clientId),
                api.getAppliedJobs(clientId)
            ]);
            if (savedRes.success) setSavedJobIds(new Set(savedRes.data.map(j => String(j.job_id))));
            if (appliedRes.success) setAppliedJobIds(new Set(appliedRes.data.map(j => String(j.job_id))));
        } catch (err) {
            console.error('Error fetching user job stats:', err);
        }
    }, [clientId]);

    useEffect(() => {
        fetchUserStats();
    }, [fetchUserStats, savedJobsVersion]);

    useEffect(() => {
        const handleSaveUpdate = (e) => {
            const { jobId, isSaved } = e.detail || {};
            if (!jobId) return;
            setSavedJobIds(prev => {
                const next = new Set(prev);
                if (isSaved) next.add(String(jobId));
                else next.delete(String(jobId));
                return next;
            });
        };
        const handleApplyUpdate = (e) => {
            const { jobId } = e.detail || {};
            if (!jobId) return;
            setAppliedJobIds(prev => {
                const next = new Set(prev);
                next.add(String(jobId));
                return next;
            });
        };

        window.addEventListener('saved-jobs-updated', handleSaveUpdate);
        window.addEventListener('application-submitted', handleApplyUpdate);
        return () => {
            window.removeEventListener('saved-jobs-updated', handleSaveUpdate);
            window.removeEventListener('application-submitted', handleApplyUpdate);
        };
    }, []);

    // ── Filtering ──────────────────────────────────────────────────────────
    const getFilteredJobs = () => {
        if (currentTab === 'liked' || currentTab === 'applied') {
            return jobs;
        }
        return jobs;
    };

    const filtered = getFilteredJobs();

    // Group Jobs by Date (Saved or Applied)
    const groupJobsByDate = (jobList, dateField) => {
        const groups = {};
        jobList.forEach(job => {
            const rawDate = job[dateField] || job.appliedDate || job.savedAt;
            const date = rawDate ? new Date(rawDate).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            }) : 'Unknown Date';
            if (!groups[date]) groups[date] = [];
            groups[date].push(job);
        });
        return groups;
    };

    const handleJobClick = useCallback(async (job) => {
        // Set basic info immediately for instant UI response
        setSelectedJob(job);

        // If we don't have the description, fetch full details
        if (!job.description) {
            setDetailsLoading(true);
            try {
                const result = await api.getJobDetails(job.id, clientId);
                if (result.success) {
                    const fullJob = { ...job, ...normaliseJob(result.data) };
                    setSelectedJob(fullJob);
                    setJobs(prev => prev.map(j => j.id === job.id ? fullJob : j));
                }
            } catch (err) {
                console.error('Error fetching job details:', err);
            } finally {
                setDetailsLoading(false);
            }
        }
    }, [clientId]);

    const toggleDateGroup = (date) => setExpandedDates(prev => ({ ...prev, [date]: !prev[date] }));

    // ── Pagination handler ─────────────────────────────────────────────────
    const goToPage = (newPage) => {
        if (jobListRef.current) jobListRef.current.scrollTop = 0;
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set('page', String(newPage));
            next.delete('job'); // Clear selection when moving to a new page
            return next;
        }, { replace: true });
    };

    // ── Render helpers ─────────────────────────────────────────────────────
    const renderSecondaryContent = () => {
        if (selectedJob) {
            return (
                <div className="h-full overflow-hidden flex flex-col relative w-full">
                    <JobDetailPanel
                        job={selectedJob}
                        onClose={() => setSelectedJob(null)}
                        isSaved={savedJobIds.has(String(selectedJob.jobId || selectedJob.id))}
                        isApplied={appliedJobIds.has(String(selectedJob.jobId || selectedJob.id))}
                        clientSkills={clientSkills}
                        loading={detailsLoading}
                    />
                </div>
            );
        }
        return (
            <div className="flex-1 flex items-center justify-center text-[var(--color-text-muted)] flex-col gap-3">
                <div className="w-16 h-16 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center">
                    <Search className="w-8 h-8 opacity-20" />
                </div>
                <p>Select a job to view details</p>
            </div>
        );
    };

    const renderJobList = () => {
        if (currentTab === 'staffing-agency') {
            return (
                <div className="py-20 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-20 h-20 bg-[var(--color-surface-2)] rounded-full flex items-center justify-center mb-6 border border-[var(--color-border)] shadow-sm">
                        <Search className="w-10 h-10 text-[var(--color-primary)] opacity-20" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                        Not built yet
                    </h3>
                    <p className="text-[var(--color-text-muted)] max-w-sm mb-8">
                        The "Staffing Agency" feature is currently under professional development. Come back soon for AI-powered agency insights.
                    </p>
                    <button onClick={() => navigate('/jobs?tab=jobs')} className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all">
                        Explore Other Jobs
                    </button>
                </div>
            );
        }

        if (loading) {
            return [...Array(6)].map((_, i) => <div key={i} className="skeleton h-28 w-full rounded-lg" />);
        }
        if (error) {
            return (
                <div className="py-12 text-center space-y-3">
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                    <button onClick={() => fetchJobs(searchQ)} className="text-[var(--color-primary)] text-xs font-bold hover:underline">
                        Retry
                    </button>
                </div>
            );
        }

        if (showTimer) {
            return (
                <div className="py-20 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-20 h-20 bg-[var(--color-primary-subtle)] rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <Timer className="w-10 h-10 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                        Scoring the best jobs for you...
                    </h3>
                    <p className="text-[var(--color-text-muted)] max-w-md mb-8">
                        Our AI is deeply analyzing 24 hours of job data to match your skills and experience. It takes about 5 minutes to deliver high-accuracy results.
                    </p>
                    <div className="bg-[var(--color-surface-2)] px-8 py-4 rounded-2xl border border-[var(--color-border)] shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] block mb-1">Time Remaining</span>
                        <span className="text-4xl font-black text-[var(--color-primary)] tabular-nums">
                            {formatTime(countdown)}
                        </span>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Analysis in progress...</span>
                    </div>
                </div>
            );
        }

        if (currentTab === 'applied' || currentTab === 'liked') {
            const dateField = currentTab === 'applied' ? 'appliedAt' : 'savedAt';
            const labelPrefix = currentTab === 'applied' ? 'Applied on' : 'Saved on';
            const groups = groupJobsByDate(filtered, dateField);

            return Object.entries(groups).map(([date, dateJobs]) => (
                <div key={date} className="mb-8 last:mb-0">
                    <button
                        onClick={() => toggleDateGroup(date)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-[var(--color-surface-2)] rounded-xl transition-all group mb-2 border border-transparent hover:border-[var(--color-border)] shadow-sm hover:shadow"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${expandedDates[date] !== false ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)]'}`}>
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start overflow-hidden">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] leading-none mb-1">{labelPrefix}</span>
                            <span className="text-[15px] font-bold text-[var(--color-text-primary)] leading-none">{date}</span>
                        </div>
                        <div className="ml-auto flex items-center gap-4">
                            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[var(--color-surface-2)] text-[var(--color-text-muted)] group-hover:bg-[var(--color-primary-subtle)] group-hover:text-[var(--color-primary)] transition-colors">
                                {dateJobs.length} {dateJobs.length === 1 ? 'Job' : 'Jobs'}
                            </span>
                            {expandedDates[date] !== false ? <ChevronDown className="w-4 h-4 text-[var(--color-primary)]" /> : <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />}
                        </div>
                    </button>
                    <AnimatePresence mode="popLayout">
                        {expandedDates[date] !== false && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden space-y-2 pl-6"
                            >
                                {dateJobs.map(job => (
                                    <motion.div
                                        key={`${job.id || job.jobId || Math.random()}-${date}`}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <JobCard
                                            job={job}
                                            onToggleExpand={() => handleJobClick(job)}
                                            className={selectedJob?.id === job.id ? 'ring-2 ring-[var(--color-primary)] bg-[var(--color-primary-subtle)]' : ''}
                                            id={`job-card-${job.id}`}
                                            isSaved={savedJobIds.has(String(job.jobId || job.id))}
                                            isApplied={appliedJobIds.has(String(job.jobId || job.id))}
                                            tab={currentTab}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ));
        }
        if (filtered.length === 0) {
            return (
                <div className="py-12 text-center">
                    <p className="text-[var(--color-text-muted)] text-sm">No jobs found{searchQ ? ` for "${searchQ}"` : ''}.</p>
                    {currentTab !== 'jobs' && (
                        <button onClick={() => navigate('/jobs')} className="text-[var(--color-primary)] text-xs mt-2 font-bold hover:underline">
                            Back to All Jobs
                        </button>
                    )}
                </div>
            );
        }
        return (
            <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map(job => (
                    <motion.div
                        key={job.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <JobCard
                            job={job}
                            onToggleExpand={() => handleJobClick(job)}
                            className={selectedJob?.id === job.id ? 'ring-2 ring-[var(--color-primary)] bg-[var(--color-primary-subtle)]' : ''}
                            id={`job-card-${job.id}`}
                            isSaved={savedJobIds.has(String(job.jobId || job.id))}
                            isApplied={appliedJobIds.has(String(job.jobId || job.id))}
                            tab={currentTab}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        );
    };

    const renderMainContent = () => {
        if (currentTab === 'profile') return <div className="h-full overflow-y-auto scrollbar-hide"><ProfilePage /></div>;
        if (currentTab === 'messages') return <div className="h-full overflow-y-auto scrollbar-hide"><MessagingPage /></div>;
        if (currentTab === 'notifications') return <div className="h-full overflow-y-auto scrollbar-hide"><NotificationsPage /></div>;

        const totalPages = Math.ceil(total / jobsPerPage);

        return (
            <div className="flex h-full overflow-hidden">
                {/* LISTING PANE */}
                <div
                    className="flex flex-col border-r border-[var(--color-border)] transition-all duration-300 ease-in-out flex-shrink-0"
                    style={{ width: isChatOpen ? '60%' : '48%', minWidth: '360px' }}
                >
                    <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                        {/* Search bar */}
                        {['jobs', 'w2-c2c', 'linkedin-apply', 'staffing-agency', 'quick-apply'].includes(currentTab) && (
                            <div className="relative mb-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                                <input
                                    type="text"
                                    value={searchQ}
                                    onChange={e => setSearchQ(e.target.value)}
                                    placeholder="Search jobs, companies, skills…"
                                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)]"
                                />
                                {searchQ && (
                                    <button onClick={() => setSearchQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider bg-[var(--color-primary-subtle)] px-2 py-1 rounded">
                                {
                                    currentTab === 'liked' ? 'Saved Jobs' :
                                    currentTab === 'applied' ? 'Applied Jobs' :
                                    currentTab === 'linkedin-apply' ? 'LinkedIn Apply' :
                                    currentTab === 'w2-c2c' ? 'W2 & C2C' :
                                    currentTab === 'staffing-agency' ? 'Staffing Agency' :
                                    currentTab === 'quick-apply' ? 'Quick Apply' :
                                    'Jobs'
                                }
                            </span>
                            {['jobs', 'w2-c2c', 'linkedin-apply', 'staffing-agency', 'quick-apply'].includes(currentTab) && (
                                <DatePicker selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                            )}
                            {loading && <Loader2 className="w-3 h-3 animate-spin text-[var(--color-primary)]" />}
                        </div>

                        {['jobs', 'w2-c2c', 'linkedin-apply', 'staffing-agency', 'quick-apply'].includes(currentTab) && (
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                                {DOMAINS.map((skill) => (
                                    <button
                                        key={skill}
                                        onClick={() => { setSelectedDomain(skill); setSearchQ(''); }}
                                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${selectedDomain === skill
                                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                                            : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)]'
                                            }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center mt-2 px-1 gap-4">
                            <span className="text-xs font-medium text-[var(--color-text-muted)] whitespace-nowrap">
                                {currentTab === 'applied'
                                    ? `${filtered.length} applications`
                                    : `${jobs.length} jobs of ${total} jobs`
                                }
                            </span>

                            {/* Pagination Controls - Visible even for 1 page for verification */}
                            {['jobs', 'w2-c2c', 'linkedin-apply', 'staffing-agency', 'quick-apply'].includes(currentTab) && total > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => goToPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="h-7 w-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed bg-[var(--color-surface-2)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white border border-[var(--color-border)] hover:border-[var(--color-primary)] group"
                                        title="Previous Page"
                                    >
                                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                    </button>

                                    <div className="h-7 px-3 flex items-center justify-center rounded-lg bg-black text-yellow-400 text-[10px] font-black min-w-[50px] border border-yellow-400/20">
                                        {currentPage} / {totalPages}
                                    </div>

                                    <button
                                        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage >= totalPages}
                                        className="h-7 w-7 flex items-center justify-center rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed bg-[var(--color-surface-2)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)] hover:text-white border border-[var(--color-border)] hover:border-[var(--color-primary)] group"
                                        title="Next Page"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        ref={jobListRef}
                        className="flex-1 overflow-y-auto p-3 space-y-3 bg-[var(--color-bg-muted)]"
                    >
                        {renderJobList()}
                    </div>
                </div>

                {/* DETAILS PANE */}
                <div
                    className="flex flex-col transition-all duration-300 ease-in-out bg-[var(--color-surface)] h-full flex-1"
                    style={{ borderRight: isChatOpen ? '1px solid var(--color-border)' : 'none' }}
                >
                    {renderSecondaryContent()}
                </div>
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: 'var(--color-bg)', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', maxWidth: '100%' }}>

            <div className="flex-1 w-full flex overflow-hidden relative">
                {/* DYNAMIC MIDDLE PANE */}
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {renderMainContent()}
                </div>

                {/* CHATBOT PANE */}
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '25%', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="h-full border-l border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col shadow-xl z-20 relative"
                            style={{ minWidth: '300px' }}
                        >
                            <AWizzardPanel
                                onMinimize={() => setChatOpen(false)}
                                isOpen={isChatOpen}
                                jobContext={selectedJob}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Chat Button */}
            {!isChatOpen && (
                <motion.button
                    id="tour-chat-button"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    onClick={() => setChatOpen(true)}
                    className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-black border-2 border-yellow-400 shadow-2xl flex items-center justify-center z-50 hover:scale-110 transition-transform group"
                >
                    <div className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex h-4 w-4 bg-yellow-500 rounded-full"></span>
                    </div>
                    <img src="/logo.png" alt="AI" className="w-8 h-8 object-contain" />
                </motion.button>
            )}
        </div>
    );
};

export default JobListingPage;
