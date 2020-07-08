import { Component } from '@angular/core';

import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todoValue: string;
  list: Todo[];
  activeTodos = 0;
  completedTodos = 0;

  ngOnInit() {
    this.list = [];
    this.todoValue = '';
  }

  addTodo() {
    if (this.todoValue !== '') {
      const newItem: Todo = {
        id: Date.now(),
        value: this.todoValue,
        isDone: false,
        textInputActive: false
      };
      this.activeTodos += 1;
      this.list.push(newItem);
    }
    this.todoValue = '';
  }

  todoDone(id: number) {
    let todoDone = this.list.filter(item => item.id === id);
    todoDone[0].isDone = !todoDone[0].isDone;
    if (todoDone[0].isDone) {
      this.completedTodos += 1;
      if (!(this.activeTodos < 1)) {
        this.activeTodos -= 1;
      }
    } else {
      this.activeTodos += 1;
      if (!(this.completedTodos < 1)) {
        this.completedTodos -= 1;
      }
    }
  }

  editTodo(id: number) {
    let editTodo = this.list.filter(item => item.id === id);
    editTodo[0].textInputActive = true;
    let notEditTodo = this.list.filter(item => item.id !== id);
    for (let i = 0; i < notEditTodo.length; i++) {
      notEditTodo[i].textInputActive = false;
    }
    let a;
    a = document.getElementById('textInputActive');
    setTimeout(() => { // this will make the execution after the list is updated as to edit the text of retrieved id
      document.getElementById("textInputActive").focus();
    }, 0);
  }

  updateTodo(id: number, value: string) {
    let updateTodo = this.list.filter(item => item.id === id);
    updateTodo[0].value = value;
    updateTodo[0].textInputActive = false;
  }

  deleteTodo(id: number) {
    let itemDoneOrNot = this.list.filter(item => item.id === id);
    this.list = this.list.filter(item => item.id !== id);
    if (itemDoneOrNot[0].isDone) {
      if (!(this.completedTodos < 1)) {
        this.completedTodos -= 1;
      }
    } else {
      if (!(this.activeTodos < 1)) {
        this.activeTodos -= 1;
      }
    }
  }

}
