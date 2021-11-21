import {Component, OnInit} from '@angular/core';
import {Task} from "../services/task";
import {DataService} from "../services/data.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent implements OnInit {

  editedTask: Task|null = null;
  tasks: Task[];
  statusMessage: string = "";
  //myDate = new Date();

  constructor(private serv: DataService) {
    // this.myDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
    // console.log(this.myDate);
    this.tasks = new Array<Task>();
  }

  ngOnInit() : void {
    this.loadTasks();
  }

  //загрузка тасок
  private loadTasks() {
    this.serv.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
  // добавление таски
  addTask() {
    this.editedTask = new Task(0, "", "", "usual", false, 0, "", "");
    this.tasks.push(this.editedTask);
  }

  // удаление таски
  deleteTask(task: Task) {
    this.serv.deleteTask(task.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
      this.loadTasks();
    });
  }
  // редактирование таски
  editTask(task: Task) {
    this.editedTask = new Task(task.id, task.name, task.description, task.importance, task.completed, task.createdDate, task.deadlineDate, task.completedDate);
  }
  // сохраняем таску
  saveTask() {
    // добавляем таску
    this.serv.createTask(this.editedTask as Task).subscribe(data => {
      this.statusMessage = 'Данные успешно добавлены',
      this.loadTasks();
    });
    this.editedTask = null;
  }
  // изменение готовности таски
  completeTask(taskOnComplete: Task) {
    this.serv.patchTask(this.editedTask as Task).subscribe((updatedTask: Task) => {
      this.tasks = this.tasks.map(task => task.id !== taskOnComplete.id ? task : updatedTask);
      this.statusMessage = 'Данные успешно обновлены',
      this.loadTasks();
    });
    this.editedTask = null;
  }
}
