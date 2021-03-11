<?php

namespace App\Models;

use App\Models\Users\Device;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 *
 * @property int $id
 * @property string $name
 * @property string $password
 * @property string $phone
 * @property string $email
 *
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @param string $device
     * @throws Exception
     */
    public function makeAccessToken(string $device = Device::WEB) : void
    {
        $device = new Device([
            'user_id' => $this->id,
            'access_token' => "Bearer " . bin2hex(random_bytes(64)),
            'remember_token' => bin2hex(random_bytes(64)),
            'device' => $device,
        ]);

        $device->save();
    }

    public function getAccessToken() : string
    {
        /** @noinspection PhpUndefinedMethodInspection */
        $device = Device::where('user_id', $this->id)->select('access_token')->orderBy('created_at', 'desc')->first();

        return $device->access_token;
    }
}
