<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index()
    {
        // すべてのミッションを取得
        $missions = Mission::all();
        $user = auth()->user();
        return response()->json([
            'missions' => $missions,
            'user' => $user,
        ]);
    }
}
