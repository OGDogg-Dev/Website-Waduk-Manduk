import { FormEvent, useRef, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public/public-layout';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import type { StatusResource } from '@/types/public';

interface KontakPageProps {
    metrics: {
        spots: number;
        umkm: number;
        events: number;
        stories: number;
    };
    latestStatus: Array<Pick<StatusResource, 'crowd_level' | 'weather_summary' | 'reported_at' | 'advisory'>>;
}

interface FormState {
    name: string;
    email: string;
    message: string;
}

export default function KontakPage({ metrics, latestStatus }: KontakPageProps) {
    const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const feedbackRef = useRef<HTMLParagraphElement | null>(null);

    const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const nextErrors: Partial<FormState> = {};
        if (!form.name.trim()) {
            nextErrors.name = 'Nama wajib diisi.';
        }
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            nextErrors.email = 'Masukkan email yang valid.';
        }
        if (!form.message.trim()) {
            nextErrors.message = 'Tulis pertanyaan atau pesan Anda.';
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            setFeedback('Periksa kembali data yang belum lengkap.');
            feedbackRef.current?.focus();
            return;
        }
        setSubmitting(true);
        setFeedback('Mengirim pesan…');
        setTimeout(() => {
            setSubmitting(false);
            setFeedback('Pesan Anda berhasil dikirim. Tim kami akan merespons dalam 1x24 jam kerja.');
            setForm({ name: '', email: '', message: '' });
            feedbackRef.current?.focus();
        }, 800);
    };

    return (
        <PublicLayout>
            <Head title="Kontak">
                <meta
                    name="description"
                    content="Hubungi pengelola Waduk Manduk untuk reservasi, kolaborasi komunitas, dan permintaan media."
                />
                <meta property="og:title" content="Kontak Pengelola Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Kirim pesan melalui formulir aksesibel atau temukan jam operasional dan kontak resmi Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('about.index')} />
            </Head>

            <section className="py-12 lg:py-16">
                <div className="container grid gap-8 lg:grid-cols-[1fr,0.9fr]">
                    <div className="space-y-4">
                        <h1 className="text-h1">Hubungi Pengelola Waduk Manduk</h1>
                        <p className="text-text-secondary">
                            Tim Sahabat Manduk siap membantu kebutuhan reservasi, kolaborasi komunitas, hingga permintaan media.
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { label: 'Spot terkelola', value: metrics.spots },
                                { label: 'UMKM mitra', value: metrics.umkm },
                                { label: 'Event per tahun', value: metrics.events },
                                { label: 'Artikel terbit', value: metrics.stories },
                            ].map((item) => (
                                <div key={item.label} className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                                    <p className="eyebrow text-xs text-brand-600">{item.label}</p>
                                    <p className="mt-2 text-3xl font-semibold text-brand-600">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                        <h2 className="text-h3 text-text-primary">Informasi kontak</h2>
                        <div className="mt-4 space-y-3 text-sm text-text-secondary">
                            <p>Alamat: Jl. Danau Biru No. 88, Desa Manduk, Kabupaten Gresik.</p>
                            <p>Whatsapp Center: <a href="https://wa.me/6281311223344" className="link focus-ring">0813-1122-3344</a></p>
                            <p>Email layanan: <a href="mailto:halo@wadukmanduk.id" className="link focus-ring">halo@wadukmanduk.id</a></p>
                        </div>
                        <Link href="https://maps.google.com" target="_blank" rel="noreferrer" className="link focus-ring mt-4 inline-flex text-sm">
                            Buka lokasi di Google Maps →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-surface-1 py-12 lg:py-16">
                <div className="container grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
                    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-surface-3/70 bg-surface-0 p-8 shadow-soft">
                        <h2 className="text-h2 text-text-primary">Formulir kontak</h2>
                        <p className="text-sm text-text-secondary">Isi formulir di bawah ini dan tim kami akan merespons melalui email.</p>
                        <p ref={feedbackRef} tabIndex={-1} aria-live="polite" className="text-sm font-semibold text-brand-600">
                            {feedback}
                        </p>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold text-text-primary">
                                Nama lengkap
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange('name')}
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                className="focus-ring w-full rounded-2xl border border-surface-3/80 bg-surface-1 px-4 py-3 text-sm text-text-primary"
                                placeholder="Masukkan nama Anda"
                            />
                            {errors.name && (
                                <p id="name-error" className="text-xs text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold text-text-primary">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange('email')}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                className="focus-ring w-full rounded-2xl border border-surface-3/80 bg-surface-1 px-4 py-3 text-sm text-text-primary"
                                placeholder="nama@organisasi.id"
                            />
                            {errors.email && (
                                <p id="email-error" className="text-xs text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-text-primary">
                                Pesan
                            </label>
                            <textarea
                                id="message"
                                value={form.message}
                                onChange={handleChange('message')}
                                aria-invalid={Boolean(errors.message)}
                                aria-describedby={errors.message ? 'message-error' : undefined}
                                className="focus-ring h-32 w-full rounded-2xl border border-surface-3/80 bg-surface-1 px-4 py-3 text-sm text-text-primary"
                                placeholder="Sampaikan pertanyaan, kebutuhan reservasi, atau rencana kolaborasi."
                            />
                            {errors.message && (
                                <p id="message-error" className="text-xs text-red-600">
                                    {errors.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="focus-ring inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-on-dark transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
                            disabled={submitting}
                        >
                            {submitting ? 'Mengirim…' : 'Kirim pesan'}
                        </button>
                    </form>
                    <div className="space-y-6">
                        {latestStatus.length > 0 && (
                            <div className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                                <h3 className="text-h3 text-text-primary">Status terbaru</h3>
                                <div className="mt-4 space-y-4">
                                    {latestStatus.map((statusItem, index) => (
                                        <StatusBanner
                                            key={`status-${index}`}
                                            crowd_level={statusItem.crowd_level}
                                            weather_summary={statusItem.weather_summary}
                                            advisory={statusItem.advisory}
                                            startLabel={
                                                statusItem.reported_at
                                                    ? `Dilaporkan ${new Date(statusItem.reported_at).toLocaleDateString('id-ID')}`
                                                    : 'Dilaporkan'
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                            <h3 className="text-h3 text-text-primary">Jam operasional</h3>
                            <p className="mt-3 text-sm text-text-secondary">
                                Loket tiket: 07.00 – 16.00 WIB setiap hari.
                                <br />
                                Layanan reservasi kelompok: Senin – Jumat, 09.00 – 17.00 WIB.
                            </p>
                            <Link href={route('visit.plan')} className="link focus-ring mt-4 inline-flex text-sm">
                                Lihat detail fasilitas →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
