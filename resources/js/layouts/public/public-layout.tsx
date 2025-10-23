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
        <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-text-primary">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;0,600;1,400&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <a href="#konten-utama" className="skip-link">
                Skip to content
            </a>
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,76,129,0.3)_0%,rgba(0,27,59,0.92)_55%,#001326_100%)]" aria-hidden />
                <div className="absolute inset-x-[-30%] top-[-10rem] h-[28rem] rounded-full bg-gold-500/10 blur-[140px]" aria-hidden />
                <div className="absolute inset-x-[-40%] bottom-[-18rem] h-[32rem] rounded-full bg-sky-200/30 blur-[180px]" aria-hidden />
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg width=\'160\' height=\'160\' viewBox=\'0 0 160 160\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 160h160V0C114.55 38.4 73.72 69.8 0 76.1V160Z\' fill=\'%23001326\'/%3E%3Cpath d=\'M0 160h160V82.3C101.5 124.5 56.67 146.2 0 150.3V160Z\' fill=\'%23001933\'/%3E%3C/svg%3E')] opacity-[0.18]" aria-hidden />
            <div className="relative z-20 flex flex-1 flex-col">
                <div className="relative z-30">
                    <Header />
                </div>
                {hero}
                <main
                    id="konten-utama"
                    className="flex-1 bg-surface-0/95 text-text-primary shadow-[0_-40px_120px_rgba(0,19,38,0.45)]"
                    role="main"
                >
                    {children}
                </main>
                <Footer />
            </div>
            <BackToTopButton />
        </div>
    );
}
