<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Mission;
use App\Models\Status;
use App\Models\User;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->get('/missions', function () {
    // 現在のユーザーのミッション情報を取得
    $missions = Mission::where('user_id', auth()->id())->get();
    return response()->json(['missions' => $missions]);
});

Route::middleware(['auth:sanctum'])->get('/status', function () {
    // 現在のユーザーのステータスを取得
    $status = Status::where('user_id', auth()->id())->first(); // 1:1関係なので `first()` を使用
    return response()->json(['status' => $status]);
});

Route::middleware(['auth:sanctum'])->get('/users', function () {
    // すべてのユーザー情報を取得
    $users = User::all();
    return response()->json(['user' => $users]);
});

// 🔹 追加: is_battled を true に更新するエンドポイント
Route::middleware(['auth:sanctum'])->put('/status/battle', function () {
    $user = auth()->user();

    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $status = Status::where('user_id', $user->id)->first();

    if (!$status) {
        return response()->json(['error' => 'Status not found'], 404);
    }

    // `is_battled` を true に更新（Observer が発火）
    $status->update(['is_battled' => true]);

    return response()->json(['message' => 'バトル完了', 'status' => $status]);
});
