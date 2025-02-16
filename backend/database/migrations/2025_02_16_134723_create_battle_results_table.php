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
        Schema::create('battle_results', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('battle_id');
            $table->unsignedBigInteger('winner_id');
            $table->unsignedBigInteger('loser_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('battle_results');
    }
};
