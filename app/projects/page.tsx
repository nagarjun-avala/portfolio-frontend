import { Metadata } from 'next';
import { Project } from '@/lib/types';
import { MOCK_DATA } from '@/lib/data';
import Navbar from '@/components/Navbar';
import ProjectsListingClient from './ProjectsListingClient';

export const metadata: Metadata = {
    title: 'Projects | Nagarjun Avala',
    description: 'A showcase of full-stack projects spanning EdTech, cloud infrastructure, and developer tools.',
    openGraph: {
        title: 'Projects | Nagarjun Avala',
        description: 'A showcase of full-stack projects spanning EdTech, cloud infrastructure, and developer tools.',
    },
};

async function getAllProjects(): Promise<Project[]> {
    try {
        let apiUri = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';
        if (apiUri.startsWith('/')) {
            apiUri = 'http://localhost:5000/api';
        }
        const res = await fetch(`${apiUri}/portfolio`, {
            next: { revalidate: 300 },
        });
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        if (json.success && json.data?.projects && json.data.projects.length > 0) {
            return json.data.projects;
        }
    } catch {
        // fall through to mock
    }
    return MOCK_DATA.projects;
}

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar isDetailView={false} />
            <ProjectsListingClient projects={projects} />
        </div>
    );
}
