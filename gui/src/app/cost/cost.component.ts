import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../environments/environment';

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

      //let headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
      let endPoint = 'http://localhost:3000/cost';

      if (environment.production) {
          endPoint = 'https://onz0pnjgv3.execute-api.us-east-1.amazonaws.com/dev/cost';
      }

      //this.http.post(endPoint, this.wallSections, {headers}).subscribe((resp: any)=>{this.cost = resp.cost;}, (err) => {console.log('The error is: ' + err);});
      this.http.post(endPoint, this.wallSections).subscribe((resp: any)=>{this.cost = resp.cost;}, (err) => {console.log('The error is: ' + err);});

      //this.http.get('http://localhost:3000/hello').subscribe((response: any)=>{console.log(response)});
      //
  }
}
