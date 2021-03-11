<?php

namespace App\Http\Resources\Rates;

use App\Models\Rate;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(schema="RatesResponseScheme",
 *    @OA\Property(property="name", type="string", example="EUR"),
 *    @OA\Property(property="buy", type="float", example="46691.71"),
 *    @OA\Property(property="sell", type="float", example="46691.71"),
 *    @OA\Property(property="symbol", type="string", example="€")
 * )
 *
 * @property Rate $resource
 */
class IndexResource extends JsonResource
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
            'name' => $this->resource->name,
            'buy' => $this->resource->buy,
            'sell'=> $this->resource->sell,
            'symbol'=> $this->resource->symbol,
        ];
    }
}
