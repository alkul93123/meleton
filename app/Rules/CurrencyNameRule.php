<?php

namespace App\Rules;

use App\Models\Rate;
use Illuminate\Contracts\Validation\Rule;

class CurrencyNameRule implements Rule
{
    public const DEFAULT_NAME = 'BTC';

    protected string $from;
    protected string $to;

    protected string $message = 'The validation error message.';

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($from, $to)
    {
        $this->from = $from;
        $this->to = $to;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (mb_strtoupper($this->from) === self::DEFAULT_NAME) {
            $this->message = "Currency value 'to' not found.";

            return Rate::where('name', mb_strtoupper($this->to))->exists();
        }

        if (mb_strtoupper($this->to) === self::DEFAULT_NAME) {
            $this->message = "Currency value 'from' not found.";

            return Rate::where('name', mb_strtoupper($this->from))->exists();
        }


    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
