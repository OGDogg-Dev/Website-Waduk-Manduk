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
import type { SiteStatusFormData, SiteStatusOptions } from '@/types/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';

interface SiteStatusFormPageProps {
    status: SiteStatusFormData | null;
    options: SiteStatusOptions;
}

type SiteStatusFormState = {
    crowd_level: string;
    weather_summary: string;
    temperature: string;
    wind: string;
    is_raining: boolean;
    advisory: string;
    metrics: string;
    is_current: boolean;
    reported_at: string;
    valid_until: string;
};

const toDateTime = (value: string | null) =>
    value ? new Date(value).toISOString().slice(0, 16) : '';

export default function SiteStatusFormPage({
    status,
    options,
}: SiteStatusFormPageProps) {
    const isEditing = Boolean(status?.id);
    const [metricsError, setMetricsError] = useState<string | null>(null);

    const form = useForm<SiteStatusFormState>({
        crowd_level: status?.crowd_level ?? options.crowdLevels[0]?.value ?? 'normal',
        weather_summary: status?.weather_summary ?? '',
        temperature: status?.temperature ?? '',
        wind: status?.wind ?? '',
        is_raining: status?.is_raining ?? false,
        advisory: status?.advisory ?? '',
        metrics: status?.metrics ? JSON.stringify(status.metrics, null, 2) : '',
        is_current: status?.is_current ?? true,
        reported_at: toDateTime(status?.reported_at ?? null),
        valid_until: toDateTime(status?.valid_until ?? null),
    });

    const title = useMemo(
        () => (isEditing ? 'Perbarui Status Lokasi' : 'Laporan Status Baru'),
        [isEditing],
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMetricsError(null);

        let metricsPayload: Record<string, unknown> | null = null;
        if (form.data.metrics.trim().length > 0) {
            try {
                metricsPayload = JSON.parse(form.data.metrics);
            } catch (error) {
                setMetricsError('Metrics harus berupa JSON yang valid.');
                return;
            }
        }

        const payload: Record<string, unknown> = {
            crowd_level: form.data.crowd_level,
            weather_summary: form.data.weather_summary || null,
            temperature: form.data.temperature || null,
            wind: form.data.wind || null,
            is_raining: form.data.is_raining,
            advisory: form.data.advisory || null,
            metrics: metricsPayload,
            is_current: form.data.is_current,
            reported_at: form.data.reported_at
                ? new Date(form.data.reported_at).toISOString()
                : null,
            valid_until: form.data.valid_until
                ? new Date(form.data.valid_until).toISOString()
                : null,
        };

        form.transform(() => payload);

        if (isEditing && status) {
            form.put(route('admin.site-statuses.update', status.id), {
                preserveScroll: true,
            });
        } else {
            form.post(route('admin.site-statuses.store'), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title={title} />
            <AdminLayout
                title="Status Lokasi"
                subtitle="Informasi ini tampil di beranda sebagai rujukan utama pengunjung."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Status Lokasi', href: route('admin.site-statuses.index') },
                    { label: title, href: null },
                ]}
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.site-statuses.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali ke daftar
                        </Link>
                    </Button>

                    <PageHeader
                        title={title}
                        subtitle="Masukkan ringkasan cuaca, kondisi lapangan, dan catatan keselamatan."
                    />

                    <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                        <FormSection title="Informasi utama" description="Kepadatan lokasi, ringkasan cuaca, dan catatan singkat.">
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label>Tingkat kepadatan</Label>
                                        <Select
                                            value={form.data.crowd_level}
                                            onValueChange={(value) =>
                                                form.setData('crowd_level', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {options.crowdLevels.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Checkbox
                                            id="is_current"
                                            checked={form.data.is_current}
                                            onCheckedChange={(checked) =>
                                                form.setData('is_current', Boolean(checked))
                                            }
                                        />
                                        <Label htmlFor="is_current" className="text-sm">
                                            Jadikan sebagai status aktif
                                        </Label>
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="weather_summary">
                                            Ringkasan cuaca
                                        </Label>
                                        <Input
                                            id="weather_summary"
                                            value={form.data.weather_summary}
                                            onChange={(event) =>
                                                form.setData(
                                                    'weather_summary',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Cerah berawan, angin sepoi, dsb."
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="temperature">Suhu</Label>
                                        <Input
                                            id="temperature"
                                            value={form.data.temperature}
                                            onChange={(event) =>
                                                form.setData('temperature', event.target.value)
                                            }
                                            placeholder="27°C"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="wind">Kondisi angin</Label>
                                        <Input
                                            id="wind"
                                            value={form.data.wind}
                                            onChange={(event) =>
                                                form.setData('wind', event.target.value)
                                            }
                                            placeholder="Angin sepoi-sepoi"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 pt-6">
                                        <Checkbox
                                            id="is_raining"
                                            checked={form.data.is_raining}
                                            onCheckedChange={(checked) =>
                                                form.setData('is_raining', Boolean(checked))
                                            }
                                        />
                                        <Label htmlFor="is_raining" className="text-sm">
                                            Sedang hujan
                                        </Label>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="advisory">Catatan keselamatan</Label>
                                    <Textarea
                                        id="advisory"
                                        rows={3}
                                        value={form.data.advisory}
                                        onChange={(event) =>
                                            form.setData('advisory', event.target.value)
                                        }
                                        placeholder="Larangan atau imbauan untuk pengunjung..."
                                    />
                                </div>
                            </div>
                        </FormSection>

                        <FormSection title="Waktu & data tambahan" description="Berikan rentang validitas laporan dan data metrik tambahan bila tersedia.">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="reported_at">Dilaporkan pada</Label>
                                    <Input
                                        id="reported_at"
                                        type="datetime-local"
                                        value={form.data.reported_at}
                                        onChange={(event) =>
                                            form.setData('reported_at', event.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="valid_until">Berlaku hingga</Label>
                                    <Input
                                        id="valid_until"
                                        type="datetime-local"
                                        value={form.data.valid_until}
                                        onChange={(event) =>
                                            form.setData('valid_until', event.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Metrics tambahan (JSON opsional)</Label>
                                <Textarea
                                    rows={4}
                                    value={form.data.metrics}
                                    onChange={(event) =>
                                        form.setData('metrics', event.target.value)
                                    }
                                    placeholder='contoh: { "water_level": "Stabil" }'
                                />
                                {metricsError && (
                                    <p className="mt-1 text-xs text-red-500">{metricsError}</p>
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
