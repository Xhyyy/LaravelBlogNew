<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function blog(){
        return view('pages.blog');
    }

    // public function blog(){
    //     return view('pages.blog');
    // }
    
    public function add(){
        $title = 'Add Blog Page';
        return view('pages.add')->with('title', $title);
    }

    public function edit(){
        $title = 'Edit Blog Page';
        return view('pages.edit')->with('title', $title);
    }
}
