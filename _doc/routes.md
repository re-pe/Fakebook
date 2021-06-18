+--------+-----------+-------------------------------+-----------------------+---------------------------------------------------------------+----------------------------------------------+
| Domain | Method    | URI                           | Name                  | Action                                                        | Middleware                                   |
+--------+-----------+-------------------------------+-----------------------+---------------------------------------------------------------+----------------------------------------------+
|        | GET|HEAD  | _debugbar/assets/javascript   | debugbar.assets.js    | Barryvdh\Debugbar\Controllers\AssetController@js              | Barryvdh\Debugbar\Middleware\DebugbarEnabled |
|        |           |                               |                       |                                                               | Closure                                      |
|        | GET|HEAD  | _debugbar/assets/stylesheets  | debugbar.assets.css   | Barryvdh\Debugbar\Controllers\AssetController@css             | Barryvdh\Debugbar\Middleware\DebugbarEnabled |
|        |           |                               |                       |                                                               | Closure                                      |
|        | DELETE    | _debugbar/cache/{key}/{tags?} | debugbar.cache.delete | Barryvdh\Debugbar\Controllers\CacheController@delete          | Barryvdh\Debugbar\Middleware\DebugbarEnabled |
|        |           |                               |                       |                                                               | Closure                                      |
|        | GET|HEAD  | _debugbar/clockwork/{id}      | debugbar.clockwork    | Barryvdh\Debugbar\Controllers\OpenHandlerController@clockwork | Barryvdh\Debugbar\Middleware\DebugbarEnabled |
|        |           |                               |                       |                                                               | Closure                                      |
|        | GET|HEAD  | _debugbar/open                | debugbar.openhandler  | Barryvdh\Debugbar\Controllers\OpenHandlerController@handle    | Barryvdh\Debugbar\Middleware\DebugbarEnabled |
|        |           |                               |                       |                                                               | Closure                                      |
|        | GET|HEAD  | _debugbar/telescope/{id}      | debugbar.telescope    | Barryvdh\Debugbar\Controllers\TelescopeController@show        | Barryvdh\Debugbar\Middleware\DebugbarEnabled |
|        |           |                               |                       |                                                               | Closure                                      |
|        | GET|HEAD  | api/comments                  | comments.index        | App\Http\Controllers\CommentController@index                  | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        | POST      | api/comments                  | comments.store        | App\Http\Controllers\CommentController@store                  | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | GET|HEAD  | api/comments/{comment}        | comments.show         | App\Http\Controllers\CommentController@show                   | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        | PUT|PATCH | api/comments/{comment}        | comments.update       | App\Http\Controllers\CommentController@update                 | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | DELETE    | api/comments/{comment}        | comments.destroy      | App\Http\Controllers\CommentController@destroy                | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | GET|HEAD  | api/likes                     | likes.index           | App\Http\Controllers\LikeController@index                     | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | POST      | api/likes                     | likes.store           | App\Http\Controllers\LikeController@store                     | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | GET|HEAD  | api/likes/{like}              | likes.show            | App\Http\Controllers\LikeController@show                      | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | PUT|PATCH | api/likes/{like}              | likes.update          | App\Http\Controllers\LikeController@update                    | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | DELETE    | api/likes/{like}              | likes.destroy         | App\Http\Controllers\LikeController@destroy                   | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | GET|HEAD  | api/posts                     | posts.index           | App\Http\Controllers\PostController@index                     | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        | POST      | api/posts                     | posts.store           | App\Http\Controllers\PostController@store                     | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | GET|HEAD  | api/posts/{post}              | posts.show            | App\Http\Controllers\PostController@show                      | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        | PUT|PATCH | api/posts/{post}              | posts.update          | App\Http\Controllers\PostController@update                    | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | DELETE    | api/posts/{post}              | posts.destroy         | App\Http\Controllers\PostController@destroy                   | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | GET|HEAD  | api/posts/{post}/comments     | posts.comments.index  | App\Http\Controllers\CommentController@indexOfPost            | api                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        | POST      | login                         | login                 | App\Http\Controllers\AuthController@login                     | web                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        | POST      | logout                        | logout                | App\Http\Controllers\AuthController@logout                    | web                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        |           |                               |                       |                                                               | App\Http\Middleware\Authenticate:sanctum     |
|        | POST      | register                      | register              | App\Http\Controllers\AuthController@register                  | web                                          |
|        |           |                               |                       |                                                               | App\Http\Middleware\Cors                     |
|        | GET|HEAD  | sanctum/csrf-cookie           |                       | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show    | web                                          |
|        | GET|HEAD  | {path?}                       | default               | Illuminate\Routing\ViewController                             | web                                          |
+--------+-----------+-------------------------------+-----------------------+---------------------------------------------------------------+----------------------------------------------+
