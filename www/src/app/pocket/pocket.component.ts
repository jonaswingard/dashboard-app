import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IPocket } from './pocket';
import { PocketService } from './pocket.service';

@Component({
  selector: 'app-pocket',
  providers: [ PocketService ],
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit {
  items: IPocket[];

  selected: {
    addedTag?: string,
    itemId: string,
    title: string
  };

  private modalOptions: any;

  private showModal: boolean;

  private toggleLoading = function (item) {
    item.classList.toggle('loading');
  };

  constructor(private pocketService: PocketService) { }

  onArchive(e, id): void {
    this.toggleLoading(e.target);
    this.pocketService.archive(id).subscribe(items => {
      this.items = items;
      this.toggleLoading(e.target);
    });
  }

  onDelete(e, id): void {
    this.toggleLoading(e.target);
    this.pocketService.delete(id).subscribe(items => {
      this.items = items;
      this.toggleLoading(e.target);
    });
  }

  onAddTag(e, modal): void {
    this.toggleLoading(e.target);
    this.pocketService.addTag(
      this.selected.itemId,
      this.selected.addedTag
    ).subscribe(
      items => {
        this.items = items;
        this.selected = null;
        this.toggleLoading(e.target);
        modal.hide();
      }
    );
  }

  onRemoveTag(e, id, tagName): void {
    e.target.parentElement.parentElement.classList.toggle('disabled');
    this.pocketService.removeTag(id, tagName).subscribe(items => {
        this.items = items;
        e.target.parentElement.parentElement.classList.toggle('disabled');
      }
    );
  }

  onShowModal(item, dialog): void {
    this.selected = {
      itemId: item.item_id,
      title: item.resolved_title
    };

    this.showModal = true;
  }

  ngOnInit() {
    this.pocketService.get().subscribe(items => this.items = items);
    this.modalOptions = {
      size: 'small',
      type: 'default',
      closeable: true
    };
  }
}
