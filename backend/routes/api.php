<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MissionController;
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->get('/missions', function () {
    // 現在のユーザーの user_id を取得
    $missions = \App\Models\Mission::where('user_id', auth()->user()->id)->get();
    return response()->json([
        'missions' => $missions,
    ]);
});

Route::middleware(['auth:sanctum'])->get('/users', function () {
    $users = \App\Models\User::all();  // すべてのユーザー情報を取得

    return response()->json([
        'user' => $users, // または $userとして、ユーザー情報をそのまま返す
    ]);
});