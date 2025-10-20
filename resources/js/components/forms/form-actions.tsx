import { Button } from '@/components/ui/button';

interface FormActionsProps {
    isEditing?: boolean;
    processing?: boolean;
    onCancel?: () => void;
}

export function FormActions({
    isEditing = false,
    processing = false,
    onCancel,
}: FormActionsProps) {
    return (
        <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
            {onCancel && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Batal
                </Button>
            )}
            <Button type="submit" disabled={processing}>
                {processing
                    ? 'Menyimpan...'
                    : isEditing
                      ? 'Perbarui'
                      : 'Simpan'}
            </Button>
        </div>
    );
}

