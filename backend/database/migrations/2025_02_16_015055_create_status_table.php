<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('status', function (Blueprint $table) { // テーブル名を変更
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // usersテーブルとのリレーション
            $table->integer('battle_rate'); // レート
            $table->integer('likes'); // バトル数
            $table->integer('win_count'); // 勝利数
            $table->integer('gold'); // ゴールド
            $table->boolean('is_battled')->default(false); // バトルフラグ
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status'); // テーブル名を変更
    }
};
