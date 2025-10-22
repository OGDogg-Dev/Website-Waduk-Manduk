import type {
    EventResource,
    SpotResource,
    StatusResource,
    StoryResource,
    UmkmResource,
} from '@/types/public';
import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public/public-layout';
import { HomeHeroSection } from '@/components/public/sections/home/hero-section';
import { ExperienceSection } from '@/components/public/sections/home/experience-section';
import { HighlightsSection } from '@/components/public/sections/home/highlights-section';
import { EventsSection } from '@/components/public/sections/home/events-section';
import { TestimonialsSection } from '@/components/public/sections/home/testimonials-section';
import { CtaWaveSection } from '@/components/public/sections/home/cta-section';
import { ArticlesSection } from '@/components/public/sections/home/articles-section';

interface HomePageProps {
    status: StatusResource | null;
    featuredSpots: SpotResource[];
    featuredUmkm: UmkmResource[];
    upcomingEvents: EventResource[];
    recentStories: StoryResource[];
}

const fallbackSpots: SpotResource[] = [
    {
        id: 1,
        name: 'Laguna Bening',
        type: 'Snorkeling',
        headline: 'Terumbu karang mikro & ikan hias',
        description: 'Rasakan eksplorasi bawah air dengan visibilitas 15 meter dan edukasi konservasi karang.',
        hero_image: null,
    },
    {
        id: 2,
        name: 'Dermaga Biru',
        type: 'Sunset Cruise',
        headline: 'Pelayaran senja & live akustik',
        description: 'Nikmati perjalanan sore dengan narasi budaya masyarakat pesisir Manduk.',
        hero_image: null,
    },
    {
        id: 3,
        name: 'Hutan Mangrove Mandala',
        type: 'Interpretasi Alam',
        headline: 'Trek edukasi biodiversitas',
        description: 'Belajar langsung tentang konservasi mangrove bersama pemandu komunitas.',
        hero_image: null,
    },
];

const fallbackUmkm: UmkmResource[] = [
    {
        id: 1,
        name: 'Rumah Ikan Asap Manduk',
        tagline: 'Olah hasil laut berkelanjutan',
        category: 'Kuliner',
        hero_image: null,
        whatsapp_number: '6281234567890',
        maps_url: 'https://maps.google.com',
        is_featured: true,
    },
    {
        id: 2,
        name: 'Manduk Craft Studio',
        tagline: 'Kriya ecoprint limbah laut',
        category: 'Kriya',
        hero_image: null,
        whatsapp_number: '6281234567890',
        maps_url: 'https://maps.google.com',
        is_featured: false,
    },
    {
        id: 3,
        name: 'Kopi Ombak Pagi',
        tagline: 'Signature beans dari petani Waduk',
        category: 'Kedai',
        hero_image: null,
        whatsapp_number: '6281234567890',
        maps_url: 'https://maps.google.com',
        is_featured: false,
    },
];

const fallbackEvents: EventResource[] = [
    {
        id: 1,
        title: 'Tur Konservasi & Penanaman Mangrove',
        tagline: 'Bersama komunitas reresik waduk',
        event_type: 'Konservasi',
        start_at: new Date().toISOString(),
        location: 'Hutan Mangrove Mandala',
        cover_image: null,
    },
    {
        id: 2,
        title: 'Festival Cahaya Bahari',
        tagline: 'Pentas seni dan instalasi cahaya',
        event_type: 'Budaya',
        start_at: new Date().toISOString(),
        location: 'Dermaga Biru',
        cover_image: null,
    },
    {
        id: 3,
        title: 'Manduk Paddle Race',
        tagline: 'Lomba dayung lintas komunitas',
        event_type: 'Olahraga',
        start_at: new Date().toISOString(),
        location: 'Zona Laguna Bening',
        cover_image: null,
    },
];

const fallbackStories: StoryResource[] = [
    {
        id: 1,
        title: 'Menjaga kejernihan waduk lewat sensor bawah air',
        slug: 'sensor-bawah-air',
        type: 'Konservasi',
        excerpt: 'Tim konservasi memantau kualitas air real-time dan mengedukasi pengunjung untuk menjaga ekosistem.',
        hero_image: null,
        published_at: new Date().toISOString(),
    },
    {
        id: 2,
        title: 'UMKM olahan laut mengangkat potensi pesisir',
        slug: 'umkm-pesisir',
        type: 'UMKM',
        excerpt: 'Dukungan kurasi dan kemitraan menjadikan produk warga Manduk hadir di meja wisatawan.',
        hero_image: null,
        published_at: new Date().toISOString(),
    },
    {
        id: 3,
        title: 'Cerita relawan reresik waduk setiap akhir pekan',
        slug: 'relawan-waduk',
        type: 'Komunitas',
        excerpt: 'Puluhan relawan bersinergi menjaga kebersihan ekosistem air serta edukasi pengunjung.',
        hero_image: null,
        published_at: new Date().toISOString(),
    },
];

export default function HomePage({
    status,
    featuredSpots = [],
    featuredUmkm = [],
    upcomingEvents = [],
    recentStories = [],
}: HomePageProps) {
    const spots = featuredSpots.length ? featuredSpots : fallbackSpots;
    const umkm = featuredUmkm.length ? featuredUmkm : fallbackUmkm;
    const events = upcomingEvents.length ? upcomingEvents : fallbackEvents;
    const stories = recentStories.length ? recentStories : fallbackStories;

    return (
        <>
            <Head title="Beranda" />
            <PublicLayout hero={<HomeHeroSection status={status} />}>
                <ExperienceSection />
                <HighlightsSection featuredSpots={spots} featuredUmkm={umkm} />
                <EventsSection upcomingEvents={events} />
                <TestimonialsSection />
                <CtaWaveSection />
                <ArticlesSection stories={stories} />
            </PublicLayout>
        </>
    );
}
