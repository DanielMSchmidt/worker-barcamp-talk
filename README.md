# Worker Campfire Barcamp 2015

## TODO

- Read [this](https://gauntface.com/blog/2014/12/15/push-notifications-service-worker) 
- Build a working service worker which precaches the next 10 pages, their images and their shops
- Build another service worker which simulates new products (fetched with another seed) by showing a notification and appending them on notificationclick

## Outline

### Balanced
- Intro
  - Show lagging app
  - Explain measurement and problem
- Web Workers (with RL example)
	- Show what they can do (concurrency, no lag)
	- Explain the API
	- Show a RL refactoring
- Service Workers (with RL exmaple)
	- Show what they can do (prefetching)
	- Explain the API
	- Show a RL refactoring
- Outro

## Example

### Setup
- ```cd example```
- ```npm install & bower install```
- ```grunt serve```

### Idea
- Worker example for fetching new data from productmate api
  - in another thread (web worker)
  - outside of the context (service worker)
    - save as much of the state as possible in the service worker
