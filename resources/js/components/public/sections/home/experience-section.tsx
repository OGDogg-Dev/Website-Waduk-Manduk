import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/public/layout/page-container';
import { Link } from '@inertiajs/react';

export function ExperienceSection() {
    return (
        <section className="bg-foam py-20">
            <PageContainer className="grid gap-12 md:grid-cols-[1.1fr,0.9fr] md:items-center">
                <div className="space-y-6">
                    <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Pengalaman Pengunjung</p>
                    <h2 className="text-3xl font-semibold text-deep-navy md:text-4xl">
                        Jelajah ekosistem bawah air dengan pemandu konservasi
                    </h2>
                    <p className="text-base text-deep-navy/70">
                        Program interpretasi Waduk Manduk dirancang agar setiap kunjungan berdampak positif bagi konservasi air,
                        UMKM pesisir, dan literasi bahari masyarakat.
                    </p>
                    <ul className="space-y-3 text-deep-navy/70">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-gold-accent" />
                            Tur tematik snorkeling, paddle board, dan pelayaran senja.
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-gold-accent" />
                            Edukasi konservasi bersama komunitas reresik waduk.
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-gold-accent" />
                            Akses eksklusif ke UMKM kuliner laut dan kriya pesisir.
                        </li>
                    </ul>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-deep-navy px-8 text-white shadow-reef hover:bg-[#03224c]"
                    >
                        <Link href={route('visit.plan')}>Pelajari Paket Wisata</Link>
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute -left-10 -top-10 hidden h-24 w-24 rounded-full border border-deep-navy/20 md:block" />
                    <div className="absolute -right-10 bottom-8 hidden h-16 w-16 rounded-full border border-deep-navy/20 md:block" />
                    <div className="relative overflow-hidden rounded-[36px] shadow-reef">
                        <img
                            src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80"
                            alt="Pemandu konservasi memandu wisatawan"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001b3b]/50 via-transparent to-transparent" />
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
