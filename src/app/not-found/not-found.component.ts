import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
	@Output() alertEvent: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

}
