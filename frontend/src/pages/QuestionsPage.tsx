import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionsPageProps {
    onComplete: (answers: any) => void;
}

const questions = [
    {
        key: 'favoriteFood',
        question: 'What is your favorite type of food?',
        options: ['Arabic', 'Burgers', 'Chinese', 'Desserts']
    },
    {
        key: 'visitTime',
        question: 'When do you usually visit cafés?',
        options: ['Morning', 'Lunch', 'Evening', 'Late Night']
    },
    {
        key: 'companionType',
        question: 'Who do you usually visit with?',
        options: ['Friends', 'Family', 'Partner', 'Solo']
    }
];

const QuestionsPage: React.FC<QuestionsPageProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});

    const handleSelect = (option: string) => {
        const newAnswers = { ...answers, [questions[currentStep].key]: option };
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(newAnswers);
        }
    };

    return (
        <div className="flex-1 flex flex-col pt-8">
            <div className="mb-8 overflow-hidden bg-orange-100 h-2 rounded-full">
                <motion.div
                    className="bg-primary h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col"
                >
                    <span className="text-primary font-bold text-sm mb-2">Question {currentStep + 1} of {questions.length}</span>
                    <h2 className="text-2xl font-bold text-secondary mb-8">{questions[currentStep].question}</h2>

                    <div className="space-y-4">
                        {questions[currentStep].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="w-full py-4 px-6 bg-white border-2 border-orange-100 rounded-2xl text-left font-medium text-secondary hover:border-primary hover:bg-orange-50 transition-all flex justify-between items-center group"
                            >
                                {option}
                                <div className="w-6 h-6 rounded-full border-2 border-orange-100 group-hover:border-primary bg-white transition-colors" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default QuestionsPage;
