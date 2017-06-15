import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IPocket } from './pocket';
import { PocketService } from './pocket.service';
import { PocketTagComponent } from './pocket-tag/pocket-tag.component';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'app-pocket',
  providers: [ PocketService ],
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent extends WidgetComponent implements OnInit {
  public static get DefaultSettings() {
    return [
      ...WidgetComponent.UpdateSetting('ComponentTitle', 'Pocketlista'),
      {
          name: 'Limit',
          title: 'Antal som visas',
          value: '5',
          type: 'text'
      }
    ];
  }

  private Limit: number = 5;
  private items: IPocket[];
  private selectedItem: IPocket;
  @ViewChild(PocketTagComponent) pocketTagComponent: PocketTagComponent;

  constructor(private pocketService: PocketService) {
    super();
  }

  ngOnInit() {
    const limit = this.getSetting('Limit');
    if (limit.length) {
      this.Limit = parseInt(limit, 10);
    }
    if (this.getSetting('Visible')) {
      this.pocketService.get(this.Limit)
        .subscribe(items => this.items = items);
    }
  }

  toggleLoading(item) {
    item.classList.toggle('loading');
  };

  onArchive(e, id): void {
    this.toggleLoading(e.target);
    this.pocketService.archive(id)
      .flatMap(() => this.pocketService.get(this.Limit))
      .subscribe(items => {
        this.items = items;
        this.toggleLoading(e.target);
      });
  }

  onDelete(e, id): void {
    this.toggleLoading(e.target);
    this.pocketService.delete(id)
      .flatMap(() => this.pocketService.get(this.Limit))
      .subscribe(items => {
        this.items = items;
        this.toggleLoading(e.target);
      });
  }

  onRemoveTag(e, id, tagName): void {
    e.target.parentElement.parentElement.classList.toggle('disabled');

    this.pocketService.removeTag(id, tagName)
      .flatMap(() => this.pocketService.get(this.Limit))
      .subscribe(items => {
        this.items = items;
        e.target.parentElement.parentElement.classList.toggle('disabled');
      });
  }

  onAddedTag(tagName: string): void {
    this.pocketService.addTag(this.selectedItem.item_id, tagName)
      .flatMap(() => this.pocketService.get(this.Limit))
      .subscribe(items => {
        this.items = items;
        this.selectedItem = null;
      });
  }

  onShowModal(item): void {
    this.selectedItem = item;
    this.pocketTagComponent.onShowModal();
  }
}
