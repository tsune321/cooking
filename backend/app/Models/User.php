<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function missions() {
        return $this->hasMany(Mission::class);
    }

    public function status() {
        return $this->hasOne(Status::class); // ステータスとのリレーションを追加
    }

    protected static function booted()
    {
        static::created(function ($user) {
            // 新しいユーザーが作成されたときにデフォルトのミッションを追加
            $missions = [
                [
                    'user_id' => $user->id,
                    'mission' => 'ログインしよう',
                    'is_completed' => false,
                ],
                [
                    'user_id' => $user->id,
                    'mission' => 'いいねを5回押そう',
                    'is_completed' => false,
                ],
                [
                    'user_id' => $user->id,
                    'mission' => 'いいねを5回もらおう',
                    'is_completed' => false,
                ],
                [
                    'user_id' => $user->id,
                    'mission' => 'バトルに参加しよう',
                    'is_completed' => false,
                ],
            ];

            foreach ($missions as $missionData) {
                Mission::create([
                    'user_id' => $user->id,
                    'mission' => $missionData['mission'],
                    'is_completed' => $missionData['is_completed'],
                ]);
            }

            // 新しいユーザーが作成されたときにデフォルトのステータスを設定
            Status::create([
                'user_id' => $user->id,
                'battle_rate' => 1000,
                'win_count' => 0,
                'gold' => 100,
                'is_battled' => false,
            ]);
        });
    }
}
