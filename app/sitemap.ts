import { MetadataRoute } from 'next';
import { MOCK_DATA } from '@/lib/data';

async function getPortfolioData() {
    try {
        let apiUri = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';
        if (apiUri.startsWith('/')) {
            apiUri = 'http://localhost:5000/api';
        }
        const res = await fetch(`${apiUri}/portfolio`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        if (json.success && json.data) return json.data;
    } catch {
        // fall through
    }
    return MOCK_DATA;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nagarjun-avala.vercel.app';
    const data = await getPortfolioData();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/uses`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
    ];

    const blogRoutes: MetadataRoute.Sitemap = (data.blogs ?? []).map(
        (blog: { id: string; updatedAt?: string }) => ({
            url: `${baseUrl}/blogs/${blog.id}`,
            lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })
    );

    const projectRoutes: MetadataRoute.Sitemap = (data.projects ?? []).map(
        (project: { slug: string; updatedAt?: string }) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })
    );

    return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
