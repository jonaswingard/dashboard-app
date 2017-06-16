import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'widget-add',
  templateUrl: './widget-add.component.html'
})
export class WidgetAddComponent implements OnInit {
  @Input() WidgetList: any;
  @Output() onAddWidgetEvent = new EventEmitter<any>();

  private modalOptions: any;
  private showModal: boolean;

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
  };

  onSaveWidget(e): void {
    this.onAddWidgetEvent.emit();
    this.showModal = false;
  };
}
