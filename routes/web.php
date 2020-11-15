<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});



Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::prefix('admin')->group(function(){
    Route::get('/','AdminController@index')->name('admin.dashboard');
    Route::get('/login','Auth\AdminLoginController@showLogin')->name('admin.login');
    Route::post('/login','Auth\AdminLoginController@login')->name('admin.login.submit');

});

Route::prefix('agent')->group(function(){
    Route::get('/','AgentController@index')->name('agent.dashboard');
    Route::get('/login','Auth\AgentLoginController@showLogin')->name('agent.login');
    Route::post('/login','Auth\AgentLoginController@login')->name('agent.login.submit');
});





