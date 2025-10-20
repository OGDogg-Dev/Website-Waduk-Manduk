<?php

use App\Models\Event;

require __DIR__.'/vendor/autoload.php';

$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$event = Event::query()->latest('id')->first();
if (! $event) {
    echo "no events\n";
    exit(0);
}

var_export($event->only(['id','title','cover_image','gallery']));
