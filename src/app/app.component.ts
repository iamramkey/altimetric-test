import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  public search: string;
  public createUser;
  public editUser;
  public profileForm: FormGroup;

  constructor(private dataService: DataService, public appModel: App) {
    this.profileForm = new FormGroup({
      id: new FormControl(),
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required, Validators.email]),
      gender: new FormControl(null, [Validators.required]),
      ip_address: new FormControl(null),
      mac_address: new FormControl(null),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
    this.gridOptions.pagination = true;
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
      },
      {
        headerName: "Actions",
        field: "",
        cellRenderer: params => {
          var div = document.createElement("div");
          var edit = document.createElement("button");
          var dlt = document.createElement("button");
          edit.className = "btn btn-info btn-xs";
          dlt.className = "btn btn-danger btn-xs";
          edit.innerHTML = '<span class="glyphicon glyphicon-pencil"></span>';
          dlt.innerHTML =
            '<span class="glyphicon glyphicon-ban-circle"></span>';
          edit.addEventListener("click", this.onEditClick.bind(this, params));
          dlt.addEventListener("click", this.onDeleteClick.bind(this, params));
          div.appendChild(edit);
          div.appendChild(dlt);
          return div;
        }
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

  public onSearchValueChange(e) {
    this.gridOptions.api.setQuickFilter(e.target.value.trim());
  }

  public onEditClick(params) {
    this.editUser = params.data;
    this.profileForm.patchValue({
      id: params.data.id,
      first_name: params.data.first_name,
      last_name: params.data.last_name,
      email: params.data.email,
      gender: params.data.gender,
      ip_address: params.data.ip_address,
      mac_address: params.data.mac_address,
      address: params.data.address
    });
  }

  public onDeleteClick(params) {
    let ind = this.appModel.employeesData.indexOf(params.data);
    if (ind > -1) {
      this.appModel.employeesData.splice(ind, 1);
      this.gridOptions.api.setRowData(this.appModel.employeesData);
    }
  }

  public saveUser(editUser, isEdit = false) {
    if (isEdit) {
      let ind = this.appModel.employeesData.indexOf(editUser);
      if (ind > -1) {
        this.appModel.employeesData[ind] = this.profileForm.value;
      }
      this.profileForm.reset();
      this.editUser = null;
    } else {
      let data = this.profileForm.value;
      data.id = this.appModel.employeesData.length + 1;
      this.appModel.employeesData.push(data);
      this.createUser = false;
    }
    this.gridOptions.api.setRowData(this.appModel.employeesData);
  }

  public createNewUser() {
    this.createUser = true;
    this.profileForm.reset();
  }
}
