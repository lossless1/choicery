import { NgModule } from '@angular/core';

import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RequestsService } from './requests/requests.service';
import { HomeService } from './home/home.service';
import { CustomersService } from './customers/customers.service';
import { FooterComponent, HeaderComponent, SharedModule } from '../shared';

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
  ],
  providers: [
    HomeService,
    CustomersService,
    RequestsService,
  ],
})
export class AdminModule {
}
