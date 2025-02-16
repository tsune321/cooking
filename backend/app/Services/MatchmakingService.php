<?php
namespace App\Services;

use App\Models\User;
use App\Models\Status;
use App\Models\Battle;
use App\Models\BattleResult;
use Carbon\Carbon;

class MatchmakingService
{
    /**
     * 条件に合致するユーザーからランダムで2人を選ぶ
     */
    public static function createBattlePair()
    {
        $eligibleUsers = User::where('is_battled', true)
            ->join('status', 'users.id', '=', 'status.user_id')
            ->where('status.battle_rate', '<', 2000)
            ->inRandomOrder()
            ->limit(2)
            ->get();

        if ($eligibleUsers->count() === 2) {
            // 対戦ペア作成
            $battle = Battle::create([
                'user_id_1' => $eligibleUsers[0]->id,
                'user_id_2' => $eligibleUsers[1]->id,
                'battle_time' => Carbon::now(),
            ]);

            return $battle;
        }

        return null; // 条件を満たすユーザーが2人いなければnull
    }

    /**
     * Elo Rating の計算
     */
    public static function updateEloRating($winner, $loser, $kFactor = 32)
    {
        $expectedWinner = 1 / (1 + pow(10, ($loser->battle_rate - $winner->battle_rate) / 400));
        $expectedLoser = 1 - $expectedWinner;

        $winner->battle_rate += round($kFactor * (1 - $expectedWinner));
        $loser->battle_rate += round($kFactor * (0 - $expectedLoser));

        $winner->save();
        $loser->save();
    }

    /**
     * 対戦結果を保存し、勝者と敗者の Elo Rating を更新
     */
    public static function saveBattleResult($battleId, $winnerId, $loserId)
    {
        $battle = Battle::find($battleId);
        $winner = User::find($winnerId);
        $loser = User::find($loserId);

        if ($battle && $winner && $loser) {
            // 結果を保存
            BattleResult::create([
                'battle_id' => $battleId,
                'winner_id' => $winnerId,
                'loser_id' => $loserId,
            ]);

            // Elo Rating の更新
            self::updateEloRating($winner, $loser);

            return true;
        }

        return false;
    }
}
