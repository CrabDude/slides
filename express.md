
class: center, middle

# Express

Building your first node.js server.

---

# Why not use `http`?

- Very low level
- No cookie handling or parsing
- No session support
- No routing
- No static file serving

---

```javascript
let http = require('http')
```

---

```javascript
let http = require('http')

let server = http.createServer((req, res) => {
  




})



server.listen(8000, '127.0.0.1')
```

---

```javascript
let http = require('http')

let server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  let result = { version: '1.0.0' }
  res.end(JSON.stringify(result))


})



server.listen(8000, '127.0.0.1')
```

---

```javascript
let http = require('http')

let handler = (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  let result = { version: '1.0.0' }
  res.end(JSON.stringify(result))


})

let server = http.createServer(handler)

server.listen(8000, '127.0.0.1')
```

---

```javascript
let http = require('http')

let dispatcher = (req, res) => {
  switch(req.url) {
    case '/version': version(req, res); break;
    case '/user': user(req, res); break;
    default: notFound(req, res); break;
  }
})

let server = http.createServer(dispatcher)

server.listen(8000, '127.0.0.1')
```

---

# Express

### Why use a framework?
- Foundation fo collaboration & code reuse
- Battle tested: memory leaks, bugs, stability, debugging

### Why use Express?
- Simple REST API routing
- Massive middleware ecosystem ("There's a middleware for that")
- ~80% market-share

---

# Express: Middleware

**You decide what blocks you want:**
- Static file server
- Logging: `morgan`
- Body parsing: `body-parser`
- Cookie parsing: `cookie-parser`
- Session handling: `express-session`
- Authentiction: `passport`
- etc...

---

# Express: Middleware

```javascript
let connect = require('connect')
let app = express()

// First middleware in pipeline
app.use((req, res, next) => {
  // Send to next handler if url not /about
  if (req.url != '/about') return next()
  res.end('About page')
})

// Second middleware in pipeline
app.use((req, res, next) => {
  res.end('Default page')
})

app.listen(8080, '127.0.0.1')
```

---

# Express: Configuration

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // Verbose logging
}

---

# Express: Routing

```javascript
let express = require('express')
let app = express()










```

---

# Express: Routing

```javascript
let express = require('express')
let app = express()








```

---

# Express: Routing

```javascript
let express = require('express')
let app = express()

app.get('/version', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  var result = { version: '1.0.0' }
  res.end(JSON.stringify(result))
})


```

---

# Express: Routing

```javascript
let express = require('express')
let app = express()

app.get('/version', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  var result = { version: '1.0.0' }
  res.end(JSON.stringify(result))
})

app.listen(3000)
```

---

# Express: Routing

```javascript
let express = require('express')
let app = express()

app.get('/version', (req, res) => {
  let result = { version: '1.0.0' }
  res.json(result)
})


app.listen(3000)
```

---

# Express: Parameters

```javascript


let user = (req, res) => {
  
  let item = { id: 1, name: 'John' }
  
  res.json(item)
}

app.get('/user', user)
```

---

# Express: Parameters

```javascript
let users = require('./users.json')

let user = (req, res) => {
  
  let item = users[req.params.id]
  
  res.json(item)
}

app.get('/user', user)
```

---

# Express: Parameters

```javascript
let users = require('./users.json')

let user = (req, res) => {
  
  let item = users[req.params.id]
  if (!req.params.id) return res.json(users)
  res.json(item)
}

app.get('/user', user)
```

---

# Express: Parameters

```javascript
let users = require('./users.json')

let user = function (req, res) {
  
  let item = users[req.params.id]
  if (!item) return res.send(404, 'not found')
  res.json(item)
}

app.get('/user/:id', user)
```

---

# Express: Parameters

```javascript
let users = require('./users.json')

let user = function (req, res) {
  if (!req.params.id) return res.json(users)
  let item = users[req.params.id]
  if (!item) return res.send(404, 'not found')
  res.json(item)
}

app.get('/user/:id?', user)
```

---

# Express: Sanitizing Parameters

```javascript
app.param(':id', (v) => {
  return parseInt(v, 10)
})

app.get('/user/:id', (req, res) => {
  res.send('user id: ' + req.params.id)
})
```

--- 

# Express: Middleware

```javascript
let express = require('express')
let app = express()




app.get('/user', user)





```

---

# Express: Middleware

```javascript
let express = require('express')
let app = express()
let bodyParser = require('body-parser')


app.use(bodyParser.text())
app.get('/user', user)





```

---

# Express: Middleware

```javascript
let express = require('express')
let app = express()
let bodyParser = require('body-parser')


app.use(bodyParser.text())
app.get('/user', user)

let register = (req, res) => {
  // use req.body to create new user
}
app.post('/user', register)
```

---

# Express: Custom Middleware

```javascript
let customMiddleware = function (req, res, next) {
  res.setHeader('X-API-Version', '1.0.0')
  return next()
}

app.use(bodyParser())
app.use(customMiddleware)
app.get('/user', user)
```

---

# Express: Basic Auth

```javascript
let express = require('express')
let app = express()









app.get('/user', user)
```

---

# Express: Basic Auth

```javascript
let express = require('express')
let app = express()



let validate = (username, password, callback) => {
  let result = (username === 'steve' && password === '12345')
  callback(null, result)
}


app.get('/user', user)
```

---

# Express: Basic Auth

```javascript
let express = require('express')
let app = express()
let basicAuth = require('basic-auth-connect')
let auth = basicAuth(validate)

let validate = (username, password, callback) => {
  let result = (username === 'steve' && password === '12345')
  callback(null, result)
}



app.get('/user', user)
```

---

# Express: Basic Auth

```javascript
let express = require('express')
let app = express()
let basicAuth = require('basic-auth-connect')
let auth = basicAuth(validate)

let validate = (username, password, callback) => {
  let result = (username === 'steve' && password === '12345')
  callback(null, result)
}

app.use(auth)

app.get('/user', user)
```

---

# Express: Basic Auth

```javascript
let express = require('express')
let app = express()
let basicAuth = require('basic-auth-connect')
let auth = basicAuth(validate)

let validate = (username, password, callback) => {
  let result = (username === 'steve' && password === '12345')
  callback(null, result)
}



app.get('/user', auth, user)
```
---

# Express: Middleware

**Redundant code...**

```javascript
app.get('/user/:id', (req, res) => {
  let id = req.params.id
  User.get(id).then(user => {
    res.send('user ' + user.name)
  })
})

app.put('/user/:id', (req, res) => {
  let id = req.params.userId
  User.get(id).then(user => {
    user.update(req.body)
  })
})
```

---

# Express: Middleware

**Refactored to use middleware:**

```javascript
let loadUser = (req, res, next) => {
  let id = req.params.id
  let promise = User.get(id).then(user => {
    if (!user) throw new Error('invalid userId')
    req.user = user
  })
    
  nodeify(promise, next)
})

app.get('/user/:id', loadUser, (req, res) => {
  res.send('user ' + req.user.name)
})

app.put('/user/:id', loadUser, (req, res) => {
  req.user.update(req.body)
})
```

---

# Express: Stacking

```javascript
app.put('/user/:id', isAdmin, loadUser, (req, res) => {
  req.user.update(req.body)
})
```

is cleaner than...

```javascript
app.put('/user/:id', (req, res, next) => {
  // Verify if the current user is an admin
  isAdmin(req, res, (err) => {
    if (err) return next(err)
    loadUser(req, res, (err, user) => {
      if (err) return next(err)
      req.user.update(req.body)
    })
  })
})
```

---

# Express: Rendering Views

```javascript
app.get('/user/:id', loadUser, function(req, res) {
  res.render('user_edit', {
    locals: {
      user: req.user,
      title: 'Edit User ' + req.user.username
    }
  })
})
```

---

class: center, middle

# Questions?
