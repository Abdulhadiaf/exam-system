<?php

use App\Events\TestEvent;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('test-channel', function () {
    $message="hello, world";
    broadcast(new TestEvent($message))->toOthers();
});
