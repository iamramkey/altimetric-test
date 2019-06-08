import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { DataService } from './shared/data.service';



@NgModule({
  imports: [BrowserModule, FormsModule, AgGridModule.withComponents([]), HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule { }
