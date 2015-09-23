
class: center, middle

# Production Node.js

For node.js debugging, stability, tooling and performance.

https://cdn.rawgit.com/CrabDude/slides/master/production.html

---

# Overview

**Topics to cover:**

- Debugging
  - [`node-inspector`](https://www.npmjs.com/package/node-inspector) & [`babel-node-debug`](https://www.npmjs.com/package/babel-node-debug)
  - [`unhandledRejection`](https://nodejs.org/api/all.html#all_event_unhandledrejection)
  - [`trycatch`](https://github.com/CrabDude/trycatch/)
    - async `try/catch`
    - Long-stack-traces
    - [`uncaughtApplicationException`](https://github.com/CrabDude/trycatch/#uncaughtapplicationexception)
- Stability
  - [`uncaughtException`](https://nodejs.org/docs/latest/api/all.html#all_event_uncaughtexception)
  - [`cluster`](https://nodejs.org/docs/latest/api/all.html#all_cluster) for multi-process support
  - [`pm2`](https://github.com/Unitech/pm2) daemon
- Tooling
  - [`babel`](https://babeljs.io/) compilation
  - [`eslint`](http://eslint.org/)
  - Logging with [`debug`](https://www.npmjs.com/package/debug)
  - [`nodemon`](https://www.npmjs.com/package/nodemon)
- Performance
  - Event-loop blocking & monitoring
    - [`blocked`](https://www.npmjs.com/package/blocked)
    - [`event-loop-lag`](https://www.npmjs.com/package/event-loop-lag)
  - V8 heapdump analysis with Chrome & [`heapdump`](https://www.npmjs.com/package/idle-hands)

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
.
.
```

Option #2
```bash
.
.
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
.
```

Option #2
```bash
.
.
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2
```bash
.
.
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2 (daemon + [`--debug` flag(s)](https://nodejs.org/api/all.html#all_advanced_usage))
```bash
.
.
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2 (daemon + [`--debug` flag(s)](https://nodejs.org/api/all.html#all_advanced_usage))
```bash
node-inspector # start daemon in another tab
.
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2 (daemon + [`--debug` flag(s)](https://nodejs.org/api/all.html#all_advanced_usage))
```bash
node-inspector # start daemon in another tab
node --debug-brk      app.js # Adds breakpoint on line 1
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2 (daemon + [`--debug` flag(s)](https://nodejs.org/api/all.html#all_advanced_usage))
```bash
node-inspector # start daemon in another tab
node --debug-brk=5858 app.js # Adds breakpoint on line 1
.
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2 (daemon + [`--debug` flag(s)](https://nodejs.org/api/all.html#all_advanced_usage))
```bash
node-inspector # start daemon in another tab
node --debug-brk=5858 app.js # Adds breakpoint on line 1
node --debug      app.js
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2 (daemon + [`--debug` flag(s)](https://nodejs.org/api/all.html#all_advanced_usage))
```bash
node-inspector # start daemon in another tab
node --debug-brk=5858 app.js # Adds breakpoint on line 1
node --debug=5858 app.js
```

---

# Debugging

**Use Chrome DevTools to debug V8 with [`node-inspector`](https://github.com/node-inspector/node-inspector):**

```bash
npm install -g node-inspector
npm install -g babel-node-debug
```

Option #1
```bash
node-debug app.js
bode-debug app.js
```

Option #2 (daemon + [`--debug` flag(s)](https://nodejs.org/api/all.html#all_advanced_usage))
```bash
node-inspector # start daemon in another tab
node --debug-brk=5858 app.js # Adds breakpoint on line 1
node --debug=5858 app.js
```

*Note: The same flags work with `babel-node`.*

---

# Debugging

**Generate V8 heapdumps with `heapdump`:**

```bash
npm install heapdump
```

Usage:

```javascript
let heapdump = require('heapdump')
...
heapdump.writeSnapshot(filename, callback)
```

*Note: See [StrongLoop's heapdump post](https://strongloop.com/strongblog/how-to-heap-snapshots/), especially the Google Developers links.*

---

# Debugging: `unhandledRejection`

**Avoid silent failures from promise rejections.**

Emitted when a promise has no rejection handler at the time of rejection to eliminate silent failures captured by promises:

```javascript
process.on('unhandledRejection', (err) => {
  console.log('Ooops. Promise ignored rejection: ' + err.stack)
})

// This will trigger the event handler above:
fs.promise.readdir('nonsense directory')
  .then(data => {
    // Note: Only the success path is handled here
  })
```

*https://nodejs.org/api/all.html#all_event_unhandledrejection*

---

# Debugging: `trycatch`

**For better error handling.**

---

# Debugging: `trycatch`

**For better error handling.**

1. Stability by wrapping all application callbacks in `try/catch`

---

# Debugging: `trycatch`

**For better error handling.**

1. Stability by wrapping all application callbacks in `try/catch`
1. async `try/catch` (somewhat mitigated by `async/await`):

---

# Debugging: `trycatch`

**For better error handling.**

1. Stability by wrapping all application callbacks in `try/catch`
1. async `try/catch` (somewhat mitigated by `async/await`):

  ```javascript
  server.use((req, res, next) => {
    trycatch(next, err => send500(err, req, res))
  })
  ```

---

# Debugging: `trycatch`

**For better error handling.**

1. Stability by wrapping all application callbacks in `try/catch`
1. async `try/catch` (somewhat mitigated by `async/await`):

  ```javascript
  server.use((req, res, next) => {
    trycatch(next, err => send500(err, req, res))
  })
  ```
1. Long-stack-traces stitches stack-traces across event-loop ticks:

---

# Debugging: `trycatch`

**For better error handling.**

1. Stability by wrapping all application callbacks in `try/catch`
1. async `try/catch` (somewhat mitigated by `async/await`):

  ```javascript
  server.use((req, res, next) => {
    trycatch(next, err => send500(err, req, res))
  })
  ```
1. Long-stack-traces stitches stack-traces across event-loop ticks:

  ```javascript
  trycatch.configure({'long-stack-traces': true}) // Avoid in production
  ```

---

# Debugging: `trycatch`

**For better error handling.**

1. Stability by wrapping all application callbacks in `try/catch`
1. async `try/catch` (somewhat mitigated by `async/await`):

  ```javascript
  server.use((req, res, next) => {
    trycatch(next, err => send500(err, req, res))
  })
  ```
1. Long-stack-traces stitches stack-traces across event-loop ticks:

  ```javascript
  trycatch.configure({'long-stack-traces': true}) // Avoid in production
  ```
1. `uncaughtApplicationException` to avoid requiring a restart:

---

# Debugging: `trycatch`

**For better error handling.**

1. Stability by wrapping all application callbacks in `try/catch`
1. async `try/catch` (somewhat mitigated by `async/await`):

  ```javascript
  server.use((req, res, next) => {
    trycatch(next, err => send500(err, req, res))
  })
  ```
1. Long-stack-traces stitches stack-traces across event-loop ticks:

  ```javascript
  trycatch.configure({'long-stack-traces': true}) // Avoid in production
  ```
1. `uncaughtApplicationException` to avoid requiring a restart:

  ```javascript
  // Like 'unhandledRejection', but for callbacks / non-promises
  process.on('uncaughtApplicationException', (err) => {
      console.log('Ooops. Exception not handled: ' + err.stack)
  })
  ```

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

> Emitted when an exception bubbles all the way back to the event loop. If a listener is added for this exception, the default action (which is to print a stack trace and exit) will not occur.

- Listening on `uncaughtException` is like switching your jet from automatic to manual ejection. **You are now responsible for calling `process.exit()`**

*https://nodejs.org/api/process.html#process_event_uncaughtexception*

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

```javascript
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: \n' + err.stack)


    process.exit()



})
```

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

```javascript
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: \n' + err.stack)
    server.shutdown()

      .then(process.exit)



})
```

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

```javascript
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: \n' + err.stack)
    server.shutdown()
      .catch(err => console.log('Shut down error:\n', err.stack))
      .then(process.exit)



})
```

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

```javascript
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: \n' + err.stack)
    server.shutdown()
      .catch(err => console.log('Shut down error:\n', err && err.stack))
      .then(process.exit)



})
```

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

```javascript
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: \n' + err.stack)
    server.shutdown()
      .catch(err => console.log('Shut down error:\n', err.stack))
      .then(process.exit, process.exit)



})
```

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

```javascript
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: \n' + err.stack)
    server.shutdown()
      .catch(err => console.log('Shut down error:\n', err.stack))
      .then(process.exit, process.exit)

    // Hard exit.
    setTimeout(process.exit, 10000)
})
```

---

# Stability: `uncaughtException`

**Instead of crashing, handle errors and exit.**

```javascript
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: \n' + err.stack)
    server.shutdown()
      .catch(err => console.log('Shut down error:\n', err.stack))
      .then(process.exit, process.exit)

    // Hard exit.
    setTimeout(process.exit, 10000)
})
```

*Note: This may actually delay your process shutdown.*

---

# Stability: `cluster`

**No threads? No problem.**

---

# Stability: `cluster`

**No threads? No problem.**

- Port sharing

---

# Stability: `cluster`

**No threads? No problem.**

- Port sharing
- IPC, Inter-process communication

---

# Stability: `cluster`

**No threads? No problem.**

- Port sharing
- IPC, Inter-process communication
- Process lifecycle monitoring for restarts

---

# Stability: `cluster`

**No threads? No problem.**

- Port sharing
- IPC, Inter-process communication
- Process lifecycle monitoring for restarts
- Load balancing

---

# Stability: `cluster`

**Example:**

```javascript
// index.js
let cluster = require('cluster')




















.
```

---

# Stability: `cluster`

**Example:**

```javascript
// index.js
let cluster = require('cluster')
let workers = require('os').cpus().length



















.
```

---

# Stability: `cluster`

**Example:**

```javascript
// index.js
let cluster = require('cluster')
let workers = require('os').cpus().length

// Setup Master
cluster.setupMaster({
    exec: "app.js",
    args: ['--verbose']
})













.
```

---

# Stability: `cluster`

**Example:**

```javascript
// index.js
let cluster = require('cluster')
let workers = require('os').cpus().length

// Setup Master
cluster.setupMaster({
    exec: "app.js",
    args: ['--verbose']
})

// Fork Workers
for (let i = 0; i < workers; i++) {
    cluster.fork()
}








.
```

---

# Stability: `cluster`

**Example:**

```javascript
// index.js
let cluster = require('cluster')
let workers = require('os').cpus().length

// Setup Master
cluster.setupMaster({
    exec: "app.js",
    args: ['--verbose']
})

// Fork Workers
for (let i = 0; i < workers; i++) {
    cluster.fork()
}

cluster.on('exit', (worker, code, signal) => {


})

cluster.on('online', (worker) => {

})
```

---

# Stability: `cluster`

**Example:**

```javascript
// index.js
let cluster = require('cluster')
let workers = require('os').cpus().length

// Setup Master
cluster.setupMaster({
    exec: "app.js",
    args: ['--verbose']
})

// Fork Workers
for (let i = 0; i < workers; i++) {
    cluster.fork()
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)

})

cluster.on('online', (worker) => {
    console.log(`worker ${worker.process.pid} started`)
})
```

---

# Stability: `cluster`

**Example:**

```javascript
// index.js
let cluster = require('cluster')
let workers = require('os').cpus().length

// Setup Master
cluster.setupMaster({
    exec: "app.js",
    args: ['--verbose']
})

// Fork Workers
for (let i = 0; i < workers; i++) {
    cluster.fork()
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork()
})

cluster.on('online', (worker) => {
    console.log(`worker ${worker.process.pid} started`)
})
```

---

# Stability: PM2

**Use `pm2` for better process tooling.**

- Built-in clustering
- Log aggregation
- Process monitoring
- Process management

---

# Stability: PM2

**`pm2` commands:**

```bash
pm2 list              # List running pm2 application
```

![pm2 list](https://github.com/unitech/pm2/raw/master/pres/pm2-list.png)

---

# Stability: PM2

**`pm2` commands:**

```bash
pm2 start app -i max  # Start with maximum clustering

.
```

---

# Stability: PM2

**`pm2` commands:**

```bash
pm2 start app -i max  # Start with maximum clustering
pm2 stop app          # Stop
.
```

---

# Stability: PM2

**`pm2` commands:**

```bash
pm2 start app -i max  # Start with maximum clustering
pm2 stop app          # Stop
pm2 restart app       # Restart
```

---

# Stability: PM2

**`pm2` commands:**

```bash
pm2 describe app      # Show available process info
```

![pm2 list](https://github.com/unitech/pm2/raw/master/pres/pm2-monit.png)

---

# Stability: PM2

**`pm2` commands:**

```bash
pm2 monit             # Monitor (show logs) for applications
```

![pm2 list](https://github.com/unitech/pm2/raw/master/pres/pm2-logs.png)

Or view logs directly:

```bash
pm2 logs app          # Display logs for "app"
pm2 flush             # CLear all logs
```

---

# Stability: PM2

**`pm2` commands:**

```bash
pm2 reload app        # Restart cluster processes with 0ms downtime
```

---

# Tooling

**Different environments have different needs.**

- `babel`
- `eslint`
- `debug`
- `nodemon`

---

# Tooling: Transpilation (Babel)

**Pre-transpile your code with `babel`:**

```bash
# Outputs compiled code to stdout
babel src

# Specify output directory
babel src -d dist

#Specify transformers
babel src --optional asyncToGenerator

# Source-maps for non-prod environments
babel src -d dist --source-maps
```

Run the transpiled code:

```bash
node dist/index.js
```

---

# Tooling: Transpilation (Babel)

**Specify your `babel` configuration in a `.babelrc`:**

```json
{
  "optional": ["bluebirdCoroutines"]

}
```

---

# Tooling: Transpilation (Babel)

**Specify your `babel` configuration in a `.babelrc`:**

```json
{
  "optional": ["asyncToGenerator"]

}
```

---

# Tooling: Transpilation (Babel)

**Specify your `babel` configuration in a `.babelrc`:**

```json
{
  "optional": ["runtime"]

}
```

---

# Tooling: Transpilation (Babel)

**Specify your `babel` configuration in `package.json`:**

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

---

# Tooling: `npm` scripting

**Toggle bootstrap file based on `NODE_ENV`:**

```javascript
//package.json
{
    "scripts": {
        "start": "nodemon --exec babel-node -- --stage 1 --optional strict -- index.js",


    }
}
```

---

# Tooling: `npm` scripting

**Toggle bootstrap file based on `NODE_ENV`:**

```javascript
//package.json
{
    "scripts": {
        "start-dev": "nodemon --exec babel-node -- --stage 1 --optional strict -- index.js",


    }
}
```

---

# Tooling: `npm` scripting

**Toggle bootstrap file based on `NODE_ENV`:**

```javascript
//package.json
{
    "scripts": {
        "start-dev": "nodemon --exec babel-node -- --stage 1 --optional strict -- index.js",
        "start-prod": "pm2 start index.js -i max"

    }
}
```

---

# Tooling: `npm` scripting

**Toggle bootstrap file based on `NODE_ENV`:**

```javascript
//package.json
{
    "scripts": {
        "start-dev": "nodemon --exec babel-node -- --stage 1 --optional strict -- index.js",
        "start-prod": "pm2 start index.js -i max",
        "start": "[[ \"$NODE_ENV\" = \"production\" ]] && npm run start-prod || npm run start-dev"
    }
}
```

---

# Tooling: `npm` scripting

**Toggle bootstrap file based on `NODE_ENV`:**

```javascript
//package.json
{
    "scripts": {
        "start-dev": "nodemon --exec babel-node -- --stage 1 --optional strict -- index.js",
        "start-prod": "pm2 start index.js -i max",
        "start": "[[ \"$NODE_ENV\" = \"production\" ]] && npm run start-prod || npm run start-dev"

    }
}
```

Run the server with `npm start` every time:

```bash
$ NODE_ENV=production npm start
```

---

# Tooling: Linting

**Lint code manually  before its checked in:**

```bash
// package.json
{
    "scripts": {
        "test": "eslint ./ && mocha"
    }
}
```

---

# Tooling: Linting

**Lint code automatically as a precommit hook:**


Store in `project_root/.git/hooks/pre-commit`:

```bash
#!/bin/bash
files=$(git diff --cached --name-only | grep '\.jsx\?$')

# Prevent ESLint help message if no files matched
if [[ $files = "" ]] ; then
  exit 0
fi

failed=0
for file in ${files}; do
  git show :$file | eslint --stdin --stdin-filename $file
  if [[ $? != 0 ]] ; then
    failed=1
  fi
done;

if [[ $failed != 0 ]] ; then
  echo "ESLint check failed, commit denied"
  exit $failed
fi
```

---

# Event-loop monitoring

> Knowing is half the battle.
*-- G.I. Joe*

- Node.js is for IO-bound tasks
- Blocking (CPU or Sync-IO) adds latency to **ALL** concurrent requests
- Event-loop iterations should be < 10ms

---

# Event-loop monitoring

**Naive solution:**

```javascript
let blockDelta = 10 // Only report >10ms lag
let frequency = 1000
setInterval(() => {
    let last = Date.now()
    setImmediate(() => {
        let delta = Date.now() - last
        if (delta > blockDelta) {
            console.log(`Event-loop blocked ${delta}ms`)
        }
    })
}, frequency)
```

---

# Event-loop monitoring

**`blocked` - "Check if the event loop is blocked."**

```bash
npm install blocked
```

```javascript
let blocked = require('blocked')

// ... Blocking code here (IO-Sync or CPU-intensive)

blocked(ms => console.log('Blocked for ' + ms))
```

---

# Event-loop monitoring

**`event-loop-lag` - Measure the event loop lag.**

```bash
npm install event-loop-lag
```

```javascript
// Update lag time every 1000ms
let lag = require('event-loop-lag')(1000)

setInterval(() => console.log(`Event-loop lag time: ${lag()}ms`), 1000)
```

*Best when combined with metrics graphing (e.g., Graphite)*

---

# Additional References

- [`idle-hands`](https://www.npmjs.com/package/idle-hands) - Perform low priority processing when event loop is idle.
- [`i-json`](https://github.com/bjouhier/i-json) - Fast incremental JSON parser
- [`webworker-threads`](https://www.npmjs.com/package/webworker-threads) - WebWorkers compatible API for CPU-bound computations
- [`node-webkit-agent`](https://github.com/c4milo/node-webkit-agent) - V8 heapdump analyzer UI
- [Flame Graphs](http://www.brendangregg.com/flamegraphs.html)
- Joyent ["Production Practices"](https://www.joyent.com/developers/node/design)
- [Tracking Down Memory Leaks in Node.js](https://hacks.mozilla.org/2012/11/tracking-down-memory-leaks-in-node-js-a-node-js-holiday-season/)

---

class: center, middle

# Questions?
