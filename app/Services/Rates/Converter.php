<?php


namespace App\Services\Rates;


use App\Services\Rates\Dtos\ConvertResult;
use App\Services\Rates\Exceptions\ConverterException;

class Converter
{
    public const TO_BTC = 'to_btc';
    public const FROM_BTC = 'from_btc';

    protected ?float $value = null;
    protected ?float $rate = null;
    protected ?float $commission = null;

    public function setValue(float $value) : Converter
    {
        $this->value = $value;
        return $this;
    }

    public function setRate(float $rate) : Converter
    {
        $this->rate = $rate;
        return $this;
    }

    public function setCommission(float $commission) : Converter
    {
        $this->commission = $commission;
        return $this;
    }

    /**
     * @param string $type
     * @return ConvertResult
     * @throws ConverterException
     */
    public function convert(string $type = self::TO_BTC) : ConvertResult
    {
        if (is_null($this->commission) || is_null($this->rate) || is_null($this->value)) {
            throw new ConverterException('Commission, rate and value must by set!');
        }

        switch ($type) {
            case self::TO_BTC:
                $raw = round($this->value / $this->rate);
                break;
            case self::FROM_BTC:
                $raw = round($this->value * $this->rate);
                break;
            default:
                throw new ConverterException("Unexpected convert type.");
        }

        $commission = $raw / 100 * $this->commission;

        return new ConvertResult(round($raw + $commission, 2), round($commission, 2));
    }
}
