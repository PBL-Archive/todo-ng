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

  ngOnInit() {
    this.list = [];
    this.todoValue = '';
  }

  addTask() {
    if (this.todoValue !== '') {
      const newItem: Todo = {
        id: Date.now(),
        value: this.todoValue,
        isDone: false,
        textInputActive: false
      };
      this.list.push(newItem);
    }
    this.todoValue = '';
  }

  taskDone(id: number) {
    let taskDone = this.list.filter(item => item.id === id);
    taskDone[0].isDone = !taskDone[0].isDone;
  }

  editTask(id: number) {
    let editTask = this.list.filter(item => item.id === id);
    editTask[0].textInputActive = true;
    let notEditTask = this.list.filter(item => item.id !== id);
    for (let i = 0; i < notEditTask.length; i++) {
      notEditTask[i].textInputActive = false;
    }
  }

  updateTask(id: number, value: string) {
    let updateTask = this.list.filter(item => item.id === id);
    updateTask[0].value = value;
    updateTask[0].textInputActive = false;
  }

  deleteTask(id: number) {
    this.list = this.list.filter(item => item.id !== id);
  }

}
