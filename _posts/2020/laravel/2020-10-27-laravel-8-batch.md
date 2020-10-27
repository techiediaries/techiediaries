---
layout: bpost
title: "Laravel 8 Job Batch by Example"
image: "images/content/laravel.png"
excerpt: " In Laravel 8, we have a new batch method that allows developers to dispatch multiple jobs in the same time. Let's see the batch() method using a quick example" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 was officially released on 8th September 2020. The laravel team releases new Laravel version in every 6-month interval with major changes and new features. In Laravel 8, we have a new batch method that allows developers to dispatch multiple jobs in the same time. Let's see the `batch()` method using a quick example.

The jobs for your application are contained in the `app/Jobs` directory. You can generate a new queued job using the Artisan CLI as follows:

```php
$ php artisan make:job SendReminderEmail 
```

A oob is PHP class that extends the `Job` class and may implement the `SelfHandling` or `ShouldQueue` interfaces. This is an example of Job from the [official docs](https://laravel.com/docs/5.1/queues):

```php
<?php

namespace App\Jobs;

use App\User;
use App\Jobs\Job;
use Illuminate\Contracts\Mail\Mailer;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendReminderEmail extends Job implements SelfHandling, ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $user;

    /**
     * Create a new job instance.
     *
     * @param  User  $user
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @param  Mailer  $mailer
     * @return void
     */
    public function handle(Mailer $mailer)
    {
        $mailer->send('emails.reminder', ['user' => $this->user], function ($m) {
            //
        });

        $this->user->reminders()->create(...);
    }
}
```

## Laravel 8 Batch Method


With Laravel 8, we have a new `Bus::batch()` method for job batching that allows you to group many jobs in one batch to be executed in parallel in the queue, get the total progress and cancel any job in the batch. It is one of the most powerful new features of Laravel 8. We can watch the batched jobs and run certain code when any of the jobs fail or when all jobs are processed.

You can simply pass all your jobs to the `Bus::batch()` and wait for the response. Here is an example:

```php
Bus::batch([
    new Job1(),
    new Job2()
])->then(function (Batch $batch) {
    if ($batch->hasFailures()) {
        // die
    }
})->success(function (Batch $batch){
	//invoked when all job completed

})->catch(function (Batch $batch,$e){
	//invoked when first job failure

})->allowFailures()->dispatch();Copy
```

This is an example from the [official docs](https://laravel.com/docs/8.x/queues#job-batching):

```php
$batch = Bus::batch([
    new ProcessPodcast(Podcast::find(1)),
    new ProcessPodcast(Podcast::find(2)),
    new ProcessPodcast(Podcast::find(3)),
    new ProcessPodcast(Podcast::find(4)),
    new ProcessPodcast(Podcast::find(5)),
])->then(function (Batch $batch) {
    // All jobs completed successfully...
})->catch(function (Batch $batch, Throwable $e) {
    // First batch job failure detected...
})->finally(function (Batch $batch) {
    // The batch has finished executing...
})->name('Process Podcasts')
  ->allowFailures(false)
  ->onConnection('redis')
  ->onQueue('podcasts')
  ->dispatch();
```

By default, the entire batch of jobs would be canceled when one of the jobs fails. In this case, we don't want one failing mail to stop all others. We can prevent that from happening by calling `allowFailures`.

Instead of polling to check if all mails are sent, we can pass a callable to the finally method. That callable will be executed when all jobs in the batch have been processed. 

