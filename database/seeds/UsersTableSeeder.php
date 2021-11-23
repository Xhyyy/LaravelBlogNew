<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('users')->truncate(); //for cleaning earlier data to avoid duplicate entries
        DB::table('users')->insert([
            'name' => 'Xhy',
            'email' => 'xhy@gmail.com',
            'role' => 'admin',
            'password' => Hash::make('password'),
        ]);
        DB::table('users')->insert([
            'name' => 'Author',
            'email' => 'author@gmail.com',
            'role' => 'author',
            'password' => Hash::make('password'),
        ]);
    }
}
