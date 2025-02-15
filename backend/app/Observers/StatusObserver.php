<?php

// app/Observers/StatusObserver.php
namespace App\Observers;

use App\Models\Status;
use App\Models\Mission;
class StatusObserver
{
    public function saving(Status $status)
    {
        // is_battled が false -> true になるときのみ処理
        if (!$status->getOriginal('is_battled') && $status->is_battled) {
            // ゴールドの増加処理
            $status->gold += 30;

            // mission_id が 2 のレコードを取得して is_completed を true に更新
            $mission = Mission::where('mission_id', 4)->first();

            if ($mission) {
                $mission->is_completed = true;
                $mission->save();
            }
        }
        // is_battled が true -> false になるときのみ処理
        if ($status->getOriginal('is_battled') && !$status->is_battled) {
            // mission_id が 2 のレコードを取得して is_completed を true に更新
            $mission = Mission::where('mission_id', 4)->first();

            if ($mission) {
                $mission->is_completed = false;
                $mission->save();
            }
        }
    }
}