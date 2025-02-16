<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BattleResult extends Model
{
    protected $fillable = ['battle_id', 'winner_id', 'loser_id'];

    // Battle とリレーション
    public function battle()
    {
        return $this->belongsTo(Battle::class);
    }

    // 勝者のユーザーとのリレーション
    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }

    // 敗者のユーザーとのリレーション
    public function loser()
    {
        return $this->belongsTo(User::class, 'loser_id');
    }
}
