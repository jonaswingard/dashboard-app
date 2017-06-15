import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'widget-edit',
  templateUrl: './widget-edit.component.html'
})
export class WidgetEditComponent implements OnInit {
  @Input() Widget: any;
  @Output() onSaveWidgetEvent = new EventEmitter<any>();
  @Output() onDeleteWidgetEvent = new EventEmitter<any>();
  @ViewChild('setFocus') inputRef: ElementRef;

  modalOptions: any;
  showModal: boolean;
  addedTag: string;
  private settings: any;

  constructor() {}

  ngOnInit() {
    this.modalOptions = {
      size: 'small',
      type: 'default',
      closeable: true
    };

    this.settings = this.Widget.settings.map(x => Object.assign({}, x));
  };

  onShowModal() {
    this.showModal = true;

    if (this.inputRef) {
      setTimeout(() => {
        this.inputRef.nativeElement.focus();
      }, 100);
    }

  };

  onSaveWidget(e): void {
    this.onSaveWidgetEvent.emit(this.settings);
    this.showModal = false;
  };

  onDeleteWidget(e): void {
    this.onDeleteWidgetEvent.emit(this.Widget._id);
    this.showModal = false;
  }
}
