<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => "Admin",
            'email' => "admin@gmail.com",
            'password' => Hash::make("asdfasdf"),
            'role' => "admin",
        ]);
        $user = User::create([
            'name' => "User",
            'email' => "user@gmail.com",
            'password' => Hash::make("asdfasdf"),
            'role' => "user",
        ]);
    }
}
