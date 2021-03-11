<?php

namespace App\Http\Requests\Rates;

use App\Http\Requests\AsyncRequest;
use App\Rules\CurrencyNameRule;

/**
 * @OA\Schema(schema="ConvertRequest",
 *  @OA\Property(property="currency_from", type="string", example="EUR"),
 *  @OA\Property(property="currency_to", type="string", example="BTC"),
 *  @OA\Property(property="478412.64", type="float", example="478412.64")
 * )
 *
 * @property string $currency_from
 * @property string $currency_to
 * @property string $value
 */
class ConvertRequest extends AsyncRequest
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
            'currency_from' => ['required', 'string', new CurrencyNameRule($this->currency_from, $this->currency_to)],
            'currency_to' => ['required', 'string', new CurrencyNameRule($this->currency_from, $this->currency_to)],
            'value' => ['numeric']
        ];
    }
}
