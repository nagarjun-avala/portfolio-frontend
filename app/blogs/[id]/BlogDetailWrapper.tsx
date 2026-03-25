"use client"

import { useRouter } from 'next/navigation';
import BlogDetail from '@/components/BlogDetail';
import { Blog } from '@/lib/types';

export default function BlogDetailWrapper({ blog }: { blog: Blog }) {
    const router = useRouter();

    return (
        <BlogDetail
            blog={blog}
            onBack={() => {
                if (window.history.length > 2) {
                    router.back();
                } else {
                    router.push('/blogs');
                }
            }}
        />
    );
}
