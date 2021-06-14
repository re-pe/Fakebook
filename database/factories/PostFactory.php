<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $userKeys = User::all()->modelKeys();
        return [
            'title' => $this->faker->unique()->realText(40, 2),
            //'content' => $this->faker->paragraphs(10, true),
            'content' => $this->faker->realText(1000, 2),
            'user_id' => $userKeys[array_rand($userKeys)],
        ];
    }
}
