<?php


namespace App\Services\Rates\Api;


use App\Services\Rates\Dtos\RateDto;
use App\Services\Rates\Interfaces\ApiInterface;

class BlockChainApi implements ApiInterface
{
    protected string $url;

    public function __construct(string $url)
    {
        $this->url = $url;
    }

    /**
     * @return RateDto[]
     */
    public function getRates() : array
    {
        $rates = collect(json_decode(file_get_contents($this->url)));

        return $rates->map( fn($rate, $key) => new RateDto($key, $rate->buy, $rate->sell, $rate->symbol) )->toArray();
    }
}
