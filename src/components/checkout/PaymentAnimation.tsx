
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentAnimationProps {
    onComplete: () => void;
}

export function PaymentAnimation({ onComplete }: PaymentAnimationProps) {
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsProcessing(false);
            // Wait for the success animation to play before calling onComplete
            setTimeout(onComplete, 1500); 
        }, 2500); // Simulate a 2.5 second payment process

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <AnimatePresence mode="wait">
                {isProcessing ? (
                    <motion.div
                        key="processing"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex flex-col items-center justify-center gap-4"
                    >
                        <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-lg font-semibold text-foreground">Processing Payment...</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                    >
                        <svg className="w-32 h-32" viewBox="0 0 100 100">
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#4ade80" /* green-400 */
                                strokeWidth="5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                            <motion.path
                                d="M30 50 L45 65 L70 40"
                                fill="none"
                                stroke="#4ade80"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
