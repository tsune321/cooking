<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function index()
    {
        // すべてのステータスを取得
        $status = Status::all();
        $user = auth()->user();
        return response()->json([
            'status' => $status,
            'user' => $user,
        ]);
    }

    public function updateBattleStatus(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $status = Status::where('user_id', $user->id)->first();
        if (!$status) {
            return response()->json(['error' => 'Status not found'], 404);
        }

        // goldが50以上の場合のみ減らす
        if ($status->gold >= 50) {
            $status->gold -= 50;  // goldを50減らす
            $status->is_battled = true;  // バトル済みに更新
            $status->save();  // 保存

            return response()->json(['message' => 'バトル完了', 'status' => $status]);
        } else {
            return response()->json(['error' => 'ゴールドが足りません'], 400);
        }
    }
}
