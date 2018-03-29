import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { routing } from './app-routing/app-routing.module';
import { CostComponent } from './cost/cost.component';
import { HomeComponent } from './home/home.component';
import { NavBarService } from './shared/nav-bar/nav-bar.service';
import { MockXHRBackend } from './mock-xhr-backend';
import { ContactComponent } from './contact/contact.component';



//FormControl, FormGroupDirective, NgForm, Validators

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomeComponent,
    CostComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [
    NavBarService
    //{ provide: HttpXhrBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
