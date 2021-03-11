<?php

namespace App\Http\Controllers;

use App\Http\Requests\Rates\ConvertRequest;
use App\Http\Resources\Rates\ConvertResource;
use App\Http\Resources\Rates\IndexResource;
use App\Models\CurrencyQuery;
use App\Models\Rate;
use App\Services\Rates\Exceptions\ConverterException;
use App\Services\Rates\RateService;
use DateTime;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Spatie\QueryBuilder\QueryBuilder;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index() : AnonymousResourceCollection
    {
        $rates = QueryBuilder::for(Rate::class)
            ->defaultSort('buy')
            ->allowedFilters('name')
            ->where('date', (new DateTime)->format('Y-m-d'))
            ->get();

        return IndexResource::collection($rates);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ConvertRequest $request
     * @param RateService $service
     * @return ConvertResource
     */
    public function convert(ConvertRequest $request, RateService $service) : ConvertResource
    {
        try {
            $currencyQuery = new CurrencyQuery([
                'currency_from' => $request->currency_from,
                'currency_to' => $request->currency_to,
                'value' => $request->value,
            ]);

            if (mb_strtoupper($request->currency_from) === Rate::BTC) {
                /** @var Rate $rate */
                $rate = Rate::firstWhere('name', $request->currency_to);

                $result = $service->convertFromBTC($request->value, $rate->buy);
                $currencyQuery->rate = $rate->buy;
            }

            if (mb_strtoupper($request->currency_to) === Rate::BTC) {
                /** @var Rate $rate */
                $rate = Rate::firstWhere('name', $request->currency_from);

                $result = $service->convertToBTC($request->value, $rate->sell);
                $currencyQuery->rate = $rate->sell;
            }

            $currencyQuery->converted_value = $result->value;
            $currencyQuery->commission = $result->commission;
            $currencyQuery->save();

            return new ConvertResource($currencyQuery);
        } catch (ConverterException $e) {
            throw new HttpException('422', $e->getMessage());
        } catch (Throwable $t) {
            throw new HttpException(500);
        }
    }
}
