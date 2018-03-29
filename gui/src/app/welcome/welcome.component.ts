import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
    
    constructor() { 
    }

    ngOnInit() { 
        $(document).ready(function () {
            $("#my-images").nanogallery2({
                "userID": "153073630@N07", "kind": "flickr", "thumbnailHeight": 150, "thumbnailWidth": 150 
            });
        });
    }

}
