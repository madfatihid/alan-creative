<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/image/{id}', function ($id) {
    $pathToFile = storage_path('/app/public/image/' . $id . '.png');
    if(file_exists($pathToFile)) return response()->file($pathToFile);
    $pathToFile = storage_path('/app/public/image/' . $id . '.jpg');
    if(file_exists($pathToFile)) return response()->file($pathToFile);
    $pathToFile = storage_path('/app/public/image/' . $id . '.jpeg');
    if(file_exists($pathToFile)) return response()->file($pathToFile);
    $pathToFile = storage_path('/app/public/image/' . $id . '.webp');
    if(file_exists($pathToFile)) return response()->file($pathToFile);
    abort(404);
});
 