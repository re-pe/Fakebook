<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
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
    public function index()
    {

    }

        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexOfPost($postId)
    {
        $comments = Comment::
        orderBy('id', 'desc')->
        where('post_id', $postId)->
        with([
            'user' => function($query) {
                $query->select('id', 'username', 'avatar');
            },
        ])->
        get()->toArray();

        return $comments;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:100|unique:comments',
            'content' => 'required',
            'post_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        Comment::create([
            'title' => $request->title,
            'content' => $request->content,
            'post_id' => $request->post_id,
            'user_id' => $request->user_id,
        ]);

        return $this->indexOfPost($request->post_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        $request->validate([
            'title' => 'required|max:100|unique:comments',
            'content' => 'required',
            'post_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        Comment::where('id', $request->id)->update([
            'title' => $request->title,
            'content' => $request->content,
            'post_id' => $request->post_id,
            'user_id' => $request->user_id,
        ]);

        return $this->indexOfPost($request->post_id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Comment $comment)
    {
        $postId = $comment->post_id;
        $comment = Comment::find($comment->id);
        $comment->delete();

        $comments = $this->indexOfPost($postId);

        return response($comments);
    }
}
