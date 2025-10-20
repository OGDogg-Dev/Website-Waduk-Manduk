<?php

require __DIR__.'/vendor/autoload.php';

$result = Illuminate\Support\Facades\Storage::disk('public')->put('images/test-cli.txt', 'ok');

echo $result ? 'yes' : 'no';

