<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create(['username' => 'Rėdas Peškaitis', 'email' => 'redas.peskaitis@gmail.com']);
        User::factory(env('USER_COUNT', 9))->create();
    }
}
