var express = require('express')
var router = express.Router()

let todos = [
  { id: 1, name: 'walk dog', done: false },
  { id: 2, name: 'do laundry', done: false },
  { id: 3, name: 'hike mountain', done: false },
  { id: 4, name: 'read books', done: false },
  { id: 5, name: 'start coding', done: false },
  { id: 6, name: 'go sleeping', done: false }
]

/*  todos listing. */
/* GET todos listing. */
router.get('/', function (req, res, next) {
  const query = req.query
  const start = query.offset ? parseInt(query.offset) : 0
  const end = query.limit ? parseInt(query.limit) + start : todos.length
  const filteredTodo = todos.slice(start, end)
  res.send(filteredTodo)
})
/* GET a specific todo. */
router.get('/:todoId', function (req, res, next) {
  const todoId = req.params.todoId
  const todo = todos.find((todo) => todoId === String(todo.id))
  if (!todo) {
    res.status(404).send('The todo with the given ID was not found')
    return
  }
  res.send(todo)
})
/* POST a specific todo. */
router.post('/', function (req, res, next) {
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send('Name is required and should be minimun 3 characters')
    return
  }
  let todo = {
    id: Math.max(todos.map((todo) => todo.id)) + 1, // 沒有資料庫，先手動新增ID
    name: req.body.name, // 取得傳送來的name
    done: false // 預設未完成
  }
  todos.push(todo)
  res.send(todos)
})
/* PUT a specific todo. */
router.put('/:todoId', function (req, res, next) {
  const todoId = req.params.todoId
  const todo = todos.find((todo) => todoId === String(todo.id))
  const otherTodos = todos.filter((todo) => todoId !== String(todo.id))
  const updatedTodo = { ...todo, ...req.body }
  todos = [...otherTodos, updatedTodo]
  res.send(updatedTodo)
})
/* PATCH a specific todo. */
/* DELETE todos listing. */
router.delete('/', function (req, res, next) {
  todos = []
  res.send(todos)
})
/* DELETE a specific todo. */
router.delete('/:todoId', function (req, res, next) {
  const todoId = req.params.todoId
  const updatedTodos = todos.filter((todo) => todoId !== String(todo.id))
  todos = [...updatedTodos]
  res.send(todos)
})

module.exports = router
