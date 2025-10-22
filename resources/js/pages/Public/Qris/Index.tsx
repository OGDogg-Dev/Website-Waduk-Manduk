import { Head } from '@inertiajs/react';
import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { PublicLayout } from '@/layouts/public/public-layout';
import type {
    QrisContactResource,
    QrisDownloadResource,
    QrisFaqResource,
    QrisHeroResource,
    QrisStepResource,
} from '@/types/public';
import { Step } from '@/components/public/Step';
import { FAQ } from '@/components/public/FAQ';

interface QrisPageProps {
    hero: QrisHeroResource;
    downloads: QrisDownloadResource[];
    steps: QrisStepResource[];
    faq: QrisFaqResource[];
    contacts: QrisContactResource[];
    disclaimer?: string | null;
}

const heroImageBase = 'https://images.unsplash.com/photo-1526498460520-4c246339dccb';
const heroImageParams = '?auto=format&fit=crop';
const heroImageSrcSet = [
    `${heroImageBase}${heroImageParams}&w=640&q=80 640w`,
    `${heroImageBase}${heroImageParams}&w=960&q=80 960w`,
    `${heroImageBase}${heroImageParams}&w=1280&q=80 1280w`,
    `${heroImageBase}${heroImageParams}&w=1600&q=80 1600w`,
    `${heroImageBase}${heroImageParams}&w=2000&q=80 2000w`,
].join(', ');

const fallbackDownloads: QrisDownloadResource[] = [
    {
        label: 'Poster QRIS (PNG)',
        url: '/files/qris-poster.txt',
        format: 'png',
        size: '120 KB',
        download_name: 'qris-poster.png',
    },
    {
        label: 'Panduan QRIS (PDF)',
        url: '/files/qris-panduan.txt',
        format: 'pdf',
        size: '80 KB',
        download_name: 'qris-panduan.pdf',
    },
];

const fallbackSteps: QrisStepResource[] = [
    { title: 'Pindai kode QR resmi Waduk Manduk', description: 'Temukan stiker QRIS di loket tiket, dermaga, atau kios UMKM resmi.' },
    { title: 'Masukkan nominal sesuai transaksi', description: 'Pastikan jumlah sesuai tiket atau donasi, lalu konfirmasi di aplikasi keuangan Anda.' },
    { title: 'Tunjukkan bukti bayar ke petugas', description: 'Petugas akan memverifikasi nama merchant “Waduk Manduk Konservasi”.' },
    { title: 'Simpan struk digital Anda', description: 'Struk akan diminta bila terjadi koreksi transaksi di kemudian hari.' },
];

const fallbackFaq: QrisFaqResource[] = [
    { question: 'Apakah sinyal internet tersedia di area waduk?', description: 'Area dermaga dan pusat informasi dilengkapi penguat sinyal sehingga transaksi non-tunai dapat dilakukan.' },
    { question: 'Bisakah saya menggunakan dompet digital apa pun?', description: 'Semua aplikasi pembayaran yang mendukung QRIS nasional dapat digunakan tanpa biaya tambahan.' },
];

export default function QrisPage({ hero, downloads, steps, faq, contacts, disclaimer }: QrisPageProps) {
    const effectiveDownloads = downloads.length ? downloads : fallbackDownloads;
    const effectiveSteps = steps.length ? steps : fallbackSteps;
    const effectiveFaq = faq.length ? faq : fallbackFaq;
    const effectiveDisclaimer =
        disclaimer ?? 'Transaksi QRIS hanya dilayani melalui petugas resmi di area Waduk Manduk.';

    const quickHelpItems = [
        {
            href: effectiveDownloads[0]?.url ?? '#',
            title: 'Unduh poster QRIS',
            description: 'Cetak dan tempelkan poster resmi di loket atau kios UMKM.',
        },
        {
            href: contacts[0]?.href ?? `mailto:${contacts[0]?.value ?? 'halo@wadukmanduk.id'}`,
            title: 'Hubungi petugas',
            description: 'Validasi transaksi atau minta bantuan kendala pembayaran.',
        },
        {
            href: route('support.index'),
            title: 'Donasi konservasi',
            description: 'Gunakan QRIS untuk mendukung program konservasi warga.',
        },
    ];

    return (
        <PublicLayout
            hero={
                <Hero
                    image={`${heroImageBase}${heroImageParams}&w=1600&q=80`}
                    imageSrcSet={heroImageSrcSet}
                    imageSizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
                    alt="Pengunjung memindai kode QR Waduk Manduk di loket dermaga"
                    eyebrow="Pembayaran nontunai"
                    title={hero.title}
                    subtitle={
                        hero.subtitle ??
                        'Gunakan QRIS resmi Waduk Manduk untuk transaksi tiket, penyewaan, dan dukungan konservasi.'
                    }
                    actions={[
                        {
                            label: 'Unduh poster QRIS',
                            href: effectiveDownloads[0]?.url ?? '#',
                            target: '_blank',
                            rel: 'noreferrer',
                        },
                        {
                            label: 'Unduh panduan',
                            href: effectiveDownloads[1]?.url ?? '#',
                            target: '_blank',
                            rel: 'noreferrer',
                            variant: 'ghost',
                        },
                    ]}
                >
                    <span className="chip">Pembayaran Nontunai</span>
                </Hero>
            }
        >
            <Head title="Informasi QRIS">
                <meta
                    name="description"
                    content="Panduan resmi pembayaran QRIS Waduk Manduk lengkap dengan langkah, kontak, dan materi unduhan."
                />
                <meta property="og:title" content="Pembayaran QRIS Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Pelajari cara transaksi nontunai, unduh poster & panduan QRIS, dan hubungi petugas resmi Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('qris.index')} />
            </Head>

            <section className="relative bg-surface-0 pb-16 pt-28 lg:pt-32">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,18,41,0.08)_0%,rgba(255,255,255,0)_100%)]"
                />
                <div className="container">
                    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                        <div className="space-y-8">
                            <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                <h2 className="text-h2 text-text-primary">Langkah pembayaran QRIS</h2>
                                <p className="mt-3 text-text-secondary">
                                    Ikuti panduan berikut agar transaksi berlangsung cepat dan aman di seluruh titik layanan Waduk Manduk.
                                </p>
                                <div className="mt-6 space-y-4">
                                    {effectiveSteps.slice(0, 4).map((step, index) => (
                                        <Step key={`${step.title}-${index}`} number={index + 1} title={step.title} description={step.description ?? ''} />
                                    ))}
                                </div>
                                {effectiveDisclaimer && (
                                    <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-700">
                                        {effectiveDisclaimer}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                <h3 className="text-h3 text-text-primary">Unduh materi QRIS</h3>
                                <p className="mt-3 text-text-secondary">
                                    File di bawah siap cetak dan dapat dibagikan kepada UMKM mitra agar kode pembayaran seragam.
                                </p>
                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    {effectiveDownloads.slice(0, 2).map((download) => (
                                        <a
                                            key={download.label}
                                            href={download.url ?? '#'}
                                            download={download.download_name ?? undefined}
                                            className="focus-ring flex items-center justify-between rounded-2xl border border-surface-3/70 bg-surface-0 px-5 py-4 text-sm font-semibold text-text-primary transition hover:border-brand-400 hover:text-brand-600"
                                        >
                                            <span>{download.label}</span>
                                            <span className="text-xs font-medium uppercase text-text-secondary">
                                                {download.format?.toUpperCase()} {download.size ? `· ${download.size}` : ''}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan QRIS"
                            description="Sumber daya utama untuk transaksi nontunai."
                            className="hidden lg:block"
                        />
                    </div>
                    <div className="mt-8 lg:hidden">
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan QRIS"
                            description="Sumber daya utama untuk transaksi nontunai."
                        />
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-surface-1 py-16 lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(42,179,173,0.2),transparent_70%)]"
                />
                <div className="container grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                    <div>
                        <h2 className="text-h2 text-text-primary">FAQ Pembayaran QRIS</h2>
                        <p className="mt-3 text-text-secondary">
                            Jika pertanyaan Anda belum terjawab, hubungi kontak resmi kami di samping.
                        </p>
                        <FAQ
                            items={effectiveFaq.map((item) => ({
                                question: item.question,
                                answer: item.description ?? '',
                            }))}
                            className="mt-6"
                        />
                    </div>
                    <div className="space-y-5 rounded-3xl border border-surface-3/80 bg-surface-0 p-6 shadow-soft">
                        <h3 className="text-h3 text-text-primary">Kontak resmi</h3>
                        <p className="text-sm text-text-secondary">
                            Tim loket siap membantu verifikasi transaksi setiap hari pukul 07.00–17.00 WIB.
                        </p>
                        <div className="space-y-4 text-sm text-text-secondary">
                            {contacts.length ? (
                                contacts.map((contact, index) => (
                                    <div key={`${contact.label}-${index}`} className="rounded-2xl border border-surface-3/70 bg-surface-1 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">{contact.label}</p>
                                        {contact.href ? (
                                            <a
                                                href={contact.href}
                                                target={contact.href.startsWith('http') ? '_blank' : undefined}
                                                rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                                                className="link focus-ring mt-2 inline-flex items-center gap-2 text-sm"
                                            >
                                                {contact.value}
                                            </a>
                                        ) : (
                                            <p className="mt-2 text-sm font-semibold text-text-primary">{contact.value}</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-text-secondary">
                                    Kontak akan tampil setelah ditambahkan melalui admin.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
