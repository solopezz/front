import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { ReportComponent } from './report/report.component';
import { HistorySalesComponent } from './history-sales/history-sales.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
{ path: 'Productos', component: ProductsComponent },
{ path: 'Ventas', component: SalesComponent },
{ path: 'Reporte', component: ReportComponent },
{ path: 'Historial', component: HistorySalesComponent },
{ path: '404', component: NotFoundComponent },
{ path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
