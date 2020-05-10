import { Component, OnInit } from '@angular/core';
import { LiveService } from 'src/app/shared/service/live.service';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  lives: Live[];
  livesToday: Live[];
  livesTomorrow: Live[];
  url: string = '';
  urlSafe: SafeResourceUrl;


  constructor(
    private rest: LiveService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let newDateToday: moment.Moment = moment.utc(new Date()).local();
    let newDateTodayStr = newDateToday.utcOffset("-03:00").format('YYYY-MM-DD');
   this.rest.getLivesWithDate(newDateTodayStr).subscribe(data => {
      this.livesToday = data.content;
      this.livesToday.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
    });
    let newDateTomorrow: moment.Moment = moment.utc(new Date()).local().add(1, 'days');
    let newDateTomorrowStr = newDateTomorrow.utcOffset("-03:00").format('YYYY-MM-DD');
    this.rest.getLivesWithDate(newDateTomorrowStr).subscribe(data => {
      this.livesTomorrow = data.content;
      this.livesTomorrow.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
    });
    this.rest.getLives().subscribe(data => {
      this.lives = data.content;
      this.lives.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
    });
  }

}
