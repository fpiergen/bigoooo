import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {

    form: FormGroup;
    wallSections = [];
    removable: boolean = true; // Not really using this, it is always true.
    cost: number = 0;

    constructor(private fb: FormBuilder, private http: HttpClient ) {}

    ngOnInit() {
        this.form = this.fb.group({
            name: this.fb.control('', Validators.compose([
                Validators.required,
                Validators.pattern('[\\w\\-\\s\\/]+')])),
                length: this.fb.control(''),
                height: this.fb.control(''),
                type1: this.fb.control('straight'),
                type2: this.fb.control('freeStanding')
        });
    }

  submit(wallSection) {
      this.cost=0;
      this.wallSections.push(wallSection);
  }

  remove(wallSection: any): void {
      this.cost=0;
      let index = this.wallSections.indexOf(wallSection);
      if (index >= 0) {
          this.wallSections.splice(index, 1);
      }
  }

  hasSections() {
      if ( this.wallSections.length !== 0 )
          return true;
      else
          return false;
  }

  calculateCost() {
      // Call a service and pass the list of wall sections. This is where
      // we go to Amazon lambda or API which will call a lambda function
      // Next just mock up a API http service to test it out.
      //this.http.post('http://localhost:3000/cost', this.wallSections).subscribe((cost: number)=>{this.cost = cost});
      this.http.post('http://localhost:3000/cost', this.wallSections).subscribe((resp: any)=>{this.cost = resp.cost;}, (err) => {console.log('The error is: ' + err);});
      //this.http.get('http://localhost:3000/hello').subscribe((response: any)=>{console.log(response)});
      //
  }
}
