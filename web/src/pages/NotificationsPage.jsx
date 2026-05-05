import { useState } from 'react';
import { Bell, MessageSquare, TrendingUp, Check, Trash2 } from 'lucide-react';
import { TieIcon, BookmarkIcon } from '../components/CustomIcons';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS = [
    { id: 1, type: 'match', icon: TrendingUp, color: '#10B981', title: 'New Strong Match!', body: 'Senior React Developer at Stripe — 91% match', time: '2 min ago', read: false },
    { id: 2, type: 'status', icon: TieIcon, color: 'var(--color-primary)', title: 'Application Shortlisted', body: 'You\'ve been shortlisted at Meta for Frontend Engineer', time: '1 hour ago', read: false },
    { id: 3, type: 'message', icon: MessageSquare, color: '#3B82F6', title: 'New Message', body: 'Recruiter from Google sent you a message', time: '3 hours ago', read: false },
    { id: 4, type: 'save', icon: BookmarkIcon, color: '#F59E0B', title: 'Job expiring soon', body: 'Your saved job at Apple expires in 2 days', time: '1 day ago', read: true },
    { id: 5, type: 'match', icon: TrendingUp, color: '#10B981', title: '5 new matches found', body: 'Based on your profile and recent activity', time: '2 days ago', read: true },
];

const NotificationsPage = () => {
    const [notifs, setNotifs] = useState(NOTIFICATIONS);
    const [filter, setFilter] = useState('all'); // 'all' | 'unread'

    const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
    const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
    const dismiss = (id) => setNotifs(n => n.filter(x => x.id !== id));

    const visible = filter === 'unread' ? notifs.filter(n => !n.read) : notifs;
    const unreadCount = notifs.filter(n => !n.read).length;

    return (
        <div className="max-w-content mx-auto px-4 py-8" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-h2 font-bold" style={{ color: 'var(--color-text-primary)' }}>Notifications</h1>
                    {unreadCount > 0 && (
                        <p className="text-body-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                            {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                        </p>
                    )}
                </div>
                <button onClick={markAllRead} className="btn-ghost text-sm flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Mark all read
                </button>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 p-1 rounded-xl mb-6 w-fit" style={{ backgroundColor: 'var(--color-surface-2)' }}>
                {['all', 'unread'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
                        style={{
                            backgroundColor: filter === f ? 'var(--color-surface)' : 'transparent',
                            color: filter === f ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                        }}>
                        {f === 'unread' ? `Unread (${unreadCount})` : 'All'}
                    </button>
                ))}
            </div>

            {/* Notification list */}
            <div className="space-y-3">
                <AnimatePresence>
                    {visible.length === 0 ? (
                        <div className="card p-12 text-center">
                            <Bell className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
                            <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>All caught up!</p>
                            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>No {filter === 'unread' ? 'unread' : ''} notifications</p>
                        </div>
                    ) : visible.map(notif => (
                        <motion.div key={notif.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => markRead(notif.id)}
                            className="card p-4 flex items-start gap-4 cursor-pointer"
                            style={{
                                opacity: notif.read ? 0.7 : 1,
                                borderLeft: !notif.read ? `3px solid ${notif.color}` : undefined,
                            }}
                        >
                            <div className="p-2.5 rounded-xl flex-shrink-0" style={{ backgroundColor: `${notif.color}1A` }}>
                                <notif.icon className="w-4 h-4" style={{ color: notif.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                        {notif.title}
                                        {!notif.read && (
                                            <span className="inline-block w-1.5 h-1.5 rounded-full ml-2 align-middle" style={{ backgroundColor: notif.color }} />
                                        )}
                                    </p>
                                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{notif.time}</span>
                                </div>
                                <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{notif.body}</p>
                            </div>
                            <button onClick={e => { e.stopPropagation(); dismiss(notif.id); }}
                                className="p-1.5 rounded-lg hover:opacity-70 flex-shrink-0 transition-opacity"
                                style={{ color: 'var(--color-text-muted)' }}
                                aria-label="Dismiss">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NotificationsPage;
