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
import { storageUrl } from '@/lib/storage';
import type { UmkmFormData, UmkmOptions } from '@/types/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface UmkmFormPageProps {
    umkm: UmkmFormData | null;
    options: UmkmOptions;
}

type ProductForm = { name: string; price: string };

type UmkmFormState = {
    name: string;
    slug: string;
    owner_name: string;
    category: string;
    tagline: string;
    description: string;
    whatsapp_number: string;
    maps_url: string;
    instagram_url: string;
    facebook_url: string;
    status: string;
    is_featured: boolean;
    opening_weekday: string;
    opening_weekend: string;
    products: ProductForm[];
    address: string;
    hero_image: File | null;
    gallery: File[];
    existingGallery: string[];
    metadata: string;
};

export default function UmkmFormPage({ umkm, options }: UmkmFormPageProps) {
    const isEditing = Boolean(umkm?.id);
    const [metadataError, setMetadataError] = useState<string | null>(null);
    const [heroPreview, setHeroPreview] = useState<string | null>(storageUrl(umkm?.hero_image) ?? null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    const form = useForm<UmkmFormState>({
        name: umkm?.name ?? '',
        slug: umkm?.slug ?? '',
        owner_name: umkm?.owner_name ?? '',
        category: umkm?.category ?? '',
        tagline: umkm?.tagline ?? '',
        description: umkm?.description ?? '',
        whatsapp_number: umkm?.whatsapp_number ?? '',
        maps_url: umkm?.maps_url ?? '',
        instagram_url: umkm?.instagram_url ?? '',
        facebook_url: umkm?.facebook_url ?? '',
        status: umkm?.status ?? options.status[0]?.value ?? 'draft',
        is_featured: umkm?.is_featured ?? false,
        opening_weekday: umkm?.opening_hours?.weekday ?? '',
        opening_weekend: umkm?.opening_hours?.weekend ?? '',
        products:
            umkm?.products?.map((product) => ({
                name: product.name,
                price: product.price ?? '',
            })) ?? [{ name: '', price: '' }],
        address: umkm?.address ?? '',
        hero_image: null,
        gallery: [],
        existingGallery: umkm?.gallery ?? [],
        metadata: umkm?.metadata ? JSON.stringify(umkm.metadata, null, 2) : '',
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

    const title = useMemo(() => (isEditing ? 'Perbarui UMKM' : 'UMKM Baru'), [isEditing]);

    const handleHeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        form.setData('hero_image', file);
        setHeroPreview(file ? URL.createObjectURL(file) : storageUrl(umkm?.hero_image) ?? null);
    };

    const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        form.setData('gallery', files);
        setGalleryPreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const addProduct = () => {
        form.setData('products', [...form.data.products, { name: '', price: '' }]);
    };

    const updateProduct = (index: number, field: keyof ProductForm, value: string) => {
        const next = [...form.data.products];
        next[index] = { ...next[index], [field]: value };
        form.setData('products', next);
    };

    const removeProduct = (index: number) => {
        const next = form.data.products.filter((_, idx) => idx !== index);
        form.setData('products', next.length ? next : [{ name: '', price: '' }]);
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
                setMetadataError('Metadata harus berupa JSON yang valid.');
                return;
            }
        }

        const openingHours: Record<string, string> = {};
        if (form.data.opening_weekday.trim()) {
            openingHours.weekday = form.data.opening_weekday.trim();
        }
        if (form.data.opening_weekend.trim()) {
            openingHours.weekend = form.data.opening_weekend.trim();
        }

        const productsPayload = form.data.products
            .filter((product) => product.name.trim().length > 0)
            .map((product) => ({
                name: product.name.trim(),
                price: product.price.trim() || undefined,
            }));

        form.transform((data) => {
            const payload: Record<string, unknown> = {
                name: data.name,
                slug: data.slug || null,
                owner_name: data.owner_name || null,
                category: data.category || null,
                tagline: data.tagline || null,
                description: data.description || null,
                whatsapp_number: data.whatsapp_number || null,
                maps_url: data.maps_url || null,
                instagram_url: data.instagram_url || null,
                facebook_url: data.facebook_url || null,
                status: data.status,
                is_featured: data.is_featured,
                opening_hours: openingHours,
                products: productsPayload,
                address: data.address || null,
                metadata: metadataPayload,
                existing_gallery: data.existingGallery,
                gallery: data.gallery,
            };

            if (data.hero_image) {
                payload.hero_image = data.hero_image;
            }

            if (isEditing && umkm) {
                payload._method = 'put';
            }

            return payload;
        });

        const submitOptions = { preserveScroll: true, forceFormData: true } as const;

        if (isEditing && umkm) {
            form.post(route('admin.umkm.update', umkm.id), submitOptions);
        } else {
            form.post(route('admin.umkm.store'), submitOptions);
        }
    };

    const galleryError = form.errors.gallery ?? form.errors['gallery.0'];

    return (
        <>
            <Head title={title} />
            <AdminLayout
                title="UMKM & Kuliner"
                subtitle="Kelola data UMKM mitra untuk mendukung ekonomi lokal."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'UMKM & Kuliner', href: route('admin.umkm.index') },
                    { label: title, href: null },
                ]}
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.umkm.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali ke daftar
                        </Link>
                    </Button>

                    <PageHeader
                        title={title}
                        subtitle="Lengkapi informasi kontak dan jam operasional agar pengunjung dapat berinteraksi langsung dengan pelaku UMKM."
                    />

                    <form className="mt-6 space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                        <FormSection
                            title="Informasi dasar"
                            description="Nama UMKM, pemilik, dan ringkasan singkat."
                        >
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama UMKM</Label>
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
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={form.data.slug}
                                            onChange={(event) => form.setData('slug', event.target.value)}
                                            placeholder="slug-umkm"
                                        />
                                        {form.errors.slug && (
                                            <p className="mt-1 text-xs text-red-500">{form.errors.slug}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="owner_name">Nama pemilik</Label>
                                        <Input
                                            id="owner_name"
                                            value={form.data.owner_name}
                                            onChange={(event) => form.setData('owner_name', event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="category">Kategori</Label>
                                        <Input
                                            id="category"
                                            value={form.data.category}
                                            onChange={(event) => form.setData('category', event.target.value)}
                                            placeholder="Kuliner, kerajinan..."
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="tagline">Tagline</Label>
                                        <Input
                                            id="tagline"
                                            value={form.data.tagline}
                                            onChange={(event) => form.setData('tagline', event.target.value)}
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
                            </div>
                        </FormSection>

                        <FormSection
                            title="Kontak & kehadiran digital"
                            description="Informasi yang memudahkan pengunjung menghubungi UMKM."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="whatsapp_number">Nomor WhatsApp</Label>
                                    <Input
                                        id="whatsapp_number"
                                        value={form.data.whatsapp_number}
                                        onChange={(event) => form.setData('whatsapp_number', event.target.value)}
                                        placeholder="628xxxx"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="maps_url">Tautan Google Maps</Label>
                                    <Input
                                        id="maps_url"
                                        value={form.data.maps_url}
                                        onChange={(event) => form.setData('maps_url', event.target.value)}
                                        placeholder="https://maps.google.com/..."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="instagram_url">Instagram</Label>
                                    <Input
                                        id="instagram_url"
                                        value={form.data.instagram_url}
                                        onChange={(event) => form.setData('instagram_url', event.target.value)}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="facebook_url">Facebook</Label>
                                    <Input
                                        id="facebook_url"
                                        value={form.data.facebook_url}
                                        onChange={(event) => form.setData('facebook_url', event.target.value)}
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Status & jam operasional"
                            description="Atur status tampil dan sorotan UMKM."
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="status">Status</Label>
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
                                <div className="flex items-center gap-2 pt-6">
                                    <Checkbox
                                        id="is_featured"
                                        checked={form.data.is_featured}
                                        onCheckedChange={(checked) =>
                                            form.setData('is_featured', Boolean(checked))
                                        }
                                    />
                                    <Label htmlFor="is_featured" className="text-sm">
                                        Tampilkan sebagai sorotan di beranda
                                    </Label>
                                </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="opening_weekday">Jam operasional (hari kerja)</Label>
                                    <Input
                                        id="opening_weekday"
                                        value={form.data.opening_weekday}
                                        onChange={(event) => form.setData('opening_weekday', event.target.value)}
                                        placeholder="07:00-17:00"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="opening_weekend">Jam operasional (akhir pekan)</Label>
                                    <Input
                                        id="opening_weekend"
                                        value={form.data.opening_weekend}
                                        onChange={(event) => form.setData('opening_weekend', event.target.value)}
                                        placeholder="06:00-18:00"
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Produk unggulan"
                            description="Tambahkan produk utama beserta harga."
                        >
                            <div className="space-y-4">
                                {form.data.products.map((product, index) => (
                                    <div
                                        key={`product-${index}`}
                                        className="grid gap-4 rounded-lg border border-border/60 p-4 md:grid-cols-[1fr_200px_auto]"
                                    >
                                        <div>
                                            <Label htmlFor={`product-name-${index}`}>Nama produk</Label>
                                            <Input
                                                id={`product-name-${index}`}
                                                value={product.name}
                                                onChange={(event) => updateProduct(index, 'name', event.target.value)}
                                                placeholder="Contoh: Nasi Pecel Manduk"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`product-price-${index}`}>Harga</Label>
                                            <Input
                                                id={`product-price-${index}`}
                                                value={product.price}
                                                onChange={(event) => updateProduct(index, 'price', event.target.value)}
                                                placeholder="Rp15.000"
                                            />
                                        </div>
                                        <div className="flex items-end justify-end">
                                            <Button type="button" variant="ghost" onClick={() => removeProduct(index)}>
                                                <Trash2 className="mr-2 size-4" />
                                                Hapus
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="secondary" onClick={addProduct}>
                                    <Plus className="mr-2 size-4" />
                                    Tambah produk
                                </Button>
                            </div>
                        </FormSection>

                        <FormSection
                            title="Media & metadata"
                            description="Unggah foto UMKM dan galeri pendukung."
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
                                <Label htmlFor="address">Alamat</Label>
                                <Textarea
                                    id="address"
                                    rows={2}
                                    value={form.data.address}
                                    onChange={(event) => form.setData('address', event.target.value)}
                                />
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
