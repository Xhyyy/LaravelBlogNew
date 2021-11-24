<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;


class PagesController extends Controller
{
    public function blog(){
        return view('pages.blog');
    }

    public function admin(){
        $userData = collect(\Auth::user())->map(function($data){
            return $data;
        });
        if($userData['role'] == 'admin') {
            return view('pages.admin');
        }else {
            abort(404);
        }
    }

    public function author(){
        $userData = collect(\Auth::user())->map(function($data){
            return $data;
        });
        if($userData['role'] == 'author') {
            return view('pages.author');
        }else {
            abort(404);
        }
    }

    public function register(){
        return view('pages.register');
    }

    public function login(){
        return view('pages.login');
    }

    public function landingPage(){
        $userData = collect(\Auth::user())->map(function($data){
            return $data;
        });
        if($userData['status']=='enabled'){        
            if($userData['role'] == 'admin'){
                return view('pages.admin');
            }else{
                return view('pages.author');
            }
        }else{
            Auth::logout();
            return view('pages.login');
        }
    }
}
