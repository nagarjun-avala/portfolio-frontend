import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { ContactAndFooter } from '@/components/ContactAndFooter';
import { MOCK_DATA } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Contact | Nagarjun Avala',
    description: "Get in touch with Nagarjun Avala — open to full-stack roles, freelance projects, and collaborations.",
};

async function getContactData() {
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
        if (json.success && json.data) {
            return {
                email: json.data.email || json.data.profile?.email || json.data.meta?.email || MOCK_DATA.meta.email,
                phone: json.data.phone || json.data.profile?.phone || json.data.meta?.phone || MOCK_DATA.meta.phone,
                name: json.data.name || MOCK_DATA.name,
                socials: json.data.socials || MOCK_DATA.socials,
            };
        }
    } catch {
        // fall through
    }
    return {
        email: MOCK_DATA.meta.email,
        phone: MOCK_DATA.meta.phone,
        name: MOCK_DATA.name,
        socials: MOCK_DATA.socials,
    };
}

export default async function ContactPage() {
    const { email, phone, name, socials } = await getContactData();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar isDetailView={false} />
            <main className="pt-20">
                <ContactAndFooter
                    email={email}
                    phone={phone}
                    name={name}
                    socials={socials}
                />
            </main>
        </div>
    );
}
