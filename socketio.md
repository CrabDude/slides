
class: center, middle

# Socket.io

For realtime PUBSUB in node.js.

---

# Why socket.io?

**Manually managing transport layers is a hassle:**

- Not all browsers support WebSockets
- A single normalized `EventEmitter` API:

  ```javascript
  socket.emit(event, payload)
  ```

http://www.slideshare.net/EyalV/nodejs-socketio-37327827

---
# socket.io

**Setting up the server:**

```javascript
// server.js
let express = require('express')
let io = require('socket.io')
let Server = require('http').Server

let app = express()
let server = Server(app)
let ioServer = io(server)

server.listen(8000)
```

---

# socket.io

**Setting up the client:**

```javascript
// client.js
let io = require('socket.io-client')
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
```
---

# socket.io

**Messaging:**

```javascript
// server.js
ioServer.on('connection', socket => {
  socket.on('customMessageEvent', msg => {
    // echo back
    ioServer.emit('customMessageEvent', msg)
  })
})
```

```javascript
// client.js
socket.on('customMessageEvent', msg => console.log('message: ', msg))
```

---

# socket.io

**Broadcasting:**

```javascript
// server.js
ioServer.on('connection', socket => {
  socket.on('customMessageEvent', msg => {
    // echo back
    ioServer.emit('customMessageEvent', msg)
  })
})
```

```javascript
// client.js
socket.on('customMessageEvent', msg => console.log('message: ', msg))
```

---

# socket.io

**Messaging:**

```javascript
// server.js
ioServer.on('connection', socket => {
  socket.on('customMessageEvent', msg => {
    // echo back
    ioServer.emit('customMessageEvent', msg)
  })
})
```

```javascript
// client.js
socket.on('customMessageEvent', msg => console.log('message: ', msg))
```

---

class: center, middle

# Questions?
