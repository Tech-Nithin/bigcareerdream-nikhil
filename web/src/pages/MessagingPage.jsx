import { useState } from 'react';
import { Send, Search, MoreHorizontal, Phone, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const THREADS = [
    { id: 1, name: 'Sarah Chen', role: 'Recruiter @ Google', preview: 'Thanks for your application...', time: '2m', unread: 2, avatar: 'S', color: '#4285F4' },
    { id: 2, name: 'Mark Johnson', role: 'HR @ Stripe', preview: 'We\'d love to schedule a call...', time: '1h', unread: 1, avatar: 'M', color: '#635BFF' },
    { id: 3, name: 'Priya Patel', role: 'Recruiter @ Airbnb', preview: 'Your profile looks great!', time: '3h', unread: 0, avatar: 'P', color: '#FF5A5F' },
    { id: 4, name: 'Alex Williams', role: 'Tech Lead @ Meta', preview: 'Following up on our chat', time: '1d', unread: 0, avatar: 'A', color: '#1877F2' },
];

const MESSAGES = {
    1: [
        { from: 'them', text: 'Hi! I came across your profile and I think you\'d be a great fit for our Senior Engineer role.', time: '10:30 AM' },
        { from: 'me', text: 'Thanks Sarah! I\'d definitely be interested in learning more. What does the role involve?', time: '10:45 AM' },
        { from: 'them', text: 'We\'re looking for someone with strong React + Node.js experience. The role includes 20% travel.', time: '10:47 AM' },
        { from: 'me', text: 'That sounds exciting. Can you send me the full JD? I\'d love to review it.', time: '10:50 AM' },
        { from: 'them', text: 'Thanks for your application! We\'ll be in touch soon.', time: '11:00 AM' },
    ],
};

const MessagingPage = () => {
    const [selected, setSelected] = useState(1);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(MESSAGES);
    const [searchQ, setSearchQ] = useState('');

    const currentThread = THREADS.find(t => t.id === selected);
    const currentMessages = messages[selected] || [];

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages(prev => ({
            ...prev,
            [selected]: [
                ...(prev[selected] || []),
                { from: 'me', text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
        }));
        setInput('');
    };

    const filteredThreads = THREADS.filter(t =>
        t.name.toLowerCase().includes(searchQ.toLowerCase()) ||
        t.role.toLowerCase().includes(searchQ.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh-64px)]" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Thread list */}
            <div className="w-80 border-r flex flex-col flex-shrink-0" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <h2 className="font-bold text-lg mb-3" style={{ color: 'var(--color-text-primary)' }}>Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                        <input className="input pl-9 text-sm py-2" placeholder="Search conversations…"
                            value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredThreads.map(thread => (
                        <button key={thread.id} onClick={() => setSelected(thread.id)}
                            className="w-full flex items-start gap-3 p-4 text-left transition-all border-b"
                            style={{
                                borderColor: 'var(--color-border)',
                                backgroundColor: selected === thread.id ? 'var(--color-primary-subtle)' : 'transparent',
                            }}>
                            <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                                    style={{ backgroundColor: thread.color }}>
                                    {thread.avatar}
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full"
                                    style={{ borderColor: 'var(--color-surface)' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold" style={{ color: selected === thread.id ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>
                                        {thread.name}
                                    </span>
                                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{thread.time}</span>
                                </div>
                                <p className="text-xs mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{thread.role}</p>
                                <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{thread.preview}</p>
                            </div>
                            {thread.unread > 0 && (
                                <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white flex-shrink-0"
                                    style={{ backgroundColor: 'var(--color-primary)' }}>
                                    {thread.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                {currentThread && (
                    <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                                style={{ backgroundColor: currentThread.color }}>
                                {currentThread.avatar}
                            </div>
                            <div>
                                <p className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>{currentThread.name}</p>
                                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{currentThread.role}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="btn-ghost p-2 rounded-lg"><Phone className="w-4 h-4" /></button>
                            <button className="btn-ghost p-2 rounded-lg"><Video className="w-4 h-4" /></button>
                            <button className="btn-ghost p-2 rounded-lg"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                    {currentMessages.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className="max-w-[70%]">
                                <div className="px-4 py-3 rounded-2xl text-sm"
                                    style={{
                                        backgroundColor: msg.from === 'me' ? 'var(--color-primary)' : 'var(--color-surface)',
                                        color: msg.from === 'me' ? 'var(--color-primary-foreground)' : 'var(--color-text-primary)',
                                        border: msg.from !== 'me' ? '1px solid var(--color-border)' : undefined,
                                        borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    }}>
                                    {msg.text}
                                </div>
                                <p className="text-xs mt-1 px-1" style={{ color: 'var(--color-text-muted)', textAlign: msg.from === 'me' ? 'right' : 'left' }}>
                                    {msg.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                    <div className="flex items-center gap-3">
                        <input className="input flex-1 py-3" placeholder="Type a message…"
                            value={input} onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                        <button onClick={sendMessage} className="btn-primary p-3 rounded-xl" aria-label="Send message"
                            disabled={!input.trim()}>
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagingPage;
