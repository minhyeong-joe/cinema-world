// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { TagsDialogComponent } from './pages/posts/tags-dialog.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { SafeUrlPipe } from './core/pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmsComponent,
    PostsComponent,
    PageNotFoundComponent,
    AboutComponent,
    SingleFilmComponent,
    TagsDialogComponent,
    SinglePostComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
