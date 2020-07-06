import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { ReportComponent } from './report/report.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import {FormsModule} from '@angular/forms';
import { HistorySalesComponent } from './history-sales/history-sales.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
	declarations: [
	AppComponent,
	ProductsComponent,
	SalesComponent,
	ReportComponent,
	HistorySalesComponent,
	NotFoundComponent,
	],
	imports: [
	BrowserAnimationsModule,
	PaginationModule.forRoot(),
	BsDropdownModule.forRoot(),
	TooltipModule.forRoot(),
	ModalModule.forRoot(),
	TypeaheadModule.forRoot(),
	AlertModule.forRoot(),
	BsDatepickerModule.forRoot(),
	FormsModule,
	BrowserModule,
	AppRoutingModule,
	ReactiveFormsModule,
	HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
