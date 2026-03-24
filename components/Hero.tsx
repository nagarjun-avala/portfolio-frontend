"use client"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/lib/types'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Magnetic from '@/components/Magnetic';

type Props = {
    data: Hero
}

// Staggered character animation for hero title words
const WordReveal = ({ text, className }: { text: string; className?: string }) => {
    const words = text.split(" ");
    return (
        <span className={className} aria-label={text}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, skewY: 3 }}
                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

export const HeroSection = ({ data }: Props) => {

    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        if (!data) return;
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % data.roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [data]);

    if (!data) return null;

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 scroll-mt-24">
            {/* Background Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-rose-400/20 dark:bg-rose-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-indigo-400/20 dark:bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Badge variant="secondary" className="mb-6 py-1.5 px-4 text-sm">
                        {data.badge}
                    </Badge>
                </motion.div>

                <h1 className="font-(--font-syne) text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[1.1] text-slate-900 dark:text-slate-100 overflow-hidden">
                    <WordReveal text={data.titlePrefix} className="block" />
                    <div className="h-[1.1em] overflow-hidden relative text-rose-500 dark:text-rose-400">
                        <AnimatePresence mode='wait'>
                            <motion.span
                                key={roleIndex}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="block"
                            >
                                {data.roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <WordReveal
                        text={data.titleSuffix}
                        className="block text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-600 text-4xl md:text-6xl mt-2"
                    />
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto"
                >
                    {data.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 flex justify-center gap-4"
                >
                    <Magnetic>
                        <Button size="lg" className="rounded-full text-base font-bold shadow-lg shadow-rose-500/20" asChild>
                            <Link href={data.ctaPrimaryLink || "#work"} aria-label={data.ctaPrimary}>
                                {data.ctaPrimary}
                            </Link>
                        </Button>
                    </Magnetic>
                    <Magnetic>
                        <Button size="lg" variant="outline" className="rounded-full text-base" asChild>
                            <a href={data.ctaSecondaryLink || "#connect"} aria-label={data.ctaSecondary}>{data.ctaSecondary}</a>
                        </Button>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}