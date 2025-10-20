import { PageContainer } from '@/components/public/layout/page-container';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function CtaWaveSection() {
    return (
        <section className="relative overflow-hidden bg-wave-gold py-20">
            <div className="absolute inset-0 opacity-40">
                <svg className="h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="url(#ctaWave)"
                        d="M0,160L40,149.3C80,139,160,117,240,144C320,171,400,245,480,266.7C560,288,640,256,720,213.3C800,171,880,117,960,117.3C1040,117,1120,171,1200,176C1280,181,1360,139,1400,117.3L1440,96V0H0Z"
                    />
                    <defs>
                        <linearGradient id="ctaWave" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(0, 27, 59, 0.05)" />
                            <stop offset="100%" stopColor="rgba(0, 27, 59, 0.25)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <PageContainer className="relative z-10 flex flex-col items-center gap-6 text-center text-deep-navy">
                <p className="text-sm uppercase tracking-[0.5em] text-[#0f4c81]">Rencanakan Perjalanan</p>
                <h2 className="text-3xl font-semibold md:text-4xl">
                    Jadwalkan reservasi Anda dan nikmati layanan konservasi terpadu
                </h2>
                <p className="max-w-3xl text-base text-deep-navy/70">
                    Tim reservasi kami siap membantu Anda memilih aktivitas, jadwal, hingga pendamping konservasi yang sesuai.
                    Booking sekarang untuk memastikan slot terbaik.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-deep-navy px-8 text-white shadow-reef hover:bg-[#03224c]"
                    >
                        <Link href={route('visit.plan')}>Reservasi Sekarang</Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="rounded-full border-deep-navy/20 px-8 text-deep-navy hover:border-gold-accent hover:text-gold-accent"
                    >
                        <Link href={route('support.index')}>Lihat dukungan konservasi</Link>
                    </Button>
                </div>
            </PageContainer>
        </section>
    );
}
