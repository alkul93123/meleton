<?php

namespace App\Console\Commands;

use App\Models\Rate;
use App\Services\Rates\RateService;
use DateTime;
use Illuminate\Console\Command;

class ParseRates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parse:rates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @param RateService $service
     * @return void
     */
    public function handle(RateService $service)
    {
        $rates = $service->getRates();

        foreach ($rates as $rate) {
            /** @noinspection PhpUndefinedMethodInspection */
            $dbRate = Rate::where(['name' => $rate->key, 'date' => (new DateTime)->format('Y-m-d')])->first();

            if (!$dbRate) {
                $dbRate = new Rate(['name' => $rate->key, 'date' => (new DateTime)->format('Y-m-d')]);
            }

            $dbRate->fill($rate->toArray());
            $dbRate->save();

            $this->info("Валюта {$dbRate->name} успешно обновлена.");
        }
    }
}
