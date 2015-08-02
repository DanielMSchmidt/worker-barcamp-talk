# Worker Campfire Barcamp 2015

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

## Profiling

- to load the timeline data into your chrome timeline, open it in the developer tools and rightclick. Then select "Load Timeline Data" and load the file