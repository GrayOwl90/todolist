import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../services/task";
import {DataService} from "../services/data.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  providers: [DataService]
})
export class CreateTaskComponent implements OnInit {
  editedTask: Task | null = null;
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
  // добавление тасок
  addTask() {
    this.editedTask = new Task(0, "", "", "usual", false, 0, "", "");
    this.tasks.push(this.editedTask);
    //this.isNewRecord = true;
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

  // удаление таски
  deleteTask(task: Task) {
    this.serv.deleteTask(task.id).subscribe(data => {
      this.statusMessage = 'Данные успешно удалены',
          this.loadTasks();
    });
  }
}