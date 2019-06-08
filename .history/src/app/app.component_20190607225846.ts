import { Component } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dataService: DataService) {
    this.dataService.getConfig()
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
