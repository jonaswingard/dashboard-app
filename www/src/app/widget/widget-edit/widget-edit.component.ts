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
  @Output() onSaveWidget = new EventEmitter<any>();
  @Output() onDeleteWidgetEvent = new EventEmitter<any>();
  @ViewChild('setFocus') inputRef: ElementRef;

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
    this.showModal = true;

    if (this.inputRef) {
      setTimeout(() => {
        this.inputRef.nativeElement.focus();
      }, 100);
    }

  };

  onSaveSettings(e): void {
    this.onSaveWidget.emit(this.Widget.Settings);
    this.showModal = false;
  };

  onDeleteWidget(e): void {
    this.onDeleteWidgetEvent.emit(this.Widget._id);
    this.showModal = false;
  }
}
