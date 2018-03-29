import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { NavBarService } from '../shared/nav-bar/nav-bar.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private navBarService: NavBarService) { }

  ngOnInit() {
      this.navBarService.hide(true);
  }

  ngOnDestroy()  {
      this.navBarService.hide(false);
  }


}
