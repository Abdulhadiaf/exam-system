<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPaper extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'paper_id', 'started_at', 'completed_at', 'status'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function paper()
    {
        return $this->belongsTo(Paper::class);
    }
    public function userAnswers()
    {
        return $this->hasMany(UserAnswer::class);
    }
}
