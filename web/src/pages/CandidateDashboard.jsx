import { CheckCircle2, Activity, Clock, MapPin, Building2, TrendingUp, Award, Edit, Upload, Eye, Briefcase, Bookmark, FileCheck, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { TieIcon, BookmarkIcon } from '../components/CustomIcons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../api';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';

const APPLIED_JOBS = [
    { title: 'Senior Frontend Developer', company: 'Meta', location: 'Remote', applied: '2 days ago', status: 'Under Review', color: ['#1877F2', '#42A5F5'] },
    { title: 'React Developer', company: 'Stripe', location: 'San Francisco, CA', applied: '5 days ago', status: 'Shortlisted', color: ['#635BFF', '#8B83FF'] },
    { title: 'UI Engineer', company: 'Figma', location: 'New York, NY', applied: '1 week ago', status: 'Applied', color: ['#F24E1E', '#FF7262'] },
    { title: 'Software Engineer', company: 'Vercel', location: 'Remote', applied: '2 weeks ago', status: 'Rejected', color: ['#000', '#333'] },
];

const SAVED_JOBS = [
    { title: 'Staff Engineer', company: 'Shopify', salary: '$200k+', logo: 'S', color: ['#96BF48', '#5E8E3E'] },
    { title: 'Senior SWE', company: 'Airbnb', salary: '$180k+', logo: 'A', color: ['#FF5A5F', '#E04B50'] },
    { title: 'Product Engineer', company: 'Linear', salary: '$160k+', logo: 'L', color: ['#5E6AD2', '#7B85E5'] },
];

const STATUS_CONFIG = {
    'Under Review': { color: 'var(--color-primary)', bg: 'var(--color-primary-subtle)' },
    'Shortlisted': { color: '#10B981', bg: '#D1FAE5' },
    'Applied': { color: '#6B7280', bg: '#F3F4F6' },
    'Rejected': { color: '#EF4444', bg: '#FEE2E2' },
};

const CandidateDashboard = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const clientId = storedUser?.client_id || 'client-1';
    const [dashboardData, setDashboardData] = useState({
        stats: { totalEligible: 0, applied: 0, saved: 0, w2c2c: 0 },
        chartData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.getDashboardStats(clientId);
                if (res.success) {
                    setDashboardData(res);
                }
            } catch (err) {
                console.error('Error fetching dashboard stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        { icon: Briefcase, label: 'All Jobs (Eligible)', value: dashboardData.stats.totalEligible, delta: 'Total available', color: 'var(--color-primary)' },
        { icon: FileCheck, label: 'Applied Jobs', value: dashboardData.stats.applied, delta: 'Total applications', color: '#10B981' },
        { icon: Bookmark, label: 'Saved Jobs', value: dashboardData.stats.saved, delta: 'Your watchlist', color: '#F59E0B' },
        { icon: Activity, label: 'W2/C2C Jobs', value: dashboardData.stats.w2c2c, delta: 'Matched contracts', color: '#8B5CF6' },
    ];

    const profileItems = [
        { label: 'Basic Info', done: true },
        { label: 'Work Experience', done: true },
        { label: 'Skills', done: true },
        { label: 'Resume Uploaded', done: true },
        { label: 'Profile Photo', done: false },
        { label: 'LinkedIn URL', done: false },
    ];

    const profilePct = Math.round((profileItems.filter(i => i.done).length / profileItems.length) * 100);

    return (
        <div className="max-w-container mx-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-h2 font-bold" style={{ color: 'var(--color-text-primary)' }}>My Dashboard</h1>
                    <p className="text-body mt-1" style={{ color: 'var(--color-text-secondary)' }}>Welcome back! Here's your job search overview.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/upgrade" className="animate-premium-glow flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)', boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)' }}>
                        <Sparkles className="w-4 h-4 text-yellow-200" />
                        Get hired easily
                    </Link>
                    <Link to="/jobs" className="btn-primary flex items-center gap-2">
                        <TieIcon className="w-4 h-4" /> Browse Jobs
                    </Link>
                </div>

            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="card p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}1A` }}>
                                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}>
                                {stat.delta}
                            </span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stat.value}</p>
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Analytics & Premium 2-Grid System */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Left: Analytics Graph (Span 2) */}
                <div className="card p-6 lg:col-span-2 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Application Trends</h2>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Daily comparison: Applied Jobs vs New Jobs Posted</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
                                <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-secondary)' }}>Applied</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#800000' }} />
                                <span className="text-[10px] font-bold" style={{ color: 'var(--color-text-secondary)' }}>Total Jobs</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dashboardData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '12px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#800000"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#800000', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="applied"
                                    stroke="var(--color-primary)"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right: Premium Success Accuracy Grid */}
                <div className="relative rounded-2xl overflow-hidden p-[1px] group lg:col-span-1 flex flex-col">
                    {/* Animated Glow Border Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-[100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#fff_100%)] opacity-20 animate-spin-slow" />

                    {/* Inner Content */}
                    <div className="relative h-full bg-[var(--color-surface)] dark:bg-[var(--color-surface-2)] rounded-2xl p-6 flex flex-col z-10">

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-bold text-lg bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                Success Accuracy
                            </h2>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                PRO
                            </span>
                        </div>

                        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                            We know the job applying is tough, but you're not alone. Let's maximize your chances of landing your dream role.
                            <span className="font-medium text-[var(--color-text-primary)]"> Here's how you can turbocharge your profile and get hired:</span>
                        </p>

                        <div className="space-y-4 mb-6 flex-1">
                            {[
                                { label: 'Applications (Daily 20+)', pct: '60%', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                                { label: 'Best Resume Template', pct: '70%', icon: FileCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                { label: 'LinkedIn Optimization', pct: '75%', icon: Building2, color: 'text-sky-500', bg: 'bg-sky-500/10' },
                                { label: 'Professional Portfolio', pct: '80%', icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                                { label: 'GitHub Revamp', pct: '90%', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-1.5 group/item cursor-pointer">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-1.5 rounded-md ${item.bg}`}>
                                                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                                            </div>
                                            <span className="text-[13px] font-medium transition-colors group-hover/item:text-[var(--color-primary)]" style={{ color: 'var(--color-text-primary)' }}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[13px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                                {item.pct}
                                            </span>
                                            <ChevronRight className="w-3.5 h-3.5 text-amber-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                        </div>
                                    </div>
                                    {/* Progress Bar Visualization */}
                                    <div className="h-1.5 w-full bg-[var(--color-surface-2)] dark:bg-black/20 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: item.pct }}
                                            transition={{ duration: 1.5, delay: idx * 0.1 }}
                                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link to="/upgrade" className="w-full mt-auto py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/25"
                            style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)' }}>
                            Unlock Full Potential
                            <TrendingUp className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Applied jobs table */}
                <div className="lg:col-span-2">
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Applied Jobs</h2>
                            <Link to="/jobs?tab=applied" className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>View all →</Link>
                        </div>
                        <div className="space-y-3">
                            {APPLIED_JOBS.map((job, i) => {
                                const statusCfg = STATUS_CONFIG[job.status] || STATUS_CONFIG['Applied'];
                                return (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                            style={{ background: `linear-gradient(135deg, ${job.color[0]}, ${job.color[1]})` }}>
                                            {job.company[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium line-clamp-1" style={{ color: 'var(--color-text-primary)' }}>{job.title}</p>
                                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{job.company} • {job.applied}</p>
                                        </div>
                                        <span className="badge text-xs flex-shrink-0"
                                            style={{ backgroundColor: statusCfg.bg, color: statusCfg.color }}>
                                            {job.status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Saved jobs */}
                    <div className="card p-5 mt-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>Saved Jobs</h2>
                            <Link to="/jobs?tab=liked" className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>View all →</Link>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {SAVED_JOBS.map((job, i) => (
                                <div key={i} className="p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-2)' }}>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-3"
                                        style={{ background: `linear-gradient(135deg, ${job.color[0]}, ${job.color[1]})` }}>
                                        {job.logo}
                                    </div>
                                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{job.title}</p>
                                    <p className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>{job.company}</p>
                                    <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>{job.salary}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Profile + actions */}
                <div className="space-y-6">
                    {/* Profile completion */}
                    <div className="card p-5">
                        <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Profile Completion</h2>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                style={{ backgroundColor: 'var(--color-primary)' }}>S</div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Shanmukh G.</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Software Engineer</p>
                            </div>
                            <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>{profilePct}%</span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full h-2 rounded-full mb-4" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                            <div className="h-2 rounded-full transition-all" style={{ width: `${profilePct}%`, backgroundColor: 'var(--color-primary)' }} />
                        </div>
                        <div className="space-y-2">
                            {profileItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0"
                                        style={{ color: item.done ? 'var(--color-primary)' : 'var(--color-border)' }} />
                                    <span style={{ color: item.done ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Link to="/profile" className="btn-primary w-full mt-4 justify-center">
                            <Edit className="w-4 h-4" /> Complete Profile
                        </Link>
                    </div>

                    {/* Quick actions */}
                    <div className="card p-5">
                        <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Quick Actions</h2>
                        <div className="space-y-2">
                            {[
                                { icon: Upload, label: 'Upload Resume', path: '/profile' },
                                { icon: TieIcon, label: 'Browse New Jobs', path: '/jobs' },
                                { icon: TrendingUp, label: 'View Analytics', path: '/dashboard/candidate' },
                                { icon: Award, label: 'Upgrade to Turbo', path: '/upgrade' },
                            ].map(({ icon: Icon, label, path }, i) => (
                                <Link key={i} to={path} className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:opacity-80"
                                    style={{ backgroundColor: 'var(--color-surface-2)' }}>
                                    <Icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
