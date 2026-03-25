'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

type Props = {
    projects: Project[];
};

export default function ProjectsListingClient({ projects }: Props) {
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const allTags = useMemo(() => {
        const tags = projects.flatMap((p) => [p.cat, ...p.tags]);
        return Array.from(new Set(tags)).filter(Boolean);
    }, [projects]);

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchesSearch =
                !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.desc.toLowerCase().includes(search.toLowerCase());
            const matchesTag =
                !activeTag ||
                p.cat === activeTag ||
                p.tags.includes(activeTag);
            return matchesSearch && matchesTag;
        });
    }, [projects, search, activeTag]);

    return (
        <main className="max-w-7xl mx-auto px-4 pt-36 pb-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-3">
                    // Selected_Works
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                    Projects
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
                    A curated collection of products, tools, and experiments built across full-stack, cloud, and DevOps.
                </p>
            </motion.div>

            {/* Search + Filters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search projects…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveTag(null)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            !activeTag
                                ? 'bg-rose-500 text-white'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500'
                        }`}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                activeTag === tag
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Results count */}
            <p className="text-sm text-slate-400 mb-6">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </p>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-24 text-slate-400"
                    >
                        <p className="text-xl font-medium mb-2">No projects found</p>
                        <p className="text-sm">Try adjusting your search or filter.</p>
                    </motion.div>
                ) : (
                    <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Tilt
                                    tiltMaxAngleX={4}
                                    tiltMaxAngleY={4}
                                    glareEnable={true}
                                    glareMaxOpacity={0.08}
                                    glareColor="#ffffff"
                                    glarePosition="all"
                                    glareBorderRadius="inherit"
                                    scale={1.01}
                                    transitionSpeed={700}
                                    className="rounded-xl"
                                >
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        aria-label={`View project: ${project.title}`}
                                    >
                                        <Card className="group relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-[380px] md:h-[460px] cursor-pointer hover:border-rose-500/50 transition-colors rounded-xl">
                                            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
                                                {project.img && (
                                                    <Image
                                                        src={project.img}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-60 dark:group-hover:opacity-40"
                                                    />
                                                )}
                                            </div>

                                            {/* Glassmorphism border overlay */}
                                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 dark:ring-white/5 pointer-events-none z-10" />

                                            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-linear-to-t from-white/95 dark:from-slate-950 via-white/20 dark:via-slate-950/20 to-transparent">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    <div className="mb-3">
                                                        <Badge variant="default">{project.cat}</Badge>
                                                    </div>
                                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                                        {project.title}
                                                    </h2>
                                                    <p className="text-slate-600 dark:text-slate-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                                                        {project.desc}
                                                    </p>
                                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 flex-wrap">
                                                        {project.tags.map((tag) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="outline"
                                                                className="border-slate-400 dark:border-slate-500 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-transparent"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="absolute top-8 right-8 p-3 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rotate-45 group-hover:rotate-0 z-20">
                                                    <ArrowUpRight size={24} />
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </Tilt>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
