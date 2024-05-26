<?php

namespace App\Http\Controllers;

use App\Events\ExamAdded;
use App\Models\Paper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $papers = Paper::with(['subject', 'userPapers' => function ($query) {
            $query->where('user_id', Auth::id());
        }])->get();
        return response()->json($papers);
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
        $paper = Paper::create($request->all());
        event(new ExamAdded($paper));
        return response()->json($paper);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paper $paper)
    {
        return response()->json(Paper::with('questions')->with('subject')->find($paper->id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paper $paper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Paper $paper)
    {
        $paper->update($request->all());
        return response()->json(["message" => "Updated successfully!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paper $paper)
    {
        $paper->delete();
        return response()->json(["message" => "Deleted successfully!"]);
    }
}
