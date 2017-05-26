import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pocket-tag',
  templateUrl: './pocket-tag.component.html'
})
export class PocketTagComponent implements OnInit {
  @Output() onAddedTag = new EventEmitter<string>();
  @ViewChild('addedTagRef') addedTagRef: ElementRef;

  modalOptions: any;
  showModal: boolean;
  addedTag: string;

  constructor() {}

  ngOnInit() {
    this.modalOptions = {
      size: 'small',
      type: 'default',
      closeable: true
    };
  };

  onShowModal() {
    this.addedTag = '';
    this.showModal = true;

    setTimeout(() => {
      this.addedTagRef.nativeElement.focus();
    }, 100);

  };

  onAddTag(e): void {
    this.onAddedTag.emit(this.addedTag);
    this.showModal = false;
  };
}
