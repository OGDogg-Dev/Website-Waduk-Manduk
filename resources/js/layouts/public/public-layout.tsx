import type { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { BackToTopButton } from '@/components/public/back-to-top-button';

interface PublicLayoutProps {
    children: ReactNode;
    hero?: ReactNode;
}

export function PublicLayout({ hero, children }: PublicLayoutProps) {
    const partners = [
        {
            name: 'Kementerian Pariwisata dan Ekonomi Kreatif',
            acronym: 'Kemenparekraf',
            href: 'https://www.kemenparekraf.go.id/',
        },
        {
            name: 'Pemerintah Kabupaten Bahari',
            acronym: 'Pemkab Bahari',
            href: 'https://bahari.go.id/',
        },
        {
            name: 'Program SIPARI Bahari',
            acronym: 'SIPARI',
            href: 'https://sipari.id/',
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-surface-0 text-text-primary">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>
            <a href="#konten-utama" className="skip-link">
                Skip to content
            </a>
            <div className="bg-navy-800 text-xs text-white/80">
                <div className="container flex flex-wrap items-center justify-between gap-3 py-2">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-sky-300/90">
                        Kolaborasi Pemerintah &amp; Komunitas
                    </span>
                    <ul className="flex flex-wrap items-center gap-3">
                        {partners.map((partner) => (
                            <li key={partner.acronym}>
                                <a
                                    href={partner.href}
                                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white/30 hover:bg-white/15"
                                >
                                    <span aria-hidden className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[0.55rem] font-bold uppercase tracking-[0.12em] text-navy-900">
                                        {partner.acronym.slice(0, 3).toUpperCase()}
                                    </span>
                                    <span className="hidden sm:inline">{partner.acronym}</span>
                                    <span className="sr-only">{partner.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="sticky top-0 z-50 shadow-soft">
                <div className="bg-navy-900 text-white">
                    <Header />
                </div>
            </div>
            {hero}
            <main id="konten-utama" className="flex-1" role="main">
                {children}
            </main>
            <Footer />
            <BackToTopButton />
        </div>
    );
}
