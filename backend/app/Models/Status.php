<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Status extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'battle_rate',
        'likes', 
        'win_count',
        'gold',
        'is_battled',
    ];

    protected $table = 'status'; // テーブル名を指定

    public function user() {
        return $this->belongsTo(User::class);
    }
}
