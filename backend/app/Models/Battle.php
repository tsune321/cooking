<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Battle extends Model
{
    protected $fillable = ['user_id_1', 'user_id_2', 'battle_time'];

    // ユーザー1とリレーション
    public function user1()
    {
        return $this->belongsTo(User::class, 'user_id_1');
    }

    // ユーザー2とリレーション
    public function user2()
    {
        return $this->belongsTo(User::class, 'user_id_2');
    }

    // バトル結果とリレーション
    public function battleResult()
    {
        return $this->hasOne(BattleResult::class);
    }
}
