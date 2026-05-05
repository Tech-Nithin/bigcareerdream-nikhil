import { useState, useEffect, useCallback } from 'react';
import api from '../api';
import {
    Briefcase, FileText, User, Sparkles, MessageSquare, Settings,
    Upload, FileSpreadsheet, X, Bell, BarChart2, Building2,
    Star, CheckSquare, ChevronDown, ChevronRight, Filter, ChevronUp, Layers, HelpCircle, ChevronLeft, Zap, RefreshCw
} from 'lucide-react';
import { TieIcon, BookmarkIcon } from './CustomIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';
import HelpModal from './HelpModal';
import StatusModal from './StatusModal';

// Separate SidebarContent for better performance and clarity
const SidebarContent = ({
    collapsed,
    setSidebarCollapsed,
    navigationItems,
    advancedOpen,
    setAdvancedOpen,
    advancedItems,
    onOpenHelp,
    renderNavItem,
    setChatOpen,
    navigate
}) => (
    <div className="flex flex-col h-full relative">
        {/* Header with Collapse Toggle */}
        <div className={`flex items-center px-4 py-2 min-h-[48px] ${collapsed ? 'justify-center' : 'justify-between'}`}>
            {!collapsed && (
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Search Jobs
                </span>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setSidebarCollapsed(!collapsed);
                }}
                className="w-8 h-8 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center transition-all hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)] text-[var(--color-text-secondary)] shadow-sm"
                title={collapsed ? "Expand" : "Collapse"}
            >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3">
            {/* Unified Navigation list */}
            <div className={`space-y-0.5 ${collapsed ? '' : 'mt-1'}`} id="tour-core-nav">
                {navigationItems.map((item, idx) => renderNavItem(item, idx, collapsed))}
            </div>
        </div>

        {/* SPACER for better list flow - Fixed to avoid squashing */}
        <div className="min-h-[10px]" />


        {/* 2. ADVANCED FEATURES (Bottom) */}
        <div className="mb-1 flex-shrink-0 pt-2 border-t border-[var(--color-border)]">

            {!collapsed ? (
                <>
                    <button
                        id="tour-advanced"
                        onClick={() => setAdvancedOpen(o => !o)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] mb-1 text-[13px]`}
                    >
                        <Layers className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1 text-left font-medium">Advanced Features</span>
                        {advancedOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>

                    <AnimatePresence initial={false}>
                        {advancedOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-2"
                            >
                                <div className="py-1 space-y-0.5">
                                    {advancedItems.map((item, idx) => renderNavItem(item, idx + 100, false, true))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <div className="flex justify-center mb-1">
                    <button
                        className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)]"
                        title="Advanced Features"
                        onClick={() => {
                            setSidebarCollapsed(false);
                            setChatOpen?.(false);
                        }}
                    >
                        <Layers className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>

        {/* 3. HELP BUTTON (Very Bottom) */}
        <div className="pb-4">
            <button
                id="tour-help"
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] ${collapsed ? 'justify-center' : ''} text-[13px]`}
                onClick={() => onOpenHelp?.()}
            >
                <HelpCircle className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
                {!collapsed && <span className="flex-1 text-left font-medium">Help & Support</span>}
            </button>
        </div>
    </div>
);

const LeftSidebar = ({
    onUploadResume,
    onUploadDataset,
    onOpenHelp,
    selectedFilter,
    onFilterSelect,
    isMobileOpen,
    onMobileClose,
    isCollapsed = false
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setSidebarCollapsed, setChatOpen } = useLayout();
    const [advancedOpen, setAdvancedOpen] = useState(true);
    const [savedCount, setSavedCount] = useState(0);
    const [appliedCount, setAppliedCount] = useState(0);
    const [statusModal, setStatusModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

    const updateCounts = useCallback(async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
            const clientId = storedUser?.client_id || 'client-1';

            const [savedRes, appliedRes] = await Promise.all([
                api.getSavedJobs(clientId),
                api.getAppliedJobs(clientId)
            ]);
            if (savedRes.success) setSavedCount(savedRes.data.length);
            if (appliedRes.success) setAppliedCount(appliedRes.data.length);
        } catch (err) {
            console.error('Error updating sidebar counts:', err);
        }
    }, []);

    useEffect(() => {
        updateCounts();
        window.addEventListener('saved-jobs-updated', updateCounts);
        window.addEventListener('application-submitted', updateCounts);
        return () => {
            window.removeEventListener('saved-jobs-updated', updateCounts);
            window.removeEventListener('application-submitted', updateCounts);
        };
    }, []);

    const navigationItems = [
        { icon: TieIcon, label: 'Jobs(Grnhs table)', path: '/jobs?tab=jobs', id: 'tour-jobs' },
        { icon: Zap, label: 'Quick Apply(Grnhs table)', path: '/jobs?tab=quick-apply', id: 'tour-quick' },
        { icon: Filter, label: 'Staffing Agency(not sure)', path: '/jobs?tab=staffing-agency' },
        { icon: Sparkles, label: 'LinkedIn Apply (Lnkdin table)', path: '/jobs?tab=linkedin-apply' },
        { icon: Star, label: 'W2 & C2C ⭐(Dice table)', path: '/jobs?tab=w2-c2c' },
        { icon: BookmarkIcon, label: 'Saved', path: '/jobs?tab=liked', count: savedCount, id: 'tour-saved' },
        { icon: CheckSquare, label: 'Applied', path: '/jobs?tab=applied', count: appliedCount, id: 'tour-applied' },
    ];

    const isPathActive = (path) => {
        if (!path) return false;
        const [pathName, search] = path.split('?');
        const searchParams = new URLSearchParams(search || '');
        const currentParams = new URLSearchParams(location.search);

        if (location.pathname !== pathName) return false;
        const targetTab = searchParams.get('tab');
        if (targetTab) {
            const currentTab = currentParams.get('tab') || 'jobs';
            return currentTab === targetTab;
        }
        return true;
    };

    const handleNavClick = async (item) => {
        if (isCollapsed) {
            setSidebarCollapsed(false);
            setChatOpen(false);
        }

        if (item.action === 'uploadResume') {
            onUploadResume?.();
        } else if (item.action === 'changeDomain') {
            // Check for 12-hour lock
            const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
            const clientId = storedUser?.client_id;
            if (clientId) {
                try {
                    const res = await api.getClientProfile(clientId);
                    if (res.success && res.data?.domain_changed_at) {
                        const lastChanged = new Date(res.data.domain_changed_at);
                        const now = new Date();
                        const diffHours = (now - lastChanged) / (1000 * 60 * 60);

                        if (diffHours < 12) {
                            setStatusModal({
                                isOpen: true,
                                type: 'lock',
                                title: 'Domain Locked',
                                message: "You can change the domain after 12 hours only and proceed to apply with high scoring current domain"
                            });
                            if (onMobileClose) onMobileClose();
                            return;
                        }
                    }
                } catch (err) {
                    console.error("Error checking domain lock:", err);
                }
            }
            navigate('/onboarding');
        }

        // ONLY clear filter if they clicked 'Jobs' explicitly (id = tour-jobs)
        if (item.path && item.path.includes('tab=')) {
            onFilterSelect?.('');
        }

        if (onMobileClose) onMobileClose();
    };

    const renderNavItem = (item, idx, collapsed, isAdvanced = false) => {
        const active = isPathActive(item.path);
        const content = (
            <>
                <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0 transition-all`} />
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex justify-between items-center overflow-hidden"
                    >
                        <span className="truncate">{item.label}</span>
                        {item.count !== undefined && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-[var(--color-primary)]' : 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)]'}`}>
                                {item.count}
                            </span>
                        )}
                    </motion.div>
                )}
                {collapsed && active && (
                    <div className="absolute right-1 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                )}
            </>
        );

        const className = `
            relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group
            ${active ? 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)] font-medium' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)]'}
            ${collapsed ? 'justify-center mx-2 py-3' : 'mx-3'}
            ${isAdvanced ? 'text-xs' : 'text-sm'} 
        `;

        if (item.path) {
            return (
                <Link
                    key={idx}
                    id={item.id}
                    to={item.path}
                    onClick={() => handleNavClick(item)}
                    className={className}
                    title={collapsed ? item.label : ''}
                >
                    {content}
                </Link>
            );
        }

        return (
            <button key={idx} id={item.id} onClick={() => handleNavClick(item)} className={className} title={collapsed ? item.label : ''}>
                {content}
            </button>
        );
    };

    const advancedItems = [
        { icon: BarChart2, label: 'Dashboard', path: '/dashboard/candidate' },
        { icon: User, label: 'Profile', path: '/jobs?tab=profile' },
        { icon: Upload, label: 'Upload Resume', action: 'uploadResume' },
        { icon: Bell, label: 'Notifications', path: '/jobs?tab=notifications' },
        { icon: RefreshCw, label: 'Change Domain', action: 'changeDomain' },
    ];

    const sharedProps = {
        setSidebarCollapsed,
        navigationItems,
        advancedOpen,
        setAdvancedOpen,
        advancedItems,
        onOpenHelp,
        renderNavItem,
        setChatOpen,
        navigate
    };

    return (
        <>
            <aside
                className={`fixed left-0 top-16 bottom-0 hidden md:block border-r theme-transition z-20 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}
                style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                }}
            >
                <SidebarContent collapsed={isCollapsed} {...sharedProps} />
            </aside>

            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onMobileClose}
                            className="fixed inset-0 z-40 md:hidden bg-black/50"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                            className="fixed left-0 top-0 bottom-0 w-72 z-50 overflow-y-auto border-r md:hidden"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-border)',
                            }}
                        >
                            <div className="flex items-center justify-between px-4 h-16 border-b" style={{ borderColor: 'var(--color-border)' }}>
                                <span className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>Menu</span>
                                <button onClick={onMobileClose} className="p-2 rounded-lg hover:bg-[var(--color-surface-2)]">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <SidebarContent collapsed={false} {...sharedProps} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <StatusModal
                isOpen={statusModal.isOpen}
                onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
                type={statusModal.type}
                title={statusModal.title}
                message={statusModal.message}
            />
        </>
    );
};

export default LeftSidebar;
