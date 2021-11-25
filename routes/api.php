<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware(['auth:api'])->group(function () {
    Route::prefix('blog')->group(function () {
        // Route::post('/addOrUpdate', 'PostController@storeOrUpdate');
        Route::post('/showBlog', 'PostController@showBlogs');
        Route::post('/individualBlog', 'PostController@showIndividualBlog');
        // Route::post('/authorShowBlogs', 'PostController@authorShowBlogs');
        // Route::post('/authorShowUnpublishedBlogs', 'PostController@authorShowUnpublishedBlogs');
        Route::post('/adminShowBlog', 'PostController@adminShowBlogs');
        Route::post('/adminShowUnpublishedBlogs', 'PostController@adminShowUnpublishedBlogs');
        Route::post('/showDeletedBlogs', 'PostController@showDeletedBlogs');
        Route::post('/destroy', 'PostController@destroy');
    });
    
// });

Route::prefix('user')->group(function () {
    Route::post('/registerUser', 'UserController@registerUser');
    // Route::post('/showUser', 'UserController@showUsers');
    Route::post('/updateUser', 'UserController@updateUser');
});