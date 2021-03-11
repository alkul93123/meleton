<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Auth\AuthRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController
{
    /**
     * @OA\Schema(schema="AuthResponseScheme",
     *    @OA\Property(property="access_token", type="string"),
     *    @OA\Property(property="message", type="string", example="Auth successfully"),
     * )
     *
     * @param AuthRequest $request
     * @return JsonResponse
     */
    public function auth(AuthRequest $request) : JsonResponse
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $user = User::where('email', $request->login)->first();

        if (Hash::check($request->password, $user->password)) {

            $user->makeAccessToken();

            return new JsonResponse([
                'access_token' => $user->getAccessToken(),
                'message' => 'Auth successfully',
            ]);
        }

        return new JsonResponse(['message' => 'Invalid username/password supplied.'], 422);
    }
}
