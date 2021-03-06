import { AuthService } from './../services/auth.service';
import { AlertyfyService } from './../services/alertyfy.service';
import { UserServiceService } from './../services/user-service.service';
import { UserRegisterComponent } from './../user/user-register/user-register.component';
import { UserLoginComponent } from './../user/user-login/user-login.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { HousingService } from './../services/housing.service';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const appRoutes: Routes = [
   { path: '', component: PropertyListComponent },
   { path: 'rent-property', component: PropertyListComponent },
   { path: 'add-property', component: AddPropertyComponent },
   { path: 'property-detail/:id', component: PropertyDetailComponent },
   { path: 'user/login', component: UserLoginComponent },
   { path: 'user/register', component: UserRegisterComponent },
   { path: '**', component: PropertyListComponent }
];

@NgModule({
   declarations: [
      AppComponent,
      PropertyCardComponent,
      PropertyListComponent,
      NavBarComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      UserLoginComponent,
      UserRegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      BsDatepickerModule.forRoot()
   ],
   providers: [
      HousingService,
      UserServiceService,
      AlertyfyService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
