<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMissionsTable extends Migration
{
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // usersテーブルとのリレーション
            $table->string('mission'); // ミッション名
            $table->timestamp('deadline'); // 期限
            $table->boolean('is_completed')->default(false); // ミッション完了フラグ
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('missions');
    }
}