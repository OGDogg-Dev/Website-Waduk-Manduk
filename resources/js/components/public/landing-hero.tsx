import { storageUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';
import type { SpotResource, StatusResource, StoryResource } from '@/types/public';
import { Link } from '@inertiajs/react';
import { CalendarDays, MapPin, Waves } from 'lucide-react';

interface LandingHeroProps {
    spot: SpotResource | null;
    featuredStories: StoryResource[];
    status: StatusResource | null;
}

export function LandingHero({ spot, featuredStories, status }: LandingHeroProps) {
    const heroImage = storageUrl(spot?.hero_image);
    const collage = featuredStories.slice(0, 3);

    return (
        <section className="relative overflow-hidden rounded-[42px] bg-wave-gradient text-white shadow-glow">
            <div
                className="absolute inset-0 opacity-70 mix-blend-lighten"
                style={
                    heroImage
                        ? {
                              backgroundImage: `url(${heroImage})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                          }
                        : {
                              backgroundImage:
                                  'linear-gradient(120deg, rgba(15,76,129,0.45), rgba(5,26,56,0.45))',
                          }
                }
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(5,26,56,0.85)] via-[rgba(6,30,63,0.9)] to-[rgba(15,76,129,0.75)]" />

            <div className="relative z-10 flex flex-col gap-10 px-6 py-12 md:px-14 md:py-18 lg:flex-row lg:items-center">
                <div className="flex-1 space-y-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sand-soft">
                        <Waves className="size-3.5" />
                        Selamat datang di
                    </span>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl lg:leading-tight">
                        Sistem Informasi Ekowisata{' '}
                        <span className="text-gold-accent">Waduk Manduk</span>
                    </h1>
                    <p className="max-w-xl text-base text-sand-soft/90 md:text-lg">
                        Nikmati petualangan alam rawa danau, telusuri jalur interpretasi, dukung UMKM mitra,
                        dan temukan kisah komunitas yang menjaga Waduk Manduk tetap lestari.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 md:flex md:max-w-lg md:flex-wrap md:gap-3">
                        <InfoBadge
                            icon={<MapPin className="size-4" />}
                            label="Sorotan Terbaru"
                            value={spot?.name ?? 'Waduk Manduk'}
                        />
                        <InfoBadge
                            icon={<CalendarDays className="size-4" />}
                            label="Event Berikutnya"
                            value={status?.advisory ?? 'Lihat agenda komunitas'}
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('visit.plan')}
                            className="inline-flex items-center rounded-full bg-gold-accent px-5 py-2.5 text-sm font-semibold text-ocean-night shadow-lg shadow-black/20 transition hover:translate-y-0.5 hover:shadow-none"
                        >
                            Rencanakan kunjungan
                        </Link>
                        <Link
                            href={route('explore.index')}
                            className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                        >
                            Jelajah peta spot
                        </Link>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative ml-auto max-w-md">
                        <div className="absolute -left-8 -top-10 size-16 rounded-full bg-white/15 blur-2xl" />
                        <div className="absolute -right-10 -bottom-14 size-24 rounded-full bg-brand-gold/40 blur-3xl" />
                        <div className="relative rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                            <p className="text-xs uppercase tracking-[0.4em] text-sand-soft/70">
                                Highlights
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-white">
                                Cuplikan cerita lapangan
                            </h3>
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                {collage.map((story) => {
                                    const cover = storageUrl(story.hero_image);
                                    return (
                                        <div
                                            key={story.id}
                                            className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5"
                                        >
                                            <img
                                                src={cover ?? '/images/placeholders/gallery.jpg'}
                                                alt={story.title}
                                                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                            />
                                        </div>
                                    );
                                })}
                                {collage.length === 0 && (
                                        <div className="col-span-3 flex aspect-[16/9] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs text-sand-soft/70">
                                        Belum ada galeri terbaru
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex items-center justify-between text-xs text-sand-soft/80">
                                <span>
                                    {status?.crowd_level
                                        ? `Kepadatan: ${status.crowd_level}`
                                        : 'Kondisi aman dikunjungi'}
                                </span>
                                <Link
                                    href={route('stories.index')}
                                    className="font-semibold text-gold-accent transition hover:text-white"
                                >
                                    Lihat semua cerita →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <WaveDivider />
        </section>
    );
}

function InfoBadge({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white">
                {icon}
            </span>
            <div>
                <p className="text-xs uppercase tracking-widest text-sand-soft/70">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
            </div>
        </div>
    );
}

function WaveDivider() {
    return (
        <div className="absolute inset-x-0 bottom-[-1px]">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-full text-white">
                <path
                    fill="currentColor"
                    d="M0 96l48-10.7C96 75 192 53 288 50.7 384 48 480 64 576 85.3 672 107 768 133 864 138.7 960 144 1056 128 1152 122.7 1248 117 1344 123 1392 125.3l48 2.7V0H0v96z"
                    opacity="0.35"
                />
                <path
                    fill="currentColor"
                    d="M0 72l48-5.3C96 61 192 51 288 58.7 384 67 480 93 576 117.3 672 139 768 149 864 149.3 960 149 1056 139 1152 117.3 1248 96 1344 64 1392 48l48-16V0H0v72z"
                    opacity="0.55"
                />
                <path
                    fill="currentColor"
                    d="M0 48l48 13.3C96 75 192 101 288 106.7c96 5.3 192-10.7 288-26.7S768 53 864 53.3c96-.3 192 21.7 288 16 96-5.3 192-37.3 240-53.3l48-16V0H0v48z"
                />
            </svg>
        </div>
    );
}
