import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestsComponent } from './requests/requests.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../core/services';

const routes: Routes = [{
  path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
  children: [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'requests', component: RequestsComponent, canActivate: [AuthGuard]},
    {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
