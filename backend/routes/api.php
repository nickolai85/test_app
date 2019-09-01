<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Api\AuthController@login');
    Route::post('signup', 'Api\AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'Api\AuthController@logout');
        Route::get('user', 'Api\AuthController@user');
    });
});
Route::middleware('auth:api')->get('/chat_list', 'Api\MessageChannelController@chatList');
Route::middleware('auth:api')->get('/test', 'Api\MessageChannelController@test');
Route::middleware('auth:api')->get('/messages/{channelId}', 'Api\MessageChannelController@messages');
Route::middleware('auth:api')->post('/send_message/{channelId}', 'Api\MessageChannelController@send_message');
/*Route::middleware('auth:api')->post('/register', 'Api\UserController@register');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

//Route::post('login', 'Api\UserController@login');


/*Route::middleware('auth:api')->group(function () {
    Route::post('register', 'Api\UserController@register');
  //  Route::get('user', 'Api\UserController@details');

});*/