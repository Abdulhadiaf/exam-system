<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    use HasFactory;
    protected $fillable = ['user_paper_id', 'question_id', 'answer'];

    public function userPaper()
    {
        return $this->belongsTo(UserPaper::class);
    }
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
