import { NgModule } from '@angular/core';

import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { RequestsComponent } from './requests/requests.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent, HeaderComponent, SharedModule } from '../shared';
import { NavbarComponent } from './nav/navbar.component';
import { DetailsComponent } from './customers/details/details.component';
import { SettingsComponent } from './settings/settings.component';

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
    DetailsComponent,
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
