
import { PageContainer } from '@/components/public/layout/page-container';
import type { QrisHeroResource } from '@/types/public';

interface QrisHeroSectionProps {
    hero: QrisHeroResource;
}

export function QrisHeroSection({ hero }: QrisHeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-[#001629] py-20 text-white">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#001b3b]/92 via-[#001b3b]/78 to-[#0f4c81]/82" />
            </div>
            <PageContainer className="relative z-10">
                <div className="grid gap-12 md:grid-cols-[1.1fr,0.9fr] md:items-center">
                    <div className="space-y-6 text-balance">
                        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-sky-light">Informasi Pembayaran</p>
                        <h1 className="text-[clamp(2.4rem,6vw,3.4rem)] font-bold leading-tight text-on-media md:text-[52px]">{hero.title}</h1>
                        {hero.subtitle && (
                            <p className="max-w-2xl text-base leading-relaxed text-on-media-muted md:text-lg">{hero.subtitle}</p>
                        )}
                        {hero.highlight && (
                            <div className="inline-flex rounded-full bg-gold-accent px-5 py-2 text-sm font-semibold text-deep-navy shadow-reef">
                                {hero.highlight}
                            </div>
                        )}
                    </div>
                    <div className="relative rounded-[36px] border border-white/18 bg-white/12 p-8 text-on-media shadow-reef backdrop-blur">
                        <div className="space-y-4 text-sm text-on-media-muted">
                            <p>
                                Gunakan kode QR resmi Waduk Manduk untuk transaksi tiket masuk, penyewaan perahu, dan dukungan konservasi.
                            </p>
                            <p>
                                Setelah melakukan pembayaran, tunjukkan bukti transaksi kepada petugas loket untuk validasi dan penukaran tiket.
                            </p>
                            <p>
                                Kode QR tersedia di loket utama, dermaga, dan pusat informasi. Poster digital dapat diunduh di halaman ini.
                            </p>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
