"use client"
import { TechStack } from '@/lib/types'
import React from 'react'
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Code, Cpu, Database, Layers, Terminal } from 'lucide-react';
import { Badge } from './ui/badge';

type Props = {
    techStack: TechStack
}

const categoryIconMap: Record<string, React.ReactNode> = {
    "Languages": <Code size={18} className="text-rose-500" />,
    "Frontend": <Layers size={18} className="text-rose-500" />,
    "Backend": <Cpu size={18} className="text-rose-500" />,
    "DevOps & Cloud": <Cloud size={18} className="text-rose-500" />,
    "Databases": <Database size={18} className="text-rose-500" />,
    "Tools": <Terminal size={18} className="text-rose-500" />,
};

const SkillsSection = ({ techStack }: Props) => {
    if (!techStack) return null;

    return (
        <section id="skills" className="py-32 px-4 max-w-7xl mx-auto scroll-mt-24">
            <motion.h2
                aria-label="Technical Arsenal"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mb-10 text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
            >
                // Technical Arsenal
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(techStack || []).map((stackItem, index) => (
                    <motion.div
                        key={stackItem.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="group h-full relative overflow-hidden border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md hover:border-rose-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/5">
                            {/* Halo border glow on hover */}
                            <div className="absolute inset-0 rounded-inherit ring-1 ring-inset ring-white/30 dark:ring-white/5 group-hover:ring-rose-500/20 transition-all duration-300 pointer-events-none z-10" />

                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    {categoryIconMap[stackItem.category] ?? null}
                                    {stackItem.category}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {(stackItem.items || []).map(skill => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        className="text-xs font-normal hover:bg-rose-100 dark:hover:bg-rose-500/20 hover:text-rose-600 dark:hover:text-rose-300 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default SkillsSection