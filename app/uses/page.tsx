import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Monitor, Keyboard, Mouse, Headphones, Code, Cloud, Database, Terminal, Cpu, Wifi } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Uses | Nagarjun Avala',
    description: "The hardware, software, and tools that power Nagarjun Avala's development workflow.",
};

const sections = [
    {
        icon: Monitor,
        title: 'Hardware',
        items: [
            { name: 'Laptop', desc: 'ASUS VivoBook 15 — workhorse for everything' },
            { name: 'Monitor', desc: '24" FHD IPS — secondary display for extra screen real estate' },
            { name: 'Keyboard', desc: 'Mechanical keyboard for tactile feedback during long coding sessions' },
            { name: 'Mouse', desc: 'Wireless ergonomic mouse' },
        ],
    },
    {
        icon: Code,
        title: 'Editor & Terminal',
        items: [
            { name: 'VS Code', desc: 'Primary editor — clean, fast, and extensible' },
            { name: 'Zsh + Oh My Zsh', desc: 'Terminal setup with aliases and plugins for speed' },
            { name: 'GitHub Copilot', desc: 'AI pair programmer to accelerate boilerplate workflows' },
            { name: 'Vim keybindings', desc: 'Muscle memory for cursor movement inside VS Code' },
        ],
    },
    {
        icon: Cloud,
        title: 'Cloud & DevOps',
        items: [
            { name: 'AWS (EC2, S3, Lambda)', desc: 'Primary cloud provider — used for production workloads' },
            { name: 'Docker + Docker Compose', desc: 'Containerization for consistent dev/prod environments' },
            { name: 'GitHub Actions', desc: 'CI/CD pipelines — lint, test, build, deploy' },
            { name: 'Vercel', desc: 'Frontend deployments with zero-config Next.js support' },
        ],
    },
    {
        icon: Database,
        title: 'Backend & Databases',
        items: [
            { name: 'Node.js + Express', desc: 'RESTful API server with TypeScript' },
            { name: 'PostgreSQL', desc: 'Primary relational database for production apps' },
            { name: 'Redis', desc: 'Caching layer for high-frequency reads' },
            { name: 'Prisma', desc: 'Type-safe ORM with migrations and schema management' },
        ],
    },
    {
        icon: Terminal,
        title: 'Productivity',
        items: [
            { name: 'Linear', desc: 'Project and issue tracking' },
            { name: 'Notion', desc: 'Documentation and knowledge base' },
            { name: 'Figma', desc: 'UI/UX design and prototyping' },
            { name: 'Postman', desc: 'API testing and documentation' },
        ],
    },
    {
        icon: Wifi,
        title: 'This Site',
        items: [
            { name: 'Next.js 14 (App Router)', desc: 'SSR + ISR for performance and SEO' },
            { name: 'Tailwind CSS + shadcn/ui', desc: 'Utility-first styling with accessible components' },
            { name: 'Framer Motion', desc: 'Animations and micro-interactions' },
            { name: 'Cloudinary', desc: 'Media storage and optimized image delivery' },
        ],
    },
];

export default function UsesPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar isDetailView={false} />
            <main className="max-w-4xl mx-auto px-4 pt-36 pb-24">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-3">
                        // My_Setup
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                        Uses
                    </h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
                        Hardware, software, and tools I reach for every day. Updated periodically as my workflow evolves.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-16">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div key={section.title}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-rose-500" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {section.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-rose-500/30 transition-colors"
                                        >
                                            <p className="font-semibold text-slate-900 dark:text-white mb-1">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

// Suppress unused import warnings — imported for future use
const _unused = { Keyboard, Mouse, Headphones, Cpu };
void _unused;
