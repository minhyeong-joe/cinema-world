import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from './material.module';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { FilmThumbnailComponent } from './film-thumbnail/film-thumbnail.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ImageLoaderComponent,
    FilmThumbnailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ImageLoaderComponent,
    FilmThumbnailComponent,
    MaterialModule
  ]
})
export class SharedModule { }
