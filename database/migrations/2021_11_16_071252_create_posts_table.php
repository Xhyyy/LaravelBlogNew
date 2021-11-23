<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->foreignId('user_id')->constrained('users');
            $table->string('title');
            $table->mediumText('content');
            $table->string('status', 50);
            $table->integer('comment_id')
                  ->unsigned()
                  ->nullable();
            $table->timestamps();
            $table->foreign('comment_id')
                  ->references('id')->on('comments_tbl');
        });        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
