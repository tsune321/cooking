<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    // ユーザー情報の取得
    public function show()
    {
        return response()->json(Auth::user());
    }

    // ユーザー情報の更新
    public function update(Request $request)
    {
        $user = Auth::user();

        // バリデーション
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string|max:100',
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
    }
}
