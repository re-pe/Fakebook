<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $postKeys = Post::all()->modelKeys();
        $userKeys = User::all()->modelKeys();
        return [
            'post_id' => $postKeys[array_rand($postKeys)],
            'user_id' => $userKeys[array_rand($userKeys)],
            'title' => $this->faker->unique()->sentence,
            'content' => $this->faker->paragraph,
        ];
    }
}
