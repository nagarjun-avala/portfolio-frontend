import { Metadata } from 'next';
import { Blog } from '@/lib/types';
import { MOCK_DATA } from '@/lib/data';
import Navbar from '@/components/Navbar';
import BlogsListingClient from './BlogsListingClient';

export const metadata: Metadata = {
    title: 'Blog | Nagarjun Avala',
    description: 'Thoughts on full-stack development, cloud architecture, and building scalable products.',
    openGraph: {
        title: 'Blog | Nagarjun Avala',
        description: 'Thoughts on full-stack development, cloud architecture, and building scalable products.',
    },
};

async function getAllBlogs(): Promise<Blog[]> {
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
        if (json.success && json.data?.blogs && json.data.blogs.length > 0) {
            return json.data.blogs;
        }
    } catch {
        // fall through to mock
    }
    return MOCK_DATA.blogs;
}

export default async function BlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar isDetailView={false} />
            <BlogsListingClient blogs={blogs} />
        </div>
    );
}
