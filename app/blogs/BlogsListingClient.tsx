'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blog } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    blogs: Blog[];
};

export default function BlogsListingClient({ blogs }: Props) {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = useMemo(() => {
        const cats = blogs.map((b) => b.category).filter(Boolean) as string[];
        return Array.from(new Set(cats));
    }, [blogs]);

    const filtered = useMemo(() => {
        return blogs.filter((b) => {
            const matchesSearch =
                !search ||
                b.title.toLowerCase().includes(search.toLowerCase()) ||
                (b.excerpt ?? '').toLowerCase().includes(search.toLowerCase());
            const matchesCat = !activeCategory || b.category === activeCategory;
            return matchesSearch && matchesCat;
        });
    }, [blogs, search, activeCategory]);

    const formatDate = (d: string | Date | undefined) => {
        if (!d) return '';
        return new Date(d).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

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
                    // Latest_Thoughts
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                    Blog
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
                    Thoughts on software engineering, cloud architecture, and building products that scale.
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
                        placeholder="Search posts…"
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
                        onClick={() => setActiveCategory(null)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            !activeCategory
                                ? 'bg-rose-500 text-white'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500'
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === cat
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Results count */}
            <p className="text-sm text-slate-400 mb-6">
                {filtered.length} post{filtered.length !== 1 ? 's' : ''}
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
                        <p className="text-xl font-medium mb-2">No posts found</p>
                        <p className="text-sm">Try adjusting your search or filter.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filtered.map((blog, i) => (
                            <motion.div
                                key={blog.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/blogs/${blog.id}`}>
                                    <Card className="group cursor-pointer border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/80 transition-colors h-full">
                                        <div className="overflow-hidden rounded-t-xl relative aspect-video bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                                            {blog.image || blog.coverImage ? (
                                                <Image
                                                    src={(blog.image || blog.coverImage)!}
                                                    alt={blog.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                                    <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
                                                        <ArrowUpRight className="text-rose-500 dark:text-rose-400" size={20} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="pt-6">
                                            <div className="flex items-center gap-2 mb-3 text-xs font-medium flex-wrap">
                                                {blog.category && (
                                                    <Badge
                                                        variant="outline"
                                                        className="border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10"
                                                    >
                                                        {blog.category}
                                                    </Badge>
                                                )}
                                                {(blog.publishedAt || blog.date) && (
                                                    <span className="text-slate-500">
                                                        {formatDate(blog.publishedAt || blog.date)}
                                                    </span>
                                                )}
                                                {(blog.readingTime || blog.readTime) && (
                                                    <>
                                                        <span className="text-slate-500">•</span>
                                                        <span className="text-slate-500">
                                                            {blog.readingTime
                                                                ? `${blog.readingTime} min read`
                                                                : blog.readTime}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors leading-tight">
                                                {blog.title}
                                            </h2>
                                            {blog.excerpt && (
                                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                                    {blog.excerpt}
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
