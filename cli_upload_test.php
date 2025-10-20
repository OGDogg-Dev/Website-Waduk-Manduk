<?php

use App\Services\MediaUploader;
use Illuminate\Http\UploadedFile;

require __DIR__.'/vendor/autoload.php';

$app = require __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$file = new UploadedFile(__DIR__.'/tmp/test.jpg', 'test.jpg', 'image/jpeg', null, true);

$path = MediaUploader::store($file, 'images/spots/hero');

var_dump($path);
