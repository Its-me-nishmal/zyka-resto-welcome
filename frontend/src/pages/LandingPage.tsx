import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gift } from 'lucide-react';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <div className="bg-primary/10 p-8 rounded-full mb-6 inline-block">
                    <Gift className="w-16 h-16 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-2">Claim Your Reward!</h2>
                <p className="text-secondary/60 max-w-xs mx-auto">
                    Scan, Play, and Win exciting prizes before our grand opening.
                </p>
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 flex items-center gap-3 transition-colors hover:bg-primary/90 outline-none"
            >
                Start Experience
                <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="mt-8 text-xs text-secondary/40">
                Limited time offer. Terms & Conditions apply.
            </p>
        </div>
    );
};

export default LandingPage;
