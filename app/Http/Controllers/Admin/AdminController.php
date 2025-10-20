<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\ResponseFactory;

abstract class AdminController extends Controller
{
    protected function inertia(): ResponseFactory
    {
        /** @var \Inertia\ResponseFactory $factory */
        $factory = app(ResponseFactory::class);

        return $factory;
    }
}

