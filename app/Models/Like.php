<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d, H:i:s',
    ];

    protected $fillable = [
        'post_id',
        'user_id',
    ];

    /**
     * Get the user that owns the post.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user that owns the post.
     */
    public function isAuthUser()
    {
        return ($this->belongsTo(User::class)) === Auth::user();
    }

    /**
     * Get the user that owns the post.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
