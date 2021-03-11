<?php

namespace App\Providers;

use App\Services\Rates\Api\BlockChainApi;
use App\Services\Rates\RateService;
use App\Services\User\UserFacade;
use App\Services\User\UserService;
use Illuminate\Support\ServiceProvider;

class RateServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(RateService::class, function() {
            return new RateService(new BlockChainApi(config('services.rates.blockchain.url')));
        });
    }
}
