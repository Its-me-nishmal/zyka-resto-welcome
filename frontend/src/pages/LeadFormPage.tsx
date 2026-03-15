import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Loader2, Instagram, Check } from 'lucide-react';

interface LeadFormPageProps {
    onSubmit: (data: { name: string; mobile: string; place: string }) => void;
    isSubmitting: boolean;
}

const LeadFormPage: React.FC<LeadFormPageProps> = ({ onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({ name: '', mobile: '', place: '' });
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (localStorage.getItem('hasFollowedInsta') === 'true') {
            setIsFollowing(true);
        }
    }, []);

    const handleInstaClick = () => {
        // Validate form first before opening Instagram
        if (!formData.name || !formData.mobile || !formData.place) {
            setError('Please fill in all fields before following');
            return;
        }
        if (formData.mobile.length !== 10) {
            setError('Mobile number must be 10 digits');
            return;
        }

        // All valid — clear error, mark as following, open Instagram, and auto-submit
        setError('');
        setIsFollowing(true);
        localStorage.setItem('hasFollowedInsta', 'true');
        window.open('https://instagram.com/zykarestocafe', '_blank', 'noopener,noreferrer');
        onSubmit(formData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.mobile || !formData.place) {
            setError('Please fill in all fields');
            return;
        }
        if (formData.mobile.length !== 10) {
            setError('Mobile number must be 10 digits');
            return;
        }
        if (!isFollowing) {
            setError('Please follow our Instagram account to participate');
            return;
        }
        setError('');
        onSubmit(formData);
    };

    return (
        <div className="flex-1 flex flex-col pt-4">
            <h2 className="text-2xl font-bold text-secondary mb-2">Almost there!</h2>
            <p className="text-secondary/60 mb-8 text-sm">Enter your details to join the opening day lucky draw.</p>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary/60 uppercase ml-1">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <input
                            type="text"
                            placeholder=""
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 bg-primary/5 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary/60 uppercase ml-1">Mobile Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <input
                            type="tel"
                            placeholder=""
                            maxLength={10}
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                            className="w-full pl-12 pr-4 py-4 bg-primary/5 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary/60 uppercase ml-1">Place</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                        <input
                            type="text"
                            placeholder=""
                            value={formData.place}
                            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                            className="w-full pl-12 pr-4 py-4 bg-primary/5 border-2 border-transparent focus:border-primary focus:bg-white rounded-2xl outline-none transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 p-4 bg-primary/5 rounded-2xl border-2 border-transparent">
                    <p className="text-sm text-secondary/80 font-medium text-center">
                        Follow our Instagram to participate in the lucky draw!
                    </p>
                    <button
                        type="button"
                        onClick={handleInstaClick}
                        className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isFollowing
                            ? 'bg-green-500/10 text-green-600 border-2 border-green-500/20 hover:bg-green-500/20'
                            : 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-lg shadow-[#fd1d1d]/20 hover:opacity-90'
                            }`}
                    >
                        <Instagram className="w-5 h-5" />
                        {isFollowing ? 'Followed @zykarestocafe' : 'Follow @zykarestocafe'}
                        {isFollowing && <Check className="w-5 h-5 ml-1" />}
                    </button>
                </div>

                {error && <p className="text-red-500 text-xs font-bold ml-1">{error}</p>}

                <div className="pt-4 mt-auto">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/10 flex items-center justify-center gap-2 transition-all hover:bg-primary/90 disabled:opacity-50"
                    >
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Enter Lucky Draw'}
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default LeadFormPage;
