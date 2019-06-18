import { NgModule } from '@angular/core';

import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent, HeaderComponent, SharedModule } from '../shared';
import { NavbarComponent } from './nav/navbar.component';
import { SettingsComponent } from './settings/settings.component';
import { DetailsCustomersComponent } from './customers/details/details.customers.component';
import { DetailsRequestsComponent } from './requests/details/details.requests.component';
import { MomentModule } from 'ngx-moment';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    MomentModule,
    NgbPopoverModule,
  ],
  exports: [],
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    CustomersComponent,
    DetailsCustomersComponent,
    DetailsRequestsComponent,
    SettingsComponent,
    HomeComponent,
    RequestsComponent,
    NavbarComponent,
  ],
  providers: [
  ],
})
export class AdminModule {
}
