
class: center, middle

# Async/Await 

Simpler asynchronous JavaScript programming.

---

# Why not use callbacks?

**Very manual (and ugly and tedious)**

```javascript
function statDir(dirPath, callback) {
  fs.stat(dirPath, (err, stats) => {
    // Remember to pass error and early return
    if (err) return callback(err)

    // Remember to call callback
    callback(null, stats)
  })
}
```

---

# Why not use callbacks?

**Errors cannot be caught! (without mokey-patching the runtime)**

```javascript
// This will crash your server
try {
  statDir(__dirname, (err, stats) => {
    throw new Error('Boom.')
  })
} catch(err) {
  // Nope.
}
```

---

# Why not use callbacks?

**The pyramid of doom**

```javascript
foo((err, a) => {
  if (err) return callback(err)
  bar(a, (err, b) => {
    if (err) return callback(err)
    baz(b, (err, c) => {
      if (err) return callback(err)
      // Uhh.....
    })
  })
})
```

---

# Why not use callbacks?

**Even simple control-flows require complex libraries**

```javascript
async.waterfall([
  (callback) => {
    callback(null, 'foo')
  },
  (callback, foo) => {
    callback(null, 'bar')
  },
  (callback, bar) => {
    callback(null, 'baz')
  }
], (err, baz) => {
  console.log(baz)
})
```

---

# What about `Promise`?

**Better...**
- Native to JavaScript in ES6, node v0.11.13, io.js v1.0
- Automatic error handling
- Elegant chaining for control-flow
- Expectations are guaranteed in spec:
  - Call only once
  - Pass real errors
  - Pass only error or result
- **Still very confusing for beginners**
  
---

# What about `Promise`?

**Better**

```javascript
function statDir(dirPath) {
  return fs.promise.stat(dirPath)
}
```

---

# What about `Promise`?

**Errors can silently fail!**

```javascript
// You won't know this threw
statDir(__dirname).then(stats => {
    throw new Error('Boom.')
  })
  .then(someValue => {
    // Nope.
  })
```

---

# What about `Promise`?

**Promise Constructor**

```javascript
// Useful for complex or atypical flows
function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
```

---

# What about `Promise`?

**Simple control-flows are supported, but still not obvious**

```javascript
foo()








.
```

---

# What about `Promise`?

**Simple control-flows are supported, but still not obvious**

```javascript
foo()
  .then(a => {
 
  })
 
 
 
 
 
.
```

---

# What about `Promise`?

**Simple control-flows are supported, but still not obvious**

```javascript
foo()
  .then(a => {
    return bar(a)
  })





.
```

---

# What about `Promise`?

**Simple control-flows are supported, but still not obvious**

```javascript
foo()
  .then(a => {
    return bar(a)
  })
  .then(bar => {

  })


.
```

---

# What about `Promise`?

**Simple control-flows are supported, but still not obvious**

```javascript
foo()
  .then(a => {
    return bar(a)
  })
  .then(bar => {
    return baz(c)
  })



```

---

# What about `Promise`?

**Simple control-flows are supported, but still not obvious**

```javascript
foo()
  .then(a => {
    return bar(a)
  })
  .then(bar => {
    return baz(c)
  })
  .then(result => console.log(result))


```

---

# What about `Promise`?

**Simple control-flows are supported, but still not obvious**

```javascript
foo()
  .then(a => {
    return bar(a)
  })
  .then(bar => {
    return baz(c)
  })
  .then(result => console.log(result))
  // ALWAYS remember to check for errors!
  .catch(e => console.log(e.stack))
```

---

# `async/await`

**Our hero!**

```javascript
async main() => {
  let a = await foo()



}



main()



.
```

---

# `async/await`

**Our hero!**

```javascript
async main() => {
  let a = await foo()
  let b = await bar(a)
  let c = await baz(b)
  return result
}



main()



.
```

---

# `async/await`

**Our hero!**

```javascript
async main(someArg) => {
  let a = await foo(someArg)
  let b = await bar(a)
  let c = await baz(b)
  return result
}



main(someArg)



.
```

---

# `async/await`

**Our hero!**

```javascript
async main(someArg) => {
  let a = await foo(someArg)
  let b = await bar(a)
  let c = await baz(b)
  return result
}



main(someArg)



.
```

---

# `async/await`

**Our hero!**

```javascript
async main(someArg) => {
  let a = await foo(someArg)
  let b = await bar(a)
  let c = await baz(b)
  return result
}



main(someArg)
.then(result => console.log(result))


.
```

---

# `async/await`

**Our hero!**

```javascript
async main(someArg) => {
  let a = await foo(someArg)
  let b = await bar(a)
  let c = await baz(b)
  return result
}



main(someArg)
.then(result => console.log(result))
.catch(e => console.log(e.stack))

.
```

---

# `async/await`

**Our hero!**

```javascript
async main(someArg) => {
  let a = await foo(someArg)
  let b = await bar(a)
  let c = await baz(b)
  return result
}

async ()=> {

  let result = await main(someArg)



}()
```

---

# `async/await`

**Our hero!**

```javascript
async main(someArg) => {
  let a = await foo(someArg)
  let b = await bar(a)
  let c = await baz(b)
  return result
}

async ()=> {
  try {
    let result = await main(someArg)
  } catch(e) {
    console.log(e.stack)
  }
}()
```

---

# `async/await`

**Our hero!**

```javascript
// index.js
let main = require('./main')





async ()=> {
  try {
    let result = await main(someArg)
  } catch(e) {
    console.log(e.stack)
  }
}()
```

---

# `async/await`

**Synchronous-style Parallel IO**

```javascript
let all = Promise.all
async function main(someArg) {
  let [a, b, c] = all([foo(someArg), bar(), baz()])
  return a + b + c
}
```

---

# `async/await`

**Async Generators (`function*()/yield`)**

- Support today in node v0.11.13, io.js v1.0 with a library like `bluebird`

```javascript
function* main(someArg) {
  let a = yield foo(someArg)
  let b = yield bar(a)
  let c = yield baz(b)
  return result
}
bluebird.coroutine(function*() {
  try {
    let result = yield main()
  } catch(e) {
    console.log(e.stack)
  }
})
```

---

class: center, middle

# Questions?
