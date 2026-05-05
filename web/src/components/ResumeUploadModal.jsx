import { useState } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2, Sparkles, Phone, Mail, User, Briefcase, GraduationCap, Code, Award, ExternalLink, MapPin, Calendar, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const ResumeUploadModal = ({ isOpen, onClose }) => {
    const [file, setFile] = useState(null);
    const [isParsing, setIsParsing] = useState(false);
    const [parsedData, setParsedData] = useState(null);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please upload a PDF or DOCX file.');
            setFile(null);
        }
    };
    const handleUpload = async () => {
        if (!file) return;

        setIsParsing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('resume', file);
            const response = await api.parseResume(formData);

            if (response.success) {
                setParsedData(response.data);
            } else {
                throw new Error(response.error || 'Failed to parse resume');
            }
        } catch (err) {
            console.error('Parsing error:', err);
            setError(err.message || 'Failed to parse resume.');
        } finally {
            setIsParsing(false);
        }
    };

    const handleImport = async () => {
        if (!file || !parsedData) return;

        setIsSaving(true);
        setError(null);

        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
            const clientId = storedUser?.client_id || 'client-1';

            const formData = new FormData();
            formData.append('resume', file);
            formData.append('parsedData', JSON.stringify(parsedData));
            formData.append('client_id', clientId);
            // This is the validation token sent to the backend to authorize R2 storage
            formData.append('cloudflare_secret_id', import.meta.env.VITE_CLOUDFLARE_SECRET_VALIDATION_TOKEN || '6029523fa04467bdc1224533f7912d54@N1i2k3h4i5l6');

            const response = await api.saveResume(formData);

            if (response.success) {
                alert('Profile imported successfully!');
                onClose();
            } else {
                throw new Error(response.error || 'Failed to import profile');
            }
        } catch (err) {
            console.error('Import error:', err);
            setError(err.message || 'Failed to save profile to database.');
        } finally {
            setIsSaving(false);
        }
    };

    const reset = () => {
        setFile(null);
        setParsedData(null);
        setError(null);
        setIsParsing(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-gradient-to-r from-[var(--color-primary-subtle)]/10 to-transparent flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[var(--color-primary)] rounded-xl shadow-lg shadow-purple-500/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--color-text-primary)]">AI Premium Parser</h3>
                                <p className="text-xs text-[var(--color-text-secondary)]">Structured ATS-ready data extracted instantly.</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-[var(--color-surface-2)] rounded-full transition-colors">
                            <X className="w-5 h-5 text-[var(--color-text-muted)]" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                        {!parsedData ? (
                            <div className="max-w-2xl mx-auto space-y-6 py-10">
                                {/* Upload Box */}
                                <div
                                    className={`relative border-2 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center transition-all ${file ? 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]/5' : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-2)]'}`}
                                >
                                    <input
                                        type="file"
                                        accept=".pdf,.docx"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <motion.div
                                        animate={file ? { scale: [1, 1.1, 1] } : {}}
                                        className={`p-6 rounded-3xl mb-4 ${file ? 'bg-[var(--color-primary)] text-white shadow-xl shadow-purple-500/30' : 'bg-[var(--color-surface-2)] text-[var(--color-text-muted)]'}`}
                                    >
                                        <Upload className="w-10 h-10" />
                                    </motion.div>
                                    <p className="text-lg font-bold text-[var(--color-text-primary)] mb-1 text-center">
                                        {file ? file.name : 'Drop your professional resume'}
                                    </p>
                                    <p className="text-sm text-[var(--color-text-secondary)] text-center">Supports PDF & DOCX format • Max 10MB</p>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-medium"
                                    >
                                        <AlertCircle className="w-5 h-5" />
                                        {error}
                                    </motion.div>
                                )}

                                <button
                                    onClick={handleUpload}
                                    disabled={!file || isParsing}
                                    className="w-full py-5 bg-[var(--color-primary)] text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/30 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 text-lg"
                                >
                                    {isParsing ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Analyzing with AI...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-6 h-6" />
                                            Parse Resume
                                        </>
                                    )}
                                </button>
                            </div>
                        ) : (
                            /* Detailed Parsed Results View */
                            <div className="space-y-8 animate-in fade-in duration-500">
                                {/* Success Header */}
                                <div className="flex items-center justify-between p-4 bg-[var(--color-primary-subtle)] rounded-2xl border border-[var(--color-primary)]/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[var(--color-primary)]">Parse Successful!</p>
                                            <p className="text-xs text-[var(--color-text-secondary)]">Detected {parsedData.total_experience_years || 0} years of experience.</p>
                                        </div>
                                    </div>
                                    <button onClick={reset} className="text-xs font-bold text-[var(--color-primary)] hover:underline uppercase tracking-wider">
                                        Re-upload
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column: Basic Info */}
                                    <div className="lg:col-span-1 space-y-6">
                                        <section className="bg-[var(--color-surface-2)] p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
                                            <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                <User className="w-3 h-3" /> Basic Information
                                            </h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-xs text-[var(--color-text-muted)] mb-0.5">Full Name</p>
                                                    <p className="font-bold text-[var(--color-text-primary)] text-lg">{parsedData.candidate_name || parsedData.name || 'N/A'}</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                                                    <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                                                    <span className="truncate">{parsedData.email || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                                                    <Phone className="w-4 h-4 text-[var(--color-primary)]" />
                                                    <span>{parsedData.phone || 'N/A'}</span>
                                                </div>
                                                {parsedData.linkedin && (
                                                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                                                        <ExternalLink className="w-4 h-4 text-[#0077b5]" />
                                                        <a href={parsedData.linkedin.startsWith('http') ? parsedData.linkedin : `https://${parsedData.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate italic">LinkedIn Profile</a>
                                                    </div>
                                                )}
                                                {parsedData.github && (
                                                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                                                        <Github className="w-4 h-4 text-[var(--color-text-primary)]" />
                                                        <a href={parsedData.github.startsWith('http') ? parsedData.github : `https://${parsedData.github}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate italic">GitHub Profile</a>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        <section className="bg-[var(--color-surface-2)] p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
                                            <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                <Code className="w-3 h-3" /> Tech Stack & Skills
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {parsedData.skills && parsedData.skills.length > 0 ? (
                                                    parsedData.skills.map((skill, idx) => (
                                                        <span key={idx} className="px-2.5 py-1 bg-[var(--color-surface)] text-[var(--color-text-primary)] text-[11px] font-bold rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors">
                                                            {skill}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <p className="text-xs text-[var(--color-text-muted)] italic">No specific skills detected.</p>
                                                )}
                                            </div>
                                        </section>

                                        {/* Certifications Section moved to sidebar */}
                                        {parsedData.certifications && parsedData.certifications.length > 0 && (
                                            <section className="bg-[var(--color-surface-2)] p-6 rounded-3xl border border-[var(--color-border)] shadow-sm">
                                                <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                    <Award className="w-3 h-3" /> Certifications
                                                </h4>
                                                <div className="space-y-4">
                                                    {parsedData.certifications.map((cert, idx) => (
                                                        <div key={idx} className="border-l-2 border-[var(--color-primary)]/20 pl-4 py-1">
                                                            <h5 className="text-[11px] font-bold text-[var(--color-text-primary)] leading-tight">{cert.name}</h5>
                                                            <p className="text-[10px] text-[var(--color-primary)] font-medium">{cert.issuer || 'N/A'}</p>
                                                            <div className="flex justify-between items-center mt-1">
                                                                {cert.date && <p className="text-[9px] text-[var(--color-text-muted)] font-bold">{cert.date}</p>}
                                                                {cert.credential_id && <p className="text-[8px] text-[var(--color-text-muted)] italic">ID: {cert.credential_id}</p>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                    {/* Middle/Right Column: Experience & Education */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <section>
                                            <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                <Briefcase className="w-3 h-3" /> Professional Experience
                                            </h4>
                                            <div className="space-y-4">
                                                {parsedData.experience && parsedData.experience.length > 0 ? (
                                                    parsedData.experience.map((exp, idx) => (
                                                        <div key={idx} className="group p-5 bg-[var(--color-surface-2)] rounded-3xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/20 transition-all relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                                                                <div>
                                                                    <h5 className="font-bold text-[var(--color-text-primary)] leading-tight">{exp.position || 'Professional Role'}</h5>
                                                                    <p className="text-sm font-medium text-[var(--color-primary)]">{exp.company || 'Vaporware Inc.'}</p>
                                                                </div>
                                                                <div className="flex flex-col md:items-end text-[11px] text-[var(--color-text-muted)]">
                                                                    <div className="flex items-center gap-1 font-bold">
                                                                        <Calendar className="w-3 h-3" />
                                                                        {exp.start_date || '?'} — {exp.end_date || 'Present'}
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <MapPin className="w-3 h-3" />
                                                                        {exp.location || 'Remote'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed italic border-l-2 border-[var(--color-border)] pl-4 py-1">
                                                                {exp.description || 'No description provided.'}
                                                            </p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-[var(--color-text-muted)] italic">No work history found.</p>
                                                )}
                                            </div>
                                        </section>

                                        <section>
                                            <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                <GraduationCap className="w-3 h-3" /> Academic Background
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {parsedData.education && parsedData.education.length > 0 ? (
                                                    parsedData.education.map((edu, idx) => (
                                                        <div key={idx} className="p-4 bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)] shadow-sm">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h5 className="text-sm font-bold text-[var(--color-text-primary)]">{edu.degree || 'Degree'}</h5>
                                                                {edu.gpa && <span className="text-[10px] font-bold bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2 py-0.5 rounded-full">GPA: {edu.gpa}</span>}
                                                            </div>
                                                            <p className="text-xs text-[var(--color-primary)] font-medium mb-1">{edu.institution || 'University'}</p>
                                                            <div className="flex justify-between items-center text-[10px] text-[var(--color-text-muted)] font-bold">
                                                                <span>{edu.field_of_study || 'N/A'}</span>
                                                                {edu.start_date && <span>{edu.start_date} {edu.end_date ? `— ${edu.end_date}` : ''}</span>}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-[var(--color-text-muted)] italic">Education details missing.</p>
                                                )}
                                            </div>
                                        </section>

                                        {/* Projects Section if available */}
                                        {parsedData.projects && parsedData.projects.length > 0 && (
                                            <section>
                                                <h4 className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                    <Award className="w-3 h-3" /> Featured Projects
                                                </h4>
                                                <div className="space-y-4">
                                                    {parsedData.projects.map((proj, idx) => (
                                                        <div key={idx} className="p-4 bg-[var(--color-surface-2)] rounded-2xl border border-[var(--color-border)]">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h5 className="text-sm font-bold text-[var(--color-text-primary)]">{proj.name}</h5>
                                                                {proj.url && (
                                                                    <a href={proj.url} target="_blank" rel="noreferrer" className="text-[10px] text-[var(--color-primary)] hover:underline flex items-center gap-1 font-bold">
                                                                        <ExternalLink className="w-3 h-3" /> Link
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-[var(--color-text-secondary)] mb-2">{proj.description}</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {proj.technologies && proj.technologies.map((tech, tIdx) => (
                                                                    <span key={tIdx} className="text-[9px] px-1.5 py-0.5 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] rounded font-bold">{tech}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-surface-2)]/50 flex justify-end gap-3 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 text-sm font-bold text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-surface-2)] transition-colors"
                        >
                            Close
                        </button>
                        {parsedData && (
                            <button
                                onClick={handleImport}
                                disabled={isSaving}
                                className="px-8 py-2.5 text-sm font-bold text-white bg-[var(--color-primary)] rounded-xl shadow-lg shadow-purple-500/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Import to Profile
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ResumeUploadModal;
