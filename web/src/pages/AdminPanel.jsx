import { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, Search, MoreHorizontal, Check, X, Flag, Shield, Activity } from 'lucide-react';
import { TieIcon } from '../components/CustomIcons';
import { motion } from 'framer-motion';

const USERS_DATA = [
    { id: 1, name: 'Alex Johnson', email: 'alex@email.com', role: 'Candidate', status: 'Active', joined: 'Jan 12, 2025', jobs: 0, apps: 14 },
    { id: 2, name: 'TechCorp Inc.', email: 'hr@techcorp.com', role: 'Employer', status: 'Active', joined: 'Jan 8, 2025', jobs: 5, apps: 0 },
    { id: 3, name: 'Sarah Recruiter', email: 'sarah@agency.com', role: 'Candidate', status: 'Suspended', joined: 'Dec 5, 2024', jobs: 0, apps: 3 },
    { id: 4, name: 'BuildCo LLC', email: 'info@buildco.com', role: 'Employer', status: 'Review', joined: 'Jan 15, 2025', jobs: 2, apps: 0 },
];

const STATUS_COLORS = {
    Active: { bg: '#D1FAE5', color: '#10B981' },
    Suspended: { bg: '#FEE2E2', color: '#EF4444' },
    Review: { bg: '#FEF3C7', color: '#F59E0B' },
};

const AdminPanel = () => {
    const [tab, setTab] = useState('users');
    const [searchQ, setSearchQ] = useState('');

    const stats = [
        { icon: Users, label: 'Total Users', value: '12,441', delta: '+247 this week' },
        { icon: TieIcon, label: 'Active Jobs', value: '3,218', delta: '+82 today' },
        { icon: TrendingUp, label: 'Applications', value: '48,902', delta: '+1,234 today' },
        { icon: AlertTriangle, label: 'Flagged', value: '12', delta: '3 urgent' },
    ];

    const filteredUsers = USERS_DATA.filter(u =>
        u.name.toLowerCase().includes(searchQ.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQ.toLowerCase())
    );

    return (
        <div className="max-w-container mx-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                        <h1 className="text-h2 font-bold" style={{ color: 'var(--color-text-primary)' }}>Admin Panel</h1>
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--color-text-secondary)' }}>Platform management and moderation</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                        <Activity className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card p-5">
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

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                {['users', 'jobs', 'reports'].map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
                        style={{
                            backgroundColor: tab === t ? 'var(--color-surface)' : 'transparent',
                            color: tab === t ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                        }}>
                        {t}
                    </button>
                ))}
            </div>

            {tab === 'users' && (
                <div className="card">
                    <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
                        <h2 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>User Management</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                            <input className="input pl-9 text-sm py-2 w-56" placeholder="Search users…"
                                value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                            style={{ color: 'var(--color-text-muted)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u, i) => {
                                    const sc = STATUS_COLORS[u.status] || STATUS_COLORS['Active'];
                                    return (
                                        <tr key={u.id} className="border-b last:border-0 hover:opacity-90 transition-opacity"
                                            style={{ borderColor: 'var(--color-border)', backgroundColor: i % 2 === 0 ? 'transparent' : 'var(--color-surface-2)' }}>
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                                        style={{ backgroundColor: 'var(--color-primary)' }}>{u.name[0]}</div>
                                                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{u.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{u.email}</td>
                                            <td className="px-5 py-3">
                                                <span className="badge badge-primary text-xs">{u.role}</span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="badge text-xs" style={{ backgroundColor: sc.bg, color: sc.color }}>{u.status}</span>
                                            </td>
                                            <td className="px-5 py-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>{u.joined}</td>
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-1">
                                                    <button className="p-1.5 rounded-lg hover:opacity-70" style={{ backgroundColor: '#D1FAE5' }} title="Approve">
                                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg hover:opacity-70" style={{ backgroundColor: '#FEF3C7' }} title="Flag">
                                                        <Flag className="w-3.5 h-3.5 text-yellow-600" />
                                                    </button>
                                                    <button className="p-1.5 rounded-lg hover:opacity-70" style={{ backgroundColor: '#FEE2E2' }} title="Suspend">
                                                        <X className="w-3.5 h-3.5 text-red-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {tab === 'jobs' && (
                <div className="card p-8 text-center">
                    <TieIcon className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Job moderation panel</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Review and approve job postings before they go live.</p>
                </div>
            )}

            {tab === 'reports' && (
                <div className="card p-8 text-center">
                    <Flag className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
                    <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Reports & flagged content</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>12 reports pending review.</p>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
