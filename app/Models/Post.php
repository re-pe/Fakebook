<?php

namespace App\Models;

use App\Models\Like;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d, H:i:s',
    ];

    protected $fillable = [
        'title',
        'content',
        'user_id',
    ];

    /**
     * Get the user that owns the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Get post likes
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    // Get post likes
    public function likesUsers()
    {
        return $this->likes()->user();
    }

    // Get post comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
