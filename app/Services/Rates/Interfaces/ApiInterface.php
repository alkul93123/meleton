<?php


namespace App\Services\Rates\Interfaces;


use App\Services\Rates\Dtos\RateDto;

interface ApiInterface
{
    /**
     * @return RateDto[]
     */
    public function getRates() : array;
}
