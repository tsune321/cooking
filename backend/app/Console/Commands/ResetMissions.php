<?php

// app/Console/Commands/ResetMissions.php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Mission;

class ResetMissions extends Command
{
    // コマンドの名前と説明
    protected $signature = 'missions:reset';
    protected $description = '24時にミッションをリセットする';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Missionテーブルのすべてのレコードをリセット
        $missions = Mission::all();
        foreach ($missions as $mission) {
            // is_completed を false に設定
            $mission->update(['is_completed' => false]);
        }
        $this->info('全てのミッションをリセットしました');
    }
}
