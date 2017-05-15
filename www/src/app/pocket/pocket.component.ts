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
    itemId: string
  };

  constructor(private pocketService: PocketService) { }

  onArchive(id): void {
    this.pocketService.archive(id).subscribe(items => this.items = items);
  }

  onSelect(item): void {
    this.selected = {
      itemId: item.item_id
    };
  }

  onAddTag(): void {
    this.pocketService.addTag(
      this.selected.itemId,
      this.selected.addedTag
    ).subscribe(
      items => {
        this.items = items;
        this.selected = null;
      }
    );

  }

  ngOnInit() {
    this.pocketService.get().subscribe(items => this.items = items);
  }

}
