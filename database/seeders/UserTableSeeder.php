<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User Admin
        User::create([
            'name' => 'Administrator',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456'),
            'username' => 'admin',
            'role' => 1,
            'alamat' => '-',
            'no_tlp' => '-',
        ]);

        //User Member
        User::create([
            'name' => 'Dede',
            'email' => 'dede@gmail.com',
            'password' => Hash::make('123456'),
            'username' => 'dede',
            'role' => 2,
            'alamat' => 'Jongol',
            'no_tlp' => '09876755463',
        ]);
    }
}
