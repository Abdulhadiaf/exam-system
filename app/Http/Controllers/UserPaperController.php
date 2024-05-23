<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use App\Models\Question;
use App\Models\UserAnswer;
use App\Models\UserPaper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        if (isset($request->completed_at)) {
            $userPaper = UserPaper::where(['user_id' => Auth::id(), 'paper_id' => $request->paper_id])->first();
            if ($userPaper->status == 'completed') {
                return response()->json(["message" => "You have already attempt this paper!"]);
            }
            $userPaper->completed_at = $request->completed_at;
            $userPaper->status = 'completed';
            $userPaper->save();

            if ($userPaper) {
                $questions = Question::where('paper_id', $request->paper_id)->get();
                foreach ($questions as $question) {
                    $answer = $request[$question->id];
                    if (gettype($request[$question->id]) != "string") {
                        $answer = json_encode($request[$question->id]);
                    }
                    $q = new UserAnswer();
                    $q->user_paper_id = $userPaper->id;
                    $q->question_id = $question->id;
                    $q->answer = $answer;
                    $q->save();
                }
            }
            return response()->json(["message" => "Your paper submitted successfully"]);
        } else {
            $checkPaper = UserPaper::where(['user_id' => Auth::id(), 'paper_id' => $request->paper_id])->first();
            if ($checkPaper) {
                return response()->json(["message" => "You have already attempt this paper!"]);
            }
            $userPaper = UserPaper::create([
                'user_id' => Auth::id(),
                'paper_id' => $request->paper_id,
                'started_at' => $request->started_at,
                'status' => 'pending'
            ]);
            return response()->json(["message" => "Your paper time is started!"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPaper $userPaper)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPaper $userPaper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPaper $userPaper)
    {
        return $request->all();
        $userPaper->completed_at = $request->completed_at;
        $userPaper->status = 'completed';
        $userPaper->save();

        if ($userPaper) {
            $questions = Question::where('paper_id', $request->paper_id)->get();
            foreach ($questions as $question) {
                $answer = $request[$question->id];
                if (gettype($request[$question->id]) != "string") {
                    $answer = json_encode($request[$question->id]);
                }
                $q = new UserAnswer();
                $q->user_paper_id = $userPaper->id;
                $q->question_id = $question->id;
                $q->answer = $answer;
                $q->save();
            }
        }
        return response()->json(["message" => "Stored successfully!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPaper $userPaper)
    {
        //
    }
}
