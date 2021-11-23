<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->truncate(); //for cleaning earlier data to avoid duplicate entries
        DB::table('posts')->insert([
            'title' => 'Blog Post 1',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 2',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 3',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 4',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 5',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 6',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 7',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 8',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
        DB::table('posts')->insert([
            'title' => 'Blog Post 9',
            'content' => 'This is the content for this Blog Post.You can Edit me by clicking the Edit Button below. You can Delete my by clicking the Delete Button below. You can Unpublish me by clicking the Unpublish Button below.',
            'status' => 'published'
        ]);
    }
}
