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
        { headerName: 'Id', field: 'id' },
      ];

    this.dataService.getConfig()
      .subscribe((data: any[]) => {
        this.gridOptions.api.setRowData(data);
      });
  }
}
