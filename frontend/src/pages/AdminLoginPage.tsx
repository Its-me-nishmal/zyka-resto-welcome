import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Loader2 } from 'lucide-react';

interface AdminLoginPageProps {
    onLogin: (credentials: string) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const creds = btoa(`${username}:${password}`);
            // Simulate/Verify login by making a small request if needed, 
            // but here we just pass it to the parent to store and try
            onLogin(creds);
        } catch (err) {
            setError('Invalid credentials');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="text-center mb-8">
                <div className="bg-orange-100 p-4 rounded-2xl inline-block mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-secondary">Admin Login</h2>
                <p className="text-secondary/60 text-sm">Secure access to ZYKA leads</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary/60 uppercase ml-1">Username</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-orange-100 focus:border-primary rounded-xl outline-none transition-all"
                            placeholder="admin"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary/60 uppercase ml-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-orange-100 focus:border-primary rounded-xl outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-secondary text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
                >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
                </motion.button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
