<?php

namespace App\Http\Controllers;

use App\Models\UserAnswer;
use App\Models\UserPaper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class UserAnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }
    public function loadAnswers(Request $request)
    {
        // return $request->all();
        $userPaper = UserPaper::where(['user_id' => $request->user_id, 'paper_id' => $request->paper_id])->first();
        return $userPaper;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(UserAnswer $userAnswer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserAnswer $userAnswer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserAnswer $userAnswer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserAnswer $userAnswer)
    {
        //
    }
}
