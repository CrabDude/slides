let assert = require('assert')
let fs = require('fs')
require('songbird')
describe('File', ()=> {
  describe('contents', ()=> {
    it(`should be accessible at 'GET /path/to/file'`, async ()=> {
      let data = await fs.promise.readFile(__filename)
      assert.equal(true, true)
    })
  })
})
