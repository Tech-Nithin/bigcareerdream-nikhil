import { motion } from 'framer-motion';

const Marquee = () => {
    const messages = [
        "🚀 Update your portfolio today to increase visibility by 40%",
        "✨ New AI Resume Review feature is now live - Try it out!",
        "💼 Over 500 new remote opportunities added this week",
        "🌟 Tip: Customized cover letters increase interview chances by 3x",
        "📈 Market Trend: React and TypeScript demand is up 25%",
        "🔥 Hot: Senior Frontend roles in Fintech are booming"
    ];

    const allMessages = [...messages, ...messages];

    return (
        <div className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] overflow-hidden py-2 relative flex items-center h-10">
            {/* Fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />

            {/* Scrolling Content */}
            <div className="flex overflow-hidden w-full">
                <motion.div
                    className="flex gap-16 item-center whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 80
                    }}
                >
                    {/* Render twice for seamless loop */}
                    {[...allMessages, ...allMessages].map((msg, idx) => (
                        <span
                            key={idx}
                            className="text-sm font-medium text-[var(--color-text-secondary)] flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-50"></span>
                            {msg}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;
