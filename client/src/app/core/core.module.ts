import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';

import {
  ApiService,
  AuthGuard, CompaniesService, CustomersService,
  JwtService, RequestsService,
  UserService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthGuard,
    JwtService,
    UserService,
    RequestsService,
    CustomersService,
    CompaniesService
  ],
  declarations: []
})
export class CoreModule { }
