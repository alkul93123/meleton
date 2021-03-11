<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrencyQueriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('currency_queries', function (Blueprint $table) {
            $table->id();
            $table->string('currency_from')->comment('Валюта из которой конвертируем');
            $table->string('currency_to')->comment('Валюта в которую конвертируем');
            $table->double('value')->comment('Сумма которую конвертируем');
            $table->double('converted_value')->comment('Сконвертированная сумма');
            $table->double('rate')->comment('Ставка');
            $table->double('commission')->comment('Комиссия сервиса');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('currency_queries');
    }
}
