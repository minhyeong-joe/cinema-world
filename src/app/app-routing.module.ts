import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FilmsComponent } from './pages/films/films.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SingleFilmComponent } from './pages/single-film/single-film.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'film/:id', component: SingleFilmComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
