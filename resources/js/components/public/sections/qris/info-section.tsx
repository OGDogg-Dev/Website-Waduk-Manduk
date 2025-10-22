import { PageContainer } from '@/components/public/layout/page-container';
import type { QrisDownloadResource, QrisStepResource } from '@/types/public';

interface QrisInfoSectionProps {
    downloads: QrisDownloadResource[];
    steps: QrisStepResource[];
    disclaimer?: string | null;
}

export function QrisInfoSection({ downloads, steps, disclaimer }: QrisInfoSectionProps) {
    return (
        <section className="bg-white py-20">
            <PageContainer className="space-y-16">
                <div className="grid gap-10 md:grid-cols-[1fr,0.9fr] md:items-start">
                    <div className="space-y-6">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Langkah Pembayaran</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Empat langkah mudah pembayaran QRIS</h2>
                            <p className="text-sm text-deep-navy/70">
                                Ikuti panduan berikut saat melakukan transaksi nontunai di area Waduk Manduk. Pastikan sinyal
                                internet stabil untuk mempercepat proses.
                            </p>
                        </div>
                        <ol className="space-y-4">
                            {steps.map((step, index) => (
                                <li
                                    key={`${step.title}-${index}`}
                                    className="flex gap-4 rounded-2xl border border-deep-navy/10 bg-foam p-5 shadow-reef/10"
                                >
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-accent text-base font-semibold text-deep-navy">
                                        {index + 1}
                                    </span>
                                    <div className="space-y-2 text-sm text-deep-navy/70">
                                        {step.title && <p className="text-base font-semibold text-deep-navy">{step.title}</p>}
                                        {step.description && <p>{step.description}</p>}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="space-y-5 rounded-3xl border border-deep-navy/10 bg-foam p-6 shadow-reef/10">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Poster Resmi</p>
                            <h3 className="text-2xl font-semibold">Unduh materi QRIS untuk loket & informasi</h3>
                            <p className="text-sm text-deep-navy/70">
                                Poster digital berisi kode QR yang sama dengan yang digunakan petugas. Cetak dan pasang di area
                                pelayanan agar pengunjung dapat memindai dengan mudah.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {downloads.map((download) => (
                                <a
                                    key={download.label}
                                    href={download.url ?? '#'}
                                    download
                                    className="flex items-center justify-between rounded-2xl border border-deep-navy/10 bg-white px-5 py-4 text-sm font-semibold text-deep-navy transition hover:border-gold-accent hover:text-gold-accent"
                                >
                                    <span>{download.label}</span>
                                    <span className="text-xs font-medium uppercase text-deep-navy/60">
                                        {download.format?.toUpperCase()}
                                        {download.size ? ` · ${download.size}` : ''}
                                    </span>
                                </a>
                            ))}
                        </div>
                        {disclaimer && (
                            <p className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs font-semibold text-amber-700">
                                {disclaimer}
                            </p>
                        )}
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
