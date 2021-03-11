<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Название валюты, напр USD');
            $table->double('buy')->nullable()->default(null)->comment('Стоимость покупки');
            $table->double('sell')->nullable()->default(null)->comment('Стоимость продажи');
            $table->string('symbol')->nullable()->default(null)->comment('Символ валюты');
            $table->date('date')->comment('Дата получения');
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
        Schema::dropIfExists('rates');
    }
}
