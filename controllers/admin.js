const Todo = require("../model/todo");

const { v4: uuidv4} = require('uuid');

exports.addTodo = function (req, res) {
  if (!req.body.todo) return res.redirect("/");
  else {
    const todo = new Todo(uuidv4(), req.body.todo);
    todo.save((err) => {
      if (err === "no err") return res.redirect("/");
      else console.log(err);
    });
  }
};

exports.deleteTodo = (req, res) => {
  Todo.deleteTodo(req.params.id, (err) => {
    if (!err) return res.redirect("/");
    else console.log(err);
  });
};

exports.completeTodo = (req, res) => {
  Todo.setTodoToComplete(req.params.id, (err) => {
    if (!err) res.redirect("/");
    else console.log(err);
  });
};
