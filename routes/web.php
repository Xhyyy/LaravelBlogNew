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
Route::middleware('auth')->group(function () {
    Route::get('/admin', 'PagesController@admin');
    Route::get('/author', 'PagesController@author');
    Route::get('/home-page', 'PagesController@landingPage');
});
Route::get('/register-page', 'PagesController@register');
Route::get('/login-page', 'PagesController@login');
Route::get('/logout-page', 'UserController@logout');

Route::get('/sandbox', function() {
    return view('sandbox');
});

Route::get('/123', function() {
    return \Auth::user();
});
// Route::get('/user', 'UserController@index');
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::post('/login', 'UserController@login');