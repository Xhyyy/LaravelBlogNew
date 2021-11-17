<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Carbon\Carbon;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
        return view('posts.index')->with('posts', $posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $blog = $request -> all();
        $blog['created_at'] =  gmdate('Y-m-d H:i:s');
        $posts = Post::firstOrCreate($blog);

        $response['message'] = 'Successfully Created';
        $response['code'] = 200;
        return $response;
        
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $select = [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at'
        ];
        
        // $titles = DB::table('posts')->pluck('title');
    }

    public function showBlogs(Request $request)
    {
        $params = $request -> all();
        $select = [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at'
        ];
        $blog = Post::select($select);
        if (isset($params['id'])) {
            $blog -> where('id','=', $params['id']);
        }
        $response['blogData'] = $blog->get();
        return $response;
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
