<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Battle;
use App\Models\User;

class BattleResults extends Command
{
    // コマンドの名前と説明
    protected $signature = 'battle:result';
    protected $description = 'バトルの勝敗を処理して、Elo Ratingを計算';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // バトルが完了したもの（例えば18:00以降のバトル）を取得
        $battles = Battle::all(); // 全てのバトルデータを取得

        // 各バトルについて処理
        foreach ($battles as $battle) {
            if (!$battle->battleResult) {
                $this->warn("バトル結果が見つかりません: バトルID - {$battle->id}");
                continue;
            }

            $winner = $battle->battleResult->winner;
            $loser = $battle->battleResult->loser;

            // Elo Rating の計算
            $winner_new_rating = $this->calculateEloRating($winner->battle_rate, $loser->battle_rate, true);
            $loser_new_rating = $this->calculateEloRating($loser->battle_rate, $winner->battle_rate, false);

            // レーティングの更新
            $winner->battle_rate = $winner_new_rating;
            $loser->battle_rate = $loser_new_rating;

            $winner->save();
            $loser->save();

            $this->info("戦いが終了しました: 勝者 - {$winner->name}, 敗者 - {$loser->name}");
        }
    }

    // Elo Ratingの計算
    private function calculateEloRating($player_rating, $opponent_rating, $is_winner)
    {
        $k = 32;  // Elo RatingのK係数
        $expected_score = 1 / (1 + pow(10, ($opponent_rating - $player_rating) / 400));

        // 勝者には1を、敗者には0を適用
        $actual_score = $is_winner ? 1 : 0;

        // 新しいレーティングを計算
        return round($player_rating + $k * ($actual_score - $expected_score));
    }
}
