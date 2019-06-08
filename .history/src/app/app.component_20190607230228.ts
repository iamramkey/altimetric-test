import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { DataService } from './shared/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public gridOptions = {} as GridOptions;

  constructor(private dataService: DataService) {
    this.gridOptions.
      columnDefs = [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
      ];

    this.gridOptions.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

    this.dataService.getConfig()
      .subscribe((data: any[]) => {
        this.gridOptions.rowData = data;
      });
  }
}
