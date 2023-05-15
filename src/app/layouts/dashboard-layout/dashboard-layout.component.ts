import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Params, Router, RoutesRecognized } from '@angular/router';
import {filter} from 'rxjs/operators';
import {map, mergeMap} from 'rxjs/internal/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
  public pageTitle;
  
  constructor(titleService:Title, router:Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        let title = this.getTitle(router.routerState, router.routerState.root).join('-');
        this.pageTitle = title
        // change page title in browser
        // document.title = `أدمن ورد - ${title}`
        document.title = `أدمن شركة الشحن - interNational Parcel`
        // titleService.setTitle(title);
      }
    });
  }

  ngOnInit(): void {
 
  }
  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) { data.push(parent.snapshot.data.title)}
    if(state && parent) {data.push(... this.getTitle(state, state.firstChild(parent)))}
    return data;
  }

}
