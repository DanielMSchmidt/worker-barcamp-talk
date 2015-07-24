# Worker Campfire Barcamp 2015

## Outline

<== current selection

### Balanced (<==)
- Intro
- Web Workers (with RL example)
	- Show what they can do (concurrency, no lag)
	- Explain the API
	- Show a RL refactoring
- Service Workers (with RL exmaple)
	- Show what they can do (prefetching)
	- Explain the API
	- Show a RL refactoring
- Outro

### Focus on Service Worker
- Intro
- Service Worker API
- Service Worker possibilities
- Service Worker in the wild
- Outro


## Example

- Worker example for fetching new data from productmate api
  - in another thread (web worker)
  - outside of the context (service worker)
    - save as much of the state as possible in the service worker

- Testing in worker: http://maximilianschmitt.me/posts/testing-web-workers-with-jasmine-and-gulp/
