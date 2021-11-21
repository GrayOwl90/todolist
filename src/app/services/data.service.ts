import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private url = "http://localhost:3000/tasks";
  constructor(private http: HttpClient){ }

  getTasks(){
    return this.http.get<Task[]>(this.url);
  }
  createTask(task: Task) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Task>(this.url, JSON.stringify(task), {headers: myHeaders});
  }
  putTask(task: Task) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put<Task>(this.url, JSON.stringify(task), {headers: myHeaders});
  }
  patchTask(task: Task) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.patch<Task>(this.url, JSON.stringify(task), {headers: myHeaders});
  }
  deleteTask(id: number){
    return this.http.delete<Task>(this.url + '/' + id);
  }
}
