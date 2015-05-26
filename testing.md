
class: center, middle

# Testing

Safety starts with you.

---

# Testing

**Overview:**

- Terminology
- Mocha - **The** node.js test framework
- Chai - For BDD assertions
- Sinon.js - For spies, stubs and mocks
- Gulp - For automated task and test running

---

# Terminology

**Integration Test**

A test which tests the result of systems interacting

*Typically, blackbox testing that is ignorant to internal implementations*

---

# Terminology

~~Integration Test~~

---

# Terminology

**Unit Test**

A test which tests the results of a specific unit of code

*Typically, whitebox testing that isolates internal functionality through the use of spies, stubs and mocks*

---

# Why Test?

**What is unit testing?**

- Write code to test code

---

# Why Test?

**What is unit testing?**

- Write code to test code
- Make sure code functionality works

---

# Why Test?

**What is unit testing?**

- Write code to test code
- Make sure code functionality works
- Granular, single-focus assertions

---

# Why Test?

**What is unit testing?**

- Write code to test code
- Make sure code functionality works
- Granular, single-focus assertions
- Tests results, not internals

---

# Why Test?

**Why unit test?**

- Eliminates the redundancy of testing features

---

# Why Test?

**Why unit test?**

- Eliminates the redundancy of testing features
- Faster than testing functionality manually

---

# Why Test?

**Why unit test?**

- Eliminates the redundancy of testing features
- Faster than testing functionality manually
- Makes code easier to maintain:

---

# Why Test?

**Why unit test?**

- Eliminates the redundancy of testing features
- Faster than testing functionality manually
- Makes code easier to maintain:
  - Confident refactoring

---

# Why Test?

**Why unit test?**

- Eliminates the redundancy of testing features
- Faster than testing functionality manually
- Makes code easier to maintain:
  - Confident refactoring
  - Avoid regressions

---

# Why Test?

**Why unit test?**

- Eliminates the redundancy of testing features
- Faster than testing functionality manually
- Makes code easier to maintain:
  - Confident refactoring
  - Avoid regressions
  - Requiring testability decreases complexity

---

# Why Mocha?

**Features:**

- Runs on node.js & browser
- Unoppinionated on assertion & mocking libraries
- Built-in performance measuring
- `async` & `Promise` support
- File watcher support
- Filename pattern matching

---

# Mocha TDD

**BDD Interface:**

```javascript
// test/test.js
let assert = require('assert')
describe('Test suite', ()=> {
  describe('feature', ()=> {
    it('should have the expected behavior', async ()=> {
      await process.promise.nextTick()
      assert.equal(true, true)
    })
  })
})
```

- Groups tests with `describe`
- Groupings can be nested
- Describe a test with `it`

---

# Mocha TDD

**Basic Example:**

```javascript
// test/test.js
let assert = require('assert')
describe('Test suite', ()=> {
  describe('feature', ()=> {
    it('should have the expected behavior', async ()=> {
      await process.promise.nextTick()
      assert.equal(true, true)
    })
  })
})
```

```bash
npm install -g mocha
```


```bash
mocha test/test.js
```

---

# Mocha TDD

**Basic Example Output:**

```bash

$ mocha test/test.js









.
```

---

# Mocha TDD

**Basic Example Output:**

```bash

$ mocha 









.
```

---

# Mocha TDD

**Basic Example Output:**

```bash
$ # Runs ./test/*.js by default
$ mocha









.
```

---

# Mocha TDD

**Basic Example Output:**

```bash
$ # Runs ./test/*.js by default
$ mocha

> slides-code@1.0.0 test /code
> mocha

  Test suite
    feature
      ✓ should have the expected behavior


  1 passing (55ms)
```

---

# Mocha TDD

**Run tests with `npm test`:**

```bash
npm install --save-dev mocha
```

---

# Mocha TDD

**Run tests with `npm test`:**

```bash
npm install --save-dev mocha
```

Add a `"scripts"` entry to `package.json`:

```javascript
{
  "scripts": {
    // Run tests in /test using local or global mocha
    "test": "mocha"
  }
}
```

```bash
$ npm test
```

---

# Mocha TDD

**Run tests with `npm test`:**

```bash
npm install --save-dev mocha
```

Add a `"scripts"` entry to `package.json`:

```javascript
{
  "scripts": {
    // or with options:
    "test": "mocha --reporter spec testDirectory"
  }
}
```

```bash
$ npm test
```

---

# Mocha TDD

**Write tests using ESNext with Babel:**

```bash
npm install --save-dev babel
```

**Option 1:**

```javascript
{
  "scripts": {
    // As a compiler option
    "test": "mocha --compilers js:babel/register"
  }
}
```

```bash
$ npm test
```

---

# Mocha TDD

**Write tests using ESNext with Babel:**

```bash
npm install --save-dev babel
```

**Option 2 (preferred):**

```javascript
{
  "scripts": {
    // As a programmatic require
    "test": "mocha --require babelhook"
  }
}
```

```javascript
// project_root/babelhook.js
// Enable async/await
require("babel/register")({ stage: 1 })
```

---

# Mocha TDD

**Setup & Teardown:**

Avoid code duplication with supported *global* hooks:

- `before` & `after`: run once
- `beforeEach` & `afterEach`: run once per test

---

# Mocha TDD

**Setup & Teardown:**

Avoid code duplication with supported *global* hooks:

- `before` & `after`: run once
- `beforeEach` & `afterEach`: run once per test
- Can be nested in **any** `describe`

---

# Mocha TDD

**Setup & Teardown:**

Avoid code duplication with supported *global* hooks:

- `before` & `after`: run once
- `beforeEach` & `afterEach`: run once per test
- Can be nested in **any** `describe`

```javascript
describe('Test suite', ()=> {




  describe('feature', ()=> {








    it('should have the expected behavior', async ()=> {
      let record = await db.find({})
      assert.equals(someRecord.id, record.id)
    })
  })
})
```

---

# Mocha TDD

**Setup & Teardown:**

Avoid code duplication with supported *global* hooks:

- `before` & `after`: run once
- `beforeEach` & `afterEach`: run once per test
- Can be nested in **any** `describe`

```javascript
describe('Test suite', ()=> {
  before(async ()=> {
    await db.connect()
  })

  describe('feature', ()=> {
    
      
    

    
    
    

    it('should have the expected behavior', async ()=> {
      let record = await db.find({})
      assert.equals(someRecord.id, record.id)
    })
  })
})
```

---

# Mocha TDD

**Setup & Teardown:**

Avoid code duplication with supported *global* hooks:

- `before` & `after`: run once
- `beforeEach` & `afterEach`: run once per test
- Can be nested in **any** `describe`

```javascript
describe('Test suite', ()=> {
  before(async ()=> {
    await db.connect()
  })

  describe('feature', ()=> {
    beforeEach(async ()=> {
      await db.save(someRecord)
    })





    it('should have the expected behavior', async ()=> {
      let record = await db.find({})
      assert.equals(someRecord.id, record.id)
    })
  })
})
```

---

# Mocha TDD

**Setup & Teardown:**

Avoid code duplication with supported *global* hooks:

- `before` & `after`: run once
- `beforeEach` & `afterEach`: run once per test
- Can be nested in **any** `describe`

```javascript
describe('Test suite', ()=> {
  before(async ()=> {
    await db.connect()
  })

  describe('feature', ()=> {
    beforeEach(async ()=> {
      await db.save(someRecord)
    })

    afterEach(async ()=> {
      await db.clear()
    })

    it('should have the expected behavior', async ()=> {
      let record = await db.find({})
      assert.equals(someRecord.id, record.id)
    })
  })
})
```

---

# Mocha TDD

**Pending tests:**

```javascript
describe('Feature', ()=> {
  it('should do something not yet supported')
})
```

---

# Mocha TDD

**Skipped tests:**

```javascript
describe('Feature', ()=> {
  it.skip('should ignore this test that\'s currently broken', ...)
  it('should still pass this test', ...)
})
```

---

# Mocha TDD

**Exclusive tests:**

```javascript
describe('Feature', ()=> {
  it.only('should pass this test because it\'s currently being worked on', ...)
  it('should ignore this test at the moment', ...)
})
```

---

# Mocha TDD

**CLI:**

- `mocha test/test.js`
- `mocha --watch test/test.js`
- `mocha --grep="Test suite" test/test.js` *
  
\* Only runs tests with "Test suite" in descriptions

---

# Mocha TDD

**Reporters:**

```bash
$ mocha --reporters

    dot - dot matrix
    doc - html documentation
    spec - hierarchical spec list
    json - single json object
    progress - progress bar
    list - spec-style listing
    tap - test-anything-protocol
    landing - unicode landing strip
    xunit - xunit reporter
    html-cov - HTML test coverage
    json-cov - JSON test coverage
    min - minimal reporter (great with --watch)
    json-stream - newline delimited json events
    markdown - markdown documentation (github flavour)
    nyan - nyan cat!
```

---

# Mocha Tooling

**Gulp:**

```bash
npm install -g gulp
npm install --save-dev gulp
npm install --save-dev gulp-mocha
```

---

# Mocha Tooling

**Gulp:**

```bash
npm install -g gulp
npm install --save-dev gulp
npm install --save-dev gulp-mocha
```

```javascript
let gulp = require('gulp')
let mocha = require('gulp-mocha')

gulp.task('default', ()=> {
  return gulp.src('test.js', {reporter: 'spec'})
    .pipe(mocha())
})
```

---

# Mocha Tooling

**Gulp:**

```bash
npm install -g gulp
npm install --save-dev gulp
npm install --save-dev gulp-mocha
```

```javascript
let gulp = require('gulp')
let mocha = require('gulp-mocha')

gulp.task('default', ()=> {
  return gulp.src('test.js', {reporter: 'spec'})
    .pipe(mocha())
})
```

```bash
project_root$ gulp
```

---

# Mocha Examples

**Test Suites from projects using Mocha:**

- `express`: https://github.com/strongloop/express/tree/master/test
- `connect`: https://github.com/senchalabs/connect/tree/master/test
- `superagent`: https://github.com/visionmedia/superagent/tree/master/test/node
- `mocha`: https://github.com/visionmedia/mocha/tree/master/test
- Websocket.io (browser): https://github.com/LearnBoost/websocket.io/tree/master/test

---

# Why Chai.js?

**Features:**

- BDD (chaining)
- node.js and browser support
- Multiple assertion styles
  - should: `foo.should.be.a('string')`
  - expect: `expect(foo).to.be.a('string')`
  - assert: `assert.typeOf(foo, 'string')`

---

# Chai.js Example

**Chai: `should`:**

```bash
npm install --save-dev chai
```

```javascript
// Just some features
x.should.be.empty
x.should.deep.equal(someObject)
x.should.have.property('y', someValue)
x.should.throw('error message')

// Empty check
should.exist(x)

// Negation
x.should.not.be.an('object')

// Chaining
x.should.not.be.an('object')
  .and.have.property('foo').to.deep.equal(someObject.foo)
```

---

# Terminology

**Spy**

- Wraps a function and watches arguments
- Calls the original function

**Stub**

- Replaces a function and watches arguments
- **Does not** call the original function

**Mock**

- Replaces functions and object properties.
- **Does not** call the original function (*unless you tell it to*)

---

# Sinon.js

**Spies:**

```javascript
let sinon = require('sinon')
let sinonChai = require('sinon-chai')

describe('Calling events with `emit`', ()=> {
  it('should call all the functions bound in the queue', ()=> {
    let e = new EventEmitter
    let fn = sinon.spy()

    e.on('test', fn)
    e.emit('test', 1, 2)

    fn.should.be.calledWith(1, 2)
  })
})
```

---

# Sinon.js

**Spies:**

```javascript
let sinon = require('sinon')
let sinonChai = require('sinon-chai')

describe('Calling events with `emit`', ()=> {
  it('should call all the functions bound in the queue', ()=> {
    let e = new EventEmitter
    let fn = sinon.spy()

    e.on('test', fn)
    e.emit('test', 1, 2)

    fn.should.be.calledWith(1, 2)
  })
})
```

---

# Sinon.js

**Stubs:**

Stubs are spies with pre-programmed behavior.

```javascript
let sinon = require('sinon')
let sinonChai = require('sinon-chai')

describe('Callback`', ()=> {
  it('should return the expected values', ()=> {
    let callback = sinon.stub()
    callback.withArgs(42).returns(1)
    callback.withArgs(1).throws('TypeError')

    callback().should.be.empty
    callback(42).should.equal(1)
    callback().should.throw('TypeError')
  })
})
```

---

# Sinon.js

**Mocks:**

Mocks are stubs with pre-programmed behavior **and** expectations.

In other words, use a mock to state expectations up-front, instead of after the fact.

```javascript
let sinon = require('sinon')
let sinonChai = require('sinon-chai')

describe('Callback`', ()=> {
  it('should return the expected values', ()=> {
    let e = new EventEmitter
    let mock = sinon.mock({handler: ()=>{}})
    mock.expects('handler').once().throws()

    e.on('test', mock.handler)
    e.emit('test', 1, 2)
    e.emit('someOtherEvent')

    mock.verify()
  })
})
```

---

class: center, middle

# Questions?
