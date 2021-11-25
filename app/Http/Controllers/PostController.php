<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Post;
// use Carbon\Carbon;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::all();
        return view('posts.index')->with('posts', $posts);
    }

    public function storeOrUpdate(Request $request)
    {
        $userData = collect(\Auth::user())->map(function($data){
            return $data;
        });
        $blog = $request -> all();
        if(isset($blog['id'])){
            $id = $blog['id'];
            $blog['updated_at'] = gmdate('Y-m-d H:i:s');
            $post = Post::whereId($id)->update($blog);
            if (isset($blog['status'])) {
                $response['message'] = 'Blog ' . $blog['status'];                
                $response['code'] = 200;
            } else {
                $response['message'] = 'Blog Updated!'; 
                $response['code'] = 200;
            }
        }else{
            $blog['created_at'] =  gmdate('Y-m-d H:i:s');
            $blog['status'] = 'published';
            $blog['user_id'] = $userData['id'];
            $posts = Post::firstOrCreate($blog);
            $response['code'] = 200;
            $response['message'] = 'Successfully Created';
        }
        return $response;

    }

    // public function showIndividualBlog(Request $request) {
    //     $params = $request -> all();
    //     // $id = $params['id'];
    //     $post = Post::find($params['id']);
        
    // }

    public function showBlogs(Request $request) //to show the complete list of blogs
    {
        $userData = collect(\Auth::user())->map(function($data){
            return $data;
        });
        $params = $request -> all();
        $select = [
            'posts.id',
            'title',
            'content',
            'posts.created_at',
            'posts.updated_at',
            'posts.status',

            'name',
            Post::raw('DATE_FORMAT(posts.created_at, "%d-%b-%Y") as publish_date')
            // selectRaw('date_format(posts.created_at,%M-%d-%Y) as publish_date')
        ];
        $blog = Post::select($select)->orderBy('id', 'DESC')
        ->where('posts.status', '=', 'published')
        // ->where('user_id','=',$userData['id'])
        ->join('users','users.id','posts.user_id');
        if(isset($params['id'])){
            $blog -> where('id', '=', $params['id']);
        }
        $response['blogData'] = $blog->get();
        return $response;
    }

    public function showIndividualBlog($id) {
        return Post::find($id);
        // return view('posts.show')
        //     ;
    }

    public function authorShowBlogs(Request $request)
    {
        $userData = collect(\Auth::user())->map(function($data){
            return $data;
        });
        $params = $request -> all();
        $select = [
            'posts.id',
            'title',
            'content',
            'posts.created_at',
            'posts.updated_at',
            'posts.status',
        ];
        $blog = Post::select($select)->orderBy('id', 'DESC')
                    ->where('posts.status', '=', 'published')
                    ->where('user_id','=',$userData['id'])
                    ;
        // ->where('user_id','=',$userData['id'])
        // ->join('users','users.id','=','posts.user_id');
        if(isset($params['id'])){
            $blog -> where('id', '=', $params['id']);
        }
        $response['blogData'] = $blog->get();
        return $response;
    }

    public function authorShowUnpublishedBlogs(Request $request)
    {
        $userData = collect(\Auth::user())->map(function($data){
            return $data;
        });

        $params = $request -> all();
        $select = [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at',
            'status',
        ];
        $blog = Post::select($select)->orderBy('id', 'DESC')
                ->where('status', '=', 'unpublish')
                ->where('user_id','=',$userData['id'])
                ;
        if(isset($params['id'])){
            $blog -> where('id', '=', $params['id']);
        }
        $response['blogData'] = $blog->get();
        return $response;
    }

    public function adminShowBlogs(Request $request)
    {
        $params = $request -> all();
        $select = [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at',
            'status',
        ];
        $blogList = Post::select($select)->orderBy('created_at', 'ASC')->where('status', '=', 'published');
        if(isset($params['id'])){
            $blogList -> where('id', '=', $params['id']);
        }
        $response['blogData'] = $blogList->get();
        return $response;
    }

    public function adminShowUnpublishedBlogs(Request $request)
    {
        $params = $request -> all();
        $select = [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at',
            'status',
        ];
        $blog = Post::select($select)->orderBy('id', 'DESC')->where('status', '=', 'unpublish');
        if(isset($params['id'])){
            $blog -> where('id', '=', $params['id']);
        }
        $response['blogData'] = $blog->get();
        return $response;
    }

    public function showDeletedBlogs(Request $request)
    {
        $params = $request -> all();
        $select = [
            'id',
            'title',
            'content',
            'created_at',
            'updated_at',
            'status',
        ];
        $blog = Post::select($select)->orderBy('id', 'DESC')->where('status', '=', 'deleted');
        if(isset($params['id'])){
            $blog -> where('id', '=', $params['id']);
        }
        $response['blogData'] = $blog->get();
        return $response;
    }
}
