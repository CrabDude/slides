
class: center, middle

# Streams

Hungry? Why wait?

*... for the rest of your data*

---

# Streams: Intro

*"We should have some ways of connecting programs like garden hose--screw in another segment when it becomes necessary to massage data in another way. This is the way of IO also."*

-- Doug McIlroy. October 11, 1964, Original developer of Unix pipes

---

# Streams: Intro

### Streams are like Arrays, but laid out in time, rather than in memory.

---

# Streams: Intro

**Useful for:**

- Decreased Latency
  - Start processing data **before the final bit arrives**
  - Start sending a response **before the final bit arrives**
- Decreased Memory Overhead
  - Process data in chunks **without buffering**
  - Especially useful for large files that exceed available memory
- Consistency
  - Normalized API for operating on dispareate data types
  - *E.g., stream of objects, files, text, binary, ...*

---

# Streams: Types

**Node.js Streams are "pull streams":**

Data sent upon request, buffered by internal buffer to avoid dropped packets

- `stream.Readable`
- `stream.Writable`
- `stream.Transform`
- `stream.Duplex`

---

# Streams: `.pipe()`

**All streams can use `.pipe()` to pair source (readable) streams inputs with destination (writeable) streams outputs:**

```javascript
source.pipe(destination)

// .pipe(destination) returns destination to allow for chaining
a.pipe(b).pipe(c).pipe(d)

// Equivalent to:
a.pipe(b)
b.pipe(c)
c.pipe(d)

// or the following in bash: a | b | c | d
```

---

# Streams: `.pipe()`

- Automatically handles backpressure when `source` is faster than `destination`
- `.pipe()` connects `source` events to `destination` method calls:

```javascript
source.pipe(destination)

// Equivalent to...
source.on('data', chunk => destination.write(chunk))
source.on('close', () => destination.close())
source.on('error', err => destination.emit('error', err))
// etc...
```

---

# Streams: `stream.Readable`

### A readable stream **outputs** data.

Can be used as a `source` stream to pipe to `destination` streams:

- `stream.Writable`
- `stream.Duplex`
- `stream.Transform`

```javascript
readable.pipe(writableOrTransformOrDuplex)
```

---

# Streams: `stream.Readable`

### A readable stream **outputs** data.

Examples:
- http responses from remote server
- http request from client
- filesystem read streams
- zlib streams
- crypto streams
- TCP (`net`) sockets
- `child_process` stdout & stderr
- `process.stdin`

---

# Streams: `stream.Readable`

Reading a file **without** streams:

```javascript
let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
    fs.promise.readFile(__filename)
      .then(data => res.end(data))
})
server.listen(8000)
```
Cons:
- Verbose
- Store copy of file in memory for **every request**
- Must wait for `.readFile` to complete before responding

---

# Streams: `stream.Readable`

Reading a file **with** streams:

```javascript
let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
    fs.createReadStream(__filename).pipe(res)
})
server.listen(8000)
```
Pros:
- Simple & Concise
- Lower latency & memory pressure

---

# Streams: `stream.Readable`

Add compression with **just 1 line!**

```javascript
let http = require('http')
let fs = require('fs')
let oppressor = require('oppressor')

let server = http.createServer((req, res) => {
  fs.createReadStream(__filename)
    .pipe(oppressor(req))
    .pipe(res)
})
server.listen(8000)
```

---

# Streams: `stream.Readable`

### Implement `._read` to **create your own:**

```javascript
let Readable = require('stream').Readable
let readableStream = Readable()

let c = 97
readableStream._read = () => {
  // Send data with .push()
  readableStream.push(String.fromCharCode(c++))

  // Terminate by pushing null
  if (c > 'z'.charCodeAt(0)) readableStream.push(null)
}
readableStream.pipe(process.stdout)
```

- Push data before or after being piped

---

# Streams: `stream.Readable`

Notes:
- Start in **non-flowing** or paused mode (sometimes buffered by core)
- `.pipe()` unpauses the `source` stream by calling `.resume()`
- Adding a `data` event will unpause a stream

---

# Streams: `stream.Readable`

Read a stream manually by calling `.read()`:

```javascript
process.stdin.on('readable', () => console.log(process.stdin.read()))
```

---

# Streams: `stream.Writeable`

### A writeable stream **intputs** data.

Can be used as a `destination` stream to pipe **from** `source` streams:

- `stream.Readable`
- `stream.Duplex`
- `stream.Transform`

```javascript
readableOrTransformOrDuplex.pipe(writeable)
```

---

# Streams: `stream.Writeable`

### A writeable stream **inputs** data.

Examples:
- http request from remote server
- http responses from client
- filesystem write streams
- zlib streams
- crypto streams
- TCP (`net`) sockets
- `child_process` stdin
- `process.stdout`

---

# Streams: `stream.Writeable`

Writing a file **without** streams:

```javascript
let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
  req.on('end', () => {
    let buffer, chunk
    while(chunk = req.read()) {
      buffer.concat(chunk)
    }
    fs.promise.writeFile(__dirname + '/data.txt', buffer)
      .then(() => res.end())
  })
})
server.listen(8000)

```
Cons:
- Verbose
- Store copy of req.body in memory for **every request**
- Must wait for `req` to complete before writing the file

---

# Streams: `stream.Writeable`

Writing a file **with** streams:

```javascript
let http = require('http')
let fs = require('fs')

let server = http.createServer((req, res) => {
    res.pipe(fs.createwriteStream(__filename))
})
server.listen(8000)
```
Pros:
- Simple & Concise
- Lower latency & memory pressure

---

# Streams: `stream.Writeable`

### Implement `._write` to **create your own:**

```javascript
let Writable = require('stream').Writable
let writableStream = new Writable

// Implement the _write function to consume data
writableStream._write = (chunk, enc, next) => {
  process.stdout.write(String(chunk))
  setTimeout(next, 300)
}

process.stdin.pipe(writableStream)
```

- Push data before or after being piped

---

# Streams: `stream.Writeable`

Write to a stream manually by calling `.write()`:

```javascript
process.stdout.write('some data')
```

---

# Streams: `stream.Duplex`

### A duplex stream is both **readable** and **writable** (like a telephone call).

Examples:
- RPC connection
- TCP socket
- WebSocket

```javascript
// Input data is decoupled from output data
client.pipe(duplex).pipe(client)
```

---

# Streams: `stream.Duplex`

### A duplex stream is both **readable** and **writable** (like a telephone call).

```javascript
let net = require('net')
let server = net.createServer()
server.listen(8000)
server.on('connection', socket => {
  socket.on('data', data => console.log('data'))

  // Some time later....
  socket.write(someValue)
})
```

---

# Streams: `stream.Transform`

### A transform stream (aka "through" stream) is a special case of duplex stream where the output is related to the input in some manner.

Examples:
- `capitalizeTextStream`
- An HTTP request with a corresponding response
- `archiver`

```javascript
// Input data is coupled to output data
client.pipe(duplex).pipe(client)
```

---

# Streams: `stream.Transform`

### A transform stream (aka "through" stream) is a special case of duplex stream where the output is related to the input in some manner.

```javascript
let fs = require('fs')
let request = require('request')
let duplexStream = request('http://google.com')
fs.createReadStream(__filename).pipe(duplexStream).pipe(process.stdout)
```

---

# Streams: `stream.Transform`

### Implement `._transform` to **create your own:**

```javascript
let Transform = require('stream').Transform
let stringifyStream = new Transform

stringifyStream._transform = (chunk, enc, next) => {
  // Add arbitrary delay
  setTimeout(() => {
    next(null, String(chunk))
  }, 300)
}

process.stdin.pipe(transformStream).pipe(process.stdout)
```

---

# Streams: `stream.Transform`

### Or **create your own** transform stream class:

```javascript
let fs = require('fs')
let Transform = require('stream').Transform

class CapsLockStream extends Transform {
  constructor() {
    super()
  }

  _transform(data, encoding, done) {
    for (let i = 0; i < data.length; i++) {
      // Capitalize character
      if (data[i] >= 97 && data[i] <= 122) {
        data[i] &= ~32
      }
    }
    this.push(data)
    done()
  }
}

process.stdin.pipe(new CapsLockStream).pipe(process.stdout)
```

---

class: center, middle

# Questions?
