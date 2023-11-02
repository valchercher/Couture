import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategorieComponent } from './categorie/categorie.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { ListeComponent } from './article/liste/liste.component';
import { ItemComponent } from './article/liste/item/item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './article/pagination/pagination.component';
import { VenteComponent } from './vente/vente.component';
import { FormvComponent } from './vente/formv/formv.component';
import { ListervComponent } from './vente/listerv/listerv.component';
import { ItemvComponent } from './vente/listerv/itemv/itemv.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatTableModule}from'@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    CategorieComponent,
    ArticleComponent,
    FormComponent,
    ListeComponent,
    ItemComponent,
    NavbarComponent,
    PaginationComponent,
    VenteComponent,
    FormvComponent,
    ListervComponent,
    ItemvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
