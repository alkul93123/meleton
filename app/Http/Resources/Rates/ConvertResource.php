<?php

namespace App\Http\Resources\Rates;

use App\Domain\Entities\Auth\Request;
use App\Models\CurrencyQuery;
use Illuminate\Http\Resources\Json\JsonResource;


/**
 * @OA\Schema(schema="ConvertResponseScheme",
 *    @OA\Property(property="currency_from", type="string", example="EUR"),
 *    @OA\Property(property="currency_to", type="string", example="BTC"),
 *    @OA\Property(property="value", type="float", example="478412.64"),
 *    @OA\Property(property="converted_value", type="float", example="10.2"),
 *    @OA\Property(property="rate", type="float", example="46903.23"),
 *    @OA\Property(property="created_at", type="string", example="10.03.2021 23:48", description="Дата в формате d.m.Y H:i")
 * )
 *
 * @property CurrencyQuery $resource
 */
class ConvertResource extends JsonResource
{
    public function __construct($resource)
    {
        self::withoutWrapping();

        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'currency_from' =>  $this->resource->currency_from,
            'currency_to' =>  $this->resource->currency_to,
            'value' => $this->resource->value,
            'converted_value' => (float) $this->resource->converted_value,
            'rate' =>  $this->resource->rate,
            'created_at' => $this->resource->created_at->format('d.m.Y H:i')
        ];
    }
}
