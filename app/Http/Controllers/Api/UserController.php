<?php

namespace App\Http\Controllers\Api\Admin;


use App\Http\Resources\Users\Admin\CurrentResource;
use Illuminate\Support\Facades\Auth;

class UserController
{
    public function current() : CurrentResource
    {
        return new CurrentResource(Auth::user());
    }
}
