<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\AsyncRequest;

/**
 * @OA\Schema(schema="AuthenticateRequest",
 *  @OA\Property(property="login", type="string", example="admin@admin.ru"),
 *  @OA\Property(property="password", type="string", example="12345"),
 * )
 *
 * @property string $login
 * @property string $password
 */
class AuthRequest extends AsyncRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'login' => 'string|required|max:255|exists:users,email',
            'password' => 'string|required|max:255',
        ];
    }
}
