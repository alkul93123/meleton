<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Rate
 * @package App\Models
 *
 * @property string $name
 * @property float $buy
 * @property float $sell
 * @property string $symbol
 * @property string $date
 */
class Rate extends Model
{
    use HasFactory;

    public const BTC = 'BTC';

    protected $fillable = ['name', 'buy', 'sell', 'symbol', 'date'];

    protected $dates = ['created_at', 'updated_at', 'date'];
}
