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

    this.gridOptions.columnDefs = [
      {
        field: 'id',
      },
      {
        field: 'email'
      },
      {
        field: 'first_name'
      }, {
        field: 'last_name'
      }, {
        field: 'gender'
      }, {
        field: 'ip_address'
      }, {
        field: 'mac_address'
      }, {
        field: 'address'
      }
    ]

    this.dataService.getConfig()
      .subscribe((data: any[]) => {
        this.gridOptions.api.setRowData(data);
      });
  }
}
