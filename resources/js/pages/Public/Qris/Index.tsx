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
import { Head } from '@inertiajs/react';

interface QrisPageProps {
    hero: QrisHeroResource;
    downloads: QrisDownloadResource[];
    steps: QrisStepResource[];
    faq: QrisFaqResource[];
    contacts: QrisContactResource[];
    disclaimer?: string | null;
}

const heroImage = 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80';

export default function QrisPage({ hero, downloads, steps, faq, contacts, disclaimer }: QrisPageProps) {
    const quickHelpItems = [
        {
            href: downloads[0]?.url ?? '#',
            title: 'Unduh poster QRIS',
            description: 'Poster digital resmi untuk loket, dermaga, dan pusat informasi.',
        },
        {
            href: contacts[0]?.href ?? `mailto:${contacts[0]?.value ?? 'halo@wadukmanduk.id'}`,
            title: 'Hubungi petugas',
            description: 'Validasi transaksi atau bantuan teknis pembayaran QRIS.',
        },
        {
            href: route('support.index'),
            title: 'Dukung konservasi',
            description: 'Gunakan QRIS untuk donasi konservasi dan program warga.',
        },
    ];

    return (
        <>
            <Head title="Informasi QRIS" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Pengunjung memindai QRIS di Waduk Manduk"
                        eyebrow="Informasi pembayaran"
                        title={hero.title}
                        subtitle={hero.subtitle ?? 'Gunakan kode QR resmi Waduk Manduk untuk transaksi tiket, penyewaan, dan dukungan konservasi.'}
                        actions={[
                            { label: 'Unduh poster resmi', href: downloads[0]?.url ?? '#', target: '_blank', rel: 'noreferrer' },
                            { label: 'Hubungi loket', href: contacts[0]?.href ?? `mailto:${contacts[0]?.value ?? 'halo@wadukmanduk.id'}`, variant: 'ghost' },
                        ]}
                    >
                        {hero.highlight && (
                            <div className="rounded-3xl border border-white/25 bg-white/10 p-6 text-sm text-[color:var(--text-on-media-muted)]">
                                {hero.highlight}
                            </div>
                        )}
                    </Hero>
                }
            >
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h2 className="text-h2 text-text-primary">Langkah pembayaran QRIS</h2>
                                    <p className="mt-3 text-text-secondary">
                                        Ikuti panduan berikut saat melakukan transaksi non-tunai di area Waduk Manduk. Pastikan sinyal internet stabil untuk mempercepat proses.
                                    </p>
                                    <ol className="mt-6 space-y-4">
                                        {steps.map((step, index) => (
                                            <li key={`${step.title}-${index}`} className="flex gap-4 rounded-2xl border border-surface-3/70 bg-surface-1 p-5 shadow-soft">
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-on-dark">
                                                    {index + 1}
                                                </span>
                                                <div className="space-y-2 text-sm text-text-secondary">
                                                    {step.title && <p className="text-base font-semibold text-text-primary">{step.title}</p>}
                                                    {step.description && <p>{step.description}</p>}
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                    {disclaimer && (
                                        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-700">
                                            {disclaimer}
                                        </p>
                                    )}
                                </div>

                                <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                    <h3 className="text-h3 text-text-primary">Unduh materi QRIS</h3>
                                    <p className="mt-3 text-text-secondary">
                                        Poster digital memuat kode QR yang identik dengan milik petugas. Cetak dan pasang di area layanan agar pengunjung mudah memindai.
                                    </p>
                                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                                        {downloads.map((download) => (
                                            <a
                                                key={download.label}
                                                href={download.url ?? '#'}
                                                download
                                                className="focus-ring flex items-center justify-between rounded-2xl border border-surface-3/70 bg-surface-0 px-5 py-4 text-sm font-semibold text-text-primary transition hover:border-brand-400 hover:text-brand-600"
                                            >
                                                <span>{download.label}</span>
                                                <span className="text-xs font-medium uppercase text-text-secondary">
                                                    {download.format?.toUpperCase()}
                                                    {download.size ? ` · ${download.size}` : ''}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Bantuan QRIS"
                                description="Sumber daya untuk transaksi nontunai."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan QRIS"
                            description="Sumber daya untuk transaksi nontunai."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>

                <section className="bg-surface-1 py-12 lg:py-16">
                    <div className="container grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
                        <div className="space-y-4">
                            <h2 className="text-h2 text-text-primary">FAQ Pembayaran QRIS</h2>
                            <p className="text-text-secondary">
                                Temukan jawaban atas pertanyaan yang sering muncul. Untuk bantuan lanjutan, hubungi kontak resmi di samping.
                            </p>
                            <div className="space-y-3">
                                {faq.map((item, index) => (
                                    <details key={`${item.question}-${index}`} className="overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-0">
                                        <summary className="cursor-pointer list-none px-6 py-4 text-sm font-semibold text-text-primary">
                                            {item.question}
                                        </summary>
                                        {item.description && <p className="px-6 pb-6 text-sm text-text-secondary">{item.description}</p>}
                                    </details>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-5 rounded-3xl border border-surface-3/80 bg-surface-0 p-6 shadow-soft">
                            <h3 className="text-h3 text-text-primary">Kontak resmi</h3>
                            <p className="text-sm text-text-secondary">
                                Tim loket dan konservasi siap membantu memverifikasi transaksi setiap hari pukul 07.00–17.00 WIB.
                            </p>
                            <div className="space-y-4 text-sm text-text-secondary">
                                {contacts.map((contact, index) => (
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
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
