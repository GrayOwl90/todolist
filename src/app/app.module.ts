import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from "./services/data.service";

import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {CreateTaskComponent} from './create-task/create-task.component';
import {EditTaskComponent} from './edit-task/edit-task.component';

// определение маршрутов
const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: 'create', component: CreateTaskComponent},
    {path: 'edit', component: EditTaskComponent}
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        CreateTaskComponent,
        EditTaskComponent
    ],
    providers: [ DataService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }