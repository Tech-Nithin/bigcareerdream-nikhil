import { MapPin, Clock, DollarSign, ExternalLink, Globe, Users, Star, CheckCircle2, Building2, TrendingUp } from 'lucide-react';
import { TieIcon, BookmarkIcon } from '../components/CustomIcons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const REQUIREMENTS = [
    '5+ years of experience with React and modern JavaScript',
    'Proficiency in TypeScript and state management patterns',
    'Experience with design systems and component libraries',
    'Strong understanding of web performance and accessibility',
    'Experience with testing frameworks (Jest, Cypress)',
    'Excellent communication and collaboration skills',
];

const BENEFITS = [
    'Competitive salary + equity',
    'Fully remote or hybrid',
    'Unlimited PTO',
    '401k with 4% match',
    '$3,000 annual learning budget',
    'Home office stipend',
];

const JobDetailPage = () => {
    const [saved, setSaved] = useState(false);

    const job = {
        title: 'Senior Frontend Engineer',
        company: 'Stripe',
        location: 'Remote (US)',
        type: 'Full-time',
        experience: 'Senior (5–8 years)',
        salary: '$160,000 – $200,000',
        posted: '3 days ago',
        applicants: '47 applicants',
        matchScore: 87,
    };

    return (
        <div className="max-w-container mx-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header card */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
                        <div className="flex items-start gap-5">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #635BFF, #8B83FF)' }}>
                                S
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h1 className="text-h3 font-bold" style={{ color: 'var(--color-text-primary)' }}>{job.title}</h1>
                                        <Link to="/company" className="text-base font-medium mt-0.5 block" style={{ color: 'var(--color-primary)' }}>
                                            {job.company}
                                        </Link>
                                    </div>
                                    <button onClick={() => setSaved(s => !s)} className="p-2.5 rounded-xl border transition-all"
                                        style={{
                                            borderColor: saved ? 'var(--color-primary)' : 'var(--color-border)',
                                            backgroundColor: saved ? 'var(--color-primary-subtle)' : 'var(--color-surface-2)',
                                        }}
                                        aria-label={saved ? 'Unsave job' : 'Save job'} aria-pressed={saved}>
                                        <BookmarkIcon className="w-4 h-4" style={{ color: saved ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                                            fill={saved ? 'var(--color-primary)' : 'none'} />
                                    </button>
                                </div>

                                {/* Chips */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {[
                                        { icon: MapPin, text: job.location },
                                        { icon: TieIcon, text: job.type },
                                        { icon: Clock, text: job.experience },
                                        { icon: DollarSign, text: job.salary },
                                    ].map(({ icon: Icon, text }, i) => (
                                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm"
                                            style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-text-secondary)' }}>
                                            <Icon className="w-3.5 h-3.5" />{text}
                                        </span>
                                    ))}
                                </div>

                                {/* Posted + applicants */}
                                <div className="flex items-center gap-4 mt-4">
                                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Posted {job.posted}</span>
                                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>•</span>
                                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{job.applicants}</span>
                                    <span className="badge badge-primary">Easy Apply</span>
                                </div>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex gap-3 mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
                            <Link to="/apply" className="btn-primary flex-1 justify-center text-base py-3">
                                Apply with Autofill
                            </Link>
                            <a href="https://stripe.com/jobs" target="_blank" rel="noopener noreferrer"
                                className="btn-secondary flex items-center gap-2 px-4">
                                <ExternalLink className="w-4 h-4" /> View on Stripe
                            </a>
                        </div>
                    </motion.div>

                    {/* Job description */}
                    <div className="card p-6">
                        <h2 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-text-primary)' }}>About the Role</h2>
                        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                            We're looking for a Senior Frontend Engineer to join Stripe's product engineering team. You'll work on building the next generation of our payments infrastructure, helping millions of businesses accept payments online.
                        </p>
                        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                            As a senior member of the team, you'll drive technical decisions, mentor junior engineers, and collaborate closely with product managers, designers, and backend engineers to deliver exceptional user experiences.
                        </p>

                        <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Requirements</h3>
                        <ul className="space-y-2 mb-6">
                            {REQUIREMENTS.map((req, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }} />
                                    {req}
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Benefits & Perks</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {BENEFITS.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <span style={{ color: 'var(--color-primary)' }}>✦</span>
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Match score */}
                    <div className="card p-5 text-center">
                        <div className="text-4xl font-bold mb-1" style={{ color: '#10B981' }}>{job.matchScore}%</div>
                        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>STRONG MATCH</p>
                        <div className="space-y-2 text-left">
                            {[
                                { label: 'Skills match', value: 91 },
                                { label: 'Experience', value: 85 },
                                { label: 'Location fit', value: 100 },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                                        <span>{label}</span><span>{value}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                                        <div className="h-1.5 rounded-full" style={{ width: `${value}%`, backgroundColor: '#10B981' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Company summary */}
                    <div className="card p-5">
                        <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>About Stripe</h2>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                                style={{ background: 'linear-gradient(135deg, #635BFF, #8B83FF)' }}>S</div>
                            <div>
                                <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Stripe</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Fintech • 8,000+ employees</p>
                            </div>
                        </div>
                        <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                            Stripe builds financial infrastructure for the internet. Millions of companies use Stripe to accept payments.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {[
                                { icon: Star, label: '4.6 Glassdoor' },
                                { icon: TrendingUp, label: 'Series I' },
                                { icon: Globe, label: 'Global Remote' },
                                { icon: Users, label: '8,000+ team' },
                            ].map(({ icon: Icon, label }, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                    <Icon className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                                    {label}
                                </div>
                            ))}
                        </div>
                        <Link to="/company" className="btn-outline w-full justify-center text-sm">View Company</Link>
                    </div>

                    {/* Similar jobs teaser */}
                    <div className="card p-5">
                        <h2 className="font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Similar Jobs</h2>
                        {['Frontend Eng @ Vercel', 'UI Engineer @ Linear', 'React Dev @ Shopify'].map((title, i) => (
                            <Link key={i} to="/jobs" className="flex items-center gap-2 py-2.5 border-b last:border-0 hover:opacity-80 transition-opacity"
                                style={{ borderColor: 'var(--color-border)', textDecoration: 'none' }}>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                    style={{ backgroundColor: 'var(--color-primary)' }}>{title[0]}</div>
                                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;
