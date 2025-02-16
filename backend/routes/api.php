<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Mission;
use App\Models\Status;
use App\Models\User;
use App\Http\Controllers\ProfileController;

// 現在のユーザー情報を取得
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return response()->json($request->user());
});


// 現在のユーザーのミッション情報を取得
Route::middleware(['auth:sanctum'])->get('/missions', function () {
    $missions = Mission::where('user_id', auth()->id())->get();
    return response()->json(['missions' => $missions]);
});

// 現在のユーザーのステータスを取得
Route::middleware(['auth:sanctum'])->get('/status', function () {
    $status = Status::where('user_id', auth()->id())->first(); // 1:1関係なので `first()` を使用
    return response()->json(['status' => $status]);
});

// すべてのユーザー情報を取得
Route::middleware(['auth:sanctum'])->get('/users', function () {
    $users = User::all();
    return response()->json(['users' => $users]);
});

// 🔹 プロフィールの更新
Route::middleware(['auth:sanctum'])->put('/user', function (Request $request) {
    $user = auth()->user();

    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // リクエストのバリデーション
    $validated = $request->validate([
        'name' => 'string|max:255',
        'description' => 'nullable|string',
        'icon' => 'nullable|image|max:2048',
    ]);

    // アイコンの保存処理
    if ($request->hasFile('icon')) {
        $path = $request->file('icon')->store('public/icons');
        $validated['icon'] = basename($path); // アイコンファイル名を保存
    }

    // ユーザー情報の更新
    $user->update($validated);

    return response()->json($user);
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
