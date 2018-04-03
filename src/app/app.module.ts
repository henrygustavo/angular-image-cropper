import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { ImageUploadCropperComponent } from './components/image-upload-cropper/image-upload-cropper.component';
import { DragDropImageDirective } from './shared/drag-drop-image.directive';


@NgModule({
  declarations: [
    AppComponent,
    ImageCropperComponent,
    ImageUploadCropperComponent,
    DragDropImageDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
