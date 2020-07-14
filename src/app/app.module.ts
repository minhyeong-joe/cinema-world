// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// External Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Root Component
import { AppComponent } from './app.component';

// Pages Component
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FilmsComponent } from './pages/films/films.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SingleFilmComponent } from './pages/single-film/single-film.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmsComponent,
    PostsComponent,
    PageNotFoundComponent,
    AboutComponent,
    SingleFilmComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
