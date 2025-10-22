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
    return (
        <div className="flex min-h-screen flex-col bg-surface-0 text-text-primary">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>
            <a href="#konten-utama" className="skip-link">
                Loncat ke konten utama
            </a>
            <Header />
            {hero}
            <main id="konten-utama" className="flex-1">
                {children}
            </main>
            <Footer />
            <BackToTopButton />
        </div>
    );
}
