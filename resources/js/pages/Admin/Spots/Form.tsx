import { FormActions } from '@/components/forms/form-actions';
import { FormSection } from '@/components/forms/form-section';
import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import type { SpotFormData, SpotOptions } from '@/types/admin';
import { storageUrl } from '@/lib/storage';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface SpotFormPageProps {
    spot: SpotFormData | null;
    options: SpotOptions;
}

type SpotFormState = {
    name: string;
    slug: string;
    type: string;
    category: string;
    headline: string;
    description: string;
    tips: string;
    latitude: string;
    longitude: string;
    status: string;
    is_featured: boolean;
    sort_order: number;
    hero_image: File | null;
    gallery: File[];
    existingGallery: string[];
    metadata: string;
};

export default function SpotFormPage({ spot, options }: SpotFormPageProps) {
    const isEditing = Boolean(spot?.id);
    const [metadataError, setMetadataError] = useState<string | null>(null);
    const [heroPreview, setHeroPreview] = useState<string | null>(storageUrl(spot?.hero_image) ?? null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const form = useForm<SpotFormState>({
        name: spot?.name ?? '',
        slug: spot?.slug ?? '',
        type: spot?.type ?? options.types[0]?.value ?? '',
        category: spot?.category ?? '',
        headline: spot?.headline ?? '',
        description: spot?.description ?? '',
        tips: spot?.tips ?? '',
        latitude: spot?.latitude?.toString() ?? '',
        longitude: spot?.longitude?.toString() ?? '',
        status: spot?.status ?? options.status[0]?.value ?? 'draft',
        is_featured: spot?.is_featured ?? false,
        sort_order: spot?.sort_order ?? 0,
        hero_image: null,
        gallery: [],
        existingGallery: spot?.gallery ?? [],
        metadata: spot?.metadata ? JSON.stringify(spot.metadata, null, 2) : '',
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

    const title = useMemo(() => (isEditing ? 'Perbarui Spot' : 'Spot Baru'), [isEditing]);

    const handleHeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        form.setData('hero_image', file);
        setHeroPreview(file ? URL.createObjectURL(file) : storageUrl(spot?.hero_image) ?? null);
    };

    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        form.setData('gallery', files);
        setGalleryPreviews(
            files.map((file) => URL.createObjectURL(file)),
        );
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMetadataError(null);

        let metadataPayload: Record<string, unknown> | null = null;

        if (form.data.metadata.trim().length > 0) {
            try {
                metadataPayload = JSON.parse(form.data.metadata);
            } catch (error) {
                setMetadataError('Format metadata harus JSON yang valid.');
                return;
            }
        }

        form.transform((data) => {
            const payload: Record<string, unknown> = {
                name: data.name,
                slug: data.slug || null,
                type: data.type,
                category: data.category || null,
                headline: data.headline || null,
                description: data.description || null,
                tips: data.tips || null,
                latitude: data.latitude ? Number(data.latitude) : null,
                longitude: data.longitude ? Number(data.longitude) : null,
                status: data.status,
                is_featured: data.is_featured,
                sort_order: data.sort_order,
                metadata: metadataPayload,
                existing_gallery: data.existingGallery,
                gallery: data.gallery,
            };

            if (data.hero_image) {
                payload.hero_image = data.hero_image;
            }

            if (isEditing && spot) {
                payload._method = 'put';
            }

            return payload;
        });

        const submitOptions = { preserveScroll: true, forceFormData: true } as const;

        if (isEditing && spot) {
            form.post(route('admin.spots.update', spot.id), submitOptions);
        } else {
            form.post(route('admin.spots.store'), submitOptions);
        }
    };

    const galleryError = form.errors.gallery ?? form.errors['gallery.0'];

    return (
        <>
            <Head title={title} />
            <AdminLayout
                title="Spot & Peta"
                subtitle="Formulir spot memuat informasi teks, posisi koordinat, serta penanda sorotan."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Spot & Peta', href: route('admin.spots.index') },
                    { label: title, href: null },
                ]}
            >
                <PageContainer className="px-0">
                    <div className="mb-4">
                        <Button variant="ghost" asChild>
                            <Link href={route('admin.spots.index')}>
                                <ArrowLeft className="mr-2 size-4" />
                                Kembali ke daftar
                            </Link>
                        </Button>
                    </div>

                    <PageHeader
                        title={title}
                        subtitle="Pastikan koordinat dan informasi keamanan diisi dengan akurat agar pengunjung mendapatkan panduan yang tepat."
                    />

                    <form className="mt-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                        <FormSection
                            title="Informasi utama"
                            description="Nama spot, ringkasan, dan status publikasi."
                        >
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama spot</Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(event) => form.setData('name', event.target.value)}
                                        required
                                    />
                                    {form.errors.name && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.name}</p>
                                    )}
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="slug">Slug (opsional)</Label>
                                        <Input
                                            id="slug"
                                            value={form.data.slug}
                                            onChange={(event) => form.setData('slug', event.target.value)}
                                            placeholder="slug-spot"
                                        />
                                        {form.errors.slug && (
                                            <p className="mt-1 text-xs text-red-500">{form.errors.slug}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="type">Jenis spot</Label>
                                        <Select
                                            value={form.data.type}
                                            onValueChange={(value) => form.setData('type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih jenis" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {options.types.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {form.errors.type && (
                                            <p className="mt-1 text-xs text-red-500">{form.errors.type}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="category">Kategori</Label>
                                        <Input
                                            id="category"
                                            value={form.data.category}
                                            onChange={(event) => form.setData('category', event.target.value)}
                                            placeholder="Panorama, fasilitas, edukasi..."
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="headline">Headline singkat</Label>
                                        <Input
                                            id="headline"
                                            value={form.data.headline}
                                            onChange={(event) => form.setData('headline', event.target.value)}
                                            placeholder="Deskripsi ringkas"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="description">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        rows={4}
                                        value={form.data.description}
                                        onChange={(event) => form.setData('description', event.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="tips">Tips keamanan & etika</Label>
                                    <Textarea
                                        id="tips"
                                        rows={3}
                                        value={form.data.tips}
                                        onChange={(event) => form.setData('tips', event.target.value)}
                                        placeholder="Contoh: Datang saat pagi, bawa kantong sampah, gunakan sepatu anti slip..."
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Koordinat dan status tampil"
                            description="Lokasi akan ditampilkan pada peta interaktif di halaman publik."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        value={form.data.latitude}
                                        onChange={(event) => form.setData('latitude', event.target.value)}
                                        required
                                    />
                                    {form.errors.latitude && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.latitude}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        value={form.data.longitude}
                                        onChange={(event) => form.setData('longitude', event.target.value)}
                                        required
                                    />
                                    {form.errors.longitude && (
                                        <p className="mt-1 text-xs text-red-500">{form.errors.longitude}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="status">Status publikasi</Label>
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
                                    <Label htmlFor="sort_order">Urutan tampil</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        min={0}
                                        value={form.data.sort_order}
                                        onChange={(event) =>
                                            form.setData('sort_order', Number(event.target.value))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_featured"
                                    checked={form.data.is_featured}
                                    onCheckedChange={(checked) =>
                                        form.setData('is_featured', Boolean(checked))
                                    }
                                />
                                <Label htmlFor="is_featured" className="text-sm">
                                    Tampilkan sebagai sorotan utama di beranda
                                </Label>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Media & metadata"
                            description="Unggah gambar hero dan galeri spot."
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
                            <div>
                                <Label htmlFor="metadata">Metadata (JSON opsional)</Label>
                                <Textarea
                                    id="metadata"
                                    rows={4}
                                    value={form.data.metadata}
                                    onChange={(event) => form.setData('metadata', event.target.value)}
                                    placeholder='contoh: { "icon": "mdi:gate" }'
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
