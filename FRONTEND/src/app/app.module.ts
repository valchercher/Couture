import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { ListerComponent } from './article/lister/lister.component';
import { ItemComponent } from './article/lister/item/item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VenteComponent } from './vente/vente.component';
import { FormvComponent } from './vente/formv/formv.component';
import { PaginationComponent } from './vente/pagination/pagination.component';
import { ListervComponent } from './vente/listerv/listerv.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemvComponent } from './vente/listerv/itemv/itemv.component';



@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    FormComponent,
    ListerComponent,
    ItemComponent,
    VenteComponent,
    FormvComponent,
    PaginationComponent,
    ListervComponent,
    NavbarComponent,
   ItemvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
