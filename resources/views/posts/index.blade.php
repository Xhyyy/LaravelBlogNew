@extends('layouts.header')

@section('content')
    <h1>Posts</h1>
        @if(count($posts) >= 1)
            @foreach($posts as $post)
                <div id="posts"></div>
            @endforeach
        @else
            <p>No posts found</p>
        @endif
@endsection