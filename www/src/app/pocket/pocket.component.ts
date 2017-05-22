import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IPocket } from './pocket';
import { PocketService } from './pocket.service';
import { PocketTagComponent } from '../pocket-tag/pocket-tag.component';

@Component({
  selector: 'app-pocket',
  providers: [ PocketService ],
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit {
  @ViewChild(PocketTagComponent) pocketTagComponent: PocketTagComponent;

  items: IPocket[];
  selectedItem: IPocket;

  constructor(private pocketService: PocketService) {}

  toggleLoading(item) {
    item.classList.toggle('loading');
  };

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

  onRemoveTag(e, id, tagName): void {
    e.target.parentElement.parentElement.classList.toggle('disabled');
    this.pocketService.removeTag(id, tagName).subscribe(items => {
        this.items = items;
        e.target.parentElement.parentElement.classList.toggle('disabled');
      }
    );
  }

  onAddedTag(tagName: string): void {
    this.pocketService.addTag(
      this.selectedItem.item_id,
      tagName
    ).subscribe(
      items => {
        this.items = items;
        this.selectedItem = null;
      }
    );
  }

  onShowModal(item): void {
    this.selectedItem = item;
    this.pocketTagComponent.onShowModal();
  }

  ngOnInit() {
    this.pocketService.get().subscribe(items => this.items = items);
  }
}
