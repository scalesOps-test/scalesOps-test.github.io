const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");
const filePath = path.join(rootDir, "data", "todos.json");

class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  save(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return [];
      else {
        const todos = JSON.parse(fileContent);
        todos.push(this);

        fs.writeFile(filePath, JSON.stringify(todos), (err) => {
          if (err) callback(err);
          else callback("no err");
        });
      }
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, fileContent) => {
      if (err) return [];
      else {
        const todos = JSON.parse(fileContent);
        callback(todos);
      }
    });
  }

  static deleteTodo(id, callback) {
    fs.readFile(filePath, (err, fileContent) => {
      const todos = JSON.parse(fileContent);
      const filteredTodos = todos.filter((t) => t.id != id);
      fs.writeFile(filePath, JSON.stringify(filteredTodos), err => {
        callback(err);
      });
    });
  }

  static setTodoToComplete(id, callback) {
    fs.readFile(filePath, (err, fileContent) => {
        const todos = JSON.parse(fileContent);
        const todoIndex = todos.findIndex(t => t.id == id);

        const todo = todos[todoIndex];
        todo.completed = true;
        todos[todoIndex] = todo;

        fs.writeFile(filePath, JSON.stringify(todos), (err) => {
            callback(err);
        })
      });
  }

  static getCompletedTodos(callback) {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) return [];
        else {
          const todos = JSON.parse(fileContent);
          callback(todos.filter((t) => t.completed === true).length);
        }
      });
  }

  static getRemainingTodos(callback) {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) return [];
        else {
          const todos = JSON.parse(fileContent);
          callback(todos.filter((t) => t.completed !== true).length);
        }
      });
  }
}

module.exports = Todo;
