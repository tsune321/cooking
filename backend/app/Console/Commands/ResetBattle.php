<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Mission;
use App\Models\Status;

class ResetBattle extends Command
{
    // コマンドの名前と説明
    protected $signature = 'battle:reset';
    protected $description = '18時にバトルが出来るようになる';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $status = Status::all();
        foreach ($status as $battle) {
            // is_battled を false に設定して、save() メソッドを使って保存
            $battle->is_battled = false;
            $battle->save();  // save() メソッドを使って変更を保存
        }
        $this->info('バトルが出来るようになりました');
    }
}
