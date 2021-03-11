<?php

namespace App\Http\Middleware;

use App\Models\Users\Device;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthKey
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!$request->hasHeader('Authorization')) {
            return new JsonResponse([
                'status' => 'error',
                'code' => 403,
                'message' => 'Invalid token'
            ], 403);
        }

        $token = $request->header('Authorization');

        /** @noinspection PhpUndefinedMethodInspection */
        $device = Device::where('access_token', $token)->orderBy('created_at', 'desc')->first();

        if (!$device) {
            return new JsonResponse([
                'status' => 'error',
                'code' => 403,
                'message' => 'Invalid token'
            ], 403);
        }

        Auth::login($device->user, true);

        return $next($request);
    }
}
