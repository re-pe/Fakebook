<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['cors']);
        $this->middleware(['auth:sanctum']);
        // $this->middleware(['log.routes']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'post_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $like = Like::create([
            'post_id' => $request->post_id,
            'user_id' => $request->user_id
        ]);
        // $likes = Like::all()->whereStrict('post_id', $request->post_id);
        $likes = Like::where('post_id', $request->post_id)->get();


        return response(['like' => $like, 'likes' => $likes]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Like  $like
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Like $like)
    {

        $postId = $like->post_id;
        $like = Like::find($like->id);
        $result=$like->delete();
        $likes = Like::where('post_id', $postId)->get();

        return response(['like' => [], 'likes' => $likes]);
    }
}
