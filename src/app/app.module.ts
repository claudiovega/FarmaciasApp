import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FarmaciasComponent } from './farmacias/farmacias.component';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FarmaciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
