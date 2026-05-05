import { useState } from 'react';
import { Plus, Users, Eye, TrendingUp, MoreHorizontal, ChevronDown, Search, Filter, Check, X, Clock } from 'lucide-react';
import { TieIcon } from '../components/CustomIcons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const JOBS = [
    { title: 'Senior React Developer', posted: '3 days ago', status: 'Active', applicants: 24, views: 312 },
    { title: 'Product Designer', posted: '1 week ago', status: 'Active', applicants: 18, views: 207 },
    { title: 'DevOps Engineer', posted: '2 weeks ago', status: 'Closed', applicants: 41, views: 580 },
    { title: 'Data Analyst', posted: '1 month ago', status: 'Draft', applicants: 0, views: 0 },
];

const APPLICANTS = [
    { name: 'Alex Johnson', role: 'Sr React Dev', exp: '5 yrs', match: 87, status: 'Shortlisted' },
    { name: 'Priya Patel', role: 'Sr React Dev', exp: '4 yrs', match: 74, status: 'Applied' },
    { name: 'Marcus Williams', role: 'Sr React Dev', exp: '6 yrs', match: 91, status: 'Interviewed' },
    { name: 'Sarah Chen', role: 'Product Design', exp: '3 yrs', match: 68, status: 'Applied' },
];

const STATUS_MAP = {
    'Active': { color: '#10B981', bg: '#D1FAE5' },
    'Closed': { color: '#6B7280', bg: '#F3F4F6' },
    'Draft': { color: '#F59E0B', bg: '#FEF3C7' },
    'Shortlisted': { color: 'var(--color-primary)', bg: 'var(--color-primary-subtle)' },
    'Applied': { color: '#6B7280', bg: '#F3F4F6' },
    'Interviewed': { color: '#8B5CF6', bg: '#EDE9FE' },
};

const EmployerDashboard = () => {
    const [searchQ, setSearchQ] = useState('');

    const stats = [
        { icon: TieIcon, label: 'Active Jobs', value: 2, delta: '1 expiring soon' },
        { icon: Users, label: 'Total Applicants', value: 83, delta: '+12 this week' },
        { icon: Eye, label: 'Total Views', value: '1.1k', delta: '+87 today' },
        { icon: TrendingUp, label: 'Avg Match Score', value: '76%', delta: 'Quality hires' },
    ];

    return (
        <div className="max-w-container mx-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-h2 font-bold" style={{ color: 'var(--color-text-primary)' }}>Employer Dashboard</h1>
                    <p className="text-body mt-1" style={{ color: 'var(--color-text-secondary)' }}>Manage your job postings and find top talent.</p>
                </div>
                <button className="btn-primary gap-2">
                    <Plus className="w-4 h-4" /> Post a Job
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="card p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary-subtle)' }}>
                                <s.icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{s.value}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--color-primary)' }}>{s.delta}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Job listings table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Your Job Postings</h2>
                            <button className="btn-ghost text-sm px-3 py-2 flex items-center gap-1">
                                <Filter className="w-3.5 h-3.5" /> Filter
                            </button>
                        </div>
                        <div className="space-y-3">
                            {JOBS.map((job, i) => {
                                const sc = STATUS_MAP[job.status] || STATUS_MAP['Draft'];
                                return (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{job.title}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                    <Clock className="w-3 h-3" /> {job.posted}
                                                </span>
                                                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                    <Users className="w-3 h-3" /> {job.applicants} applicants
                                                </span>
                                                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                                                    <Eye className="w-3 h-3" /> {job.views} views
                                                </span>
                                            </div>
                                        </div>
                                        <span className="badge text-xs flex-shrink-0" style={{ backgroundColor: sc.bg, color: sc.color }}>{job.status}</span>
                                        <button className="btn-ghost p-2 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Applicants list */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Recent Applicants</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
                                <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                                    placeholder="Search applicants…" className="input pl-8 py-2 text-sm w-48" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            {APPLICANTS.filter(a => a.name.toLowerCase().includes(searchQ.toLowerCase())).map((app, i) => {
                                const sc = STATUS_MAP[app.status] || STATUS_MAP['Applied'];
                                return (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                            style={{ backgroundColor: 'var(--color-primary)' }}>
                                            {app.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{app.name}</p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{app.role} • {app.exp}</p>
                                        </div>
                                        <span className="text-sm font-bold" style={{ color: app.match >= 80 ? '#10B981' : 'var(--color-text-secondary)' }}>
                                            {app.match}%
                                        </span>
                                        <span className="badge text-xs" style={{ backgroundColor: sc.bg, color: sc.color }}>{app.status}</span>
                                        <div className="flex gap-1">
                                            <button className="p-1.5 rounded-lg hover:opacity-70" style={{ backgroundColor: '#D1FAE5' }} title="Accept">
                                                <Check className="w-3.5 h-3.5 text-green-600" />
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:opacity-70" style={{ backgroundColor: '#FEE2E2' }} title="Reject">
                                                <X className="w-3.5 h-3.5 text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="card p-5">
                        <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Quick Actions</h2>
                        <div className="space-y-2">
                            {[
                                { label: 'Post New Job', primary: true },
                                { label: 'View All Applicants' },
                                { label: 'Company Profile' },
                                { label: 'Billing & Plan' },
                            ].map(({ label, primary }, i) => (
                                <button key={i} className={primary ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="card p-5">
                        <h2 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Posting Tip</h2>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Jobs with salary ranges get <strong style={{ color: 'var(--color-primary)' }}>3× more</strong> qualified applicants. Add salary to improve your next posting.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
