import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image-upload-cropper',
  templateUrl: './image-upload-cropper.component.html',
  styleUrls: ['./image-upload-cropper.component.scss']
})
export class ImageUploadCropperComponent {

  @Input() format = 'png';
  @Input() maintainAspectRatio = true;
  @Input() resizeToWidth = 128;

  @Output() saveEvent = new EventEmitter<Blob>();
  @Output() loadImageFailedEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private wasImageUploaded = false;
  private errorMessage = '';

  constructor() { }

  fileChangeEvent(event: any): void {

    this.imageChangedEvent = event;
    this.errorMessage = '';
    this.wasImageUploaded = true;
  }

  imageCroppedEvent(image: string) {

    this.croppedImage = image;

  }

  dropHandlerEvent(object) {

    this.errorMessage = object.invalidFlag ? 'invalid format' : '';
    this.wasImageUploaded = !object.invalidFlag;

    if (!object.invalidFlag) {

      object.event.target.files = this.dataURItoBlob(object.event.target.result);
      this.imageChangedEvent = object.event;
    }
  }

  onLoadImageFailedEvent($event) {
    this.wasImageUploaded = false;
    this.errorMessage = 'invalid format';
    this.loadImageFailedEvent.emit($event);

  }

  onSaveEvent() {
    this.saveEvent.emit(this.dataURItoBlob(this.croppedImage));
  }

  onCancelEvent() {
    this.cancelEvent.emit();
  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: `image/${this.format}` });
  }

}
