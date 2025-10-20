<?php

namespace App\Http\Requests\Admin\Umkm;

use App\Models\Umkm;

class UmkmUpdateRequest extends UmkmRequest
{
    protected function umkmId(): ?int
    {
        /** @var Umkm|null $umkm */
        $umkm = $this->route('umkm');

        return $umkm?->getKey();
    }
}

