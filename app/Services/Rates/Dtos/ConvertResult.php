<?php


namespace App\Services\Rates\Dtos;


class ConvertResult
{
    public string $value;
    public string $commission;

    public function __construct(string $value, string $commission)
    {
        $this->value = $value;
        $this->commission = $commission;
    }
}
