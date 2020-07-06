import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { SaleService } from "../services/sale.service";

defineLocale('es', esLocale);

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
	@Output() alertEvent: EventEmitter<any> = new EventEmitter();
	maxDate: Date;
	products;
	product;
	total = 0;
	range;
	load = false;
	data = [];
	start;
	end;
	startReq;
	endReq;
	bsConfig: Partial<BsDatepickerConfig>;
	
	constructor(public saleService: SaleService, 
		private localeService: BsLocaleService) { 
		this.localeService.use('es');
		this.maxDate = new Date();
		this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
	}

	ngOnInit(): void {
		
	}

	search(){
		if (!this.range) {
			return;
		}
		this.load = true;
		this.total = 0;
		this.data = [];
		this.start = new Date(this.range[0]).toLocaleDateString();
		this.end = new Date(this.range[1]).toLocaleDateString();
		this.startReq = new Date(this.range[0]).toISOString().slice(0,10);
		this.endReq = new Date(this.range[1]).toISOString().slice(0,10);
		this.saleService.report(this.startReq, this.endReq).subscribe(
			(result:any) => {
				this.load = false;
				this.data = result;
				result.forEach(item => this.total = this.total + item.total)
			},
			error => {
				this.data = [];
				this.load = false;
			});
	}

	download(){
		
		this.saleService.download(this.startReq, this.endReq).subscribe(
			(result:any) => {
				let dataType = result.type;
				let binaryData = [];
				binaryData.push(result);
				let downloadLink = document.createElement('a');
				downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
				downloadLink.setAttribute('download', `Ventas ${this.start} - ${this.end}`);
				document.body.appendChild(downloadLink);
				downloadLink.click();
			},
			error => {
			});	
	}

}
