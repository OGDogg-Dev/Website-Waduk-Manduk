<?php

use Illuminate\Support\Facades\Storage;

require __DIR__.'/vendor/autoload.php';

/** @var Illuminate\Foundation\Application $app */
$app = require __DIR__.'/bootstrap/app.php';

/** @var Illuminate\Contracts\Console\Kernel $kernel */
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$result = Storage::disk('public')->put('images/test-cli.txt', 'ok');
echo $result ? 'yes' : 'no';
