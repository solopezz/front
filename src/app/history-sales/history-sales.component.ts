import { Component, OnInit, TemplateRef, Output, EventEmitter} from '@angular/core';
import { SaleService } from "../services/sale.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-history-sales',
	templateUrl: './history-sales.component.html',
	styleUrls: ['./history-sales.component.css']
})
export class HistorySalesComponent implements OnInit {
	@Output() alertEvent: EventEmitter<any> = new EventEmitter();
	bsModalRef: BsModalRef;

	data:any;
	page;
	load;
	inputSearch = '';
	alert = [];

	constructor(public saleService: SaleService,private modalService: BsModalService,) { }

	ngOnInit(page = 1): void {
		this.page = page;
		this.saleService.get(page, this.inputSearch).subscribe(
			result => {
				this.load = true;
				this.data = result;
			},
			error => {
				this.data = error;
			});
	}

	pageChanged(event: any): void {
		this.ngOnInit(event.page)
	}

	openModalProductDelete(templateDeleteProduct: TemplateRef<any>, id) {
		this.bsModalRef = this.modalService.show(templateDeleteProduct, {class: 'modal-sm'});
		this.bsModalRef.content = {};
		this.bsModalRef.content.id = id;
	}

	search(){
		this.load = false;
		this.ngOnInit(this.page)
	}

	confirm(id): void {
		this.bsModalRef.hide();
		this.saleService.delete(id, this.page).subscribe(
			result => {
				this.data = result;
				this.pushNotification('danger', 'se elimino con exito.')
				this.alertEvent.emit(this.alert);
				this.inputSearch = '';
			},
			error => {
				this.pushNotification('danger', 'no se pudo eliminar con exito.');
				this.alertEvent.emit(this.alert);
			});
	}

	openModalProductView(e, templateViewSale: TemplateRef<any>, sale) {
		if (e.target.tagName == 'TD') {
			this.bsModalRef = this.modalService.show(templateViewSale);
			this.bsModalRef.content = {};
			this.bsModalRef.content.sale = sale;
		}

	}

	decline(): void {
		this.bsModalRef.hide();
	}

	pushNotification(type, description){
		this.alert.push({
			type: type,
			title: 'La venta',
			description: description,
			timeout: 5000
		});
	}

}
