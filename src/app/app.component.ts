import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';


export interface PeriodicElement {
  id: number;
  name: string;
  author: "Celentano"
  options: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', author: "Celentano", options: 'H'},
  {id: 2, name: 'Helium', author: "Celentano", options: 'He'},
  {id: 3, name: 'Lithium', author: "Celentano", options: 'Li'},
  {id: 4, name: 'Beryllium', author: "Celentano", options: 'Be'},
  {id: 5, name: 'Boron', author: "Celentano", options: 'B'},
  {id: 6, name: 'Carbon', author: "Celentano", options: 'C'},
  {id: 7, name: 'Nitrogen', author: "Celentano", options: 'N'},
  {id: 8, name: 'Oxygen', author: "Celentano", options: 'O'},
  {id: 9, name: 'Fluorine', author: "Celentano", options: 'F'},
  {id: 10, name: 'Neon', author: "Celentano", options: 'Ne'},
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
      MatGridListModule,
      MatTableModule
    ]
})
export class AppComponent {
  title = 'FAVRET';
  displayedColumns: string[] = ['id', 'name', 'author', 'options'];
  dataSource = ELEMENT_DATA;

  constructor() {

  }
}
