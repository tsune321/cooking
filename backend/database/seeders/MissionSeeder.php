<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Mission;
use Carbon\Carbon;

class MissionSeeder extends Seeder
{
    public function run()
    {
        // すべてのユーザーを取得
        $users = User::all();

        // ユーザーごとに複数のミッションを挿入
        foreach ($users as $user) {
            // 複数のミッションを配列で定義
            $missions = [
                [
                    'user_id' => $user->id,
                    'mission' => 'ミッション 1', // 1つ目のミッション名
                    'deadline' => Carbon::now()->addDays(7),  // 期限を7日後に設定
                    'is_completed' => false,  // 初期状態では未完了
                ],
                [
                    'user_id' => $user->id,
                    'mission' => 'ミッション 2', // 2つ目のミッション名
                    'deadline' => Carbon::now()->addDays(14), // 期限を14日後に設定
                    'is_completed' => false,  // 初期状態では未完了
                ],
                [
                    'user_id' => $user->id,
                    'mission' => 'ミッション 3', // 3つ目のミッション名
                    'deadline' => Carbon::now()->addDays(21), // 期限を21日後に設定
                    'is_completed' => false,  // 初期状態では未完了
                ],
            ];

            // 複数のミッションをユーザーに挿入
            foreach ($missions as $missionData) {
                Mission::create([
                    'user_id' => $user->id, // ユーザーIDを関連付け
                    'mission' => $missionData['mission'],
                    'deadline' => $missionData['deadline'],
                    'is_completed' => $missionData['is_completed'],
                ]);
            }
        }
    }
}
