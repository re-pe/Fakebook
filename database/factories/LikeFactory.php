<?php

namespace Database\Factories;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LikeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Like::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $postKeys = Post::all()->modelKeys();
        $postKey = $postKeys[array_rand($postKeys)];

        $likeUsers = Post::find($postKey)->likes()->pluck('user_id');

        $userKeys = User::all()->whereNotIn('id', $likeUsers)->modelKeys();
        $userKey = $userKeys[array_rand($userKeys)];

        return [
            'post_id' => $postKey,
            'user_id' => $userKey,
        ];
    }
}
