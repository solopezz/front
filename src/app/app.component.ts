import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend-tostadas';
	alerts;

	onActivate(componentReference) {
		componentReference.alertEvent.subscribe((data) => {
			this.alerts = data
		})
	}
}