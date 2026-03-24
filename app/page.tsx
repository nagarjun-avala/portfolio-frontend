import { ContactAndFooter } from '@/components/ContactAndFooter';
import { HeroSection } from '@/components/Hero';
import AboutSection from '@/components/About';
import ProjectsSection from '@/components/Projects';
import ExperienceSection from '@/components/Experience';
import SkillsSection from '@/components/Skills';
import EducationSection from '@/components/Education';
import CertificationsSection from '@/components/Certifications';
import BlogsSection from '@/components/Blogs';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import { calculateTotalExperience, formatExperience } from '@/lib/utils';
import { Suspense } from 'react';
import { MOCK_DATA, PortfolioDataTypes } from '@/lib/data';
import { Metadata } from 'next';
import { HeroSkeleton, SectionSkeleton } from '@/components/Skeletons';
import { unstable_cache } from 'next/cache';

// ---------------------------------------------------------------------------
// getData() wrapped in unstable_cache:
//   - Memoizes the fetch + transform so both generateMetadata() and the page
//     components share ONE cached result — eliminating the duplicate 6s API call.
//   - revalidate: 300 → 5-min ISR. Portfolio data rarely changes; 60s was too
//     short and caused frequent cold-path SSR blocks.
// ---------------------------------------------------------------------------
const getData = unstable_cache(
  async function fetchPortfolioData(): Promise<PortfolioDataTypes> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fetchedData: any = null;

    try {
      let apiUri = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

      if (apiUri.startsWith('/')) {
        apiUri = "http://localhost:5000/api";
      }

      const res = await fetch(`${apiUri}/portfolio`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 300 },
      });

      if (!res.ok) {
        console.error(`API Error: ${res.statusText}`);
        throw new Error(`API Error: ${res.statusText}`);
      }

      const json = await res.json();
      if (json.success && json.data) {
        fetchedData = json.data;
      } else {
        console.error("Invalid API response format");
      }

    } catch (error) {
      console.error("Failed to fetch portfolio data, falling back to mock data:", error);
      fetchedData = MOCK_DATA;
    }

    if (!fetchedData) fetchedData = MOCK_DATA;

    // --- Data Transformation ---

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const experienceTransformed = (fetchedData.experience || []).map((exp: any) => ({
      ...exp,
      start: new Date(exp.start),
      end: exp.end ? new Date(exp.end) : "present"
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const certificationsTransformed = (fetchedData.certifications || []).map((cert: any) => ({
      ...cert,
      issueDate: new Date(cert.issueDate)
    }));

    let totalYears = 0;
    let totalMonths = 0;
    let displayStr = "";
    let displaySuffixStr = "";
    let showPlusBool = false;

    if (experienceTransformed.length > 0) {
      const result = calculateTotalExperience(experienceTransformed);
      const { display, displaySuffix, showPlus } = formatExperience(result.years, result.months);
      totalYears = result.years;
      totalMonths = result.months;
      displayStr = display;
      displaySuffixStr = displaySuffix ?? "";
      showPlusBool = showPlus;
    }

    const name = fetchedData.name || MOCK_DATA.name;
    const firstName = name.split(' ')[0];

    const enrichedData: PortfolioDataTypes = {
      name,
      meta: {
        title: fetchedData.title || fetchedData.meta?.title || MOCK_DATA.meta.title,
        email: fetchedData.email || fetchedData.profile?.email || MOCK_DATA.meta.email,
        phone: fetchedData.phone || fetchedData.profile?.phone || MOCK_DATA.meta.phone
      },
      hero: fetchedData.hero ? {
        ...fetchedData.hero,
        ctaPrimary: fetchedData.hero.ctaPrimaryText || fetchedData.hero.ctaPrimary || MOCK_DATA.hero.ctaPrimary,
        ctaSecondary: fetchedData.hero.ctaSecondaryText || fetchedData.hero.ctaSecondary || MOCK_DATA.hero.ctaSecondary,
        ctaPrimaryLink: fetchedData.hero.ctaPrimaryLink,
        ctaSecondaryLink: fetchedData.hero.ctaSecondaryLink
      } : MOCK_DATA.hero,
      about: {
        ...fetchedData.about,
        title: `Hi, I'm ${firstName}.`,
        experience: {
          years: totalYears,
          months: totalMonths,
          label: fetchedData.about?.experienceLabel || MOCK_DATA.about.experience.label,
          display: displayStr || MOCK_DATA.about.experience.display,
          displaySuffix: displaySuffixStr,
          sign: showPlusBool ? "+" : ""
        },
        languages: fetchedData.about?.languages || MOCK_DATA.about.languages,
        location: fetchedData.about?.location || MOCK_DATA.about.location,
        image: fetchedData.avatar || fetchedData.about?.image || MOCK_DATA.about.image,
        description: fetchedData.about?.description || MOCK_DATA.about.description,
        skills: fetchedData.about?.skills || MOCK_DATA.about.skills,
        resumeUrl: fetchedData.about?.resumeUrl || MOCK_DATA.about.resumeUrl
      },
      techStack: fetchedData.techStack || MOCK_DATA.techStack,
      education: fetchedData.education || MOCK_DATA.education,
      certifications: certificationsTransformed,
      projects: fetchedData.projects || MOCK_DATA.projects,
      experience: experienceTransformed,
      blogs: fetchedData.blogs || MOCK_DATA.blogs,
      avatar: fetchedData.avatar || MOCK_DATA.avatar,
      socials: fetchedData.socials || MOCK_DATA.socials,
      themeColor: fetchedData.themeColor,
      fontPairing: fetchedData.fontPairing,
      borderRadius: fetchedData.borderRadius
    };

    return enrichedData;
  },
  ['portfolio-data'],
  { revalidate: 300 }
);

// ---------------------------------------------------------------------------
// Metadata — reads from the same memoized cache, no extra API call
// ---------------------------------------------------------------------------
export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  const title = `${data.name} | Creative Developer`;
  const description = data.meta.title;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.avatar
        ? [{ url: data.avatar, width: 1200, height: 630, alt: data.name }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// Above-fold: Hero + About — priority content, renders first
// ---------------------------------------------------------------------------
async function AboveFold() {
  const data = await getData();
  return (
    <>
      <HeroSection data={data.hero} />
      <AboutSection data={data.about} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Below-fold: Skills → Contact — streams in after hero is painted
// ---------------------------------------------------------------------------
async function BelowFold() {
  const data = await getData();
  return (
    <>
      <SkillsSection techStack={data.techStack} />
      <ProjectsSection projects={data.projects} />
      <ExperienceSection experience={data.experience} totalExperiance={data.about.experience.display} />
      <EducationSection education={data.education} />
      <CertificationsSection certifications={data.certifications} />
      <BlogsSection blogs={data.blogs} />
      <ContactAndFooter email={data.meta.email} phone={data.meta.phone} name={data.name} socials={data.socials} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Page root — two independent Suspense boundaries for streaming
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <div className="min-h-screen selection:bg-rose-500/30 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Cursor />
      <Navbar isDetailView={false} />

      <main>
        {/* Priority: Hero + About — skeleton until above-fold is ready */}
        <Suspense fallback={<HeroSkeleton />}>
          <AboveFold />
        </Suspense>

        {/* Deferred: rest of page streams in after hero is painted */}
        <Suspense fallback={
          <>
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton />
          </>
        }>
          <BelowFold />
        </Suspense>
      </main>
    </div>
  );
}