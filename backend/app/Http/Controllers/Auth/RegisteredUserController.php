<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        // バリデーション
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'image'],  // アイコンはオプション
            'description' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // アイコンがアップロードされている場合の処理
        if ($request->hasFile('icon')) {
            // アップロードされた画像を保存
            $icon = $request->file('icon')->getClientOriginalName();
            $request->file('icon')->storeAs('public/images', $icon);
        } else {
            // アイコンがアップロードされていない場合は、デフォルトのアイコンを設定
            $icon = 'default-icon.png';  // デフォルトアイコンのファイル名
        }

        // ユーザー作成
        $user = User::create([
            'name' => $request->name,
            'icon' => 'storage/images/' . $icon,  // 保存されたアイコン画像のパス
            'description' => $request->description ?? '',  // descriptionはnullでも良い
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // ユーザー登録イベントを発行
        event(new Registered($user));

        // ログイン処理
        Auth::login($user);

        // レスポンスとしてステータスコード200を返す
        return response()->noContent();
    }
}
