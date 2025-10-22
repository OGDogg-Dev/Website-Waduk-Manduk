import { Link } from '@inertiajs/react';

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

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[linear-gradient(170deg,#040d1f_0%,#041a37_45%,#032547_100%)] text-white">
            <div className="container grid gap-12 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-200/80">Waduk Manduk</p>
                        <p className="text-2xl font-semibold">Ekowisata Bahari Manduk</p>
                        <p className="max-w-lg text-sm text-brand-100/80">
                            Menjaga harmoni alam dan budaya melalui konservasi, pemberdayaan UMKM pesisir, serta pengalaman wisata berkelanjutan.
                        </p>
                    </div>
                    <div className="space-y-3 text-sm text-brand-100/75">
                        <p>Jl. Danau Biru No. 88, Desa Manduk, Kabupaten Bahari, Jawa Timur 65123</p>
                        <p>
                            <a href="mailto:info@wadukmanduk.id" className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-accent-200">
                                info@wadukmanduk.id
                                <span aria-hidden>→</span>
                            </a>
                        </p>
                    </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {navigation.map((group) => (
                        <div key={group.heading} className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-100/70">{group.heading}</p>
                            <ul className="space-y-2 text-sm text-brand-100/80">
                                {group.items.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} className="focus-ring inline-flex items-center gap-2 hover:text-accent-200">
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
            <div className="border-t border-white/10 bg-black/20 py-6 text-center text-xs text-brand-100/70">
                © {currentYear} Pengelola Waduk Manduk. Seluruh hak cipta dilindungi.
            </div>
        </footer>
    );
}
