// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, CheckCircle2, Sparkles, Bell, ChevronDown, MessageSquare } from 'lucide-react';

// const faqData = [
//     {
//         question: "How often are the job links updated?",
//         answer: "We update our database every 24 hours. Fresh W2, C2C, and Visa sponsorship roles are delivered to your inbox every morning at 8:00 AM EST."
//     },
//     {
//         question: "Is there a cost to access the full BigCareerDream?",
//         answer: "The daily email alerts are completely free. We also offer a premium tier for $19/mo which includes early 48h access and advanced filtering by tech stack."
//     },
//     {
//         question: "Do you verify the sponsorship status of employers?",
//         answer: "Yes, we use a combination of AI verification and historical USCIS data to tag roles accurately for H1-B and OPT-friendly employers."
//     },
//     {
//         question: "Can I filter roles by specific technology or location?",
//         answer: "Absolutely! Our dashboard allows you to filter by 50+ tech stacks and major US hubs like NYC, SF, Austin, and Seattle, plus remote-only options."
//     }
// ];

// const FAQItem = ({ question, answer, isOpen, onClick }) => {
//     return (
//         <div style={{
//             borderBottom: '1px solid rgba(255,255,255,0.08)',
//             width: '100%',
//             overflow: 'hidden'
//         }}>
//             <button
//                 onClick={onClick}
//                 style={{
//                     width: '100%',
//                     padding: '28px 0',
//                     background: 'none',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     cursor: 'pointer',
//                     textAlign: 'left',
//                     color: '#FFFFFF',
//                     transition: 'all 0.3s ease'
//                 }}
//             >
//                 <span style={{
//                     fontSize: '1.1rem',
//                     fontWeight: 600,
//                     fontFamily: "'Outfit', sans-serif",
//                     letterSpacing: '-0.3px',
//                     color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.8)'
//                 }}>
//                     {question}
//                 </span>
//                 <motion.div
//                     animate={{ rotate: isOpen ? 180 : 0 }}
//                     transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                 >
//                     <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
//                 </motion.div>
//             </button>
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                     >
//                         <div style={{
//                             paddingBottom: '28px',
//                             color: 'rgba(255,255,255,0.5)',
//                             lineHeight: 1.6,
//                             fontSize: '1rem',
//                             maxWidth: '90%'
//                         }}>
//                             {answer}
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// const EmailCapture = () => {
//     const [email, setEmail] = useState('');
//     const [status, setStatus] = useState('idle'); // idle, loading, success
//     const [openIndex, setOpenIndex] = useState(0);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!email) return;
//         setStatus('loading');
//         setTimeout(() => setStatus('success'), 1200);
//     };

//     return (
//         <section id="contact" style={{
//             padding: '120px 6%',
//             background: '#000000', // Pitch black as requested
//             position: 'relative',
//             overflow: 'hidden',
//         }}>
//             <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '850px', margin: '0 auto' }}>

//                 {/* FAQ Section Header */}
//                 <div style={{ textAlign: 'center', marginBottom: '80px' }}>
//                     <div style={{
//                         width: '44px', height: '44px',
//                         background: '#E8451A', borderRadius: '10px',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         color: '#FFF', margin: '0 auto 24px',
//                         position: 'relative'
//                     }}>
//                         <MessageSquare size={22} fill="currentColor" />
//                         <div style={{
//                             position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
//                             width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
//                             borderTop: '10px solid #E8451A'
//                         }} />
//                     </div>
//                     <h2 style={{
//                         fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
//                         fontWeight: 900,
//                         color: '#FFF',
//                         fontFamily: "'Outfit', sans-serif",
//                         letterSpacing: '-2px',
//                         lineHeight: 0.9,
//                         textTransform: 'lowercase' // Matching the image style
//                     }}>
//                         Frequently asked<br />questions
//                     </h2>
//                 </div>

//                 {/* FAQ Accordion */}
//                 <div style={{ marginBottom: '120px' }}>
//                     {faqData.map((faq, index) => (
//                         <FAQItem
//                             key={index}
//                             question={faq.question}
//                             answer={faq.answer}
//                             isOpen={openIndex === index}
//                             onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
//                         />
//                     ))}
//                 </div>

//                 {/* Email Capture Card */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     style={{
//                         padding: '80px 40px',
//                         background: 'rgba(255,255,255,0.03)',
//                         backdropFilter: 'blur(20px)',
//                         borderRadius: '40px',
//                         border: '1px solid rgba(255,255,255,0.08)',
//                         boxShadow: 'var(--shadow-lg)',
//                         position: 'relative', overflow: 'hidden',
//                         textAlign: 'center'
//                     }}
//                 >
//                     {/* Interior glow orb */}
//                     <div style={{
//                         position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
//                         width: '400px', height: '200px',
//                         background: 'radial-gradient(ellipse at center, rgba(232, 69, 26, 0.2) 0%, transparent 70%)',
//                         filter: 'blur(40px)', zIndex: -1
//                     }} />

//                     <div style={{
//                         width: '56px', height: '56px', borderRadius: '50%',
//                         background: 'var(--accent-primary)',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         color: '#FFFFFF', margin: '0 auto 24px',
//                         boxShadow: '0 10px 25px rgba(232, 69, 26, 0.2)'
//                     }}>
//                         <Bell size={26} />
//                     </div>

//                     <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '16px', letterSpacing: '-1.2px', fontFamily: "'Outfit', sans-serif" }}>
//                         Get <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Instant</span> Job Alerts
//                     </h3>
//                     <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.6 }}>
//                         Be the first to know when new W2, C2C, or Sponsored roles hit the market. Fresh links delivered every morning.
//                     </p>

//                     <AnimatePresence mode="wait">
//                         {status !== 'success' ? (
//                             <motion.form
//                                 key="form"
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 onSubmit={handleSubmit}
//                                 style={{
//                                     display: 'flex', gap: '12px', flexWrap: 'wrap',
//                                     padding: '10px', background: 'rgba(255,255,255,0.05)',
//                                     borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)',
//                                     maxWidth: '560px', margin: '0 auto', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
//                                 }}
//                             >
//                                 <input
//                                     type="email"
//                                     placeholder="Enter your email address"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     style={{
//                                         flex: 1, minWidth: '240px', background: 'transparent',
//                                         border: 'none', outline: 'none', color: '#FFFFFF',
//                                         padding: '14px 20px', fontSize: '0.95rem',
//                                         fontFamily: "'Outfit', sans-serif"
//                                     }}
//                                 />
//                                 <button
//                                     type="submit"
//                                     disabled={status === 'loading'}
//                                     style={{
//                                         background: 'var(--accent-primary)',
//                                         color: '#FFFFFF', border: 'none', padding: '14px 28px',
//                                         borderRadius: '12px', fontWeight: 800, cursor: 'pointer',
//                                         display: 'flex', alignItems: 'center', gap: '10px',
//                                         transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(232, 69, 26, 0.25)',
//                                         fontSize: '0.9rem',
//                                         fontFamily: "'Outfit', sans-serif"
//                                     }}
//                                     onMouseEnter={e => {
//                                         e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
//                                         e.currentTarget.style.background = '#ff5722';
//                                     }}
//                                     onMouseLeave={e => {
//                                         e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                                         e.currentTarget.style.background = 'var(--accent-primary)';
//                                     }}
//                                 >
//                                     {status === 'loading' ? 'Sending...' : (
//                                         <>Subscribe Now <Sparkles size={16} /></>
//                                     )}
//                                 </button>
//                             </motion.form>
//                         ) : (
//                             <motion.div
//                                 key="success"
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 style={{
//                                     padding: '24px', borderRadius: '20px', background: 'rgba(232,69,26,0.1)',
//                                     border: '1px solid rgba(232,69,26,0.2)', color: 'var(--accent-primary)',
//                                     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
//                                 }}
//                             >
//                                 <CheckCircle2 size={40} />
//                                 <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem', fontFamily: "'Outfit', sans-serif" }}>You're on the list!</h4>
//                                 <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(232,69,26,0.8)' }}>Check your inbox for a confirmation email.</p>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '32px' }}>
//                         No spam. Only high-quality tech roles. Unsubscribe with one click anytime.
//                     </p>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default EmailCapture;





























// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Send, CheckCircle2, Sparkles, Bell, ChevronDown } from 'lucide-react';

// const faqData = [
//     {
//         question: "How often are the job links updated?",
//         answer: "We update our database every 24 hours. Fresh W2, C2C, and Visa sponsorship roles are delivered to your inbox every morning at 8:00 AM EST."
//     },
//     {
//         question: "Is there a cost to access the full BigCareerDream?",
//         answer: "The daily email alerts are completely free. We also offer a premium tier for $19/mo which includes early 48h access and advanced filtering by tech stack."
//     },
//     {
//         question: "Do you verify the sponsorship status of employers?",
//         answer: "Yes, we use a combination of AI verification and historical USCIS data to tag roles accurately for H1-B and OPT-friendly employers."
//     },
//     {
//         question: "Can I filter roles by specific technology or location?",
//         answer: "Absolutely! Our dashboard allows you to filter by 50+ tech stacks and major US hubs like NYC, SF, Austin, and Seattle, plus remote-only options."
//     }
// ];

// const FAQItem = ({ question, answer, isOpen, onClick }) => {
//     return (
//         <div style={{
//             borderBottom: '1px solid rgba(255,255,255,0.08)',
//             width: '100%',
//             overflow: 'hidden'
//         }}>
//             <button
//                 onClick={onClick}
//                 style={{
//                     width: '100%',
//                     padding: '28px 0',
//                     background: 'none',
//                     border: 'none',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     cursor: 'pointer',
//                     textAlign: 'left',
//                     color: '#FFFFFF',
//                     transition: 'all 0.3s ease'
//                 }}
//             >
//                 <span style={{
//                     fontSize: '1.1rem',
//                     fontWeight: 600,
//                     fontFamily: "'Outfit', sans-serif",
//                     letterSpacing: '-0.3px',
//                     color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.8)'
//                 }}>
//                     {question}
//                 </span>
//                 <motion.div
//                     animate={{ rotate: isOpen ? 180 : 0 }}
//                     transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                 >
//                     <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
//                 </motion.div>
//             </button>
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                     >
//                         <div style={{
//                             paddingBottom: '28px',
//                             color: 'rgba(255,255,255,0.5)',
//                             lineHeight: 1.6,
//                             fontSize: '1rem',
//                             maxWidth: '90%'
//                         }}>
//                             {answer}
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// const EmailCapture = () => {
//     const [email, setEmail] = useState('');
//     const [status, setStatus] = useState('idle'); // idle, loading, success
//     const [openIndex, setOpenIndex] = useState(0);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!email) return;
//         setStatus('loading');
//         setTimeout(() => setStatus('success'), 1200);
//     };

//     return (
//         <section id="contact" style={{
//             padding: '120px 6%',
//             background: '#000000',
//             position: 'relative',
//             overflow: 'hidden',
//         }}>
//             <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '850px', margin: '0 auto' }}>

//                 {/* FAQ Section Header */}
//                 <div style={{ textAlign: 'center', marginBottom: '80px' }}>
//                     <div style={{
//                         width: '44px', height: '44px',
//                         background: '#E8451A', borderRadius: '10px',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         margin: '0 auto 24px',
//                         position: 'relative',
//                         overflow: 'hidden',
//                     }}>
//                         {/* ── Replace this src with your local image path ── */}
//                         <img
//                             src="/eyes.jpg"
//                             alt="FAQ"
//                             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                         />
//                         <div style={{
//                             position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)',
//                             width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
//                             borderTop: '10px solid #E8451A'
//                         }} />
//                     </div>
//                     <h2 style={{
//                         fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
//                         fontWeight: 900,
//                         color: '#FFF',
//                         fontFamily: "'Outfit', sans-serif",
//                         letterSpacing: '-2px',
//                         lineHeight: 0.9,
//                         textTransform: 'lowercase'
//                     }}>
//                         Frequently asked<br />questions
//                     </h2>
//                 </div>

//                 {/* FAQ Accordion */}
//                 <div style={{ marginBottom: '120px' }}>
//                     {faqData.map((faq, index) => (
//                         <FAQItem
//                             key={index}
//                             question={faq.question}
//                             answer={faq.answer}
//                             isOpen={openIndex === index}
//                             onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
//                         />
//                     ))}
//                 </div>

//                 {/* Email Capture Card */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     style={{
//                         padding: '80px 40px',
//                         background: 'rgba(255,255,255,0.03)',
//                         backdropFilter: 'blur(20px)',
//                         borderRadius: '40px',
//                         border: '1px solid rgba(255,255,255,0.08)',
//                         boxShadow: 'var(--shadow-lg)',
//                         position: 'relative', overflow: 'hidden',
//                         textAlign: 'center'
//                     }}
//                 >
//                     {/* Interior glow orb */}
//                     <div style={{
//                         position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
//                         width: '400px', height: '200px',
//                         background: 'radial-gradient(ellipse at center, rgba(232, 69, 26, 0.2) 0%, transparent 70%)',
//                         filter: 'blur(40px)', zIndex: -1
//                     }} />

//                     <div style={{
//                         width: '56px', height: '56px', borderRadius: '50%',
//                         background: 'var(--accent-primary)',
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         color: '#FFFFFF', margin: '0 auto 24px',
//                         boxShadow: '0 10px 25px rgba(232, 69, 26, 0.2)'
//                     }}>
//                         <Bell size={26} />
//                     </div>

//                     <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '16px', letterSpacing: '-1.2px', fontFamily: "'Outfit', sans-serif" }}>
//                         Get <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Instant</span> Job Alerts
//                     </h3>
//                     <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.6 }}>
//                         Be the first to know when new W2, C2C, or Sponsored roles hit the market. Fresh links delivered every morning.
//                     </p>

//                     <AnimatePresence mode="wait">
//                         {status !== 'success' ? (
//                             <motion.form
//                                 key="form"
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -10 }}
//                                 onSubmit={handleSubmit}
//                                 style={{
//                                     display: 'flex', gap: '12px', flexWrap: 'wrap',
//                                     padding: '10px', background: 'rgba(255,255,255,0.05)',
//                                     borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)',
//                                     maxWidth: '560px', margin: '0 auto', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
//                                 }}
//                             >
//                                 <input
//                                     type="email"
//                                     placeholder="Enter your email address"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     required
//                                     style={{
//                                         flex: 1, minWidth: '240px', background: 'transparent',
//                                         border: 'none', outline: 'none', color: '#FFFFFF',
//                                         padding: '14px 20px', fontSize: '0.95rem',
//                                         fontFamily: "'Outfit', sans-serif"
//                                     }}
//                                 />
//                                 <button
//                                     type="submit"
//                                     disabled={status === 'loading'}
//                                     style={{
//                                         background: 'var(--accent-primary)',
//                                         color: '#FFFFFF', border: 'none', padding: '14px 28px',
//                                         borderRadius: '12px', fontWeight: 800, cursor: 'pointer',
//                                         display: 'flex', alignItems: 'center', gap: '10px',
//                                         transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(232, 69, 26, 0.25)',
//                                         fontSize: '0.9rem',
//                                         fontFamily: "'Outfit', sans-serif"
//                                     }}
//                                     onMouseEnter={e => {
//                                         e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
//                                         e.currentTarget.style.background = '#ff5722';
//                                     }}
//                                     onMouseLeave={e => {
//                                         e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                                         e.currentTarget.style.background = 'var(--accent-primary)';
//                                     }}
//                                 >
//                                     {status === 'loading' ? 'Sending...' : (
//                                         <>Subscribe Now <Sparkles size={16} /></>
//                                     )}
//                                 </button>
//                             </motion.form>
//                         ) : (
//                             <motion.div
//                                 key="success"
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 style={{
//                                     padding: '24px', borderRadius: '20px', background: 'rgba(232,69,26,0.1)',
//                                     border: '1px solid rgba(232,69,26,0.2)', color: 'var(--accent-primary)',
//                                     display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
//                                 }}
//                             >
//                                 <CheckCircle2 size={40} />
//                                 <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem', fontFamily: "'Outfit', sans-serif" }}>You're on the list!</h4>
//                                 <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(232,69,26,0.8)' }}>Check your inbox for a confirmation email.</p>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '32px' }}>
//                         No spam. Only high-quality tech roles. Unsubscribe with one click anytime.
//                     </p>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default EmailCapture;






























import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Sparkles, Bell, ChevronDown } from 'lucide-react';

const faqData = [
    {
        question: "How often are the job links updated?",
        answer: "We update our database every 24 hours. Fresh W2, C2C, and Visa sponsorship roles are delivered to your inbox every morning at 8:00 AM EST."
    },
    {
        question: "Is there a cost to access the full BigCareerDream?",
        answer: "The daily email alerts are completely free. We also offer a premium tier for $19/mo which includes early 48h access and advanced filtering by tech stack."
    },
    {
        question: "Do you verify the sponsorship status of employers?",
        answer: "Yes, we use a combination of AI verification and historical USCIS data to tag roles accurately for H1-B and OPT-friendly employers."
    },
    {
        question: "Can I filter roles by specific technology or location?",
        answer: "Absolutely! Our dashboard allows you to filter by 50+ tech stacks and major US hubs like NYC, SF, Austin, and Seattle, plus remote-only options."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div style={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            width: '100%',
            overflow: 'hidden'
        }}>
            <button
                onClick={onClick}
                style={{
                    width: '100%',
                    padding: '28px 0',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    transition: 'all 0.3s ease'
                }}
            >
                <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: '-0.3px',
                    color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.8)'
                }}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div style={{
                            paddingBottom: '28px',
                            color: 'rgba(255,255,255,0.5)',
                            lineHeight: 1.6,
                            fontSize: '1rem',
                            maxWidth: '90%'
                        }}>
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const EmailCapture = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success
    const [openIndex, setOpenIndex] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        setTimeout(() => setStatus('success'), 1200);
    };

    return (
        <section id="contact" style={{
            padding: '120px 6%',
            background: '#000000',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '850px', margin: '0 auto' }}>

                {/* FAQ Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{
                        width: '100px', height: '120px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 24px',
                        position: 'relative',
                        // overflow: 'hidden',
                    }}>
                        {/* ── Replace this src with your local image path ── */}
                        <img
                            src="/eyes.jpg"
                            alt="FAQ"
                            style={{ width: '80px', height: '90px', objectFit: 'cover' }}
                        />
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
                        fontWeight: 900,
                        color: '#FFF',
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: '-2px',
                        lineHeight: 0.9,
                        textTransform: 'lowercase'
                    }}>
                        Frequently asked<br />questions
                    </h2>
                </div>

                {/* FAQ Accordion */}
                <div style={{ marginBottom: '120px' }}>
                    {faqData.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>

                {/* Email Capture Card */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        padding: '80px 40px',
                        borderRadius: '40px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                        position: 'relative', overflow: 'hidden',
                        textAlign: 'center',
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                    }}
                >
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        backgroundImage: 'url("/worldmap.jpg")', 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.18,
                    }} />
                  
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 1,
                        background: 'linear-gradient(135deg, rgba(232,69,26,0.12) 0%, rgba(0,0,0,0.55) 100%)',
                    }} />
                   
                    <div style={{
                        position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
                        width: '400px', height: '200px',
                        background: 'radial-gradient(ellipse at center, rgba(232, 69, 26, 0.25) 0%, transparent 70%)',
                        filter: 'blur(40px)', zIndex: 2
                    }} />

                    <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: 'var(--accent-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#FFFFFF', margin: '0 auto 24px',
                        boxShadow: '0 10px 25px rgba(232, 69, 26, 0.2)',
                        position: 'relative', zIndex: 2,
                    }}>
                        <Bell size={26} />
                    </div>

                    <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', marginBottom: '16px', letterSpacing: '-1.2px', fontFamily: "'Outfit', sans-serif", position: 'relative', zIndex: 2 }}>
                        Get <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>Instant</span> Job Alerts
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>
                        Be the first to know when new W2, C2C, or Sponsored roles hit the market. Fresh links delivered every morning.
                    </p>

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <AnimatePresence mode="wait">
                            {status !== 'success' ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onSubmit={handleSubmit}
                                    style={{
                                        display: 'flex', gap: '12px', flexWrap: 'wrap',
                                        padding: '10px', background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)',
                                        maxWidth: '560px', margin: '0 auto', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            flex: 1, minWidth: '240px', background: 'transparent',
                                            border: 'none', outline: 'none', color: '#FFFFFF',
                                            padding: '14px 20px', fontSize: '0.95rem',
                                            fontFamily: "'Outfit', sans-serif"
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        style={{
                                            background: 'var(--accent-primary)',
                                            color: '#FFFFFF', border: 'none', padding: '14px 28px',
                                            borderRadius: '12px', fontWeight: 800, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(232, 69, 26, 0.25)',
                                            fontSize: '0.9rem',
                                            fontFamily: "'Outfit', sans-serif"
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                            e.currentTarget.style.background = '#ff5722';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                            e.currentTarget.style.background = 'var(--accent-primary)';
                                        }}
                                    >
                                        {status === 'loading' ? 'Sending...' : (
                                            <>Subscribe Now <Sparkles size={16} /></>
                                        )}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        padding: '24px', borderRadius: '20px', background: 'rgba(232,69,26,0.1)',
                                        border: '1px solid rgba(232,69,26,0.2)', color: 'var(--accent-primary)',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
                                    }}
                                >
                                    <CheckCircle2 size={40} />
                                    <h4 style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem', fontFamily: "'Outfit', sans-serif" }}>You're on the list!</h4>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(232,69,26,0.8)' }}>Check your inbox for a confirmation email.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '32px', position: 'relative', zIndex: 2 }}>
                        No spam. Only high-quality tech roles. Unsubscribe with one click anytime.
                    </p>
                </motion.div> */}
            </div>
        </section>
    );
};

export default EmailCapture;
