import { Head } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public/public-layout';
import type {
    QrisContactResource,
    QrisDownloadResource,
    QrisFaqResource,
    QrisHeroResource,
    QrisStepResource,
} from '@/types/public';
import { QrisHeroSection } from '@/components/public/sections/qris/hero-section';
import { QrisInfoSection } from '@/components/public/sections/qris/info-section';
import { QrisFaqSection } from '@/components/public/sections/qris/faq-section';

interface QrisPageProps {
    hero: QrisHeroResource;
    downloads: QrisDownloadResource[];
    steps: QrisStepResource[];
    faq: QrisFaqResource[];
    contacts: QrisContactResource[];
    disclaimer?: string | null;
}

export default function QrisPage({ hero, downloads, steps, faq, contacts, disclaimer }: QrisPageProps) {
    return (
        <>
            <Head title="Informasi QRIS" />
            <PublicLayout hero={<QrisHeroSection hero={hero} />}>
                <QrisInfoSection downloads={downloads} steps={steps} disclaimer={disclaimer} />
                <QrisFaqSection faq={faq} contacts={contacts} />
            </PublicLayout>
        </>
    );
}
