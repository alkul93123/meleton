<?php


namespace App\Services\Rates;


use App\Services\Rates\Dtos\ConvertResult;
use App\Services\Rates\Dtos\RateDto;
use App\Services\Rates\Interfaces\ApiInterface;

class RateService
{
    public ApiInterface $api;
    public float $commission;
    public Converter $converter;

    public function __construct(ApiInterface $api)
    {
        $this->api = $api;
        $this->commission = config('services.rates.commission');
        $this->converter = new Converter();
    }

    public function setConverter(Converter $converter) : RateService
    {
        $this->converter = $converter;
        return $this;
    }

    /**
     * @return RateDto[]
     */
    public function getRates() : array
    {
        return $this->api->getRates();
    }

    /**
     * @param float $value
     * @param float $rate
     * @return ConvertResult
     * @throws Exceptions\ConverterException
     */
    public function convertFromBTC(float $value, float $rate) : ConvertResult
    {
        return $this->converter->setValue($value)->setRate($rate)->setCommission($this->commission)
            ->convert(Converter::FROM_BTC);
    }

    /**
     * @param float $value
     * @param float $rate
     * @return ConvertResult
     * @throws Exceptions\ConverterException
     */
    public function convertToBTC(float $value, float $rate) : ConvertResult
    {
        return $this->converter->setValue($value)->setRate($rate)->setCommission($this->commission)
            ->convert(Converter::TO_BTC);
    }
}
