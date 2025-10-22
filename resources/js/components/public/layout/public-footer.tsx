
import { Link } from '@inertiajs/react';

export function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface-3 text-on-dark">
            <div className="container flex flex-col gap-12 py-12 lg:py-16">
                <div className="grid gap-10 text-sm lg:grid-cols-[1.2fr,repeat(2,minmax(0,1fr))]">
                    <div className="space-y-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-on-dark/70">
                            Ekowisata Waduk Manduk
                        </p>
                        <h3 className="max-w-md text-h3 text-on-dark">
                            Menjaga harmoni alam & budaya lewat pariwisata bahari.
                        </h3>
                        <p className="max-w-lg text-sm text-on-dark/80">
                            Jelajahi keindahan bawah air, dukung UMKM lokal, dan jadi bagian dari gerakan konservasi air di Waduk Manduk.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-on-dark/70">Kontak</p>
                        <div className="space-y-2 text-sm text-on-dark/85">
                            <p>Jl. Danau Biru No. 88, Desa Manduk, Jawa Timur</p>
                            <p>Telp. (+62) 812-3456-7890</p>
                            <p>Email: halo@wadukmanduk.id</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link focus-ring">
                                Instagram
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="link focus-ring">
                                YouTube
                            </a>
                            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="link focus-ring">
                                Google Maps
                            </a>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-on-dark/70">Navigasi</p>
                        <nav className="grid gap-2 text-sm">
                            <Link href={route('visit.plan')} className="link focus-ring">
                                Rencanakan kunjungan
                            </Link>
                            <Link href={route('explore.index')} className="link focus-ring">
                                Jelajah & aktivitas
                            </Link>
                            <Link href={route('umkm.directory')} className="link focus-ring">
                                UMKM & kuliner
                            </Link>
                            <Link href={route('stories.index')} className="link focus-ring">
                                Cerita & dokumentasi
                            </Link>
                            <Link href={route('qris.index')} className="link focus-ring">
                                Informasi QRIS
                            </Link>
                            <Link href={route('support.index')} className="link focus-ring">
                                Dukung konservasi
                            </Link>
                        </nav>
                    </div>
                </div>
                <div className="flex flex-col gap-3 border-t border-brand-900/15 pt-6 text-xs text-on-dark/70 lg:flex-row lg:items-center lg:justify-between">
                    <p>© {currentYear} Waduk Manduk. Hak cipta dilindungi.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link href={route('about.index')} className="link focus-ring">
                            Tentang Kami
                        </Link>
                        <Link href={route('support.index')} className="link focus-ring">
                            Dukungan
                        </Link>
                        <Link href={route('community.index')} className="link focus-ring">
                            Komunitas
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
