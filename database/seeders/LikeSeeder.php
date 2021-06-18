<?php

namespace Database\Seeders;

use App\Models\Like;
use Illuminate\Database\Seeder;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $likeCount = env('LIKE_COUNT', 30);
        for($i = 0; $i < $likeCount; $i++) {
            Like::factory()->create();
        }
    }
}
