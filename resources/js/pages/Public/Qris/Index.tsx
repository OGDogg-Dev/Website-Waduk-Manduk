import { Head } from '@inertiajs/react';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { PublicLayout } from '@/layouts/public/public-layout';
import { Step } from '@/components/public/Step';
import { FAQ } from '@/components/public/FAQ';
import { Breadcrumbs } from '@/components/public/breadcrumbs';
import type {
    QrisContactResource,
    QrisDownloadResource,
    QrisFaqResource,
    QrisHeroResource,
    QrisStepResource,
} from '@/types/public';

interface QrisPageProps {
    hero: QrisHeroResource;
    downloads: QrisDownloadResource[];
    steps: QrisStepResource[];
    faq: QrisFaqResource[];
    contacts: QrisContactResource[];
    disclaimer?: string | null;
}

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
    { title: 'Masukkan nominal transaksi', description: 'Pastikan jumlah sesuai tiket atau donasi, lalu konfirmasi di aplikasi pembayaran Anda.' },
    { title: 'Tunjukkan bukti bayar ke petugas', description: 'Petugas akan memverifikasi nama merchant “Waduk Manduk Konservasi”.' },
    { title: 'Simpan struk digital', description: 'Struk dibutuhkan bila terjadi koreksi transaksi di kemudian hari.' },
];

const fallbackFaq: QrisFaqResource[] = [
    { question: 'Apakah sinyal internet tersedia di area waduk?', description: 'Area dermaga dan pusat informasi dilengkapi penguat sinyal untuk transaksi nontunai.' },
    { question: 'Bisakah menggunakan dompet digital apa pun?', description: 'Semua aplikasi pembayaran yang mendukung QRIS nasional dapat digunakan.' },
];

export default function QrisPage({ hero, downloads, steps, faq, contacts, disclaimer }: QrisPageProps) {
    const effectiveDownloads = downloads.length ? downloads : fallbackDownloads;
    const effectiveSteps = steps.length ? steps : fallbackSteps;
    const effectiveFaq = faq.length ? faq : fallbackFaq;
    const effectiveDisclaimer = disclaimer ?? 'Transaksi QRIS hanya dilayani melalui petugas resmi Waduk Manduk.';

    const primaryContact = contacts[0];

    const quickHelpItems = [
        {
            href: effectiveDownloads[0]?.url ?? '#',
            title: 'Unduh poster QRIS',
            description: 'Cetak poster resmi untuk loket tiket atau kios UMKM mitra.',
        },
        {
            href: primaryContact?.href ?? `mailto:${primaryContact?.value ?? 'halo@wadukmanduk.id'}`,
            title: 'Hubungi petugas QRIS',
            description: 'Validasi transaksi, minta reset, atau laporan kendala teknis.',
        },
        {
            href: route('support.index'),
            title: 'Donasi konservasi',
            description: 'Gunakan QRIS untuk mendukung program konservasi warga.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Informasi QRIS Waduk Manduk">
                <meta
                    name="description"
                    content="Panduan lengkap pembayaran QRIS Waduk Manduk: langkah, unduhan materi, dan kontak resmi."
                />
                <meta property="og:title" content="Pembayaran QRIS Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Pelajari cara transaksi nontunai, unduh poster & panduan QRIS, dan hubungi petugas resmi Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('qris.index')} />
            </Head>

            <PageHero
                eyebrow="Pembayaran nontunai"
                title={hero.title}
                description={hero.subtitle ?? 'Gunakan QRIS resmi Waduk Manduk untuk transaksi tiket, penyewaan, dan donasi konservasi.'}
                actions={[
                    {
                        label: 'Unduh poster QRIS',
                        href: effectiveDownloads[0]?.url ?? '#',
                        external: true,
                    },
                ]}
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Bantuan QRIS"
                quickHelpDescription="Unduhan materi, kontak petugas, dan saluran donasi."
                quickHelpCta={{
                    label: 'Unduh panduan lengkap',
                    href: effectiveDownloads[1]?.url ?? '#',
                    description: effectiveDownloads[1]?.size ?? 'PDF',
                }}
            >
                <Breadcrumbs items={[{ label: 'Pembayaran QRIS' }]} className="mt-8" />
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.32em] text-accent-100/80">
                    Transaksi hanya dilayani oleh petugas resmi Waduk Manduk.
                </p>
            </PageHero>

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(60,138,233,0.24),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Langkah pembayaran</p>
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Transaksi QRIS dalam empat langkah</h2>
                        <p className="max-w-3xl text-white/90">
                            Ikuti panduan berikut agar pembayaran berlangsung cepat, aman, dan tercatat pada sistem Waduk Manduk.
                        </p>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
                        {effectiveSteps.slice(0, 4).map((step, index) => (
                            <Step
                                key={`${step.title ?? index}-${index}`}
                                number={index + 1}
                                title={step.title ?? `Langkah ${index + 1}`}
                                description={step.description ?? ''}
                                tone="dark"
                            />
                        ))}
                    </div>
                    {effectiveDisclaimer && (
                        <p className="rounded-[1.8rem] border border-amber-300/50 bg-amber-500/15 p-5 text-xs font-semibold text-amber-100">
                            {effectiveDisclaimer}
                        </p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.2),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/8 p-8 shadow-soft backdrop-blur">
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Unduh materi QRIS</h2>
                        <p className="text-sm text-white/85">
                            File siap cetak untuk loket tiket, kios UMKM mitra, dan papan informasi di seluruh zona waduk.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                            {effectiveDownloads.slice(0, 2).map((download) => (
                                <a
                                    key={download.label}
                                    href={download.url ?? '#'}
                                    download={download.download_name ?? undefined}
                                    className="focus-ring flex items-center justify-between rounded-[1.6rem] border border-white/15 bg-white/6 px-5 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/12"
                                >
                                    <span>{download.label}</span>
                                    <span className="text-xs font-medium uppercase text-white/70">
                                        {download.format?.toUpperCase()} {download.size ? `· ${download.size}` : ''}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/5 p-8 shadow-soft backdrop-blur">
                        <h3 className="text-2xl font-semibold text-white">Kontak resmi QRIS</h3>
                        <ul className="space-y-3 text-sm text-white/85">
                            {contacts.map((contact) => {
                                const linkHref = contact.href
                                    ? contact.href
                                    : contact.value?.includes('@')
                                        ? `mailto:${contact.value}`
                                        : contact.value
                                            ? `tel:${contact.value}`
                                            : '#';
                                return (
                                    <li key={`${contact.label}-${contact.value}`} className="rounded-[1.5rem] border border-white/12 bg-white/6 p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-white/70">{contact.label}</p>
                                        <a href={linkHref} className="focus-ring mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white">
                                            {contact.value ?? 'Hubungi petugas'}
                                            <span aria-hidden>→</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#040f24] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(72,150,255,0.2),_rgba(4,15,36,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Pertanyaan umum</p>
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">FAQ pembayaran QRIS</h2>
                        <p className="max-w-3xl text-white/90">
                            Jawaban ringkas seputar koneksi internet, metode pembayaran, hingga bukti transaksi.
                        </p>
                    </div>
                    <FAQ
                        items={effectiveFaq.map((item) => ({
                            question: item.question ?? 'Pertanyaan',
                            answer: item.description ?? '-',
                        }))}
                        tone="dark"
                    />
                </div>
            </section>
        </PublicLayout>
    );
}
