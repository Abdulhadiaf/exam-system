<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paper extends Model
{
    use HasFactory;

    protected $fillable = ['subject_id', 'title', 'duration'];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    public function userPapers()
    {
        return $this->hasMany(UserPaper::class);
    }
}
