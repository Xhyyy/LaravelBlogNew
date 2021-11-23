<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function blog(){
        return view('pages.blog');
    }

    public function admin(){
        return view('pages.admin');
    }

    public function author(){
        return view('pages.author');
    }

    public function register(){
        return view('pages.register');
    }

    public function login(){
        return view('pages.login');
    }

    public function landingPage(){
        return \Auth::user();
    }
}
