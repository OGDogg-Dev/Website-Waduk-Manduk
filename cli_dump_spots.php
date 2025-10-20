<?php

use App\Models\Spot;

require __DIR__.'/vendor/autoload.php';

$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$spot = Spot::query()->latest('id')->first();
if (! $spot) {
    echo "no spots\n";
    exit(0);
}

var_export($spot->only(['id','name','hero_image','gallery']));
