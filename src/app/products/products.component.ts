import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from "../services/product.service";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	@Output() alertEvent: EventEmitter<any> = new EventEmitter();

	bsModalRef: BsModalRef;
	message: string;
	products:any = { data: [] };
	productForm;
	errors;
	page;
	load;
	alert = [];
	selectFile:File = null;
	
	constructor(private modalService: BsModalService,
		public productService: ProductService) { }

	onFileSelected(event){
		this.selectFile = <File>event.target.files[0];
	}

	openModalSaveAndUpdateProduct(templateSaveAndUpdateProduct: TemplateRef<any>, product) {
		this.selectFile = null;
		this.errors = null;
		this.bsModalRef = this.modalService.show(templateSaveAndUpdateProduct);
		this.bsModalRef.content = {};
		this.bsModalRef.content.idProduct = product ? product.id : null;
		this.bsModalRef.content.actionBtnName = product ? 'Actualizar' : 'Guardar';
		this.productForm = new FormGroup({
			name: new FormControl(product ? product.name : ''),
			price: new FormControl(product ? product.price : ''),
			visible: new FormControl(product ? product.visible : null),
		});

	}

	openModalProductDelete(templateDeleteProduct: TemplateRef<any>, productId) {
		this.bsModalRef = this.modalService.show(templateDeleteProduct, {class: 'modal-sm'});
		this.bsModalRef.content = {};
		this.bsModalRef.content.productId = productId;
	}

	confirm(productId): void {
		this.bsModalRef.hide();
		this.productService.delete(productId, this.page).subscribe(
			result => {
				this.products = result;
				this.pushNotification('danger', 'se elimino con exito.')
				this.alertEvent.emit(this.alert);
			},
			error => {
				this.pushNotification('danger', 'no se pudo eliminar con exito.');
				this.alertEvent.emit(this.alert);
			});

		
	}

	decline(): void {
		this.bsModalRef.hide();
	}

	openModalProductView(e, templateViewProduct: TemplateRef<any>, product) {
		if (e.target.tagName == 'TD') {
			this.bsModalRef = this.modalService.show(templateViewProduct);
			this.bsModalRef.content = {};
			this.bsModalRef.content.product = product;
		}

	}

	ngOnInit(page = 1): void {
		this.page = page;
		this.productService.get(page).subscribe(
			result => {
				this.load = true;
				this.products = result;
			},
			error => {
				this.products = error;
			});
	}

	pageChanged(event: any): void {
		this.ngOnInit(event.page)
	}

	saveProduct() {
		var formData: any = new FormData();

		formData.append('name', this.productForm.value.name);
		formData.append('price', this.productForm.value.price);
		if (this.selectFile) {
			formData.append('img', this.selectFile);
		}

		this.productService.post(formData, this.page).subscribe(
			result => {
				this.bsModalRef.hide();
				this.products = result;
				this.pushNotification('success', 'se guardo con exito.')
				this.alertEvent.emit(this.alert);

			},
			error => {
				this.errors = error.error.errors;
				this.pushNotification('danger', 'no se pudo generar con exito.');
				this.alertEvent.emit(this.alert);
			});
	}

	updateProduct(idProduct) {
		var formData: any = new FormData();

		formData.append('name', this.productForm.value.name);
		formData.append('price', this.productForm.value.price);
		formData.append('visible', this.productForm.value.visible ?  1 : 0);
		
		if (this.selectFile) {
			formData.append('img', this.selectFile);
		}

		this.productService.update(idProduct, formData, this.page).subscribe(
			(result :any) => {
				let elementsIndex = this.products.data.findIndex(
					element => element.id == result.id
					);
				this.products.data[elementsIndex] = result;
				this.bsModalRef.hide();
				this.pushNotification('success', 'se actualizo con exito.')
				this.alertEvent.emit(this.alert);

			},
			error => {
				delete error.error.errors.headers
				this.errors = error.error.errors;
			});
	}

	pushNotification(type, description){
		this.alert.push({
			type: type,
			title: 'El producto',
			description: description,
			timeout: 5000
		});
	}

}
