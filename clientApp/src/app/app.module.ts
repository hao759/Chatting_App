import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { NavComponent } from './Component/nav/nav.component'
import { FormsModule } from '@angular/forms';
import { AccountService } from './_service/account.service';
import { HomeComponent } from './Component/home/home/home.component';
import { RegisterComponent } from './Component/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
