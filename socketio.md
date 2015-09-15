
class: center, middle

# Socket.io

For realtime PUBSUB in node.js.

---

# Why socket.io?

**Built on [Engine.io](https://github.com/socketio/engine.io)**

- Not all browsers support WebSockets
- Manually managing transport layers is a hassle
- A single normalized `EventEmitter` API:

  ```javascript
  // Publish / emit to...

  // All connected clients
  io.emit('eventName', payload)

  // All connections for a single user session
  socket.to(socket.id).emit('eventName', payload)

  // A single connection
  socket.emit('eventName', payload)
  ```

*Note: See [here](http://www.slideshare.net/EyalV/nodejs-socketio-37327827) for more details on the transport layer / API compatibility issue.*

---

# Why socket.io?

**Batteries (additional features) included:**

---

# Why socket.io?

**Batteries (additional features) included:**

- Broadcasting

---

# Why socket.io?

**Batteries (additional features) included:**

- Broadcasting
- Volatility

---

# Why socket.io?

**Batteries (additional features) included:**

- Broadcasting
- Volatility
- Rooms

---

# Why socket.io?

**Batteries (additional features) included:**

- Broadcasting
- Volatility
- Rooms
- Namespaces

---

# Why socket.io?

**Batteries (additional features) included:**

- Broadcasting
- Volatility
- Rooms
- Namespaces
- Request/response

---

# Why socket.io?

**Batteries (additional features) included:**

- Broadcasting
- Volatility
- Rooms
- Namespaces
- Request/response
- [And more!](http://socket.io/docs/)

---

# socket.io

**Setting up the server:**

```javascript
// server.js
let express = require('express')
let io = require('socket.io')
let HttpServer = require('http').Server

let app = express()
let httpServer = HttpServer(app)
let ioServer = io(httpServer)

httpServer.listen(8000)
```

---

# socket.io

**Setting up the client:**

```javascript
// client.js
let io = require('socket.io-client')
let socket = io()


// Or pass a custom host and port:
let socket = io('http://127.0.0.1:8000')
```

---

# socket.io

**Connection handling:**

```javascript
// server.js
ioServer.on('connection', socket => {
  console.log('user connected')
  socket.on('disconnect', () => console.log('user disconnected'))
})
```

```javascript
// client.js
socket.on('connect', ()=>console.log('connected'))

// Also, 'disconnect', 'reconnect', 'reconnecting', etc...
```
---

# socket.io

**Messaging:**

```javascript
// server.js
ioServer.on('connection', socket => {
  socket.on('eventName', msg => {
    // echo back to EVERYONE
    ioServer.emit('eventName', msg)

    // echo back to JUST socket
    socket.emit('eventName', msg)
  })
})
```

```javascript
// client.js
socket.emit('eventName', 'Hello world!')
socket.on('eventName', msg => console.log('message: ', msg))
```

---

# socket.io

**Targeted messaging with "rooms":**

```javascript
// server.js
ioServer.on('connection', socket => {
  socket.on('eventName', msg => {
    // echo to users in a room
    ioServer.to('someRoom').emit('eventName', msg)

    // echo to all connections in the same session
    ioServer.to(socket.id).emit('eventName', msg)
  })
})
```

```javascript
// client.js
socket.join('someRoom')
socket.on('eventName', msg => console.log('message: ', msg))
```

*Note: Clients automatically `.join(socket.id)`*

---

# socket.io

**Request/response messaging**

```javascript
// server.js
ioServer.on('connection', socket => {
  socket.on('clientRequestEvent', (msg, fn) => {
    // Responsd to client with payload
    fn('The current server time is: ' + Date.now())
  })
})
```

```javascript
// client.js
let requestPayload = {}
socket.emit('clientRequestEvent', requestPayload, currentServerTime => {
  console.log(currentServerTime)
})
```

---

# socket.io

**Broadcasting: emit to all except the current socket:**

```javascript
// server.js
ioServer.on('connection', socket => {
  socket.broadcast.emit('someEvent', 'New connection for id: ' + socket.id)
})
```

```javascript
// client.js
socket.broadcast.emit('helloEvent', 'Howdy everyone!')
```

---

# socket.io

**Volatile messages: Delivery not guaranteed**

```javascript
socket.volatile.emit('thinking about sandwiches', true)
```

---

class: center, middle

# Questions?

