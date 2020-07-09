import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { SaleService } from "../services/sale.service";

interface tempSales {
	id:number;
	name: string;
	price: number;
	quantity: number;
	amount: number;
	img: string;
	index: any;
}

@Component({
	selector: 'app-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.css']
})

export class SalesComponent implements OnInit {
	@Output() alertEvent: EventEmitter<any> = new EventEmitter();

	date:any;
	quantity:any;
	client:string;
	imgProduct;
	product;
	data = [];
	alert = [];
	total = 0;
	changeProductInput = false;
	selectedProduct:any;
	btnAddFroduct = true;
	readonly:any = true;
	products: any;
	countSale:any;

	constructor(public saleService: SaleService) { }

	ngOnInit(): void {
		this.saleService.getProducts().subscribe(
			(result:any) => {
				this.products = result.products;
				this.countSale = `VEN-${(result.count)}`;

			},
			error => {
				this.products = error;
				this.countSale = `VEN-1`;
			});
		this.active();
	}

	active(){
		this.readonly = !this.readonly;
		this.date = moment(new Date()).format("DD/MM/YYYY"); 
	}

	generateSale(){
		let sendData = {
			client: this.client,
			total: this.total,
			product_sale: null,
			folio: this.countSale
		};

		let tmp = this.data.map(function(item) {
			var rObj = {
				product_id: item.id, 
				quantity: item.quantity, 
				amount: item.amount,
			};
			return rObj;
		});
		sendData.product_sale = tmp;

		
		this.saleService.post(sendData).subscribe(
			result => {
				this.clear();
				this.client = '';
				this.total = 0;
				this.countSale = `VEN-${parseInt(this.countSale.split("-")[1])+1}`;
				this.selectedProduct = {};
				this.data = [];
				this.pushNotification('success', 'se genero con exito.');
				this.alertEvent.emit(this.alert);
			},
			error => {
				this.pushNotification('danger', 'no se pudo generar con exito.');
				this.alertEvent.emit(this.alert);
			});
	}

	quantityChanged(){
		var re = /^[0-9]+$/;

		if(!re.test(this.quantity)){  
			this.quantity = '';
		}
		this.btnAddFroduct = this.quantity <= 0 || !this.product ? true : false; 
	}

	addProduct(){
		this.changeProductInput = false;
		let tmp = {
			id: this.selectedProduct.id,
			name: this.selectedProduct.name,
			price: this.selectedProduct.price,
			quantity: this.quantity,
			amount: this.selectedProduct.price * this.quantity,
			img: this.selectedProduct.img,
			index: this.selectedProduct.index >= 0 ? this.selectedProduct.index : null,
		}
		this.tempAddSales(tmp);
		this.selectedProduct = null;
		this.clear();
	}

	clear(){
		this.quantity = '';
		this.product = '';
		this.imgProduct = '';
		this.btnAddFroduct = true;
	}

	editSale(index){
		this.changeProductInput = true;
		this.data[index].index = index;
		this.data[index].amountTemp = this.data[index].amount;
		this.data.forEach(function (item) {
			if (item.index != index) {
				item.index = null;
			}
		});
		this.selectedProduct = this.data[index];
		this.imgProduct = this.selectedProduct.img
		this.quantity = this.selectedProduct.quantity;
		this.product = this.selectedProduct.name; 
		this.quantityChanged();
	}

	pushNotification(type, description){
		this.alert.push({
			type: type,
			title: 'La venta',
			description: description,
			timeout: 5000
		});
	}

	changeProduct(e){
		this.selectedProduct = this.products.find(item => item.name == e);
		if (this.selectedProduct) {
			this.imgProduct = this.selectedProduct.img
			this.quantity = 1;
			this.quantityChanged();
		}else{
			this.imgProduct = '';
			this.btnAddFroduct = true;
		}
	}

	deleteProductTemp(index){
		this.total = this.total - this.data[index].amount;
		this.data.splice(index, 1)
	}

	tempAddSales(product: tempSales){
		this.total = this.total + (this.selectedProduct.price * this.quantity)
		if (product.index == null) {
			this.data.push(product);
		}else{
			this.total = this.total - this.selectedProduct.amountTemp
			this.data[product.index] = product;
			this.data[product.index].index = null;
		}
	}

}
