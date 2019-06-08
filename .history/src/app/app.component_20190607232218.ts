import { Component } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { APPLICATION_MAIN_TITLE } from "./shared/app.constants";
import { App } from "./shared/app.model";
import { DataService } from "./shared/data.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public gridOptions = {} as GridOptions;
  public APPLICATION_MAIN_TITLE = APPLICATION_MAIN_TITLE;

  constructor(private dataService: DataService, public appModel: App) {
    this.gridOptions.columnDefs = [
      {
        field: "id"
      },
      {
        field: "email"
      },
      {
        field: "first_name"
      },
      {
        field: "last_name"
      },
      {
        field: "gender"
      },
      {
        field: "ip_address"
      },
      {
        field: "mac_address"
      },
      {
        field: "address"
      }
    ];

    this.dataService.getConfig().subscribe((data: any[]) => {
      if (data instanceof Array) {
        this.appModel.employeesData = data;
        this.gridOptions.api.setRowData(data);
      } else {
        this.gridOptions.api.setRowData([]);
      }
    });
  }
}
