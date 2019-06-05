import { NgModule } from '@angular/core';

import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent, HeaderComponent, SharedModule } from '../shared';
import { NavbarComponent } from './nav/navbar.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  exports: [],
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    CustomersComponent,
    HomeComponent,
    RequestsComponent,
    NavbarComponent,
  ],
  providers: [
  ],
})
export class AdminModule {
}
