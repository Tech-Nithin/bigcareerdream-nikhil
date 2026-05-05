import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Phone, MapPin, Globe, Github, Linkedin, Save, Loader2,
    Briefcase, Award, ArrowLeft, Camera, X, Target, Info, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import * as idb from '../utils/idb';
import { HIERARCHY } from '../constants/hierarchy';

const EditProfile = () => {
    const navigate = useNavigate();
    const [clientProfile, setClientProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadingPicture, setUploadingPicture] = useState(false);
    const [skillInput, setSkillInput] = useState('');
    const fileInputRef = useRef(null);

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const clientId = storedUser?.client_id || 'client-1';

    // Get all unique sub-departments for alternative roles
    const allRoles = Array.from(new Set(HIERARCHY.flatMap(cat =>
        cat.departments.flatMap(dept => dept.subDepts)
    ))).sort();

    // Get all unique departments for job domains
    const allDomains = Array.from(new Set(HIERARCHY.flatMap(cat =>
        cat.departments.map(dept => dept.name)
    ))).sort();

    useEffect(() => {
        const init = async () => {
            await Promise.all([fetchProfile(), fetchProfilePicture()]);
            setIsLoading(false);
        };
        init();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.getClientProfile(clientId);
            if (response.success) {
                setClientProfile(response.data);
            }
        } catch (err) {
            console.error('Error fetching client profile:', err);
        }
    };

    const fetchProfilePicture = async () => {
        try {
            const response = await api.getClientPicture(clientId);
            if (response.success) {
                setProfilePicture(response.picture_url);
            }
        } catch (err) {
            console.error('Error fetching profile picture:', err);
        }
    };

    const handleInputChange = (field, value) => {
        setClientProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1.5MB Limit
        if (file.size > 1.5 * 1024 * 1024) {
            alert('File size exceeds 1.5MB limit.');
            return;
        }

        setSelectedFile(file);
        setPreviewPhoto(URL.createObjectURL(file));
        // Clear input
        e.target.value = '';
    };

    const handleRemovePhoto = async () => {
        if (!window.confirm('Remove profile picture?')) return;

        if (selectedFile) {
            setSelectedFile(null);
            setPreviewPhoto(null);
            return;
        }

        try {
            const response = await api.deleteClientPicture(clientId);
            if (response.success) {
                setProfilePicture(null);
                setPreviewPhoto(null);
            }
        } catch (err) {
            console.error('Photo removal failed:', err);
        }
    };

    const handleSkillInput = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = skillInput.trim().replace(/,$/, '');
            if (val) {
                const currentSkills = clientProfile.client_skills ? clientProfile.client_skills.split(',').map(s => s.trim()) : [];
                if (!currentSkills.includes(val)) {
                    handleInputChange('client_skills', [...currentSkills, val].join(', '));
                }
            }
            setSkillInput('');
        }
    };

    const removeSkill = (skill) => {
        const currentSkills = clientProfile.client_skills ? clientProfile.client_skills.split(',').map(s => s.trim()) : [];
        handleInputChange('client_skills', currentSkills.filter(s => s !== skill).join(', '));
    };

    const handleSave = async () => {
        if (!clientProfile) return;
        setIsSaving(true);
        try {
            // 1. Handle Photo Upload if selected
            if (selectedFile) {
                setUploadingPicture(true);
                const photoResponse = await api.uploadClientPicture(clientId, selectedFile);
                if (!photoResponse.success) throw new Error('Photo upload failed');

                setProfilePicture(photoResponse.picture_url);
                setPreviewPhoto(null);
                setSelectedFile(null);
                setUploadingPicture(false);
            }

            // 2. Save Profile Data
            const response = await api.updateClientProfile(clientId, clientProfile);
            if (response.success) {
                // Clear cache on profile update
                await idb.clearJobs();
                alert('Profile updated successfully!');
                navigate('/profile');
            }
        } catch (err) {
            console.error('Save failed:', err);
            alert('Failed to save changes: ' + (err.response?.data?.error || err.message));
        } finally {
            setIsSaving(false);
            setUploadingPicture(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-[var(--color-primary)] animate-spin" />
                    <p className="text-[var(--color-text-muted)] font-medium animate-pulse">Loading your profile details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-[var(--color-bg)]">
            {/* Rigid Header */}
            <header className="flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/profile')} className="p-2 hover:bg-[var(--color-surface-2)] rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-[var(--color-text-muted)]" />
                    </button>
                    <div>
                        <h1 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--color-text-primary)]">Edit Profile</h1>
                        <p className="text-[10px] text-[var(--color-text-muted)] font-bold">Configure your professional identity</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary gap-2 px-6 py-2.5 shadow-lg shadow-[var(--color-primary)]/20"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span className="text-xs uppercase tracking-widest font-black">{isSaving ? 'Saving' : 'Save Changes'}</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area - Non-scrollable */}
            <main className="flex-1 p-6 overflow-hidden">
                <div className="max-w-[1440px] mx-auto h-full grid lg:grid-cols-3 gap-6">

                    {/* Column 1: Identity & Basics */}
                    <div className="flex flex-col gap-6 h-full">
                        {/* Profile Picture */}
                        <div className="card p-6 flex flex-col items-center bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-2)]/30">
                            <div className="relative w-32 h-32 mb-4 group">
                                <div className="w-full h-full rounded-[2.5rem] bg-[var(--color-surface-2)] border-2 border-[var(--color-border)] flex items-center justify-center overflow-hidden shadow-inner">
                                    {(previewPhoto || profilePicture) ? (
                                        <img
                                            src={previewPhoto || profilePicture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            key={previewPhoto || profilePicture}
                                        />
                                    ) : (
                                        <User className="w-12 h-12 text-[var(--color-text-muted)] opacity-20" />
                                    )}
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="p-2 bg-[var(--color-primary)] text-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                    {(previewPhoto || profilePicture) && (
                                        <button
                                            onClick={handleRemovePhoto}
                                            className="p-2 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110 transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Profile Identity</h3>
                        </div>

                        {/* Basic Fields */}
                        <div className="card p-5 space-y-4 flex-1">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={clientProfile?.client_name || ''}
                                    onChange={(e) => handleInputChange('client_name', e.target.value)}
                                    className="input text-xs"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Gender</label>
                                    <select
                                        className="input text-xs appearance-none"
                                        value={clientProfile?.client_gender || ''}
                                        onChange={(e) => handleInputChange('client_gender', e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Experience</label>
                                    <input
                                        type="text"
                                        value={clientProfile?.client_experience || ''}
                                        onChange={(e) => handleInputChange('client_experience', e.target.value)}
                                        className="input text-xs"
                                        placeholder="e.g. 5 yrs"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Job Domain</label>
                                <div className="relative">
                                    <select
                                        value={clientProfile?.client_job_domain || ''}
                                        onChange={(e) => handleInputChange('client_job_domain', e.target.value)}
                                        className="input text-xs appearance-none pr-10"
                                    >
                                        <option value="">Select Domain</option>
                                        {allDomains.map(domain => (
                                            <option key={domain} value={domain}>{domain}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Expertize & Roles */}
                    <div className="flex flex-col gap-6 h-full overflow-hidden">
                        <div className="card p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="w-5 h-5 text-[var(--color-primary)]" />
                                <h2 className="text-xs font-black uppercase tracking-widest">Skills & Expertise</h2>
                            </div>

                            <div className="space-y-4 flex flex-col h-full overflow-hidden">
                                <div className="space-y-3 flex flex-col flex-1 overflow-hidden">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Skills (Type & Comma or Enter to add)</label>

                                    <div className="flex flex-wrap gap-1.5 p-3 min-h-[44px] bg-[var(--color-surface-2)] rounded-xl border border-[var(--color-border)] overflow-y-auto custom-scrollbar">
                                        {(clientProfile?.client_skills ? clientProfile.client_skills.split(',').map(s => s.trim()).filter(Boolean) : []).map(skill => (
                                            <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-primary)] text-white text-[10px] font-black uppercase tracking-tight rounded-lg">
                                                {skill}
                                                <X className="w-2.5 h-2.5 cursor-pointer hover:scale-125 transition-transform" onClick={() => removeSkill(skill)} />
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            value={skillInput}
                                            onChange={(e) => setSkillInput(e.target.value)}
                                            onKeyDown={handleSkillInput}
                                            className="flex-1 min-w-[100px] bg-transparent outline-none text-[11px] font-bold text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] placeholder:opacity-40"
                                            placeholder="Add skill..."
                                        />
                                    </div>
                                </div>

                                <div className="flex-[1.5] flex flex-col min-h-0 border-t border-[var(--color-border)] pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">Alternative Roles</label>
                                        <div className="relative w-40">
                                            <select
                                                value=""
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (val) {
                                                        const current = clientProfile.client_chosen_alternative_jobroles || [];
                                                        if (!current.includes(val)) {
                                                            handleInputChange('client_chosen_alternative_jobroles', [...current, val]);
                                                        }
                                                    }
                                                }}
                                                className="w-full pl-2 pr-8 py-1 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[9px] font-black uppercase outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="">+ Add Role</option>
                                                {allRoles.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[var(--color-primary)] pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                                        {(clientProfile?.client_chosen_alternative_jobroles || []).map((role, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 bg-[var(--color-surface-2)] rounded-xl border border-[var(--color-border)] group">
                                                <span className="text-[10px] font-bold text-[var(--color-text-primary)]">{role}</span>
                                                <button
                                                    onClick={() => {
                                                        const updated = clientProfile.client_chosen_alternative_jobroles.filter((_, i) => i !== idx);
                                                        handleInputChange('client_chosen_alternative_jobroles', updated);
                                                    }}
                                                    className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                        {(clientProfile?.client_chosen_alternative_jobroles || []).length === 0 && (
                                            <div className="flex items-center justify-center h-20 border-2 border-dashed border-[var(--color-border)] rounded-2xl">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-30">No alternative roles added</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Contact & Presence */}
                    <div className="flex flex-col gap-6 h-full overflow-hidden">
                        <div className="card p-6 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <Globe className="w-5 h-5 text-[var(--color-primary)]" />
                                <h2 className="text-xs font-black uppercase tracking-widest">Digital Matrix</h2>
                            </div>

                            <div className="grid gap-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                                {[
                                    { label: 'Email Address', icon: Mail, field: 'client_email' },
                                    { label: 'Phone Number', icon: Phone, field: 'client_phone' },
                                    { label: 'Location', icon: MapPin, field: 'client_country' },
                                    { label: 'LinkedIn', icon: Linkedin, field: 'client_linkedin' },
                                    { label: 'GitHub', icon: Github, field: 'client_github' },
                                    { label: 'Portfolio', icon: Globe, field: 'client_portfolio' },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex items-center gap-1.5 ml-1">
                                            <item.icon className="w-3 h-3 text-[var(--color-text-muted)]" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">{item.label}</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={clientProfile?.[item.field] || ''}
                                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                                            className="input text-[10px] py-1.5"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Public Links Area (Minimized) */}
                            <div className="mt-6 pt-6 border-t border-[var(--color-border)] opacity-60">
                                <div className="flex items-center gap-2 mb-3">
                                    <Target className="w-4 h-4 text-[var(--color-primary)]" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Public Documents</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-[8px] font-bold text-[var(--color-text-muted)]">
                                    <div className="p-2 bg-[var(--color-surface-2)] rounded-lg truncate" title={clientProfile?.client_resume}>
                                        RESUME: {clientProfile?.client_resume?.split('/').pop() || 'N/A'}
                                    </div>
                                    <div className="p-2 bg-[var(--color-surface-2)] rounded-lg truncate" title={clientProfile?.client_cover_letter}>
                                        COVER: {clientProfile?.client_cover_letter?.split('/').pop() || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default EditProfile;
