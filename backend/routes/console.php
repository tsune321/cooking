<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('missions:reset')->daily();
Schedule::command('battle:reset')->dailyAt('18:00');
Schedule::command('battle:match')->dailyAt('21:00');
Schedule::command('battle:result')->dailyAt('18:00');