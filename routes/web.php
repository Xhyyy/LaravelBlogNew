<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PagesController@blog');
Route::get('/admin', 'PagesController@admin');
Route::get('/author', 'PagesController@author');
Route::get('/register-page', 'PagesController@register');
Route::get('/login-page', 'PagesController@login');

Route::get('/sandbox', function() {
    return view('sandbox');
});

Route::get('/user', function() {
    return \Auth::user();
});
// Route::get('/blog', 'PagesController@blog');
// Route::get('/edit', 'PagesController@edit');
// Route::resource('posts', 'PostController');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
