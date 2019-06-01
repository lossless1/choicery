import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestsComponent } from './requests/requests.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{
  path: '', component: AdminComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'requests', component: RequestsComponent},
    {path: 'customers', component: CustomersComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
