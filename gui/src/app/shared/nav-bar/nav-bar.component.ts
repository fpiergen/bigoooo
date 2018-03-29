import { Component, OnInit } from '@angular/core';
import {SECTIONS} from './toolbar-items/toolbar-items';
import { Router } from '@angular/router';
import { NavBarService } from './nav-bar.service';

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  hidden = false;
    
  constructor(private navBarService: NavBarService, private router: Router) { }

  ngOnInit() {
      this.navBarService.change.subscribe(isHidden => {
          this.hidden = isHidden;
      });
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }

  btnClick= function (place: string) {
      this.router.navigateByUrl('/' + place);
  };

}
