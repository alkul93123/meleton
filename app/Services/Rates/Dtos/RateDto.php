<?php


namespace App\Services\Rates\Dtos;

class RateDto
{
    public string $key;
    public float $buy;
    public float $sell;
    public string $symbol;

    public function __construct(string $key, float $buy, float $sell, string $symbol)
    {
        $this->key = $key;
        $this->buy = $buy;
        $this->sell = $sell;
        $this->symbol = $symbol;
    }

    public function toArray() : array
    {
        return [
            'name' => $this->key,
            'buy' => $this->buy,
            'sell' => $this->sell,
            'symbol' => $this->symbol
        ];
    }
}
