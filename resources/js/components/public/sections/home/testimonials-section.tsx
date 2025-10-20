import { PageContainer } from '@/components/public/layout/page-container';

interface Testimonial {
    name: string;
    quote: string;
    role: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
    {
        name: 'Sinta Pramudita',
        quote:
            'Interpretasi biota dan sesi konservasi membuat keluarga kami lebih memahami pentingnya menjaga waduk. Pengalaman snorkelingnya istimewa.',
        role: 'Keluarga Wisata',
        avatar: 'SP',
    },
    {
        name: 'Bima Kurniawan',
        quote:
            'Sebagai UMKM olahan laut, kami dibina agar produk ramah lingkungan dan difasilitasi untuk bertemu wisatawan.',
        role: 'UMKM Mitra',
        avatar: 'BK',
    },
    {
        name: 'Nadia Rahman',
        quote: 'Program komunitas reresik waduk mempertemukan relawan lintas daerah untuk aksi nyata setiap bulan.',
        role: 'Relawan Konservasi',
        avatar: 'NR',
    },
    {
        name: 'Dewa Saputra',
        quote: 'Agenda seni budaya laut memberi ruang bagi seniman muda. Instalasi cahaya malamnya menakjubkan.',
        role: 'Pengunjung Event',
        avatar: 'DS',
    },
];

export function TestimonialsSection() {
    return (
        <section className="pattern-dots bg-white py-20">
            <PageContainer>
                <div className="space-y-10">
                    <div className="mx-auto max-w-2xl text-center text-deep-navy">
                        <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Cerita Pengunjung</p>
                        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                            Narasi yang menjaga semangat eksplorasi Waduk Manduk
                        </h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {testimonials.map((item) => (
                            <figure
                                key={item.name}
                                className="flex h-full flex-col gap-4 rounded-[28px] border border-deep-navy/10 bg-white p-6 text-left text-deep-navy shadow-reef/20"
                            >
                                <p className="text-sm leading-relaxed text-deep-navy/80">“{item.quote}”</p>
                                <div className="mt-auto flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f4c81] text-sm font-semibold text-white">
                                        {item.avatar}
                                    </span>
                                    <div>
                                        <figcaption className="text-sm font-semibold">{item.name}</figcaption>
                                        <p className="text-xs uppercase tracking-[0.3em] text-deep-navy/60">{item.role}</p>
                                    </div>
                                </div>
                            </figure>
                        ))}
                    </div>
                    <div className="text-center">
                        <a
                            href={route('stories.index')}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f4c81] hover:text-gold-accent"
                        >
                            Baca semua cerita
                            <span aria-hidden>→</span>
                        </a>
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
