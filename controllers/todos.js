const Todo = require("../model/todo");

exports.getIndex = (req, res) => {
  Todo.getCompletedTodos((CompletedTodos) => {
    Todo.getRemainingTodos((RemainingTodos) => {
      Todo.fetchAll((todos) => {
        res.render("index", {
          pageTitle: "کارهای روزمره",
          todos: todos,
          CompletedTodos,
          RemainingTodos,
        });
      });
    });
  });
};
