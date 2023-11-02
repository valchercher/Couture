import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { FormComponent } from './article/form/form.component';
import { ListerComponent } from './article/lister/lister.component';
import { ItemComponent } from './article/lister/item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VenteComponent } from './vente/vente.component';
import { FormvComponent } from './vente/formv/formv.component';
import { PaginationComponent } from './vente/pagination/pagination.component';
import { ListervComponent } from './vente/listerv/listerv.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemvComponent } from './vente/listerv/itemv/itemv.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {NgxPaginationModule} from'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PipeFilterPipe } from './pipe/pipe-filter.pipe';
import { OrderByPipe } from './pipe/order-by.pipe';

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
   ItemvComponent,
   ConfirmationDialogComponent,
   PipeFilterPipe,
   OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSelectModule,
    MatDialogModule,
    NgxPaginationModule,
    MatPaginatorModule,
    FormsModule
  
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
