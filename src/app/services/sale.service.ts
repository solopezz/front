import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SaleService {

	constructor(private http: HttpClient) { }

	getProducts() {
		return this.http.get(`${environment.apiUrl}/products?sales=1`);
	}

	post(data) {
		return this.http.post(`${environment.apiUrl}/sales`, data);
	}

	get(page, search) {
		return this.http.get(`${environment.apiUrl}/sales?page=${page}&search=${search}`);
	}

	delete(id, page){
		return this.http.delete(`${environment.apiUrl}/sales/${id}?page=${page}`);
	}

	report(start, end) {
		return this.http.get(`${environment.apiUrl}/report?start=${start}&end=${end}`);
	}

	download(start, end) {
		return this.http.get(`${environment.apiUrl}/report/export?start=${start}&end=${end}`, {
			 responseType: 'blob' as 'json'});
	}
}
