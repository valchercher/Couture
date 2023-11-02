import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { VenteComponent } from './vente/vente.component';

const routes: Routes = [
  {path:'articles',component:ArticleComponent},
  {path:'ventes',component:VenteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
