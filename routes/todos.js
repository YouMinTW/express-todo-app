var express = require('express')
var router = express.Router()

let todos = [
  { id: 1, name: 'walk dog', done: false },
  { id: 2, name: 'do laundry', done: false }
]

/*  todos listing. */
/* GET todos listing. */
router.get('/', function (req, res, next) {
  res.send(todos)
})

module.exports = router
