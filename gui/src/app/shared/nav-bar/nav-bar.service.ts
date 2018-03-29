import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class NavBarService {

  isHidden = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  hide(val: boolean) {
    this.isHidden = val;
    this.change.emit(this.isHidden);
  }

}

