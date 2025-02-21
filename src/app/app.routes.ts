import { Routes } from '@angular/router';
import { FacturaListComponent } from './features/facturas/components/factura-list/factura-list.component';
import { FacturaFormComponent } from './features/facturas/components/factura-form/factura-form.component';
import { LandingComponent } from './pages/landing/landing.component';
import { FacturaEditarComponent } from './features/facturas/components/factura-editar/factura-editar.component';
import { FacturaDetailComponent } from './features/facturas/components/factura-detail/factura-detail.component';



export const routes: Routes = [
  // { path: '', redirectTo: 'facturas', pathMatch: 'full' },
  { path: '', component: LandingComponent }, // Página de inicio
  { path: 'invoices', component: FacturaListComponent },
  // {
  //   path: 'facturas',
  //   loadComponent: () => import('./features/facturas/components/factura-list/factura-list.component').then(m => m.FacturaListComponent)
  // },
  { path: 'invoice/create', component: FacturaFormComponent },
  { path: 'invoice/edit/:id', component: FacturaEditarComponent },
  { path: 'invoice/show/:id', component: FacturaDetailComponent },
  // { path: '**', redirectTo: 'facturas' }
];


