import { Link } from '@inertiajs/react';

export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-brand-950 text-on-dark">
            <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(66,198,193,0.14),transparent_70%)]"
            />
            <span
                aria-hidden
                className="absolute inset-0 -z-20 bg-[linear-gradient(160deg,rgba(2,18,41,0.95)0%,rgba(3,32,72,0.9)55%,rgba(2,18,41,0.95)100%)]"
            />
            <div className="container flex flex-col gap-6 py-12 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2 max-w-sm">
                    <p className="eyebrow text-xs text-on-media-muted">Waduk Manduk</p>
                    <p className="text-lg font-semibold text-on-dark">Ekowisata Bahari Manduk</p>
                    <p className="text-sm text-on-media-muted">
                        Pengelolaan destinasi ramah lingkungan, pemberdayaan UMKM pesisir, dan edukasi konservasi perairan.
                    </p>
                </div>
                <div className="grid gap-4 text-sm md:grid-cols-3">
                    <div>
                        <p className="font-semibold text-on-dark">Navigasi</p>
                        <ul className="mt-2 space-y-2 text-on-media-muted">
                            <li>
                                <Link href={route('home')} className="link focus-ring">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href={route('qris.index')} className="link focus-ring">
                                    QRIS
                                </Link>
                            </li>
                            <li>
                                <Link href={route('visit.plan')} className="link focus-ring">
                                    Fasilitas & Harga
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-on-dark">Informasi</p>
                        <ul className="mt-2 space-y-2 text-on-media-muted">
                            <li>
                                <Link href={route('explore.index')} className="link focus-ring">
                                    Peta Interaktif
                                </Link>
                            </li>
                            <li>
                                <Link href={route('stories.index')} className="link focus-ring">
                                    Berita
                                </Link>
                            </li>
                            <li>
                                <Link href={route('about.index')} className="link focus-ring">
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-2 text-on-media-muted">
                        <p className="font-semibold text-on-dark">Kontak</p>
                        <p>
                            Desa Manduk, Kec. Bahari, Kab. Lestari
                            <br />
                            Jawa Timur 65123
                        </p>
                        <p>
                            <a href="mailto:info@wadukmanduk.id" className="link focus-ring">
                                info@wadukmanduk.id
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative border-t border-white/10 bg-brand-900/60 py-4 text-center text-sm text-on-media-muted">
                © {new Date().getFullYear()} Pengelola Waduk Manduk. Seluruh hak cipta dilindungi.
            </div>
        </footer>
    );
}
