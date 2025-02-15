<?php

// app/Observers/StatusObserver.php
namespace App\Observers;

use App\Models\Status;
use Illuminate\Support\Facades\Log;

class StatusObserver
{
    public function saving(Status $status)
    {
        // is_battled が false -> true になるときのみ処理
        if (!$status->getOriginal('is_battled') && $status->is_battled) {
            $status->gold += 30;
        }
    }
}