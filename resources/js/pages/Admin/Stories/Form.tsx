import { FormActions } from '@/components/forms/form-actions';
import { FormSection } from '@/components/forms/form-section';
import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import { storageUrl } from '@/lib/storage';
import type { StoryFormData, StoryOptions } from '@/types/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface StoryFormPageProps {
    story: StoryFormData | null;
    options: StoryOptions;
}

type StoryFormState = {
    title: string;
    slug: string;
    type: string;
    status: string;
    hero_image: File | null;
    excerpt: string;
    body: string;
    tags: string;
    gallery: File[];
    existingGallery: string[];
    source_name: string;
    source_url: string;
    published_at: string;
    metadata: string;
};

const toInputDateTime = (value: string | null) =>
    value ? new Date(value).toISOString().slice(0, 16) : '';

export default function StoryFormPage({ story, options }: StoryFormPageProps) {
    const isEditing = Boolean(story?.id);
    const [metadataError, setMetadataError] = useState<string | null>(null);
    const [heroPreview, setHeroPreview] = useState<string | null>(storageUrl(story?.hero_image) ?? null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const form = useForm<StoryFormState>({
        title: story?.title ?? '',
        slug: story?.slug ?? '',
        type: story?.type ?? options.types[0]?.value ?? 'blog',
        status: story?.status ?? options.status[0]?.value ?? 'draft',
        hero_image: null,
        excerpt: story?.excerpt ?? '',
        body: story?.body ?? '',
        tags: story?.tags?.join(', ') ?? '',
        gallery: [],
        existingGallery: story?.gallery ?? [],
        source_name: story?.source_name ?? '',
        source_url: story?.source_url ?? '',
        published_at: toInputDateTime(story?.published_at ?? null),
        metadata: story?.metadata ? JSON.stringify(story.metadata, null, 2) : '',
    });

    useEffect(() => {
        return () => {
            if (heroPreview && heroPreview.startsWith('blob:')) {
                URL.revokeObjectURL(heroPreview);
            }
            galleryPreviews.forEach((preview) => {
                if (preview.startsWith('blob:')) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, [heroPreview, galleryPreviews]);

    const title = useMemo(() => (isEditing ? 'Perbarui Cerita' : 'Cerita Baru'), [isEditing]);

    const handleHeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        form.setData('hero_image', file);
        setHeroPreview(file ? URL.createObjectURL(file) : storageUrl(story?.hero_image) ?? null);
    };

    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
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
                setMetadataError('Metadata harus JSON yang valid.');
                return;
            }
        }

        form.transform((data) => {
            const payload: Record<string, unknown> = {
                title: data.title,
                slug: data.slug || null,
                type: data.type,
                status: data.status,
                excerpt: data.excerpt || null,
                body: data.body || null,
                tags: data.tags
                    ? data.tags
                          .split(',')
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                    : [],
                existing_gallery: data.existingGallery,
                gallery: data.gallery,
                source_name: data.source_name || null,
                source_url: data.source_url || null,
                published_at: data.published_at ? new Date(data.published_at).toISOString() : null,
                metadata: metadataPayload,
            };

            if (data.hero_image) {
                payload.hero_image = data.hero_image;
            }

            if (isEditing && story) {
                payload._method = 'put';
            }

            return payload;
        });

        const submitOptions = { preserveScroll: true, forceFormData: true } as const;

        if (isEditing && story) {
            form.post(route('admin.stories.update', story.id), submitOptions);
        } else {
            form.post(route('admin.stories.store'), submitOptions);
        }
    };

    const galleryError = form.errors.gallery ?? form.errors['gallery.0'];

    return (
        <>
            <Head title={title} />
            <AdminLayout
                title="Berita & Cerita"
                subtitle="Tulis blog, update komunitas, atau galeri visual Waduk Manduk."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Berita & Cerita', href: route('admin.stories.index') },
                    { label: title, href: null },
                ]}
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.stories.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali ke daftar
                        </Link>
                    </Button>

                    <PageHeader
                        title={title}
                        subtitle="Moderasi konten sebelum ditayangkan agar selaras dengan nilai ekowisata."
                    />

                    <form className="mt-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                        <FormSection
                            title="Informasi utama"
                            description="Judul cerita, jenis konten, dan status publikasi."
                        >
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Judul</Label>
                                    <Input
                                        id="title"
                                        value={form.data.title}
                                        onChange={(event) => form.setData('title', event.target.value)}
                                        required
                                    />
                                    {form.errors.title && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.title}</p>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={form.data.slug}
                                            onChange={(event) => form.setData('slug', event.target.value)}
                                            placeholder="slug-cerita"
                                        />
                                        {form.errors.slug && (
                                            <p className="mt-1 text-xs text-red-500">{form.errors.slug}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="type">Jenis konten</Label>
                                        <Select
                                            value={form.data.type}
                                            onValueChange={(value) => form.setData('type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {options.types.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={form.data.status}
                                            onValueChange={(value) => form.setData('status', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
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
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Konten cerita"
                            description="Ringkasan dan isi konten utama."
                        >
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        rows={3}
                                        value={form.data.excerpt}
                                        onChange={(event) => form.setData('excerpt', event.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="body">Isi cerita</Label>
                                    <Textarea
                                        id="body"
                                        rows={8}
                                        value={form.data.body}
                                        onChange={(event) => form.setData('body', event.target.value)}
                                        placeholder="Gunakan format markdown untuk heading, list, dll."
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Media"
                            description="Unggah gambar hero dan galeri pendukung."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="hero_image">Gambar hero</Label>
                                    <Input
                                        id="hero_image"
                                        name="hero_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleHeroChange}
                                    />
                                    {form.errors.hero_image && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.hero_image}</p>
                                    )}
                                    {heroPreview && (
                                        <img
                                            src={heroPreview}
                                            alt="Preview hero"
                                            className="mt-3 h-40 w-full rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="gallery">Galeri</Label>
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
                        </FormSection>

                        <FormSection
                            title="Metadata & publikasi"
                            description="Tag, sumber, jadwal terbit, serta metadata tambahan."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
                                    <Input
                                        id="tags"
                                        value={form.data.tags}
                                        onChange={(event) => form.setData('tags', event.target.value)}
                                        placeholder="ekowisata, fauna, komunitas"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="published_at">Tanggal publikasi</Label>
                                    <Input
                                        id="published_at"
                                        type="datetime-local"
                                        value={form.data.published_at}
                                        onChange={(event) => form.setData('published_at', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="source_name">Sumber</Label>
                                    <Input
                                        id="source_name"
                                        value={form.data.source_name}
                                        onChange={(event) => form.setData('source_name', event.target.value)}
                                        placeholder="Nama narasumber / kontributor"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="source_url">URL sumber</Label>
                                    <Input
                                        id="source_url"
                                        value={form.data.source_url}
                                        onChange={(event) => form.setData('source_url', event.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="metadata">Metadata (JSON opsional)</Label>
                                <Textarea
                                    id="metadata"
                                    rows={4}
                                    value={form.data.metadata}
                                    onChange={(event) => form.setData('metadata', event.target.value)}
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
