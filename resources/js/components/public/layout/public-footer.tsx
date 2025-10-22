import { Link } from '@inertiajs/react';

export function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-deep-navy text-white">
            <div className="absolute inset-0 opacity-40">
                <svg className="h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="url(#footerWave)"
                        d="M0,288L60,256C120,224,240,160,360,133.3C480,107,600,117,720,144C840,171,960,213,1080,208C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    />
                    <defs>
                        <linearGradient id="footerWave" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(242, 196, 109, 0.12)" />
                            <stop offset="50%" stopColor="rgba(209, 230, 255, 0.1)" />
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="relative mx-auto flex w-full max-w-[1220px] flex-col gap-12 px-6 py-16 sm:px-10">
                <div className="grid gap-10 text-sm md:grid-cols-[1.2fr,1fr,1fr]">
                    <div className="space-y-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-light">
                                Ekowisata Waduk Manduk
                            </p>
                            <h3 className="mt-3 max-w-sm text-2xl font-semibold leading-tight">
                                Menjaga harmoni alam & budaya lewat pariwisata bahari.
                            </h3>
                        </div>
                        <p className="max-w-md text-white/70">
                            Jelajahi keindahan bawah air, dukung UMKM lokal, dan menjadi bagian dari gerakan konservasi air di
                            Waduk Manduk.
                        </p>
                    </div>
                    <div className="grid gap-4 text-white/75">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-light">Kontak</p>
                        <div className="space-y-2">
                            <p>Jl. Danau Biru No. 88, Desa Manduk, Jawa Timur</p>
                            <p>Telp. (+62) 812-3456-7890</p>
                            <p>Email: halo@wadukmanduk.id</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-gold-accent">
                                Instagram
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="transition hover:text-gold-accent">
                                YouTube
                            </a>
                            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="transition hover:text-gold-accent">
                                Google Maps
                            </a>
                        </div>
                    </div>
                    <div className="grid gap-4 text-white/75">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-light">Navigasi</p>
                        <div className="grid gap-2 text-sm">
                            <Link href={route('visit.plan')} className="transition hover:text-gold-accent">
                                Rencanakan kunjungan
                            </Link>
                            <Link href={route('explore.index')} className="transition hover:text-gold-accent">
                                Jelajah & aktivitas
                            </Link>
                            <Link href={route('umkm.directory')} className="transition hover:text-gold-accent">
                                UMKM & kuliner
                            </Link>
                            <Link href={route('stories.index')} className="transition hover:text-gold-accent">
                                Cerita & dokumentasi
                            </Link>
                            <Link href={route('qris.index')} className="transition hover:text-gold-accent">
                                Informasi QRIS
                            </Link>
                            <Link href={route('support.index')} className="transition hover:text-gold-accent">
                                Dukung konservasi
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {currentYear} Waduk Manduk. Hak cipta dilindungi.</p>
                    <div className="flex gap-4">
                        <Link href={route('about.index')} className="transition hover:text-gold-accent">
                            Tentang Kami
                        </Link>
                        <Link href={route('support.index')} className="transition hover:text-gold-accent">
                            Dukungan
                        </Link>
                        <Link href={route('community.index')} className="transition hover:text-gold-accent">
                            Komunitas
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
