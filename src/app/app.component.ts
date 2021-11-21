import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`.nav{display: flex;align-items: center;}.active a { color: red;}`],
    templateUrl: './app.component.html',
})
export class AppComponent {
}