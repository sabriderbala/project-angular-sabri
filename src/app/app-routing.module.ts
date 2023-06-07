import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PaysDetailComponent } from './pays-detail/pays-detail.component';

const routes: Routes = [
  {
    path: '', // on redirige vers la page d'accueil
    component: HomeComponent, // on affiche le composant home
  },
  {
    path: 'detail/:id', // on redirige vers la page detail avec l'id du pays
    component: PaysDetailComponent, // on affiche le composant pays detail
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
