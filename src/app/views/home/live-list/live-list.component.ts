import { Component, OnInit } from '@angular/core';
import { LiveService } from 'src/app/shared/service/live.service';
import { Live } from 'src/app/shared/model/live.model';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  lives: Live[];

  constructor(
    private rest: LiveService
  ) { }

  ngOnInit() {
    this.rest.getLives().subscribe(data => {
      this.lives = data.content;
      console.log(this.lives);
    });
  }

}
