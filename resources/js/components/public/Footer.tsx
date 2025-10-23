import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

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
    {
        heading: 'Layanan',
        items: [
            { label: 'Reservasi', href: route('visit.plan') },
            { label: 'Masuk Admin', href: route('login') },
            { label: 'FAQ Wisata', href: route('support.index') },
        ],
    },
];

const socials = [
    { label: 'Facebook', href: 'https://facebook.com/wadukmanduk', icon: Facebook },
    { label: 'Instagram', href: 'https://instagram.com/wadukmanduk', icon: Instagram },
    { label: 'YouTube', href: 'https://youtube.com/@wadukmanduk', icon: Youtube },
];

const mapLink =
    'https://www.google.com/maps/search/?api=1&query=Jl.+Danau+Biru+No.+88%2C+Desa+Manduk%2C+Kabupaten+Bahari%2C+Jawa+Timur+65123';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative isolate bg-brand-950 text-on-dark">
            <WaveDivider variant="surface" flip className="text-brand-950" />
            <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(22,72,143,0.28)_0%,transparent_65%)]"
                aria-hidden
            />
            <div
                className="absolute inset-0 -z-10 bg-[linear-gradient(140deg,rgba(2,8,22,0.96),rgba(4,17,38,0.92))]"
                aria-hidden
            />
            <div className="container flex flex-col gap-12 py-16">
                <div className="grid gap-12 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-accent-300">
                                SIPARI Manduk
                            </span>
                            <h2 className="text-3xl font-semibold text-on-dark">Ekowisata Bahari Waduk Manduk</h2>
                            <p className="max-w-xl text-sm text-on-media-muted">
                                Menjaga harmoni alam dan budaya melalui konservasi, pemberdayaan UMKM pesisir, dan pengalaman wisata berkelanjutan yang terintegrasi.
                            </p>
                        </div>

                        <div className="grid gap-6 text-sm sm:grid-cols-2" aria-label="Kontak dan alamat">
                            <div className="space-y-3">
                                <p className="flex items-start gap-3 text-sm text-on-media-muted">
                                    <MapPin className="mt-0.5 h-5 w-5 flex-none text-accent-200" aria-hidden />
                                    <span>
                                        <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-accent-300/85">
                                            Posko pengelola
                                        </span>
                                        <a
                                            href={mapLink}
                                            className="focus-ring mt-1 inline-flex text-left text-sm font-semibold text-accent-200 hover:text-accent-100"
                                        >
                                            Jl. Danau Biru No. 88, Desa Manduk, Kabupaten Bahari, Jawa Timur 65123
                                        </a>
                                    </span>
                                </p>
                                <p className="flex items-center gap-3 text-sm text-on-media-muted">
                                    <Mail className="h-5 w-5 flex-none text-accent-200" aria-hidden />
                                    <a
                                        href="mailto:info@wadukmanduk.id"
                                        className="focus-ring text-sm font-semibold text-accent-200 hover:text-accent-100"
                                    >
                                        info@wadukmanduk.id
                                    </a>
                                </p>
                                <p className="flex items-center gap-3 text-sm text-on-media-muted">
                                    <Phone className="h-5 w-5 flex-none text-accent-200" aria-hidden />
                                    <a
                                        href="tel:+628117788899"
                                        className="focus-ring text-sm font-semibold text-accent-200 hover:text-accent-100"
                                    >
                                        +62 811-778-8899
                                    </a>
                                </p>
                            </div>
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-300/85">Terhubung</p>
                                <ul className="flex flex-wrap gap-3 text-sm">
                                    {socials.map(({ label, href, icon: Icon }) => (
                                        <li key={label}>
                                            <a
                                                href={href}
                                                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-accent-200 transition hover:border-white/25 hover:text-accent-100"
                                            >
                                                <Icon className="h-4 w-4" aria-hidden />
                                                <span>{label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                        {navigation.map((group) => (
                            <div key={group.heading} className="space-y-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-300/80">{group.heading}</p>
                                <ul className="space-y-2 text-sm text-on-media-muted">
                                    {group.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="focus-ring inline-flex items-center gap-2 transition hover:text-accent-100"
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

                <div className="flex flex-col gap-6 border-t border-white/10 pt-6 text-sm text-on-media-muted md:flex-row md:items-center md:justify-between">
                    <p className="order-2 md:order-1">© {currentYear} Pengelola Waduk Manduk. Seluruh hak cipta dilindungi.</p>
                    <div className="order-1 flex flex-wrap items-center gap-3 md:order-2">
                        <a
                            href="tel:+628117788899"
                            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-accent-100 transition hover:border-white/50 hover:text-white"
                        >
                            <Phone className="h-4 w-4" aria-hidden />
                            Emergency Call
                        </a>
                        <Link
                            href={route('register')}
                            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-900 transition hover:bg-gold-400"
                        >
                            Registrasi Online
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
