<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RateController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * @OA\OpenApi(
 *   @OA\Info(
 *     version="1.0",
 *     title="Meleton"
 *   )
 * )
 */

Route::group([], function () {

    Route::group(['prefix' => 'v1'], function () {

        /**
         * @OA\Post(
         *   path="/api/v1/auth",
         *   operationId="auth",
         *   description="Авторизация",
         *   tags={"Api"},
         *   @OA\RequestBody(
         *      @OA\JsonContent(ref="#/components/schemas/AuthenticateRequest")
         *   ),
         *   @OA\Response( response=200, description="OK", @OA\JsonContent(ref="#/components/schemas/AuthResponseScheme") ),
         *   @OA\Response( response=422, description="Ошибки ввода" ),
         *   @OA\Response( response=429, description="Слишком частые запросы" ),
         * )
         */
        Route::post('auth', [ AuthController::class, 'auth' ]);

        /**
         * @OA\Get(
         *   path="/api/v1/rates",
         *   operationId="rates",
         *   description="Список курсов валют",
         *   tags={"Api"},
         *   @OA\Parameter( name="Authorization", description="Токен авторизации", in="header", @OA\Schema(type="string") ),
         *   @OA\Parameter(
         *     name="filter",
         *     description="Фильтры",
         *     in="path",
         *     @OA\Schema(type="array", @OA\Items( @OA\Property(property="name", type="string", example="EUR") ))
         *   ),
         *   @OA\Response( response=200, description="OK", @OA\JsonContent(ref="#/components/schemas/ConvertResponseScheme") ),
         *   @OA\Response( response=403, description="Ошибка доступа" ),
         *   @OA\Response( response=422, description="Ошибки ввода" ),
         *   @OA\Response( response=429, description="Слишком частые запросы" ),
         * )
         */
        Route::get('rates', [ RateController::class, 'index' ])->middleware('auth-key');

        /**
         * @OA\Post(
         *   path="/api/v1/convert",
         *   operationId="convert",
         *   description="Конвертация списков валют",
         *   tags={"Api"},
         *   @OA\Parameter( name="Authorization", description="Токен авторизации", in="header", @OA\Schema(type="string") ),
         *   @OA\RequestBody(
         *      @OA\JsonContent(ref="#/components/schemas/ConvertRequest")
         *   ),
         *   @OA\Response( response=200, description="OK", @OA\JsonContent(ref="#/components/schemas/RatesResponseScheme") ),
         *   @OA\Response( response=403, description="Ошибка доступа" ),
         *   @OA\Response( response=422, description="Ошибки ввода" ),
         *   @OA\Response( response=429, description="Слишком частые запросы" ),
         * )
         */
        Route::post('convert', [ RateController::class, 'convert' ])->middleware('auth-key');
    });



});
