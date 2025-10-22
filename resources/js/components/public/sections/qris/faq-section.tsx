import { PageContainer } from '@/components/public/layout/page-container';
import type { QrisContactResource, QrisFaqResource } from '@/types/public';

interface QrisFaqSectionProps {
    faq: QrisFaqResource[];
    contacts: QrisContactResource[];
}

export function QrisFaqSection({ faq, contacts }: QrisFaqSectionProps) {
    return (
        <section className="bg-foam py-20">
            <PageContainer className="grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-6">
                    <div className="space-y-3 text-deep-navy">
                        <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Pertanyaan Umum</p>
                        <h2 className="text-3xl font-semibold md:text-4xl">FAQ Pembayaran QRIS</h2>
                        <p className="text-sm text-deep-navy/70">
                            Temukan jawaban atas pertanyaan yang sering muncul mengenai penggunaan QRIS di Waduk Manduk. Untuk
                            bantuan lebih lanjut, hubungi kontak resmi di samping.
                        </p>
                    </div>
                    <div className="space-y-3">
                        {faq.map((item, index) => (
                            <details
                                key={`${item.question}-${index}`}
                                className="group overflow-hidden rounded-2xl border border-deep-navy/10 bg-white"
                            >
                                <summary className="cursor-pointer list-none px-6 py-4 text-sm font-semibold text-deep-navy transition group-open:bg-foam">
                                    {item.question}
                                </summary>
                                {item.description && (
                                    <p className="px-6 pb-6 text-sm text-deep-navy/70">{item.description}</p>
                                )}
                            </details>
                        ))}
                    </div>
                </div>
                <div className="space-y-5 rounded-3xl border border-deep-navy/10 bg-white p-6 shadow-reef/10">
                    <div className="space-y-3 text-deep-navy">
                        <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Kontak Resmi</p>
                        <h3 className="text-2xl font-semibold">Butuh bantuan tambahan?</h3>
                        <p className="text-sm text-deep-navy/70">
                            Tim loket dan konservasi siap membantu memverifikasi transaksi Anda setiap hari pukul 07.00–17.00 WIB.
                        </p>
                    </div>
                    <div className="space-y-4 text-sm text-deep-navy/80">
                        {contacts.map((contact, index) => (
                            <div
                                key={`${contact.label}-${index}`}
                                className="rounded-2xl border border-deep-navy/10 bg-foam p-4"
                            >
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0f4c81]">
                                    {contact.label}
                                </p>
                                {contact.href ? (
                                    <a
                                        href={contact.href}
                                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                                        rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                                        className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-deep-navy transition hover:text-gold-accent"
                                    >
                                        {contact.value}
                                        <span aria-hidden>→</span>
                                    </a>
                                ) : (
                                    <p className="mt-2 text-base font-semibold text-deep-navy">{contact.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
