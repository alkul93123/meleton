<?php

namespace App\Models\Users;

use App\Models\User;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Device
 * @package App\Models\Users
 *
 * @property int $id
 * @property int $user_id
 * @property string $access_token
 * @property string $remember_token
 * @property string $device
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class Device extends Model
{
    use HasFactory;

    public const WEB = 'web';

    protected $fillable = ['user_id', 'access_token', 'remember_token', 'device'];

    /**
     * @return BelongsTo
     */
    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
