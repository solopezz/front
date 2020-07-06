import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProductService {


	constructor(private http: HttpClient) { 

	}

	get(page) {
		return this.http.get(`${environment.apiUrl}/products?page=${page}`);
	}

	post(product, page){
		return this.http.post(`${environment.apiUrl}/products?page=${page}`, product);
	}

	delete(product, page){
		return this.http.delete(`${environment.apiUrl}/products/${product}?page=${page}`);
	}

	update(id, product, page){
		product.append('_method', 'PUT');
		return this.http.post(`${environment.apiUrl}/products/${id}?page=${page}`, product);
	}
}


