import { Bot, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AWizzardPanel = () => {
    const suggestions = [
        'Tell me why this job is a good fit for me',
        'Give me some resume tips if I want to apply',
        'Generate custom resume tailored to this job',
        'Write a cover letter for this job',
    ];

    return (
        <div className="fixed right-0 top-16 bottom-0 w-[32rem] bg-light-bg dark:bg-dark-bg border-l border-light-border dark:border-dark-border overflow-y-auto">
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-20 h-20 bg-transparent flex items-center justify-center">
                            <img src="/logo.png" alt="BigCareerDream Logo" className="w-20 h-20 pt-2 object-contain" />
                        </div>
                        <div>
                            <h2 className="font-bold text-light-text dark:text-dark-text">BigCareerDream</h2>
                            <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                                Your AI Copilot
                            </p>
                        </div>
                    </div>

                    <button className="px-3 py-1.5 rounded-lg border border-light-border dark:border-dark-border text-xs font-medium text-light-text dark:text-dark-text hover:bg-light-card dark:hover:bg-dark-card">
                        Quick Guides
                    </button>
                </div>

                {/* Welcome Message */}
                <div className="bg-light-card dark:bg-dark-card rounded-xl p-4 border border-light-border dark:border-dark-border">
                    <p className="text-sm text-light-text dark:text-dark-text mb-2">
                        Welcome back, <span className="font-semibold">SHANMUKH GUDISUNTLA</span>!
                    </p>
                    <p className="text-xs text-light-text-muted dark:text-dark-text-muted">
                        It's great to see you again. Let's resume your journey towards your dream job.
                    </p>
                </div>

                {/* Contextual Suggestions */}
                <div className="space-y-3">
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
                        💬 I see that you're asking about the job. What would you like to know?
                    </p>

                    {suggestions.map((suggestion, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ x: 2 }}
                            className="w-full text-left p-3 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-brand-green dark:hover:border-brand-yellow text-sm text-light-text dark:text-dark-text transition-all"
                        >
                            {suggestion}
                        </motion.button>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="sticky bottom-0 bg-light-bg dark:bg-dark-bg pt-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask me anything..."
                            className="w-full px-4 py-3 pr-12 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted focus:ring-2 focus:ring-brand-green dark:focus:ring-brand-yellow outline-none"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-colors">
                            <PlusCircle className="w-5 h-5 text-brand-green dark:text-brand-yellow" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AWizzardPanel;
