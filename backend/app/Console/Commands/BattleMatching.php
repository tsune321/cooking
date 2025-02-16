<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Battle;

class BattleMatching extends Command
{
    // コマンドの名前と説明
    protected $signature = 'battle:match';
    protected $description = 'ユーザーをマッチングして対戦テーブルを作成';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // is_battledがtrueで、battle_rateが2000未満のユーザーを取得
        $users = User::whereHas('status', function ($query) {
            $query->where('is_battled', true)
                  ->where('battle_rate', '<', 2000);
        })->get();

        // 100人のユーザーがいる場合に、50組に分けてマッチング
        if ($users->count() >= 2) {
            // ユーザーをランダムに並べ替え
            $users = $users->random($users->count());

            // 2人ずつペアを組み、バトルテーブルを作成
            $pairs = array_chunk($users->toArray(), 2); // 2人ずつのペアに分ける

            foreach ($pairs as $pair) {
                // ペアごとにバトルを作成
                $user1 = $pair[0];
                $user2 = $pair[1];

                // 新しいバトルを作成
                Battle::create([
                    'user_id_1' => $user1['id'],
                    'user_id_2' => $user2['id'],
                ]);
            }

            $this->info('マッチングが完了しました');
        } else {
            $this->error('マッチングできるユーザーが不足しています');
        }
    }
}
