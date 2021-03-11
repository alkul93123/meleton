<?php

namespace App\Models;

use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CurrencyQuery
 * @package App\Models
 *
 * @property string $currency_from
 * @property string $currency_to
 * @property float $value
 * @property float $converted_value
 * @property float $commission
 * @property float $rate
 * @property DateTime $created_at
 * @property DateTime $updated_at
 */
class CurrencyQuery extends Model
{
    use HasFactory;

    protected $fillable = ['currency_from', 'currency_to', 'value', 'converted_value', 'rate', 'commission'];

    protected $dates = ['created_at', 'updated_at'];
}
