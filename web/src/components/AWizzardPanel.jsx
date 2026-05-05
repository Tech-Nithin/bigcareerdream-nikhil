import { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageSquare, ChevronRight, X, Loader2, Plus, History, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
    "Tell me why this job is a good fit for me",
    "Give me some resume tips if I want to apply",
    "Where am I lacking for this role?",
    "Why is my match score low?"
];

const INITIAL_BOT_MESSAGE = "Welcome back, SHANMUKH GUDISUNTLA! It's great to see you again. Let's resume your journey towards your dream job.";

const AWizzardPanel = ({ isOpen, onClose, onMinimize, jobContext }) => {
    const [sessions, setSessions] = useState(() => {
        const saved = localStorage.getItem('awizzard_sessions');
        if (saved) return JSON.parse(saved);

        // Initial session if none exists
        const initialSession = {
            id: Date.now(),
            name: 'New Conversation',
            messages: [{ id: 1, type: 'bot', text: INITIAL_BOT_MESSAGE }],
            timestamp: Date.now()
        };
        return [initialSession];
    });

    const [currentSessionId, setCurrentSessionId] = useState(() => {
        const saved = localStorage.getItem('awizzard_current_session_id');
        return saved ? JSON.parse(saved) : sessions[0].id;
    });

    const [showHistory, setShowHistory] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showOptions, setShowOptions] = useState(null);
    const messagesEndRef = useRef(null);

    const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
    const messages = currentSession.messages;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        localStorage.setItem('awizzard_sessions', JSON.stringify(sessions));
        localStorage.setItem('awizzard_current_session_id', JSON.stringify(currentSessionId));
    }, [sessions, currentSessionId, isTyping]);

    const handleNewChat = () => {
        const newSession = {
            id: Date.now(),
            name: 'New Conversation',
            messages: [{ id: 1, type: 'bot', text: INITIAL_BOT_MESSAGE }],
            timestamp: Date.now()
        };

        const updatedSessions = [newSession, ...sessions].slice(0, 5); // Keep at most 5 recent sessions
        setSessions(updatedSessions);
        setCurrentSessionId(newSession.id);
        setShowHistory(false);
    };

    const handleSwitchSession = (id) => {
        setCurrentSessionId(id);
        setShowHistory(false);
    };

    const updateCurrentSessionMessages = (newMessages) => {
        setSessions(prev => prev.map(s => {
            if (s.id === currentSessionId) {
                // Update name based on user's first message if it's still "New Conversation"
                let name = s.name;
                if (name === 'New Conversation' && newMessages.some(m => m.type === 'user')) {
                    const firstUserMsg = newMessages.find(m => m.type === 'user');
                    name = firstUserMsg.text.slice(0, 30) + (firstUserMsg.text.length > 30 ? '...' : '');
                }
                return { ...s, messages: newMessages, name, timestamp: Date.now() };
            }
            return s;
        }).sort((a, b) => b.timestamp - a.timestamp)); // Keep most recent at top
    };

    const handleSend = async (overrideMessage = null) => {
        const text = overrideMessage || input;
        if (!text.trim()) return;

        setShowOptions(null);
        const newUserMessages = [...messages, { id: Date.now(), type: 'user', text }];
        updateCurrentSessionMessages(newUserMessages);

        setInput('');
        setIsTyping(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000/api/v1' : 'https://bigcareerdream-merged.vercel.app/api/v1');
            const response = await fetch(`${apiUrl}/chat/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history: messages.map(m => ({
                        role: m.type === 'user' ? 'user' : 'assistant', // Changed to assistant for OpenAI/Groq style
                        content: m.text
                    })),
                    jobContext: jobContext || null
                })
            });

            const data = await response.json();

            if (data.success) {
                const finalMessages = [...newUserMessages, { id: Date.now() + 1, type: 'bot', text: data.response }];
                updateCurrentSessionMessages(finalMessages);

                if (data.response.includes("Do you have a Portfolio or GitHub projects included in your resume?")) {
                    setShowOptions('match_score_check');
                }
            } else {
                updateCurrentSessionMessages([...newUserMessages, {
                    id: Date.now() + 1, type: 'bot', text: "I encountered a minor glitch in my career database. Let's try again."
                }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            updateCurrentSessionMessages([...newUserMessages, {
                id: Date.now() + 1, type: 'bot', text: "My neural link to the backend is slightly unstable. Please ensure the server is running."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleOptionSelect = async (option) => {
        setShowOptions(null);
        const newUserMessages = [...messages, { id: Date.now(), type: 'user', text: option }];
        updateCurrentSessionMessages(newUserMessages);

        if (option === 'YES') {
            setIsTyping(true);
            const steps = [
                "🔍 Reviewing your portfolio...",
                "📂 Checking GitHub relevance...",
                "📊 Comparing requirements..."
            ];

            let tempMessages = [...newUserMessages];
            for (const step of steps) {
                await new Promise(r => setTimeout(r, 1000));
                tempMessages = [...tempMessages, { id: Date.now() + Math.random(), type: 'bot', text: step, isSimulated: true }];
                updateCurrentSessionMessages(tempMessages);
            }

            await handleSend('I have a portfolio and GitHub projects. Please provide structured feedback based on your analysis simulation.');
        } else {
            await handleSend('No, I do not have a portfolio or GitHub projects.');
        }
    };

    return (
        <div className="m-1 flex flex-col h-full bg-black border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src="/logo.png" alt="BigCareerDream" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                            BigCareerDream
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-2)] text-[var(--color-text-muted)] font-normal border border-[var(--color-border)]">Beta</span>
                        </h3>
                        <p className="text-xs text-[var(--color-text-muted)]">Your AI Career Intelligence Assistant</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handleNewChat}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)] hover:text-white transition-colors"
                        title="New Chat"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className={`p-1.5 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors ${showHistory ? 'text-yellow-400 bg-[var(--color-surface-2)]' : 'text-[var(--color-text-muted)]'}`}
                        title="History"
                    >
                        <History className="w-4 h-4" />
                    </button>
                    {onMinimize && (
                        <button onClick={onMinimize} className="p-1.5 rounded-lg hover:bg-[var(--color-surface-2)] text-[var(--color-text-muted)]" title="Close Chat">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* History Overlay */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute inset-0 top-[73px] bg-black/95 z-10 p-4 border-r border-[var(--color-border)] w-4/5"
                    >
                        <h4 className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-4 px-2">Recent chats (Max 5)</h4>
                        <div className="space-y-2">
                            {sessions.map((session) => (
                                <button
                                    key={session.id}
                                    onClick={() => handleSwitchSession(session.id)}
                                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${session.id === currentSessionId
                                        ? 'border-yellow-500 bg-yellow-500/10 text-white'
                                        : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-yellow-500/50'
                                        }`}
                                >
                                    <MessageCircle className={`w-4 h-4 ${session.id === currentSessionId ? 'text-yellow-500' : 'text-[var(--color-text-muted)]'}`} />
                                    <span className="text-sm truncate font-medium">{session.name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.type === 'bot' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 p-0.5 flex-shrink-0 mr-2 mt-1">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <img src="/logo.png" alt="BigCareerDream" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                        <div
                            className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'user'
                                ? 'bg-[var(--color-primary)] text-white rounded-br-none'
                                : msg.isSimulated
                                    ? 'bg-transparent text-[var(--color-primary)] font-medium border-none'
                                    : 'bg-[var(--color-surface-2)] text-[var(--color-text-primary)] rounded-bl-none border border-[var(--color-border)]'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <div className="flex justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 p-0.5 flex-shrink-0">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src="/logo.png" alt="BigCareerDream" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="bg-[var(--color-surface-2)] p-2 rounded-xl border border-[var(--color-border)]">
                            <Loader2 className="w-4 h-4 animate-spin text-[var(--color-primary)]" />
                        </div>
                    </div>
                )}

                {/* Interactive Options */}
                {showOptions === 'match_score_check' && (
                    <div className="flex gap-2 ml-10 mt-2">
                        <button
                            onClick={() => handleOptionSelect('YES')}
                            className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:scale-105 transition-transform"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => handleOptionSelect('NO')}
                            className="px-4 py-2 rounded-xl bg-[var(--color-surface-2)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-sm font-bold hover:scale-105 transition-transform"
                        >
                            No
                        </button>
                    </div>
                )}

                {/* Initial Suggestions */}
                {messages.length === 1 && !isTyping && (
                    <div className="mt-6 space-y-2">
                        <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-2 mb-3">
                            <MessageSquare className="w-3 h-3" />
                            How can I help you optimize your career today?
                        </p>
                        {SUGGESTIONS.map((s, i) => (
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                onClick={() => handleSend(s)}
                                className="w-full text-left p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] hover:border-yellow-500/50 transition-all text-sm text-[var(--color-text-secondary)] flex items-center justify-between group"
                            >
                                {s}
                                <ChevronRight className="w-3 h-3 text-[var(--color-text-muted)] group-hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all" />
                            </motion.button>
                        ))}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything about your career..."
                        disabled={isTyping}
                        className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl py-3 pl-4 pr-12 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--color-text-muted)] disabled:opacity-50"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-50 disabled:bg-transparent disabled:text-[var(--color-text-muted)] transition-all hover:scale-105 active:scale-95"
                    >
                        {input.trim() ? <Send className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AWizzardPanel;
