import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Ticket, Share2 } from 'lucide-react';

interface SuccessPageProps {
}

const SuccessPage: React.FC<SuccessPageProps> = () => {
    const handleShare = () => {
        const text = encodeURIComponent("Hey! I just joined the ZYKA Resto Café Guest List for their Grand Opening! Join the lucky draw and win exciting prizes here: ");
        const url = encodeURIComponent(window.location.origin);
        window.open(`https://wa.me/?text=${text}${url}`, '_blank');
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
            >
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 mx-auto" />
            </motion.div>

            <h2 className="text-3xl font-bold text-secondary mb-2">You're In!</h2>
            <p className="text-secondary/60 mb-8 px-4 text-sm">You have been listed for the lucky draw of our opening day.</p>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-primary p-8 rounded-3xl w-full text-white shadow-xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Ticket className="w-24 h-24 rotate-12" />
                </div>
                <p className="text-white/70 text-xs uppercase font-bold tracking-widest mb-1">Entry Confirmed</p>
                <h3 className="text-4xl font-black mb-4 uppercase">Lucky Draw</h3>
                <div className="bg-white/20 py-2 px-4 rounded-full inline-block text-[10px] font-bold">
                    Join us on Opening Day
                </div>
            </motion.div>

            <p className="mt-8 text-sm text-secondary/60 italic px-4">
                Thank you for participating! Results will be announced during our grand opening.
            </p>

            <button
                onClick={handleShare}
                className="mt-8 flex items-center gap-2 text-primary font-bold hover:underline cursor-pointer active:scale-95 transition-transform"
            >
                <Share2 className="w-4 h-4" />
                Share with friends on WhatsApp
            </button>
        </div>
    );
};

export default SuccessPage;
