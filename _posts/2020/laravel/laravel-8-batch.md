---
layout: bpost
title: ""
image: "images/content/laravel.png"
excerpt: "" 
tags : [laravel, laravel-6-tutorials-and-examples, laravel6] 
---

Laravel 8 officially released on 8th September 2020. The laravel team releases new Laravel version in every 6-month interval with major changes. As Laravel 8 Non-LTS (general version), the Laravel 8 will provide 6 months bug fixes until March 8, 2021, and 1-year security fixes until 8 September 2021.


Laravel 8 introduces a new batch method that allows to dispatch multiple jobs in one go. Let's take a look at we can refactor the code above using batch.

Job batching is now easier with new Bus::batch() . It is one of the most exciting features of Laravel 8. Just pass your all jobs into a Bus::batch() and wait for the response. Here is an example.

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

The response will tell you the statistics of your dispatched job. Here is an example of a response.


```php
protected function sendMailsForCampaign(Campaign $campaign)
{
    $jobs = $campaign->list->subscribers
        ->cursor()
        ->map(fn (Subscriber $subscriber) => $this->createSendMailJob($campaign, $subscriber, $segment))
        ->filter()
        ->toArray();

    $batch = Bus::batch($jobs)
        ->allowFailures()
        ->finally(function () use ($campaign) {
            $campaign->markAsSent($this->campaign->sends()->count());

            event(new CampaignSentEvent($campaign));
        })
        ->dispatch();

    $campaign->update(['send_batch_id' => $batch->id]);
}
```

By default, the entire batch of jobs would be canceled when one of the jobs fails. In this case, we don't want one failing mail to stop all others. We can prevent that from happening by calling allowFailures.

Instead of polling to check if all mails are sent, we can pass a callable to the finally method. That callable will be executed when all jobs in the batch have been processed. The MarkCampaignAsSentJob from Mailcoach v2 isn't needed anymore and is removed in v3.


