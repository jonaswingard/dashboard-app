import { Component, OnInit } from '@angular/core';
import { PocketService } from '../../services/pocket.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pocket',
  providers: [ PocketService ],
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit {
  items: Observable<Object[]>;

  constructor(private pocketService: PocketService) {
    this.items = this.pocketService.get();
  }

  archive(id): void {
    console.log(id);
  }

  ngOnInit() {
  }

}
