import { FormActions } from '@/components/forms/form-actions';
import { FormSection } from '@/components/forms/form-section';
import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import { storageUrl } from '@/lib/storage';
import type { EventFormData, EventOptions } from '@/types/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState, type ChangeEvent } from 'react';

interface EventFormPageProps {
    event: EventFormData | null;
    options: EventOptions;
}

type EventFormState = {
    title: string;
    slug: string;
    tagline: string;
    summary: string;
    body: string;
    location: string;
    status: string;
    is_featured: boolean;
    start_at: string;
    end_at: string;
    published_at: string;
    event_type: string;
    organizer: string;
    contact_person: string;
    registration_url: string;
    cover_image: File | null;
    gallery: File[];
    existingGallery: string[];
    metadata: string;
};

const toInputDateTime = (value: string | null) =>
    value ? new Date(value).toISOString().slice(0, 16) : '';

const toIsoString = (value: string) => (value ? new Date(value).toISOString() : null);

export default function EventFormPage({ event, options }: EventFormPageProps) {
    const isEditing = Boolean(event?.id);
    const [metadataError, setMetadataError] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(storageUrl(event?.cover_image) ?? null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const form = useForm<EventFormState>({
        title: event?.title ?? '',
        slug: event?.slug ?? '',
        tagline: event?.tagline ?? '',
        summary: event?.summary ?? '',
        body: event?.body ?? '',
        location: event?.location ?? '',
        status: event?.status ?? options.status[0]?.value ?? 'draft',
        is_featured: event?.is_featured ?? false,
        start_at: toInputDateTime(event?.start_at ?? null),
        end_at: toInputDateTime(event?.end_at ?? null),
        published_at: toInputDateTime(event?.published_at ?? null),
        event_type: event?.event_type ?? '',
        organizer: event?.organizer ?? '',
        contact_person: event?.contact_person ?? '',
        registration_url: event?.registration_url ?? '',
        cover_image: null,
        gallery: [],
        existingGallery: event?.gallery ?? [],
        metadata: event?.metadata ? JSON.stringify(event.metadata, null, 2) : '',
    });

    useEffect(() => {
        return () => {
            if (coverPreview && coverPreview.startsWith('blob:')) {
                URL.revokeObjectURL(coverPreview);
            }
            galleryPreviews.forEach((preview) => {
                if (preview.startsWith('blob:')) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, [coverPreview, galleryPreviews]);

    const title = useMemo(() => (isEditing ? 'Perbarui Event' : 'Event Baru'), [isEditing]);

    const handleInputChange =
        (field: keyof EventFormState) =>
        (eventChange: ChangeEvent<HTMLInputElement>) => {
            form.setData(field, eventChange.target.value);
        };

    const handleTextareaChange =
        (field: keyof EventFormState) =>
        (eventChange: ChangeEvent<HTMLTextAreaElement>) => {
            form.setData(field, eventChange.target.value);
        };

    const handleCoverChange = (eventChange: ChangeEvent<HTMLInputElement>) => {
        const file = eventChange.target.files?.[0] ?? null;
        form.setData('cover_image', file);
        setCoverPreview(file ? URL.createObjectURL(file) : storageUrl(event?.cover_image) ?? null);
    };

    const handleGalleryChange = (eventChange: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(eventChange.target.files ?? []);
        form.setData('gallery', files);
        setGalleryPreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const removeExistingImage = (image: string) => {
        form.setData(
            'existingGallery',
            form.data.existingGallery.filter((item) => item !== image),
        );
    };

    const removeNewImage = (index: number) => {
        const nextFiles = [...form.data.gallery];
        nextFiles.splice(index, 1);
        form.setData('gallery', nextFiles);

        setGalleryPreviews((prev) => {
            const updated = [...prev];
            const [removed] = updated.splice(index, 1);
            if (removed?.startsWith('blob:')) {
                URL.revokeObjectURL(removed);
            }
            return updated;
        });
    };

    const handleSubmit = (eventSubmit: React.FormEvent<HTMLFormElement>) => {
        eventSubmit.preventDefault();
        setMetadataError(null);

        let metadataPayload: Record<string, unknown> | null = null;
        if (form.data.metadata.trim().length > 0) {
            try {
                metadataPayload = JSON.parse(form.data.metadata);
            } catch (error) {
                setMetadataError('Metadata harus JSON valid.');
                return;
            }
        }

        form.transform((data) => {
            const payload: Record<string, unknown> = {
                title: data.title,
                slug: data.slug || null,
                tagline: data.tagline || null,
                summary: data.summary || null,
                body: data.body || null,
                location: data.location || null,
                status: data.status,
                is_featured: data.is_featured,
                start_at: toIsoString(data.start_at),
                end_at: toIsoString(data.end_at),
                published_at: toIsoString(data.published_at),
                event_type: data.event_type || null,
                organizer: data.organizer || null,
                contact_person: data.contact_person || null,
                registration_url: data.registration_url || null,
                metadata: metadataPayload,
                existing_gallery: data.existingGallery,
                gallery: data.gallery,
            };

            if (data.cover_image) {
                payload.cover_image = data.cover_image;
            }

            if (isEditing && event) {
                payload._method = 'put';
            }

            return payload;
        });

        const submitOptions = { preserveScroll: true, forceFormData: true } as const;

        if (isEditing && event) {
            form.post(route('admin.events.update', event.id), submitOptions);
        } else {
            form.post(route('admin.events.store'), submitOptions);
        }
    };

    const galleryError = form.errors.gallery ?? form.errors['gallery.0'];

    return (
        <>
            <Head title={title} />
            <AdminLayout
                title="Event Komunitas"
                subtitle="Sediakan detail agenda komunitas agar pengunjung dapat menyesuaikan waktu kunjungan."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Event Komunitas', href: route('admin.events.index') },
                    { label: title, href: null },
                ]}
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.events.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali ke daftar
                        </Link>
                    </Button>

                    <PageHeader
                        title={title}
                        subtitle="Berikan ringkasan, detail agenda, serta informasi kontak untuk event komunitas."
                    />

                    <form className="mt-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                        <FormSection
                            title="Informasi utama"
                            description="Judul, ringkasan singkat, serta konten detail event."
                        >
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Judul Event</Label>
                                    <Input
                                        id="title"
                                        value={form.data.title}
                                        onChange={handleInputChange('title')}
                                        required
                                    />
                                    {form.errors.title && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.title}</p>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={form.data.slug}
                                            onChange={handleInputChange('slug')}
                                            placeholder="slug-event"
                                        />
                                        {form.errors.slug && (
                                            <p className="mt-1 text-xs text-red-500">{form.errors.slug}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="tagline">Tagline</Label>
                                        <Input
                                            id="tagline"
                                            value={form.data.tagline}
                                            onChange={handleInputChange('tagline')}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="summary">Ringkasan</Label>
                                    <Textarea
                                        id="summary"
                                        rows={3}
                                        value={form.data.summary}
                                        onChange={handleTextareaChange('summary')}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="body">Detail agenda</Label>
                                    <Textarea
                                        id="body"
                                        rows={6}
                                        value={form.data.body}
                                        onChange={handleTextareaChange('body')}
                                        placeholder="Gunakan format markdown bila diperlukan."
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Waktu & lokasi"
                            description="Jadwalkan waktu mulai, selesai, serta lokasi pelaksanaan."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="start_at">Mulai</Label>
                                    <Input
                                        id="start_at"
                                        type="datetime-local"
                                        value={form.data.start_at}
                                        onChange={handleInputChange('start_at')}
                                    />
                                    {form.errors.start_at && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.start_at}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="end_at">Selesai</Label>
                                    <Input
                                        id="end_at"
                                        type="datetime-local"
                                        value={form.data.end_at}
                                        onChange={handleInputChange('end_at')}
                                    />
                                    {form.errors.end_at && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.end_at}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="published_at">Tanggal publikasi</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        value={form.data.published_at}
                                        onChange={handleInputChange('published_at')}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="location">Lokasi</Label>
                                    <Input
                                        id="location"
                                        value={form.data.location}
                                        onChange={handleInputChange('location')}
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Status & penyelenggara"
                            description="Tentukan status publikasi, jenis event, dan kontak narahubung."
                        >
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <Label htmlFor="status">Status event</Label>
                                    <Select
                                        value={form.data.status}
                                        onValueChange={(value) => form.setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {options.status.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.errors.status && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.status}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="event_type">Jenis event</Label>
                                    <Select
                                        value={form.data.event_type || 'custom'}
                                        onValueChange={(value) =>
                                            form.setData('event_type', value === 'custom' ? '' : value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="custom">Tulis manual</SelectItem>
                                            {options.types.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        className="mt-2"
                                        placeholder="Isi jika memilih tulis manual"
                                        value={form.data.event_type}
                                        onChange={handleInputChange('event_type')}
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <Checkbox
                                        id="is_featured"
                                        checked={form.data.is_featured}
                                        onCheckedChange={(checked) =>
                                            form.setData('is_featured', Boolean(checked))
                                        }
                                    />
                                    <Label htmlFor="is_featured" className="text-sm">
                                        Tandai sebagai event sorotan
                                    </Label>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="organizer">Penyelenggara</Label>
                                    <Input
                                        id="organizer"
                                        value={form.data.organizer}
                                        onChange={handleInputChange('organizer')}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="contact_person">Kontak narahubung</Label>
                                    <Input
                                        id="contact_person"
                                        value={form.data.contact_person}
                                        onChange={handleInputChange('contact_person')}
                                        placeholder="Nama / nomor WA"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="registration_url">Link pendaftaran</Label>
                                <Input
                                    id="registration_url"
                                    value={form.data.registration_url}
                                    onChange={handleInputChange('registration_url')}
                                    placeholder="https://..."
                                />
                            </div>
                        </FormSection>

                        <FormSection
                            title="Media & metadata"
                            description="Gambar sampul, galeri dokumentasi, dan metadata tambahan."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="cover_image">Gambar sampul</Label>
                                    <Input
                                        id="cover_image"
                                        name="cover_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverChange}
                                    />
                                    {form.errors.cover_image && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.cover_image}</p>
                                    )}
                                    {coverPreview && (
                                        <img
                                            src={coverPreview}
                                            alt="Preview event"
                                            className="mt-3 h-40 w-full rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="gallery">Galeri dokumentasi</Label>
                                    <Input
                                        id="gallery"
                                        name="gallery"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryChange}
                                    />
                                    {galleryError && (
                                        <p className="mt-1 text-xs text-red-500">{galleryError}</p>
                                    )}
                                    {form.data.existingGallery.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            <p className="text-xs font-semibold text-muted-foreground">Gambar saat ini</p>
                                            <div className="flex flex-wrap gap-3">
                                                {form.data.existingGallery.map((image) => (
                                                    <div
                                                        key={image}
                                                        className="relative h-20 w-20 overflow-hidden rounded-lg border border-border/60"
                                                    >
                                                        <img
                                                            src={storageUrl(image) ?? undefined}
                                                            alt="Galeri"
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <Button
                                                            type="button"
                                                            size="icon"
                                                            variant="secondary"
                                                            className="absolute right-1 top-1 h-6 w-6"
                                                            onClick={() => removeExistingImage(image)}
                                                        >
                                                            <X className="size-3" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {galleryPreviews.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            <p className="text-xs font-semibold text-muted-foreground">Gambar baru</p>
                                            <div className="flex flex-wrap gap-3">
                                                {galleryPreviews.map((preview, index) => (
                                                    <div
                                                        key={`${preview}-${index}`}
                                                        className="relative h-20 w-20 overflow-hidden rounded-lg border border-dashed border-border/60"
                                                    >
                                                        <img
                                                            src={preview}
                                                            alt="Preview galeri"
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <Button
                                                            type="button"
                                                            size="icon"
                                                            variant="secondary"
                                                            className="absolute right-1 top-1 h-6 w-6"
                                                            onClick={() => removeNewImage(index)}
                                                        >
                                                            <X className="size-3" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="metadata">Metadata (JSON opsional)</Label>
                                <Textarea
                                    id="metadata"
                                    rows={4}
                                    value={form.data.metadata}
                                    onChange={handleTextareaChange('metadata')}
                                />
                                {metadataError && (
                                    <p className="mt-1 text-xs text-red-500">{metadataError}</p>
                                )}
                            </div>
                        </FormSection>

                        <FormActions
                            processing={form.processing}
                            isEditing={isEditing}
                            onCancel={() => window.history.back()}
                        />
                    </form>
                </PageContainer>
            </AdminLayout>
        </>
    );
}
