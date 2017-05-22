import { Component, OnInit, EventEmitter, Output, ViewChild, Renderer } from '@angular/core';

@Component({
  selector: 'app-pocket-tag',
  templateUrl: './pocket-tag.component.html'
})
export class PocketTagComponent implements OnInit {
  @Output() onAddedTag = new EventEmitter<string>();
  @ViewChild('foobar') foobarRef;

  modalOptions: any;
  showModal: boolean;
  addedTag: string;

  constructor(private _renderer: Renderer) {}

  ngOnInit() {
    this.modalOptions = {
      size: 'small',
      type: 'default',
      closeable: true
    };
  };

  onShowModal() {
    this.showModal = true;
    setTimeout(_ => {
      this._renderer.invokeElementMethod(this.foobarRef.nativeElement, 'focus', []);
    });
  };

  onAddTag(e): void {
    this.onAddedTag.emit(this.addedTag);
    this.showModal = false;
  };
}
