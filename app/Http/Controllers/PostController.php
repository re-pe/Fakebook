<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware(['cors']);
        $this->middleware(['auth:sanctum'])->only(['store', 'update', 'destroy']);
        // $this->middleware(['log.routes']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $posts = Post::
        orderBy('id', 'desc')->
        with([
            'user' => function($query) {
                $query->select('id', 'username', 'avatar');
            },
            'likes' => function($query) {
                $query->select('id', 'post_id', 'user_id');
            },
        ])->
        withCount(['likes', 'comments'])->
        get();

        $posts->each(function($post) {
            $post['liked_users'] = Arr::pluck($post['likes'], 'user_id');
            return $post;
        });

        // foreach($posts as &$post) {
        //     $post['likesUsers'] = Arr::pluck($post['likes'], 'user_id');
        // }

        return $posts;
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validation = $request->validate([
            'title' => 'required|max:255|unique:posts',
            'content' => 'required',
            'user_id' => 'required|integer',
        ]);

        Post::create($request->all());

        return $validation;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return Post::find($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
