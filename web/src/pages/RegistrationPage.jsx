import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Key, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import api from '../api';

const RegistrationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const clientId = searchParams.get('client_id');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!clientId) {
            alert("No client information found. Please restart the process.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setIsRegistering(true);
        try {
            const response = await api.register(clientId, password);
            if (response.success) {
                alert("Account created successfully! Please login.");
                navigate('/login');
            } else {
                alert("Registration failed: " + (response.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred during registration.");
        } finally {
            setIsRegistering(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#07070C] text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border border-primary/20 mb-4">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black">Final Step</h1>
                    <p className="text-gray-400">Secure your account with a password</p>
                </div>

                <form onSubmit={handleRegister} className="bg-[#0F0F1A] border border-white/10 rounded-[2.5rem] p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block px-2">Choose Password</label>
                            <div className="relative">
                                <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-12 focus:border-primary/50 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block px-2">Confirm Password</label>
                            <div className="relative">
                                <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-12 focus:border-primary/50 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${isRegistering
                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                : 'bg-primary text-black hover:scale-[1.02] shadow-2xl shadow-primary/20'
                            }`}
                    >
                        {isRegistering ? 'Creating Account...' : 'Complete Registration'}
                        {!isRegistering && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                <div className="text-center text-xs text-gray-600 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Your data is protected with enterprise-grade encryption.
                </div>
            </motion.div>
        </div>
    );
};

export default RegistrationPage;
