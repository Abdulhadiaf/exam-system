<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['paper_id', 'type', 'question_text', 'options'];

    public function paper()
    {
        return $this->belongsTo(Paper::class);
    }

    public function setOptionsAttribute($value)
    {
        $this->attributes['options'] = json_encode(explode(',', $value));
    }

    public function getOptionsAttribute($value)
    {
        return json_decode($value);
    }

}
