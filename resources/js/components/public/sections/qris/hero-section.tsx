import { PageContainer } from '@/components/public/layout/page-container';
import type { QrisHeroResource } from '@/types/public';

interface QrisHeroSectionProps {
    hero: QrisHeroResource;
}

export function QrisHeroSection({ hero }: QrisHeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-[#001629] py-20 text-white">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#001b3b]/90 via-[#001b3b]/75 to-[#0f4c81]/80" />
            <PageContainer className="relative z-10">
                <div className="grid gap-12 md:grid-cols-[1.1fr,0.9fr] md:items-center">
                    <div className="space-y-6">
                        <p className="text-sm uppercase tracking-[0.5em] text-sky-light">Informasi Pembayaran</p>
                        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{hero.title}</h1>
                        {hero.subtitle && (
                            <p className="max-w-2xl text-base text-white/80 md:text-lg">{hero.subtitle}</p>
                        )}
                        {hero.highlight && (
                            <div className="inline-flex rounded-full bg-gold-accent/20 px-5 py-2 text-sm font-semibold text-gold-accent">
                                {hero.highlight}
                            </div>
                        )}
                    </div>
                    <div className="relative rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-reef backdrop-blur">
                        <div className="space-y-4 text-sm text-white/80">
                            <p>
                                Gunakan kode QR resmi Waduk Manduk untuk transaksi tiket masuk, penyewaan perahu, dan dukungan
                                konservasi.
                            </p>
                            <p>
                                Setelah melakukan pembayaran, tunjukkan bukti transaksi kepada petugas loket untuk validasi dan
                                penukaran tiket.
                            </p>
                            <p className="text-white/60">
                                Kode QR tersedia di loket utama, dermaga, dan pusat informasi. Poster digital dapat diunduh di
                                halaman ini.
                            </p>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
