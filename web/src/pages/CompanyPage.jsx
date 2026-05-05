import { MapPin, Globe, Users, TrendingUp, ExternalLink, Building2, ChevronRight } from 'lucide-react';
import { TieIcon, BookmarkIcon } from '../components/CustomIcons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OPEN_ROLES = [
    { title: 'Senior Software Engineer', type: 'Full-time', loc: 'Remote', salary: '$180k–$240k' },
    { title: 'Product Manager', type: 'Full-time', loc: 'New York, NY', salary: '$160k–$200k' },
    { title: 'UI/UX Designer', type: 'Contract', loc: 'San Francisco, CA', salary: '$120k–$160k' },
    { title: 'Data Scientist', type: 'Full-time', loc: 'Remote', salary: '$150k–$200k' },
];

const CompanyPage = () => {
    return (
        <div className="max-w-container mx-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Company header */}
            <div className="card p-8 mb-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #4F46E5, #818CF8)' }}>
                        A
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h1 className="text-h2 font-bold" style={{ color: 'var(--color-text-primary)' }}>Acme Corporation</h1>
                                <p className="text-body mt-1" style={{ color: 'var(--color-text-secondary)' }}>Enterprise Software • Series B</p>
                                <div className="flex flex-wrap items-center gap-4 mt-3">
                                    <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        <MapPin className="w-4 h-4" /> San Francisco, CA (Global Remote)
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        <Users className="w-4 h-4" /> 500–1,000 employees
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                                        <Globe className="w-4 h-4" />
                                        <a href="https://acme.example.com" className="hover:opacity-80" style={{ color: 'var(--color-primary)' }}>acme.example.com</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="btn-secondary flex items-center gap-2"><BookmarkIcon className="w-4 h-4" /> Follow</button>
                                <a href="https://acme.example.com" target="_blank" rel="noopener noreferrer"
                                    className="btn-outline flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" /> Website
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    {[
                        { label: 'Open Roles', value: '18', icon: TieIcon },
                        { label: 'Avg Salary', value: '$175k', icon: TrendingUp },
                        { label: 'Glassdoor', value: '4.3⭐', icon: BookmarkIcon },
                        { label: 'H1B Sponsorship', value: 'Yes ✓', icon: Building2 },
                    ].map(({ label, value, icon: Icon }, i) => (
                        <div key={i} className="text-center">
                            <div className="inline-flex p-2 rounded-lg mb-2" style={{ backgroundColor: 'var(--color-primary-subtle)' }}>
                                <Icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <p className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{value}</p>
                            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* About */}
                    <div className="card p-5">
                        <h2 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>About Acme</h2>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
                            Acme Corporation is a leading enterprise software company building the next generation of developer tools and infrastructure. Founded in 2015, we serve 5,000+ customers globally and are backed by top-tier VCs.
                        </p>
                        <p className="text-sm mt-3" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>
                            Our mission is to make software development faster, more reliable, and more enjoyable for teams of all sizes — from indie hackers to Fortune 500 enterprises.
                        </p>
                    </div>

                    {/* Open roles */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Open Roles ({OPEN_ROLES.length})</h2>
                        </div>
                        <div className="space-y-3">
                            {OPEN_ROLES.map((role, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                                    <Link to="/jobs" className="flex items-center gap-4 p-4 rounded-xl border group transition-all hover:opacity-90"
                                        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-2)', textDecoration: 'none' }}>
                                        <div className="flex-1">
                                            <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{role.title}</p>
                                            <div className="flex gap-3 mt-1">
                                                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{role.loc}</span>
                                                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{role.type}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>{role.salary}</span>
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-muted)' }} />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="card p-5">
                        <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Company Details</h2>
                        <div className="space-y-3">
                            {[
                                { label: 'Industry', value: 'Enterprise Software' },
                                { label: 'Stage', value: 'Series B' },
                                { label: 'Founded', value: '2015' },
                                { label: 'HQ', value: 'San Francisco, CA' },
                                { label: 'Remote Policy', value: 'Fully Remote' },
                            ].map(({ label, value }, i) => (
                                <div key={i}>
                                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
                                    <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card p-5">
                        <h2 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Culture & Perks</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Remote-first', 'Unlimited PTO', 'Equity', '401k match', 'Learning budget', 'Home office stipend'].map((perk, i) => (
                                <span key={i} className="badge badge-primary text-xs">{perk}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
