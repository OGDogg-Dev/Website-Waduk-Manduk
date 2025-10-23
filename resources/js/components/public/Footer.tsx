import { Link } from '@inertiajs/react';
import { WaveDivider } from '@/components/public/WaveDivider';

const navigation = [
    {
        heading: 'Destinasi',
        items: [
            { label: 'Tentang', href: route('about.index') },
            { label: 'Jelajah & Aktivitas', href: route('explore.index') },
            { label: 'Rencanakan Kunjungan', href: route('visit.plan') },
        ],
    },
    {
        heading: 'Program',
        items: [
            { label: 'Komunitas', href: route('community.index') },
            { label: 'Konservasi & Edukasi', href: route('conservation.index') },
            { label: 'UMKM & Kuliner', href: route('umkm.directory') },
        ],
    },
    {
        heading: 'Informasi',
        items: [
            { label: 'Berita & Cerita', href: route('stories.index') },
            { label: 'Panduan Dukungan', href: route('support.index') },
            { label: 'Pembayaran QRIS', href: route('qris.index') },
        ],
    },
];

const contactInfo = [
    {
        label: 'Posko pengelola',
        value: 'Jl. Danau Biru No. 88, Desa Manduk, Kabupaten Bahari, Jawa Timur 65123',
    },
    {
        label: 'Email resmi',
        value: 'info@wadukmanduk.id',
        href: 'mailto:info@wadukmanduk.id',
    },
    {
        label: 'Hotline terpadu',
        value: '0811-778-8899',
        href: 'tel:+628117788899',
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative isolate bg-brand-950 text-on-dark">
            <WaveDivider variant="surface" flip className="text-brand-950" />
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(22,72,143,0.28)_0%,transparent_65%)]" aria-hidden />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(140deg,rgba(2,8,22,0.96),rgba(4,17,38,0.92))]" aria-hidden />
            <div className="container grid gap-12 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="space-y-7">
                    <div className="space-y-3">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-accent-300">
                            SIPARI Manduk
                        </span>
                        <h2 className="text-3xl font-semibold text-on-dark">Ekowisata Bahari Waduk Manduk</h2>
                        <p className="max-w-xl text-sm text-on-media-muted">
                            Menjaga harmoni alam dan budaya melalui konservasi, pemberdayaan UMKM pesisir, dan pengalaman wisata berkelanjutan yang terintegrasi.
                        </p>
                    </div>
                    <dl className="grid gap-4 text-sm text-on-media-muted" aria-label="Kontak pengelola">
                        {contactInfo.map((item) => (
                            <div key={item.label}>
                                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-300/85">{item.label}</dt>
                                <dd className="mt-1">
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-accent-300 hover:text-accent-200"
                                        >
                                            {item.value}
                                            <span aria-hidden className="text-xs">→</span>
                                        </a>
                                    ) : (
                                        <span>{item.value}</span>
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {navigation.map((group) => (
                        <div key={group.heading} className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-300/80">{group.heading}</p>
                            <ul className="space-y-2 text-sm text-on-media-muted">
                                {group.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="focus-ring inline-flex items-center gap-2 transition hover:text-accent-200"
                                        >
                                            {item.label}
                                            <span aria-hidden className="text-xs">→</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-t border-white/10 bg-black/20 py-6 text-center text-xs text-on-media-muted">
                © {currentYear} Pengelola Waduk Manduk. Seluruh hak cipta dilindungi.
            </div>
        </footer>
    );
}
