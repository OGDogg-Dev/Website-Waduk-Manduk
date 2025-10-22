<?php

namespace App\Domain\Shared\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait HasSlugFromTitle
{
    protected static function bootHasSlugFromTitle(): void
    {
        static::saving(function (Model $model): void {
            if (! $model->offsetExists('title')) {
                return;
            }

            if (! $model->offsetExists('slug')) {
                return;
            }

            $titleChanged = $model->isDirty('title');
            $slugChanged = $model->isDirty('slug');

            if (! $model->slug || ($titleChanged && ! $slugChanged)) {
                $model->slug = Str::slug($model->title);
            }
        });
    }
}
