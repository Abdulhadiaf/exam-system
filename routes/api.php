<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaperController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserAnswerController;
use App\Http\Controllers\UserPaperController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function (Request $request) {
    return "success";
});

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
    Route::get('/users', [AuthController::class, 'users'])->middleware('auth:sanctum');
    Route::resource('subjects', SubjectController::class);
    Route::resource('papers', PaperController::class);
    Route::resource('questions', QuestionController::class);
    Route::resource('user-papers', UserPaperController::class);
    Route::resource('user-answers', UserAnswerController::class);
    Route::get('load-answers', [UserAnswerController::class, 'loadAnswers']);
    Route::resource('notifications', NotificationController::class);
    Route::resource('results', ResultController::class);
});
