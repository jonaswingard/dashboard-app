import { Component, OnInit } from '@angular/core';
import { PocketService } from '../../services/pocket.service'

@Component({
  selector: 'app-pocket',
  providers: [ PocketService ],
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.css']
})
export class PocketComponent implements OnInit {
  items = [];

  constructor(private pocketService: PocketService) {
    this.pocketService
      .get()
      .then(result => {
        const items = Object.keys(result).map(item => result[item]);
        console.log(items);
        this.items = items;
      });
  }

  ngOnInit() {
  }

}
