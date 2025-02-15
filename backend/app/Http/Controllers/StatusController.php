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
}
